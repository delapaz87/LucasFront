import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OChangePassword, ODialogData } from 'src/app/shared/models/Auth';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { UsersService } from 'src/app/shared/services/users.service';
import { AuthResetPasswordComponent } from '../auth-reset-password/auth-reset-password.component';
import { AuthOpcionCodeComponent } from '../auth-opcion-code/auth-opcion-code.component';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducer';
import { loginUser } from '../store/actions/auth.actions';
@Component({
  selector: 'app-auth-change-password',
  templateUrl: './auth-change-password.component.html',
  styleUrls: ['./auth-change-password.component.css']
})
export class AuthChangePasswordComponent implements OnInit {

  isloading: boolean = false;
  frmChangePassword: FormGroup;

  constructor(
    private route: Router,
    private store: Store<AppState>,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<AuthChangePasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ODialogData,
    private notifService: NotificationService,
    private userService: UsersService,
    private storageService: StorageService,
  ) {
    this.frmChangePassword = new FormGroup({
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(24),
      ]),
      confirmPassword: new FormControl(null,[
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(24),
      ])
   }, this.mustMatch);
  }

  ngOnInit(): void {

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

      $(".g-input--material").on("click", function (e) {
        $(this).find(".placeholder, input, .main-input").addClass("focus");
        e.stopPropagation();
      });
    });
  }

  mustMatch: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => {
    let pass = group.get('password')?.value;
    let confirmPass = group.get('confirmPassword')?.value
    return pass === confirmPass ? null : { notSame: true }
  }

  changePassword() {
    this.isloading = true;
    switch (this.data.refered) {
          case 'forgotPassword':
              const changePassword: OChangePassword = {
                email: this.data.email,
                password: this.frmChangePassword.controls['password'].value
              };
              this.userService.postChangePasswordWithForgotPassword(this.data.token, changePassword).subscribe(
                result => {
                  this.store.dispatch(loginUser({ login: ({email: changePassword.email, password: changePassword.password})}))
                  this.isloading = false;
                  this.dialogRef.close();
                },
                errors => {
                  this.notifService.showSuccess(errors.error.statusMessage,'',{
                    positionClass: 'toast-bottom-right',
                    progressBar: true
                  })
                  this.isloading = true;
                }
              );
            break;
          default:
            break;
    }
  }

  back() {
    this.dialog.open(AuthOpcionCodeComponent, {
      width: '600px',
      role: 'dialog',
      disableClose: true,
      data: {email: this.data.email, phone: this.data.phone,refered: this.data.refered}
    });
    this.dialogRef.close();
  }

}
