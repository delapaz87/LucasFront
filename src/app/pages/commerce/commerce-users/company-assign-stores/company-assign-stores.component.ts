import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppStateWithCommerce } from '../../../../app.reducer';
import * as modals from '../../../../shared/models/Company';
import { requireCheckboxesToBeCheckedValidator } from '../../../../shared/validators/documents.validators';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserCompany } from '../../../../shared/models/Company';
import { StorageService } from '../../../../shared/services/storage.service';
import { CommerceService } from '../../../../shared/services/commerce.service';
import { NotificationService } from '../../../../shared/services/notification.service';
import * as actions from '../../../../theme/layout/admin/store/actions';


@Component({
  selector: 'app-company-assign-stores',
  templateUrl: './company-assign-stores.component.html',
  styleUrls: ['./company-assign-stores.component.css']
})
export class CompanyAssignStoresComponent implements OnInit {

  company: FormGroup | any;
  stores: modals.Store[] =  [];
  formStore: FormGroup | any;

  constructor(
    private store: Store<AppStateWithCommerce>,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CompanyAssignStoresComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserCompany,
    private storageService: StorageService,
    private commerceServices: CommerceService,
    private notifServices: NotificationService
  ) { }

  ngOnInit(): void {
    this.store.dispatch(actions.cargarStores())
    this.store.select('commerce').subscribe( ({ stores, company}) => {
      this.stores = stores.data;
      this.company = company.data;

      this.formStore = this.fb.group({
        cia_id: this.fb.control(this.company?.id),
        user_id: this.fb.control(this.data.id),
        all_stores: this.fb.control(false),
        stores: this.fb.array([],[requireCheckboxesToBeCheckedValidator()])
      });

      this.stores.forEach( e => {
        this.addCheckStore(e);
      });

    });

  }

  get store_chk(): FormArray {
    return this.formStore.get('stores') as FormArray;
  }

  addCheckStore(store: any){
    let stores: any;
    stores = this.fb.group({
      store_id: this.fb.control(store.id),
      chkStore: this.fb.control(false)
    })
    this.store_chk.push(stores)
  }

  checkAllStore() {
   const x:boolean = this.formStore.controls['all_stores'].value;
    this.store_chk.controls.forEach(e => {
      e.get('chkStore')?.setValue(x)
    });
  }

  checkInput() {
    this.formStore.get('all_stores').setValue(false);
  }

  submitAssign() {
    if(this.formStore.invalid) { return; }
    this.commerceServices.postAssignStore(this.storageService.getSeccionToken(), this.formStore.value).subscribe(
      result => {
        this.notifServices.showSuccess(result.statusMessage,'', {
          positionClass: 'toast-bottom-right',
          progressBar: true,
          preventDuplicates: true
        });
        this.dialogRef.close();
      },
      errors => {
        this.notifServices.showWarning(errors.error.statusMessage,'', {
          positionClass: 'toast-bottom-right',
          progressBar: true,
          preventDuplicates: true
        });
      }
    );
  }

}

