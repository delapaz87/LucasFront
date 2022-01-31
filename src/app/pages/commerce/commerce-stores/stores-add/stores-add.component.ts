import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AppStateWithCommerce } from '../../../../app.reducer';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from '../../../../shared/services/notification.service';
import { Store } from '@ngrx/store';
import { ModalHoursComponent } from '../modal-hours/modal-hours.component';
import * as models from '../../../../shared/models/Company';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import * as actionsAdmin from '../../../../theme/layout/admin/store/actions';
import * as actions from '../../../../theme/layout/admin/store/actions/stores.action';
import { CountryISO } from 'ngx-intl-tel-input';

@Component({
  selector: 'app-stores-add',
  templateUrl: './stores-add.component.html',
  styleUrls: ['./stores-add.component.css']
})
export class StoresAddComponent implements OnInit {

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
    this.store.dispatch(actionsAdmin.unSetGeoProvince());
    this.store.dispatch(actionsAdmin.unSetGeoDistrict());
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
    })

    this.formStore = this.fb.group({
      title         : new FormControl('',[Validators.required]),
      phone         : new FormControl('',[Validators.required]),
      street_name   : new FormControl('',[Validators.required]),
      street_number : new FormControl('',[Validators.required]),
      reference     : new FormControl(''),
      city          : new FormControl('',[Validators.required]),
      province      : new FormControl('',[Validators.required]),
      district      : new FormControl('',[Validators.required]),
      latitude      : new FormControl('',[Validators.required]),
      longitude     : new FormControl('',[Validators.required]),
      store_hours   : this.fb.array([])
    });

    this.weekday.forEach( e => {
      this.addWeekday();
    });

    this.js();
  }

  get store_hours(): FormArray {
    return this.formStore.get('store_hours') as FormArray;
  }

  addWeekday() {
    const weekday = this.fb.group({
        start_time  : new FormControl(),
        end_time    : new FormControl(),
        weekday     : new FormControl(this.store_hours.length)
    });
    this.store_hours.push(weekday);
  }

  selectCity() {
   const city = this.formStore.controls['city'].value;
   if(city === ''){
    this.store.dispatch(actionsAdmin.unSetGeoProvince());
    this.store.dispatch(actionsAdmin.unSetGeoDistrict());
    return;
   }
   this.store.dispatch(actionsAdmin.cargarGeoProvince({id: city}));
  }

  selectProvince() {
    const province = this.formStore.controls['province'].value;
    if(province === ''){
      this.store.dispatch(actionsAdmin.unSetGeoDistrict());
     return;
    }
    this.store.dispatch(actionsAdmin.cargarGeoDistrict({id: province}));
   }

   showModalHours() {
    this.dialog.open(ModalHoursComponent, {
      width: '500px',
      role: 'dialog',
      disableClose: true,
    });
   }

   public AddressChange(address: any) {
    this.formStore.controls['street_name'].setValue(address.formatted_address);
    this.formStore.controls['latitude'].setValue(address.geometry.location.lat());
    this.formStore.controls['longitude'].setValue(address.geometry.location.lng())
   }

   submitStore() {
     if(this.formStore.invalid) { return; }
     const store = Object.assign({...this.stores}, this.formStore.value)
     this.isSave = true;
     this.store.dispatch(actions.saveStores({ stores: store}))
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
