import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppStateWithCommerce } from '../../../../app.reducer';
import { TarifaDelivery, Company } from '../../../../shared/models/Company';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import * as actions from '../../../../theme/layout/admin/store/actions';

@Component({
  selector: 'app-company-delivery',
  templateUrl: './company-delivery.component.html',
  styleUrls: ['./company-delivery.component.css']
})
export class CompanyDeliveryComponent implements OnInit, OnDestroy {

  delivery: TarifaDelivery | any;
  company: any | Company;
  formDelivery: FormGroup;
  companySubscription: Subscription | any;

  constructor(
    private store: Store<AppStateWithCommerce>,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CompanyDeliveryComponent>,
  ) {
    this.formDelivery = this.fb.group({
      activate_delivery: new FormControl(false),
      delivery_map: new FormControl(0,[Validators.required]),
      delivery_min: new FormControl('0.00',[Validators.required]),
      check_delivery: new FormControl(false),
      check_recojo: new FormControl(false),
      delivery_way: new FormControl('0'),
    });
   }

  ngOnInit(): void {

    this.companySubscription = this.store.select('commerce').subscribe( ({ company }) => {
      this.company = company.data
      this.delivery = company.data.company_delivery
    })

    this.formDelivery = this.fb.group({
      activate_delivery: new FormControl(
        this.company?.activate_delivery != null || this.company?.activate_delivery === 1? this.company?.activate_delivery : false
      ),
      delivery_map: new FormControl(
        this.delivery?.delivery_map != null? this.delivery?.delivery_map.toString() : '0',
        [Validators.required]
      ),
      delivery_min: new FormControl(
        this.delivery?.delivery_min != null? this.delivery?.delivery_min : '0.00',
        [Validators.required]
      ),
      check_delivery: new FormControl(
        this.delivery?.delivery_way === 1? true : this.delivery?.delivery_way === 3? true : false,
      ),
      check_recojo: new FormControl(
        this.delivery?.delivery_way === 2? true : this.delivery?.delivery_way === 3? true : false,
      ),
      delivery_way: new FormControl(
        this.delivery?.delivery_way != null? this.delivery?.delivery_way : 0,
      ),
    });

    this.js();
  }

  ngOnDestroy(): void {
    this.companySubscription.unsubscribe();
  }

  updateDelivery() {
    if(this.formDelivery.invalid) { return; }
    this.delivery = Object.assign({...this.delivery}, this.formDelivery.value);

    this.delivery.delivery_way = 0;
    if(this.formDelivery.controls['check_delivery'].value === true) { this.delivery.delivery_way = 1};
    if(this.formDelivery.controls['check_recojo'].value === true) { this.delivery.delivery_way = 2 };
    if(this.formDelivery.controls['check_recojo'].value === true && this.formDelivery.controls['check_delivery'].value === true) { this.delivery.delivery_way = 3 };

    delete this.delivery.activate_delivery;
    delete this.delivery.check_recojo;
    delete this.delivery.check_delivery;

    //this.store.dispatch(actions.updateDeliveryRate({rate: this.delivery}));
    this.store.dispatch(actions.updateCommerceDelivery({rate: this.delivery}));
    const company: any = {
      'activate_delivery': this.formDelivery.controls['activate_delivery'].value
    };
    this.store.dispatch(actions.updateCommerce({company: company}));
    this.dialogRef.close();
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
