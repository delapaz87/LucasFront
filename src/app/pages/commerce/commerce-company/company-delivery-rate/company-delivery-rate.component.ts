import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppStateWithCommerce } from '../../../../app.reducer';
import { MatDialogRef } from '@angular/material/dialog';
import { TarifaDelivery } from '../../../../shared/models/Company';
import { Subscription } from 'rxjs';
import * as actions from '../../../../theme/layout/admin/store/actions';

@Component({
  selector: 'app-company-delivery',
  templateUrl: './company-delivery-rate.component.html',
  styleUrls: ['./company-delivery-rate.component.css']
})
export class CompanyDeliveryRateComponent implements OnInit, OnDestroy {

  tarifadelivery: TarifaDelivery | any;
  tasaDeliveryForm: FormGroup | any;

  formSubscription: Subscription;

  constructor(
    private store: Store<AppStateWithCommerce>,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CompanyDeliveryRateComponent>,
  ) {
    this.formSubscription = this.store.select('commerce').subscribe( ({ company }) => this.tarifadelivery = company.data.company_delivery)
    this.tasaDeliveryForm = this.fb.group({
      rate_type: new FormControl(1,[Validators.required]),
      rate_fix: new FormControl('0.00'),
      rate_var_value: new FormControl('0.00'),
      rate_var_km: new FormControl('0.00'),
      rate_ruler_value: new FormControl('0.00'),
      rate_ruler_km: new FormControl('0.00'),
      rate_outcity_do: new FormControl(false),
      rate_outcity_text: new FormControl('')
    });
   }

  ngOnInit(): void {

    this.changeTarifa();

    this.tasaDeliveryForm = this.fb.group({
      rate_type: new FormControl(
        this.tarifadelivery?.rate_type != null? this.tarifadelivery?.rate_type : 1,
        [Validators.required]
      ),
      rate_fix: new FormControl(
        this.tarifadelivery?.rate_fix != null? this.tarifadelivery?.rate_fix : '0.00'
      ),
      rate_var_value: new FormControl(
        this.tarifadelivery?.rate_var_value != null? this.tarifadelivery?.rate_var_value : '0.00'
      ),
      rate_var_km: new FormControl(
        this.tarifadelivery?.rate_var_km != null? this.tarifadelivery?.rate_var_km : '0.00'
      ),
      rate_ruler_value: new FormControl(
        this.tarifadelivery?.rate_ruler_value != null? this.tarifadelivery?.rate_ruler_value : '0.00'
      ),
      rate_ruler_km: new FormControl(
        this.tarifadelivery?.rate_ruler_km != null? this.tarifadelivery?.rate_ruler_km : '0.00'
      ),
      rate_outcity_do: new FormControl(
        this.tarifadelivery?.rate_outcity_do != null? this.tarifadelivery?.rate_outcity_do : false
      ),
      rate_outcity_text: new FormControl(
        this.tarifadelivery?.rate_outcity_text != null? this.tarifadelivery?.rate_outcity_text : ''
      )
    });
  }

  ngOnDestroy(): void {
    this.formSubscription.unsubscribe();
  }

  updateDeliveryRate() {
    if(this.tasaDeliveryForm.invalid) { return; }
    this.tarifadelivery = Object.assign({...this.tarifadelivery}, this.tasaDeliveryForm.value);
    this.store.dispatch(actions.updateCommerceDelivery({rate: this.tarifadelivery}));
    this.dialogRef.close();
  }

  changeTarifa() {

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
