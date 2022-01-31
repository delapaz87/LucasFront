import { ChangeDetectorRef, Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ODialogData } from 'src/app/shared/models/Auth';
import { AuthOpcionCodeComponent } from '../auth-opcion-code/auth-opcion-code.component';
import { AuthvalidateCodeComponent } from '../auth-validate-code/auth-validate-code.component';
import { UsersService } from '../../../shared/services/users.service';
import { NotificationService } from '../../../shared/services/notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './auth-reset-password.component.html',
  styleUrls: ['./auth-reset-password.component.css']
})
export class AuthResetPasswordComponent implements OnInit {

  isloading: boolean = false;
  formRecovery: FormGroup;

  @Inject(MAT_DIALOG_DATA) public data: ODialogData = {
    data: '',
    email: '',
    phone: '',
    code: '',
    token: '',
    refered: '',
  }

  constructor(
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<AuthResetPasswordComponent>,
    private userService: UsersService,
    private notifService: NotificationService,
  ) {
    this.formRecovery = new FormGroup({
      email: new FormControl('',[Validators.required, Validators.email])
    });
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

  submitRecovery() {
    this.isloading = true;
    this.userService.getUserByEmail(this.formRecovery.controls['email'].value).subscribe(
      result => {
        if(result.statusCode === 200 || result.statusCode === 201) {
          this.dialog.open(AuthOpcionCodeComponent, {
            width: '600px',
            role: 'dialog',
            disableClose: true,
            data: {email: result.result.email, phone: result.result.phone, refered: 'forgotPassword'}
          });
          this.isloading = false;
          return this.dialogRef.close();
        }
        this.notifService.showInfo(result.statusMessage,'',{
          positionClass: 'toast-bottom-right',
          progressBar: true
        });
        this.isloading = false;
        return;
      },
      errors => {
        this.notifService.showWarning(errors.error.statusMessage,'',{
          positionClass: 'toast-bottom-right',
          progressBar: true
        })
        this.isloading = false;
        return;
      }
    );
  }

}
