import { Component, OnInit, Inject } from '@angular/core';
import { CountryISO } from 'ngx-intl-tel-input';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppStateWithCommerce } from '../../../../app.reducer';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserCompany } from '../../../../shared/models/Company';

@Component({
  selector: 'app-company-user',
  templateUrl: './company-user.component.html',
  styleUrls: ['./company-user.component.css']
})
export class CompanyUserComponent implements OnInit {

  CountryISO = CountryISO;
  formUser: FormGroup;
  public formPhoneDisabled = true;
  public formEmailDisabled = true;

  constructor(
    private store: Store<AppStateWithCommerce>,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CompanyUserComponent>
  ) {
    this.formUser = this.fb.group({
      id: this.fb.control(''),
      first_name: this.fb.control(''),
      last_name: this.fb.control(''),
      email: this.fb.control(''),
      role: this.fb.control('', [Validators.required]),
      cia_id: this.fb.control('', [Validators.required])
    });
  }

  ngOnInit(): void {
    this.store.select('commerce').subscribe( ({company }) => {
      this.formUser.controls['cia_id'].setValue(company.data.id);
    })
    this.js();
  }

  submitUser() {
    console.log(this.formUser.value);
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
