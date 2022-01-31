import { ChangeDetectorRef, Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UsersService } from '../../../shared/services/users.service';
import { NotificationService } from '../../../shared/services/notification.service';
import { AuthvalidateCodeComponent } from '../auth-validate-code/auth-validate-code.component';
import Swal from 'sweetalert2'
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducer';
import { Subscription } from 'rxjs';
import * as ui from '../../../shared/ui.actions';
import { AlertModalComponent } from '../../../shared/shared/alert-modal/alert-modal.component';
import { loginUser } from '../store/actions/auth.actions';
import { CountryISO } from 'ngx-intl-tel-input';
import { AuthChangePasswordComponent } from '../auth-change-password/auth-change-password.component';

@Component({
  selector: 'app-auth-signup',
  templateUrl: './auth-signup.component.html',
  styleUrls: ['./auth-signup.component.css']
})
export class AuthSignupComponent implements OnInit, OnDestroy {

  CountryISO = CountryISO;
  isloadingSubcription: Subscription | any;
  isloading: boolean = false;
  formSignup: FormGroup;

  @ViewChild('tel') tel: ElementRef | any;

  constructor(
    private store: Store<AppState>,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<AuthSignupComponent>,
    private userService: UsersService,
  ) {
    this.formSignup = new FormGroup({
      name: new FormControl(null, [
        Validators.required
      ]),
      last_name: new FormControl(null, [
        Validators.required
      ]),
      store_name: new FormControl(null, [
        Validators.required
      ]),
      phone: new FormControl(null),
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(24),
      ]),
      opt_register: new FormControl(2),
      privacityPolicy: new FormControl(false,[Validators.requiredTrue])
    });
  }

  ngOnInit(): void {

    this.isloadingSubcription = this.store.select('ui').subscribe( state => this.isloading = state.isLoading);

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
     })

  }

  ngOnDestroy(): void {
    this.isloadingSubcription.unsubscribe();
  }

  public getError(controlName: string): string {
    let error = '';
    const control = this.formSignup.get(controlName);
    if (control?.touched && control?.errors != null) {
      error = JSON.stringify(control.errors);
    }
    return error;
  }

  submitRegister() {
    this.store.dispatch(ui.isLoading());
    this.userService.getUserCompanyByEmail(this.formSignup.controls['email'].value).subscribe(
      result =>{
          if( result.statusCode === 201) {
            this.userService.postGenerateCodeforMail(this.formSignup.value).subscribe(
              result => {
                this.dialog.open(AuthvalidateCodeComponent, {
                  width: '400px',
                  role: 'dialog',
                  disableClose: true,
                  data: {token: result.result.token, email: this.formSignup.controls['email'].value, data: this.formSignup.value ,refered: 'registerCompany'}
                });
                this.store.dispatch(ui.stopLoading());
               return this.dialogRef.close();
              },
              errors => {
/*                 this.notifService.showWarning(errors.error.statusMessage,'',{
                  positionClass: 'toast-bottom-right',
                  progressBar: true
                }) */

                this.dialog.open(AlertModalComponent, {
                  width: '500px',
                  role: 'dialog',
                  disableClose: false,
                  data: {title: '', message: errors.error.statusMessage}
                });

                this.store.dispatch(ui.stopLoading());
                return this.dialogRef.close();
              }
            );
            return;
          }
          this.userService.postRegisterCompany(this.formSignup.value).subscribe(
            result => {
              this.store.dispatch(loginUser({ login: ({email: this.formSignup.controls['email'].value, password: this.formSignup.controls['password'].value})}))
              this.store.dispatch(ui.stopLoading());
              return  this.dialogRef.close();
            },
            errors => {
              if(errors?.error?.statusCode == '401') {
                this.dialog.open(AuthChangePasswordComponent, {
                  width: '400px',
                  role: 'dialog',
                  disableClose: true,
                  data: {token: '', email: this.formSignup.controls['email'].value, refered: 'forgotPassword'}
                });
                return this.dialogRef.close();
              }
              this.dialog.open(AlertModalComponent, {
                width: '500px',
                role: 'dialog',
                disableClose: false,
                data: {title: '', message: errors.error.statusMessage}
              });
              this.store.dispatch(ui.stopLoading());
            });
      },
      errors =>{
        if (errors.error.statusCode === 401) {
            this.dialog.open(AlertModalComponent, {
              width: '500px',
              role: 'dialog',
              disableClose: false,
              data: {title: '', message: errors.error.statusMessage}
            });
            return this.store.dispatch(ui.stopLoading());
        }
        this.dialog.open(AlertModalComponent, {
          width: '500px',
          role: 'dialog',
          disableClose: false,
          data: {title: '', message: errors.error.statusMessage}
        });
        return this.store.dispatch(ui.stopLoading());
      }
    );

  }

}
