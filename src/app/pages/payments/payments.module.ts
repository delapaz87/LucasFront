import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentsRoutingModule } from './payments-routing.module';
import { PaymentsComponent } from './payments.component';
import { PaymentComponent } from './payment/payment.component';
import { CashPaymentComponent } from './cash-payment/cash-payment.component';
import { SplitPaymentComponent } from './split-payment/split-payment.component';
import { PaymentCompletedComponent } from './payment-completed/payment-completed.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TicketComponent } from '../../shared/shared/ticket/ticket.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { calcCalculator } from './cash-payment/cash.reducer';


@NgModule({
  declarations: [
    PaymentsComponent,
    PaymentComponent,
    CashPaymentComponent,
    SplitPaymentComponent,
    PaymentCompletedComponent,

  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('cash', calcCalculator),
    PaymentsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class PaymentsModule { }
