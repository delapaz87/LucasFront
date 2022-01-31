import { Component, OnInit, Inject } from '@angular/core';
import { UserCompany } from '../../../../shared/models/Company';
import { AppStateWithCommerce } from '../../../../app.reducer';
import { FormBuilder, FormGroup, ValidatorFn, AbstractControl, ValidationErrors, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { OAuth } from '../../../../shared/models/Auth';
import { CommerceService } from '../../../../shared/services/commerce.service';
import { NotificationService } from '../../../../shared/services/notification.service';
import * as actions from '../../../../theme/layout/admin/store/actions';

@Component({
  selector: 'app-company-user-changepassword',
  templateUrl: './company-user-changepassword.component.html',
  styleUrls: ['./company-user-changepassword.component.css']
})
export class CompanyUserChangepasswordComponent implements OnInit {

  seccion: OAuth | any;
  formPassword: FormGroup;
  hide = true;

  constructor(
    private store: Store<AppStateWithCommerce>,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CompanyUserChangepasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserCompany,
    private commerceServices: CommerceService,
    private notifServices: NotificationService
  ) {
    this.formPassword = this.fb.group({
        user_id: this.fb.control(data.id),
        email: this.fb.control(data.email),
        password: this.fb.control('',[
          Validators.required,
          Validators.minLength(8)
        ]),
        confirmPassword: this.fb.control('',[
          Validators.required,
          Validators.minLength(8)
        ]),
    }, { validators: this.checkPasswords })
  }

  ngOnInit(): void {
    this.store.select('auth').subscribe( ({access}) => this.seccion = access);
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

  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => {
    let pass = group.get('password')?.value;
    let confirmPass = group.get('confirmPassword')?.value
    return pass === confirmPass ? null : { notSame: true }
  }

  submitPassword() {
    if(this.formPassword.invalid) { return }
    this.commerceServices.postUsersCompany(this.seccion, this.formPassword.value).subscribe(
      result => {
        if(result.isSucess) {
          this.notifServices.showSuccess(result.statusMessage,'', {
            positionClass: 'toast-bottom-right',
            progressBar: true,
            preventDuplicates: true
          });
          this.store.dispatch(actions.cargarUsersCompany())
          this.dialogRef.close();
        }
      },
      error => {
        this.notifServices.showWarning(error.error.statusMessage,'', {
          positionClass: 'toast-bottom-right',
          progressBar: true,
          preventDuplicates: true
        });
      }
    );
  }

}


