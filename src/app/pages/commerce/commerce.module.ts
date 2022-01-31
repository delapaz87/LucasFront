import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommerceRoutingModule } from './commerce-routing.module';
import { CommerceComponent } from './commerce.component';
import { SharedModule } from '../../shared/shared/shared.module';
import { NavegationModule } from '../../theme/layout/admin/navegation/navegation.module';
import { CommerceSidebarComponent } from './commerce-sidebar/commerce-sidebar.component';
import { CommerceSidebarItemComponent } from './commerce-sidebar/commerce-sidebar-item/commerce-sidebar-item.component';
import { CommerceSidebarGroupComponent } from './commerce-sidebar/commerce-sidebar-group/commerce-sidebar-group.component';
import { CommerceSidebarItem } from './commerce-sidebar/commerce-sidebar';
import { CommerceCompanyComponent } from './commerce-company/commerce-company.component';
import { CommerceStoresComponent } from './commerce-stores/commerce-stores.component';
import { MaterialModule } from '../../shared/material/material.module';
import { CommerceUsersComponent } from './commerce-users/commerce-users.component';
import { CompanyPagosComponent } from './commerce-company/company-pagos/company-pagos.component';
import { CompanyConfigStoreComponent } from './commerce-company/company-config-store/company-config-store.component';
import { CompanyDeliveryRateComponent } from './commerce-company/company-delivery-rate/company-delivery-rate.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CompanyLabelsComponent } from './commerce-company/company-labels/company-labels.component';
import { CompanyDeliveryComponent } from './commerce-company/company-delivery/company-delivery.component';
import { INgxSelectOptions, NgxSelectModule } from 'ngx-select-ex';
import { CustomPipeModule } from '../../shared/pipe/custom-pipe.module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { StoresAddComponent } from './commerce-stores/stores-add/stores-add.component';
import { StoresEditComponent } from './commerce-stores/stores-edit/stores-edit.component';
import { CommerceCoverageComponent } from './commerce-coverage/commerce-coverage.component';
import { CommerceDriversComponent } from './commerce-drivers/commerce-drivers.component';
import { CoverageStoreComponent } from './commerce-coverage/coverage-store/coverage-store.component';
import { CoverageRedZoneComponent } from './commerce-coverage/coverage-red-zone/coverage-red-zone.component';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { ModalHoursComponent } from './commerce-stores/modal-hours/modal-hours.component';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { CompanyUserChangepasswordComponent } from './commerce-users/company-user-changepassword/company-user-changepassword.component';
import { CompanyUserEditComponent } from './commerce-users/company-user-edit/company-user-edit.component';
import { CompanyAssignStoresComponent } from './commerce-users/company-assign-stores/company-assign-stores.component';
import { CompanyUserComponent } from './commerce-users/company-user/company-user.component';

const CustomSelectOptions: INgxSelectOptions = { // Check the interface for more options
  optionValueField: 'id',
  optionTextField: 'title'
};

@NgModule({
  declarations: [
    CommerceComponent,
    CommerceSidebarComponent,
    CommerceSidebarItemComponent,
    CommerceSidebarGroupComponent,
    CommerceCompanyComponent,
    CommerceStoresComponent,
    CommerceUsersComponent,
    CompanyPagosComponent,
    CompanyConfigStoreComponent,
    CompanyDeliveryRateComponent,
    CompanyLabelsComponent,
    CompanyDeliveryComponent,
    StoresAddComponent,
    StoresEditComponent,
    CommerceCoverageComponent,
    CommerceDriversComponent,
    CoverageStoreComponent,
    CoverageRedZoneComponent,
    ModalHoursComponent,
    CompanyUserChangepasswordComponent,
    CompanyUserEditComponent,
    CompanyAssignStoresComponent,
    CompanyUserComponent,
  ],
  imports: [
    CommonModule,
    CustomPipeModule,
    NavegationModule,
    CommerceRoutingModule,
    SharedModule,
    MaterialModule,
    NgxIntlTelInputModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSelectModule,
    GooglePlaceModule,
    NgxSkeletonLoaderModule.forRoot({ animation: 'pulse', loadingText: 'Cargando...' })
  ],
  providers:[
    CommerceSidebarItem,
  ]
})
export class CommerceModule { }
