import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsComponent } from './clients.component';
import { NavegationModule } from '../../theme/layout/admin/navegation/navegation.module';
import { SharedModule } from '../../shared/shared/shared.module';
import { MaterialModule } from '../../shared/material/material.module';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientsAddComponent } from './clients-add/clients-add.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ClientsHistorysComponent } from './clients-historys/clients-historys.component';
import { ClientsEditComponent } from './clients-edit/clients-edit.component';


@NgModule({
  declarations: [
    ClientsComponent,
    ClientsAddComponent,
    ClientsHistorysComponent,
    ClientsEditComponent
  ],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    NavegationModule,
    SharedModule,
    MaterialModule,
    NgxIntlTelInputModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSkeletonLoaderModule.forRoot({ animation: 'pulse', loadingText: 'Cargando...' })
  ]
})
export class ClientsModule { }
