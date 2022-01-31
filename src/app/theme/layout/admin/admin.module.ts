import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared/shared.module';
import { NavegationModule } from './navegation/navegation.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { EffectsArray } from './store/effects';
import * as actions from './store/reducers';


@NgModule({
  declarations: [
    AdminComponent,
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('commerce',  {
      company: actions.commerceReducer,
      company_inscription: actions.companyInscriptionReducer,
      stores: actions.storeReducer,
      users_companys: actions.userCompanyReducer,
      stores_coverage: actions.coverageReducer,
      document_type: actions.typedocumentReducer,
      payment_accept: actions.paymentAcceptReducer,
      tag: actions.tagReducer,
      geocities: actions.citiesReducer,
      geoprovince: actions.provinceReducer,
      geodistrict: actions.districtReducer,
      clients: actions.clientsReducer,
    }),
    EffectsModule.forFeature(EffectsArray),
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NavegationModule,
  ],
  exports: [
  ],
})
export class AdminModule { }
