import { ChangeDetectorRef, Component, OnInit, Output, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OnExecuteData, ReCaptchaV3Service } from 'ng-recaptcha';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { UsersService } from 'src/app/shared/services/users.service';
import { AuthResetPasswordComponent } from '../auth-reset-password/auth-reset-password.component';
import { AuthSignupComponent } from '../auth-signup/auth-signup.component';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducer';
import { Subscription } from 'rxjs';
import * as ui from '../../../shared/ui.actions';
import * as actions from '../store/actions';
import { AlertModalComponent } from '../../../shared/shared/alert-modal/alert-modal.component';


@Component({
  selector: 'app-auth-signin',
  templateUrl: './auth-signin.component.html',
  styleUrls: ['./auth-signin.component.css'],
})
export class AuthSigninComponent implements OnInit, OnDestroy {

  isloading: boolean = false;
  loginSubcription: Subscription | any;
  recapchaSubcription: Subscription | any;

  formSigin = new FormGroup({
    email: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required]),
    recaptchaReactive: new FormControl(null, Validators.required)
  });

  constructor(
    private route: Router,
    private store: Store<AppState>,
    private dialog: MatDialog,
    private storageService: StorageService,
    private notifService: NotificationService,
  ) {

  }

  ngOnInit(): void {

    this.loginSubcription = this.store.select('auth').subscribe( data => {
      this.isloading = data.loading
      if (data.access != null) {
        this.storageService.setCurrentSession(data.access);
        this.notifService.showSuccess('Inicio de sesión','Exitos', {
          positionClass: 'toast-bottom-right',
          progressBar: true,
          preventDuplicates: true
        })
        this.route.navigateByUrl('/');
      };
      if(data.error != null) {

        this.dialog.open(AlertModalComponent, {
          width: '500px',
          role: 'dialog',
          disableClose: false,
          data: {title: '', message: data.error.message}
        });
      }
    });

    this.js();
  }

  ngOnDestroy() {
    this.loginSubcription.unsubscribe();
  }

  openRecoveryPassword() {
    this.dialog.open(AuthResetPasswordComponent, {
      width: '400px',
      role: 'dialog',
      disableClose: true
    });
  }

  openRegister() {
    const dialogRef = this.dialog.open(AuthSignupComponent, {
      width: '500px',
      role: 'dialog',
      disableClose: false
    });
  }

  loginSignin() {
    this.store.dispatch(actions.loginUser({ login: this.formSigin.value}));
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
         } else {
           $(this).find(".placeholder, input, .main-input").addClass("focus");
         }
       });
     });

     $(".g-input--material").on({
       click: function(e) {
         $(this).find(".placeholder, input, .main-input").addClass("focus");
         e.stopPropagation();
       },
     });

     //$(this).find(".placeholder, input, .main-input").addClass("focus");
   });
  }

  public addTokenLog(message: string, token: string | null) {

  }

}
