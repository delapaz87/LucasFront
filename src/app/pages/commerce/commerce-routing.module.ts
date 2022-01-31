import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommerceCompanyComponent } from './commerce-company/commerce-company.component';
import { CommerceComponent } from './commerce.component';
import { CommerceStoresComponent } from './commerce-stores/commerce-stores.component';
import { CommerceUsersComponent } from './commerce-users/commerce-users.component';
import { CompanyGuard } from '../../shared/guard/company.guard';
import { StoresEditComponent } from './commerce-stores/stores-edit/stores-edit.component';
import { StoresAddComponent } from './commerce-stores/stores-add/stores-add.component';
import { CommerceCoverageComponent } from './commerce-coverage/commerce-coverage.component';
import { CommerceDriversComponent } from './commerce-drivers/commerce-drivers.component';

const routes: Routes = [{
    path: '',
  component: CommerceComponent,
   children: [
    {
      path: '',
      redirectTo: 'company',
      pathMatch: 'full',
    },
    {
      path: 'company',  component: CommerceCompanyComponent,
    },
    {
      path: 'stores',  component: CommerceStoresComponent, canActivate:[CompanyGuard]
    },
    {
      path: 'stores/add',  component: StoresAddComponent, canActivate:[CompanyGuard]
    },
    {
      path: 'stores/edit/:id',  component: StoresEditComponent, canActivate:[CompanyGuard]
    },
    {
      path: 'coverages',  component: CommerceCoverageComponent, canActivate:[CompanyGuard]
    },
    {
      path: 'drivers',  component: CommerceDriversComponent, canActivate:[CompanyGuard]
    },
    {
      path: 'users',  component: CommerceUsersComponent, canActivate:[CompanyGuard]
    }
   ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommerceRoutingModule { }
