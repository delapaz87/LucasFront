import { Component, OnInit, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppStateWithCommerce } from '../../../../app.reducer';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserCompany } from '../../../../shared/models/Company';
import { CountryISO } from 'ngx-intl-tel-input';

@Component({
  selector: 'app-company-user-edit',
  templateUrl: './company-user-edit.component.html',
  styleUrls: ['./company-user-edit.component.css']
})
export class CompanyUserEditComponent implements OnInit {

  CountryISO = CountryISO;
  formUser: FormGroup;
  public formPhoneDisabled = true;
  public formEmailDisabled = true;

  constructor(
    private store: Store<AppStateWithCommerce>,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CompanyUserEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserCompany,
  ) {
    this.formUser = this.fb.group({
      id: this.fb.control(data.id),
      first_name: this.fb.control(data.first_name),
      last_name: this.fb.control(data.last_name),
      email: this.fb.control({value: data.email, disabled: this.formEmailDisabled}),
      phone: this.fb.control({value: data.phone, disabled: this.formPhoneDisabled}),
      role: this.fb.control(data.role, [Validators.required])
    });
  }

  ngOnInit(): void {
    this.js();
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

  statusEmail() {
    this.formUser.controls['email'].disable();
  }
  statusPhone() {
    this.formUser.controls['phone'].setValue({value: this.formUser.controls['phone'].value, disabled: !this.formUser.controls['phone'].disabled})
  }

  // Enable/disable form control
  toggleFormPhone() {
    this.formPhoneDisabled = !this.formPhoneDisabled;
    const state = this.formPhoneDisabled ? 'disable' : 'enable';
    this.formUser.controls['phone'][state](); // disables/enables each form control based on 'this.formDisabled'
  }

  // Enable/disable form control
  toggleFormEmail() {
    this.formEmailDisabled = !this.formEmailDisabled;
    const state = this.formEmailDisabled ? 'disable' : 'enable';
    this.formUser.controls['email'][state](); // disables/enables each form control based on 'this.formDisabled'
  }

  submitUser() {
    console.log(this.formUser.value);
    this.dialogRef.close();
  }

}
