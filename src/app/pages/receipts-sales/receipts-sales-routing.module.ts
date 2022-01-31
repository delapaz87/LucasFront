import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReceiptsSalesComponent } from './receipts-sales.component';

const routes: Routes = [{
  path: '',
  component: ReceiptsSalesComponent,
  children: [
    {
      path: '',
      redirectTo: 'receipts/sales',
      pathMatch: 'full',
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReceiptsSalesRoutingModule { }
