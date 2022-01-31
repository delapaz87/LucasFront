import { ChangeDetectorRef, Component, Inject, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ODialogData } from 'src/app/shared/models/Auth';
import { HideReferralPipe } from 'src/app/shared/pipe/hide-referral.pipe';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { UsersService } from 'src/app/shared/services/users.service';
import { AuthResetPasswordComponent } from '../auth-reset-password/auth-reset-password.component';
import { AuthvalidateCodeComponent } from '../auth-validate-code/auth-validate-code.component';

@Component({
  selector: 'app-auth-opcion-code',
  templateUrl: './auth-opcion-code.component.html',
  styleUrls: ['./auth-opcion-code.component.css'],
})
export class AuthOpcionCodeComponent implements OnInit {

  isloading: boolean = false;
  formOption: FormGroup;

  constructor(
    private cdRef: ChangeDetectorRef,
    private userService: UsersService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<AuthOpcionCodeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ODialogData,
    private notifService: NotificationService,
    private _location: Location,
  ) {
    this.formOption = new FormGroup({
       radioOption: new FormControl('',[Validators.required])
    });
  }

  ngOnInit(): void {

  }

  getOpcion(opcion: any) {
    this.isloading = true;
    switch (opcion) {
      case 'email':
        switch(this.data.refered) {
          case 'registerCompany':
            this.userService.postGenerateCodeforMail(this.data).subscribe(
              result => {
                this.dialog.open(AuthvalidateCodeComponent, {
                  width: '400px',
                  role: 'dialog',
                  disableClose: true,
                  data: {token: result.result.token, email: this.data.email, data: this.data.data ,refered: this.data.refered}
                });
                this.dialogRef.close();
                this.isloading = true;
              },
              errors => {
                this.notifService.showWarning(errors.error.statusMessage,'',{
                  positionClass: 'toast-bottom-right',
                  progressBar: true
                })
                this.isloading = true;
                this.dialogRef.close();
              }
            );
            break;
            case 'forgotPassword':
              this.userService.postForgotPassword(this.data).subscribe(
                result => {
                  this.dialog.open(AuthvalidateCodeComponent, {
                    width: '400px',
                    role: 'dialog',
                    disableClose: true,
                    data: {token: result.result.token, email: this.data.email, data: this.data.data ,refered: this.data.refered}
                  });
                  this.dialogRef.close();
                  this.isloading = true;
                },
                errors => {
                  this.notifService.showWarning(errors.error.statusMessage,'',{
                    positionClass: 'toast-bottom-right',
                    progressBar: true
                  })
                  this.isloading = true;
                  this.dialogRef.close();
                }
              );
              break;
            default:
              this.userService.postForgotPassword(this.data).subscribe(
                result => {
                  this.dialog.open(AuthvalidateCodeComponent, {
                    width: '400px',
                    role: 'dialog',
                    disableClose: true,
                    data: {token: result.result.token, email: this.data.email, data: this.data.data ,refered: this.data.refered}
                  });
                  this.dialogRef.close();
                  this.isloading = true;
                },
                errors => {
                  this.notifService.showWarning(errors.error.statusMessage,'',{
                    positionClass: 'toast-bottom-right',
                    progressBar: true
                  })
                  this.isloading = true;
                  this.dialogRef.close();
                }
              );
              break;
        }
        break;
      case 'sms':
        this.isloading = true;
        break;
      default:
        this.isloading = true;
        break;
    }
  }

  back() {
    this.dialog.open(AuthResetPasswordComponent, {
      width: '400px',
      role: 'dialog',
      disableClose: true,
      data: {email: this.data.email, phone: this.data.phone,refered: this.data.refered}
    });
    this.dialogRef.close();
  }

}
