import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MatDialogRef, MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { AppStateWithCommerce } from '../../../../app.reducer';
import { Company } from '../../../../shared/models/Company';
import { OImgCropper, UploadType } from '../../../../shared/models/Auth';
import { ImagenUploadModalComponent } from '../../../../shared/shared/imagen-upload-modal/imagen-upload-modal.component';
import * as actions from '../../../../theme/layout/admin/store/actions';

@Component({
  selector: 'app-company-config-store',
  templateUrl: './company-config-store.component.html',
  styleUrls: ['./company-config-store.component.css']
})
export class CompanyConfigStoreComponent implements OnInit {

  favoriteSeason: string | any;
  formStore: FormGroup;
  web_template: number | any;
  company: Company | any;

  constructor(
    private store: Store<AppStateWithCommerce>,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CompanyConfigStoreComponent>,
    private dialog: MatDialog,
  ) {
    this.formStore = this.fb.group({
      activate_webstore: new FormControl(false),
      web_url: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(25),
        Validators.pattern('[A-Za-z0-9]*')
      ]),
      web_template: new FormControl('3', [Validators.required]),
    });
    this.web_template = 3;
  }

  ngOnInit(): void {
    this.store.select('commerce').subscribe( ({ company }) => this.company = company.data);
    this.formStore = this.fb.group({
      activate_webstore: new FormControl(
        this.company?.activate_webstore != null || this.company?.activate_webstore === 1? this.company?.activate_webstore : false
      ),
      web_url: new FormControl(
        this.company?.web_url != null? this.company?.web_url : '',[
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(25),
          Validators.pattern('[A-Za-z0-9]*')
        ]),
      web_template: new FormControl(
        this.company?.web_template != null? this.company?.web_template : 3,
        [Validators.required]
      ),
    });

    this.selectTemplate(this.company?.web_template != null? this.company?.web_template : 3);

    this.js();
  }

  selectTemplate(id:number) {
    this.formStore.get('web_template')?.setValue(id);
    this.web_template = id;
  }

  uploadBannerWeb() {
    //this.store.dispatch(actionsCompany.updateCommerce({ company: this.formPagos.value }))
    const ImgDialog: MatDialogConfig<OImgCropper> = {
      width: '500px',
      role: 'dialog',
      disableClose: true,
      data: {
        title         : 'Subir imagen Banner Web',
        width         : 300,
        height        : 100,
        croppedWidth  : 550,
        croppedHeight : 200,
        uploadtype    : UploadType.bannerWeb
      }
    };
    const dialogRef = this.dialog.open(ImagenUploadModalComponent, ImgDialog);
/*     dialogRef.beforeClosed().subscribe(result => {
      this.ngOnDestroy();
      this.ngOnInit();
    }); */
  }

  uploadBannerApp() {
    //this.store.dispatch(actionsCompany.updateCommerce({ company: this.formPagos.value }))
    const ImgDialog: MatDialogConfig<OImgCropper> = {
      width: '500px',
      role: 'dialog',
      disableClose: true,
      data: {
        title         : 'Subir imagen Banner App',
        width         : 300,
        height        : 150,
        croppedWidth  : 550,
        croppedHeight : 300,
        uploadtype    : UploadType.bannerApp
      }
    };
    const dialogRef = this.dialog.open(ImagenUploadModalComponent, ImgDialog);
/*     dialogRef.beforeClosed().subscribe(result => {
      this.ngOnDestroy();
      this.ngOnInit();
    }); */
  }

  submitStore() {
    if(this.formStore.invalid) { return; }
    this.store.dispatch(actions.updateCommerce({company: this.formStore.value}));
    this.dialogRef.close();
  }

  js(){
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
