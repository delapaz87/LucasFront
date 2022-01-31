import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReceiptsSalesRoutingModule } from './receipts-sales-routing.module';
import { ReceiptsSalesComponent } from './receipts-sales.component';
import { NavegationModule } from '../../theme/layout/admin/navegation/navegation.module';
import { SharedModule } from '../../shared/shared/shared.module';
import { MaterialModule } from '../../shared/material/material.module';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';


@NgModule({
  declarations: [
    ReceiptsSalesComponent
  ],
  imports: [
    CommonModule,
    ReceiptsSalesRoutingModule,
    NavegationModule,
    SharedModule,
    MaterialModule,
    NgxIntlTelInputModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSkeletonLoaderModule.forRoot({ animation: 'pulse', loadingText: 'Cargando...' })
  ]
})
export class ReceiptsSalesModule { }
