import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OnlineOrdersComponent } from './online-orders.component';

const routes: Routes = [{
  path: '',
  component: OnlineOrdersComponent,
  children: [
    {
      path: '',
      redirectTo: 'orders/online',
      pathMatch: 'full',
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OnlineOrdersRoutingModule { }
