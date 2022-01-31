import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsComponent } from './clients.component';
import { ClientsAddComponent } from './clients-add/clients-add.component';
import { ClientsHistorysComponent } from './clients-historys/clients-historys.component';

const routes: Routes = [{
  path: '',
  component: ClientsComponent,
  children: [
    {
      path: '',
      redirectTo: 'clients',
      pathMatch: 'full',
    },
    {
      path: 'history',  component: ClientsHistorysComponent,
    },
    {
      path: 'add',  component: ClientsAddComponent,
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule { }
