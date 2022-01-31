import { AfterViewInit, Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CompanyPagosComponent } from './company-pagos/company-pagos.component';
import { CompanyConfigStoreComponent } from './company-config-store/company-config-store.component';
import { CompanyDeliveryRateComponent } from './company-delivery-rate/company-delivery-rate.component';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppStateWithCommerce } from '../../../app.reducer';
import * as actions from '../../../theme/layout/admin/store/actions';
import { CompanyLabelsComponent } from './company-labels/company-labels.component';
import { TarifaDelivery, Company, Tag, PaymentAccept, CompanyInscription } from '../../../shared/models/Company';
import { CompanyDeliveryComponent } from './company-delivery/company-delivery.component';
import { NotificationService } from '../../../shared/services/notification.service';
import { Router } from '@angular/router';
import { OImgCropper, UploadType } from '../../../shared/models/Auth';
import { ImagenUploadModalComponent } from '../../../shared/shared/imagen-upload-modal/imagen-upload-modal.component';
import { updateUser } from '../../authentication/store/actions/auth.actions';
import { Subscription, of, timer, switchMap, map } from 'rxjs';
import { CommerceService } from '../../../shared/services/commerce.service';


@Component({
  selector: 'app-commerce-company',
  templateUrl: './commerce-company.component.html',
  styleUrls: ['./commerce-company.component.css'],
})
export class CommerceCompanyComponent implements OnInit, OnDestroy {

  isSave: Boolean = false;
  isLoading: Boolean = true;
  formCompany: FormGroup
  tag_company = [];
  payment = [];
  tag: Tag[] = [];
  payment_accept: PaymentAccept[] = [];
  company_inscription: any;
  typedocuments: any = [];
  tarifadelivery: TarifaDelivery | any;
  company: Company | any;

  companySub: Subscription | undefined;
  companyTagSub: Subscription | undefined;
  companyPaymentSub: Subscription | undefined;
  companyDocTypeSub: Subscription | undefined;

  constructor(
    private route: Router,
    private store: Store<AppStateWithCommerce>,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private notifService: NotificationService,
    private commerceService: CommerceService
  ) {

    this.formCompany =  this.fb.group({
      name: new FormControl('',[Validators.required]),
      legal_name: new FormControl('',[Validators.required]),
      legal_document: new FormControl('', [Validators.required]),
      legal_number: new FormControl('',[Validators.required, this.documentTypeValidator]),
      description: new FormControl(''),
      website: new FormControl(''),
      sac_email: new FormControl(''),
      sac_phone: new FormControl('')
    });
  }
  ngOnDestroy(): void {
    this.companySub?.unsubscribe();
    this.companyTagSub?.unsubscribe();
    this.companyPaymentSub?.unsubscribe();
    this.companyDocTypeSub?.unsubscribe();
  }

   ngOnInit(): void {
    this.store.dispatch(actions.cargarTypeDocument());
    this.store.dispatch(actions.cargarPaymentAccept());
    this.store.dispatch(actions.cargarTag());
    this.store.dispatch(actions.cargarGeoCities());
    this.store.dispatch(actions.cargarCommerce());
    this.store.dispatch(actions.cargarCompanyInscription());

    this.companyTagSub = this.store.select('commerce').subscribe( ({ tag }) => {
      this.tag = tag.data;
      this.isLoading = tag.loading;
    });

    this.companyDocTypeSub = this.store.select('commerce').subscribe( ({ document_type }) => {
      this.typedocuments = document_type.data
      this.isLoading = document_type.loading;
    });

    this.companyPaymentSub = this.store.select('commerce').subscribe( ({ payment_accept }) => this.payment_accept = payment_accept.data);

    this.companySub = this.store.select('commerce').subscribe( ({ company }) =>  {
      this.company = company.data;
      this.isLoading = company.loading;
      this.tarifadelivery = company.data.company_delivery;
      this.tag_company = company.data.company_tag;

      if(this.isSave == true && company.error == null) {
        this.notifService.showSuccess('Se ha guardado con exito','',{
          positionClass: 'toast-bottom-right',
          progressBar: true
        });
        this.isSave = false;
        this.store.dispatch(updateUser({access: {'cia_id': company.data.id}}))
      }
      if(this.isSave == true && company.error != null) {
        this.notifService.showError('Ha ocurrido un error al guardar el registro e intentelo nuevamente. Si el problema perciste comuniquese con sac@tulivery.com','',{
          positionClass: 'toast-bottom-right',
          progressBar: true
        });
        this.isSave = false;
      }

      if (this.company?.name != '' && this.company?.name != null) {
        this.payment = company.data?.payment_accepted?.split('|');
        this.formCompany = this.fb.group({
          name: new FormControl(
            this.company?.name != null? this.company.name : '',
            [Validators.required]
          ),
          legal_name: new FormControl(
            this.company?.legal_name != null? this.company.legal_name.toString() : '',
            [Validators.required]
          ),
          legal_document: new FormControl(
            this.company?.legal_document != null? this.company.legal_document : 'RUC',
            [Validators.required]
          ),
          legal_number: new FormControl(
            this.company?.legal_number != null?  this.company.legal_number : '',
            [Validators.required]
          ),
          description: new FormControl(
            this.company?.description != null? this.company.description : '',
          ),
          website: new FormControl(
            this.company?.website != null? this.company.website : '',
          ),
          sac_email: new FormControl(
            this.company?.sac_email != null? this.company.sac_email : ''
          ),
          sac_phone: new FormControl(
            this.company?.sac_phone != null? this.company.sac_phone : ''
          ),
        });
      } else {
        this.store.select('commerce').subscribe( ({ company_inscription }) => this.company_inscription = company_inscription.data);
        this.formCompany =  this.fb.group({
          name: new FormControl(this.company_inscription.company,[Validators.required]),
          legal_name: new FormControl('',[Validators.required]),
          legal_document: new FormControl('', [Validators.required]),
          legal_number: new FormControl('',[Validators.required]),
          description: new FormControl(''),
          website: new FormControl(''),
          sac_email: new FormControl(''),
          sac_phone: new FormControl('')
        });
      }
      this.js();
    });

  }

  showDigPagos() {
    if(!this.validatorComerce()){
      return;
    }
    this.dialog.open(CompanyPagosComponent, {
      width: '500px',
      role: 'dialog',
      disableClose: true,
    });
  }

  showDigConfigStore() {
    if(!this.validatorComerce()){
      return;
    }
    this.dialog.open(CompanyConfigStoreComponent, {
      width: '500px',
      role: 'dialog',
      disableClose: true,
    });
  }

  showDigEtiquetas() {
    if(!this.validatorComerce()){
      return;
    }
    this.dialog.open(CompanyLabelsComponent, {
      width: '500px',
      role: 'dialog',
      disableClose: true,
    });
  }

  showDigDelivery() {
    if(!this.validatorComerce()){
      return;
    }
    this.dialog.open(CompanyDeliveryComponent, {
      width: '500px',
      role: 'dialog',
      disableClose: true,
    });
  }

  showDigDeliveryRate() {
    if(!this.validatorComerce()){
      return;
    }
    this.dialog.open(CompanyDeliveryRateComponent, {
      width: '500px',
      role: 'dialog',
      disableClose: true,
    });
  }

  uploadLogo() {
    //this.store.dispatch(actionsCompany.updateCommerce({ company: this.formPagos.value }))
    const ImgDialog: MatDialogConfig<OImgCropper> = {
      width: '500px',
      role: 'dialog',
      disableClose: true,
      data: {
        title         : 'Subir imagen del Logo',
        width         : 100,
        height        : 100,
        croppedWidth  : 295,
        croppedHeight : 295,
        uploadtype    : UploadType.logo
      }
    };
    const dialogRef = this.dialog.open(ImagenUploadModalComponent, ImgDialog);
/*     dialogRef.beforeClosed().subscribe(result => {
      this.ngOnDestroy();
      this.ngOnInit();
    }); */
  }

  saveComerce() {
    if(this.formCompany.invalid) { return; }
    this.isSave = true;
    this.store.dispatch(actions.updateCommerce({company: this.formCompany.value}))
    this.store.dispatch(actions.saveCommerce());
  }

  updateCommerce() {
    if (this.formCompany.invalid) { return; }
    this.company = this.formCompany.value;
    this.store.dispatch(actions.updateCommerce({company: this.formCompany.value}))
  }


  validatorComerce(): boolean {
    if(this.formCompany.invalid) {
      this.notifService.showWarning('Rellene los campos marcados con (*) ya que son obligatorios antes de configurar las opciones anteriores','', {
        positionClass: 'toast-bottom-right',
        progressBar: true,
        preventDuplicates: true
      })
      return false;
    }
    this.store.dispatch(actions.updateCommerce({company: this.formCompany.value}))
    return true;
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

  documentTypeValidator(c: AbstractControl) : {[key: string] : any } | null {
    if (c.value === null || c.value.length === 0) {
      return of(null);
    } else {
      return timer(1000).pipe(
        switchMap(() => {
          return this.commerceService.checkRuc(c.value).pipe(
            map(res => {
              //Do what with response
              console.log(res);
              if (!res) {
                return { taken: true };
              }
              return of(null);
            })
          );
        })
      );
    }
  }

}
