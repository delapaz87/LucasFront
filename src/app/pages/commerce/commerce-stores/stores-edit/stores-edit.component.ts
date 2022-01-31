import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppStateWithCommerce } from '../../../../app.reducer';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ModalHoursComponent } from '../modal-hours/modal-hours.component';
import { ActivatedRoute, Router } from '@angular/router';
import * as models from '../../../../shared/models/Company';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { ComponentRestrictions } from 'ngx-google-places-autocomplete/objects/options/componentRestrictions';
import { NotificationService } from '../../../../shared/services/notification.service';
import { CountryISO } from 'ngx-intl-tel-input';
import * as actions from '../../../../theme/layout/admin/store/actions';


@Component({
  selector: 'app-stores-edit',
  templateUrl: './stores-edit.component.html',
  styleUrls: ['./stores-edit.component.css']
})
export class StoresEditComponent implements OnInit, OnDestroy {

  @ViewChild('places') places: GooglePlaceDirective | any;


  CountryISO = CountryISO
  weekday = ["lunes","martes","miércoles","jueves","viernes","sábado","domingo"]
  isSave: boolean = false;
  store_id: number = 0;
  formStore: FormGroup | any;
  isLoading: boolean = false;
  geocities: any = [];
  geoprovince: any = [];
  geodistrict: any = [];
  geoCitieSub: Subscription | undefined;
  geoProvinceSub: Subscription | undefined;
  geoDistritoSub: Subscription | undefined;

  stores: models.Store | any;

  constructor(
    private route: Router,
    private store: Store<AppStateWithCommerce>,
    private activerouter: ActivatedRoute,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private notif: NotificationService
  ) {

    this.activerouter.params.subscribe((r: any) => {
      this.store_id = r.id;
    });

  }

  ngOnDestroy(): void {
    this.geoCitieSub?.unsubscribe();
    this.geoProvinceSub?.unsubscribe();
    this.geoDistritoSub?.unsubscribe();
    this.store.dispatch(actions.unSetGeoProvince());
    this.store.dispatch(actions.unSetGeoDistrict());
  }

  ngOnInit(): void {
    this.geoCitieSub = this.store.select('commerce').subscribe(({geocities}) => {
      this.geocities = geocities.data
      this.isLoading = geocities.loading
    })
    this.geoProvinceSub = this.store.select('commerce').subscribe(({geoprovince}) => {
      this.geoprovince = geoprovince.data
      this.isLoading = geoprovince.loading
    })
    this.geoDistritoSub = this.store.select('commerce').subscribe(({geodistrict}) => {
      this.geodistrict = geodistrict.data
      this.isLoading = geodistrict.loading
    })
    this.store.select('commerce').subscribe( ({stores}) => {
      this.stores = stores.data.find( (e: models.Store) => e.id == this.store_id)
      this.isLoading = stores.loading
      if(this.isSave == true && stores.error == null) {
        this.notif.showSuccess('Se ha a guardado con exito','',{
          positionClass: 'toast-bottom-right',
          progressBar: true
        });
        this.isSave = false;
        this.route.navigate(['/commerce/stores'])
      }
      if(this.isSave == true && stores.error != null) {
        this.notif.showError('Ha ocurrido un error al guardar el registro e intentelo nuevamente. Si el problema perciste comuniquese con sac@tulivery.com','',{
          positionClass: 'toast-bottom-right',
          progressBar: true
        });
        this.isSave = false;
      }

      this.formStore = this.fb.group({
        title         : new FormControl(this.stores?.title,[Validators.required]),
        phone         : new FormControl(this.stores?.phone,[Validators.required]),
        street_name   : new FormControl(this.stores?.street_name,[Validators.required]),
        street_number : new FormControl(this.stores?.street_number,[Validators.required]),
        reference     : new FormControl(this.stores?.reference),
        city          : new FormControl(this.stores?.city,[Validators.required]),
        province      : new FormControl(this.stores?.province,[Validators.required]),
        district      : new FormControl(this.stores?.district,[Validators.required]),
        latitude      : new FormControl(this.stores?.latitude,[Validators.required]),
        longitude     : new FormControl(this.stores?.longitude,[Validators.required]),
        store_hours   : this.fb.array([])
      });

      this.weekday.forEach( e => {
        this.addWeekday(this.stores?.store_hours);
      });
    })

    this.store.dispatch(actions.cargarGeoProvince({id: this.stores?.city}));
    this.store.dispatch(actions.cargarGeoDistrict({id: this.stores?.province}));
    this.js();
  }

  get store_hours(): FormArray {
    return this.formStore.get('store_hours') as FormArray;
  }

  addWeekday(hours: any) {
    let weekday: any;
    weekday = this.fb.group({
      start_time  : new FormControl(hours.find((e: any) => e.weekday == this.store_hours.length)?.start_time),
      end_time    : new FormControl(hours.find((e: any) => e.weekday == this.store_hours.length)?.end_time),
      weekday     : new FormControl(this.store_hours.length)
    });
    this.store_hours.push(weekday);
  }

  selectCity() {
   const city = this.formStore.controls['city'].value;
   if(city === ''){
    this.store.dispatch(actions.unSetGeoProvince());
    this.store.dispatch(actions.unSetGeoDistrict());
    return;
   }
   this.store.dispatch(actions.cargarGeoProvince({id: city}));
  }

  selectProvince() {
    const province = this.formStore.controls['province'].value;
    if(province === ''){
      this.store.dispatch(actions.unSetGeoDistrict());
     return;
    }
    this.store.dispatch(actions.cargarGeoDistrict({id: province}));
   }

   showModalHours() {
    const dialogRef = this.dialog.open(ModalHoursComponent, {
      width: '500px',
      role: 'dialog',
      disableClose: true,
      data: {store_id: this.store_id}
    });
    dialogRef.beforeClosed().subscribe(result => {
      this.ngOnDestroy();
      this.ngOnInit();
    });
   }

   public AddressChange(address: any) {
    //setting address from API to local variable
    //console.log('Address : ',address);
/*     console.log('Address : ',address.formatted_address);
    this.formattedaddress = address.formatted_address
    console.log(address.geometry.location.lng());
    console.log(address.geometry.location.lat());
    console.log(address.geometry.location.toJSON()) */
    this.formStore.controls['street_name'].setValue(address.formatted_address);
    this.formStore.controls['latitude'].setValue(address.geometry.location.lat());
    this.formStore.controls['longitude'].setValue(address.geometry.location.lng())
   }

   submitStore() {
     if(this.formStore.invalid) { return; }
     const store = Object.assign({...this.stores}, this.formStore.value)
     this.isSave = true;
     this.store.dispatch(actions.updateStores({ stores: store}))
   }

   btnCancel() {
    this.ngOnDestroy();
    this.route.navigate(['/commerce/stores'])
   }

  js() {
    $(function(){
      $(document).click(function () {
       $(".dropdown-list").fadeOut();
       $(".g-input--material input").each(function () {
         if ($(this).val() === "") {
           $(this).removeClass("focus");
           $(this).siblings(".main-input").removeClass("focus");
           $(this).next(".placeholder").removeClass("focus");
         }
       });
     });

     $(".g-input--material").on({
       click: function(e) {
         $(this).find(".placeholder, input, .main-input").addClass("focus");
         e.stopPropagation();
       },
     });

     $(this).find(".placeholder, input, .main-input").addClass("focus");
    });
  }


}
