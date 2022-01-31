import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { CropperSettings, ImageCropperComponent } from 'ngx-img-cropper';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { OImgCropper, OAuth } from '../../models/Auth';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppStateWithCommerce } from '../../../app.reducer';
import { CommerceService } from '../../services/commerce.service';
import { AlertModalComponent } from '../alert-modal/alert-modal.component';
import * as actions from '../../../theme/layout/admin/store/actions';

@Component({
  selector: 'app-imagen-upload-modal',
  templateUrl: './imagen-upload-modal.component.html',
  styleUrls: ['./imagen-upload-modal.component.css']
})
export class ImagenUploadModalComponent implements OnInit {

  seccion: OAuth | any;
  img: any;
  cropperSettings: CropperSettings;
  formImage: FormGroup | any;
  @ViewChild('cropper') cropper:ImageCropperComponent | any;

  constructor(
    private store: Store<AppStateWithCommerce>,
    @Inject(MAT_DIALOG_DATA) public data: OImgCropper,
    private dialogRef: MatDialogRef<ImagenUploadModalComponent>,
    private fb: FormBuilder,
    private commerceService: CommerceService,
    private dialog: MatDialog,
  ) {
    this.store.select('auth').subscribe( ({access}) => this.seccion = access);
    this.formImage = this.fb.group({
      upload: new FormControl('',[Validators.required])
    });

    this.cropperSettings = new CropperSettings();
    this.cropperSettings.noFileInput = true;
    this.cropperSettings.width = this.data.width;
    this.cropperSettings.height = this.data.height;
    this.cropperSettings.croppedWidth = this.data.croppedWidth;
    this.cropperSettings.croppedHeight = this.data.croppedHeight;
    this.cropperSettings.canvasWidth = 450;
    this.cropperSettings.canvasHeight = 300;
    this.img = {};
   }

  ngOnInit(): void {
  }

  fileChangeListener($event: any) {
    var image:any = new Image();
    var file:File = $event.target.files[0];
    var myReader:FileReader = new FileReader();
    var that = this;
    myReader.onloadend = function (loadEvent:any) {
        image.src = loadEvent.target.result;
        that.cropper.setImage(image);
    };

    myReader.readAsDataURL(file);
  }

  changeImg() {
    this.formImage.controls['upload'].setValue(this.img.image);
  }

  saveImg() {
      if(this.formImage.invalid) { return; }
      let company: any
      this.commerceService.uploadImg(this.seccion,{ 'upload': this.formImage.controls['upload'].value}).subscribe(
        data => {
          console.log(data.result.url);
            switch (this.data.uploadtype) {
              case 0:
                company = {
                  'logo': data.result.url
                };
                break;
              case 1:
                company = {
                  'qr_account': data.result.url
                };
                break;
              case 2:
                company = {
                  'banner_web': data.result.url
                };
                break;
              case 3:
                company = {
                  'banner_app': data.result.url
                };
                break;
          }
          this.store.dispatch(actions.updateCommerce({company: company}));
          this.dialogRef.close();
        },
        errors => {
          this.dialog.open(AlertModalComponent, {
            width: '500px',
            role: 'dialog',
            disableClose: false,
            data: {title: '', message: errors.error.statusMessage}
          });
        })

  }

  close() {
    this.dialogRef.close();
  }

}
