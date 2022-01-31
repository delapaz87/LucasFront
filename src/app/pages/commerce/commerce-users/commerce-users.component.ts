import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserCompany } from '../../../shared/models/Company';
import { AppStateWithCommerce } from '../../../app.reducer';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CompanyUserChangepasswordComponent } from './company-user-changepassword/company-user-changepassword.component';
import { CompanyUserEditComponent } from './company-user-edit/company-user-edit.component';
import { CompanyAssignStoresComponent } from './company-assign-stores/company-assign-stores.component';
import * as actions from '../../../theme/layout/admin/store/actions';
import { CompanyUserComponent } from './company-user/company-user.component';


@Component({
  selector: 'app-commerce-users',
  templateUrl: './commerce-users.component.html',
  styleUrls: ['./commerce-users.component.css']
})
export class CommerceUsersComponent implements OnInit {

  usersCompanys: UserCompany[] = [];

  constructor(
    private store: Store<AppStateWithCommerce>,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.store.dispatch(actions.cargarUsersCompany());
    this.store.select('commerce').subscribe( ({users_companys}) => {
      this.usersCompanys = users_companys.data
    });
  }

  showChangePassword(item: any) {
    const userDialog: MatDialogConfig<UserCompany> = {
      width: '500px',
      role: 'dialog',
      disableClose: true,
      data: item
    }
    this.dialog.open(CompanyUserChangepasswordComponent, userDialog);
  }

  showEditUser(item: any) {
    const userDialog: MatDialogConfig<UserCompany> = {
      width: '500px',
      role: 'dialog',
      disableClose: true,
      data: item
    }
    this.dialog.open(CompanyUserEditComponent, userDialog);
  }

  showAssignStores(item: any) {
    const userDialog: MatDialogConfig<UserCompany> = {
      width: '500px',
      role: 'dialog',
      disableClose: true,
      data: item
    }
    this.dialog.open(CompanyAssignStoresComponent, userDialog);
  }

  showInvitado() {
    const userDialog: MatDialogConfig<UserCompany> = {
      width: '500px',
      role: 'dialog',
      disableClose: true,
      data: null
    }
    this.dialog.open(CompanyUserComponent, userDialog);
  }

}
