import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CashPaymentComponent } from './cash-payment/cash-payment.component';
import { PaymentCompletedComponent } from './payment-completed/payment-completed.component';
import { PaymentComponent } from './payment/payment.component';
import { SplitPaymentComponent } from './split-payment/split-payment.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'payment',
    pathMatch: 'full'
  },
  { path: 'payment', component: PaymentComponent },
  { path: 'cash-payment', component: CashPaymentComponent },
  { path: 'split-payment', component: SplitPaymentComponent },
  { path: 'payment-completed', component: PaymentCompletedComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentsRoutingModule { }
