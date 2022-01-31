import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OnlineOrdersRoutingModule } from './online-orders-routing.module';
import { OnlineOrdersComponent } from './online-orders.component';
import { NavegationModule } from '../../theme/layout/admin/navegation/navegation.module';
import { SharedModule } from '../../shared/shared/shared.module';
import { MaterialModule } from '../../shared/material/material.module';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { TabOrdersComponent } from './tab-orders/tab-orders.component';


@NgModule({
  declarations: [
    OnlineOrdersComponent,
    TabOrdersComponent
  ],
  imports: [
    CommonModule,
    OnlineOrdersRoutingModule,
    NavegationModule,
    SharedModule,
    MaterialModule,
    NgxIntlTelInputModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSkeletonLoaderModule.forRoot({ animation: 'pulse', loadingText: 'Cargando...' })
  ]
})
export class OnlineOrdersModule { }
