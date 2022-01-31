import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ODialogData } from 'src/app/shared/models/Auth';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { UsersService } from 'src/app/shared/services/users.service';
import { AuthChangePasswordComponent } from '../auth-change-password/auth-change-password.component';
import { AuthOpcionCodeComponent } from '../auth-opcion-code/auth-opcion-code.component';
import { AuthSignupComponent } from '../auth-signup/auth-signup.component';
import { AlertModalComponent } from '../../../shared/shared/alert-modal/alert-modal.component';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { loginUser } from '../store/actions/auth.actions';

@Component({
  selector: 'app-auth-smsvalidate-code',
  templateUrl: './auth-validate-code.component.html',
  styleUrls: ['./auth-validate-code.component.css']
})
export class AuthvalidateCodeComponent implements OnInit {

  isloading: boolean = false;

  constructor(
    private store: Store<AppState>,
    private cdRef: ChangeDetectorRef,
    private userService: UsersService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<AuthvalidateCodeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ODialogData,
    private notifService: NotificationService
  ) {

   }

  ngOnInit(): void {

  }

    // this called every time when user changed the code
    onCodeChanged(code: string) {
    }

    // this called only if user entered full code
    onCodeCompleted(code: string) {
      this.data.code = code;
      this.isloading = true;
      this.userService.postValidateCode(this.data).subscribe(
        result => {
          switch (this.data.refered) {
            case "registerCompany":
                this.userService.postRegisterCompany(this.data.data).subscribe(
                  result => {
                    this.store.dispatch(loginUser({ login: ({email: this.data.data.email, password: this.data.data.password})}))
                    this.isloading = false;
                    this.dialogRef.close();
                  },
                  errors => {
                    this.dialog.open(AlertModalComponent, {
                      width: '500px',
                      role: 'dialog',
                      disableClose: false,
                      data: {title: '', message: errors.error.statusMessage}
                    });
                    this.isloading = false;
                    return this.dialogRef.close()
                  }
                )
              break;
            case "forgotPassword":
              this.dialog.open(AuthChangePasswordComponent, {
                width: '400px',
                role: 'dialog',
                disableClose: true,
                data: {token: this.data.token, email: this.data.email, refered: this.data.refered}
              });
              this.isloading = false;
              this.dialogRef.close()
              break;
            default:
              this.dialog.open(AuthChangePasswordComponent, {
                width: '400px',
                role: 'dialog',
                disableClose: true,
                data: {token: this.data.token, email: this.data.email, refered: this.data.refered}
              });
              this.isloading = false;
              this.dialogRef.close()
              break;
        }
        },
        errors => {
          this.dialog.open(AlertModalComponent, {
            width: '500px',
            role: 'dialog',
            disableClose: false,
            data: {title: '', message: errors.error.statusMessage}
          });
          this.isloading = false;
          return;
        }
      );
    }

    back() {
      switch(this.data.refered) {
        case 'registerCompany':
            const dialogRef = this.dialog.open(AuthSignupComponent, {
              width: '450px',
              role: 'dialog',
              disableClose: false
            });
           return this.dialogRef.close();
          break;
        case 'forgotPassword':
          this.dialog.open(AuthOpcionCodeComponent, {
            width: '600px',
            role: 'dialog',
            disableClose: true,
            data: {email: this.data.email, phone: this.data.phone, refered: this.data.refered}
          });
          return this.dialogRef.close();
          break;
        default:
          this.dialog.open(AuthOpcionCodeComponent, {
            width: '600px',
            role: 'dialog',
            disableClose: true,
            data: {email: this.data.email, phone: this.data.phone, refered: this.data.refered}
          });
          return this.dialogRef.close();
          break;
      }
    }

}
