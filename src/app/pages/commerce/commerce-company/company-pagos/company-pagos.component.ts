import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppStateWithCommerce } from '../../../../app.reducer';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Company, PaymentAccept } from '../../../../shared/models/Company';
import * as actionsCompany from '../../../../theme/layout/admin/store/actions/commerce.actions';
import { Subscription } from 'rxjs';
import { ImagenUploadModalComponent } from '../../../../shared/shared/imagen-upload-modal/imagen-upload-modal.component';
import { OImgCropper, UploadType } from '../../../../shared/models/Auth';

@Component({
  selector: 'app-company-pagos',
  templateUrl: './company-pagos.component.html',
  styleUrls: ['./company-pagos.component.css']
})
export class CompanyPagosComponent implements OnInit, OnDestroy {

  isQR: Boolean = false;
  payment_accept: PaymentAccept[] = [];
  formPagos: FormGroup;
  company: any | Company;
  payment: any = [];

  companySubcription: Subscription | any;
  paymentSubcription: Subscription | any;


  constructor(
    private store: Store<AppStateWithCommerce>,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CompanyPagosComponent>,
    private dialog: MatDialog,
  ) {
    this.formPagos = this.fb.group({
      qr_owner: new FormControl(''),
      qr_phone: new FormControl(''),
      payment_accepted: new FormControl('',[Validators.required]),
    });
  }

  ngOnInit(): void {
    this.paymentSubcription = this.store.select('commerce').subscribe( ({ payment_accept }) => this.payment_accept = payment_accept.data);
    this.companySubcription = this.store.select('commerce').subscribe( ({ company }) => {
      this.company = company.data;

      this.formPagos = this.fb.group({
        qr_owner: new FormControl(this.company.qr_owner),
        qr_phone: new FormControl(this.company.qr_phone),
        payment_accepted: new FormControl('',[Validators.required]),
      });

      if(this.company?.payment_accepted != '' && this.company?.payment_accepted != null) {
        this.payment = this.company?.payment_accepted?.split('|');
        this.formPagos.controls['payment_accepted'].setValue(this.payment.join('|'));
      }

      if(this.payment.find((e:number) => e == 4)) {
        this.isQR = true;
      }
    });
    this.js();
  }

  onChecked(event: any) {

    if(event.target.id == 'QR') {
      this.isQR = !this.isQR;
      this.js();
    }
    if(!event.target.checked) {
      let pos = this.payment.indexOf(event.target.value);
      this.payment.splice(pos, 1);
      this.formPagos.controls['payment_accepted'].setValue(this.payment.join('|'));
      return;
    }
    this.payment.push(event.target.value);
    this.formPagos.controls['payment_accepted'].setValue(this.payment.join('|'));
    return;
  }

  submitPago() {
    this.store.dispatch(actionsCompany.updateCommerce({ company: this.formPagos.value }))
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.companySubcription.unsubscribe();
    this.paymentSubcription.unsubscribe();
  }

  saveQRFile() {
    this.store.dispatch(actionsCompany.updateCommerce({ company: this.formPagos.value }))
    const ImgDialog: MatDialogConfig<OImgCropper> = {
      width: '500px',
      role: 'dialog',
      disableClose: true,
      data: {
        title         : 'Subir imagen QR',
        width         : 100,
        height        : 100,
        croppedHeight : 295,
        croppedWidth  : 295,
        uploadtype    : UploadType.pagoQR
      }
    };
    const dialogRef = this.dialog.open(ImagenUploadModalComponent, ImgDialog);
/*     dialogRef.beforeClosed().subscribe(result => {
      this.ngOnDestroy();
      this.ngOnInit();
    }); */
  }

  close() {
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
