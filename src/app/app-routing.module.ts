import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentsComponent } from './pages/payments/payments.component';
import { AuthGuardGuard } from './shared/guard/auth-guard.guard';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { AuthComponent } from './theme/layout/auth/auth.component';
import { CompanyGuard } from './shared/guard/company.guard';

const routes: Routes = [
   {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'pos',
        pathMatch: 'full',

      },
    ],
    canActivate: [AuthGuardGuard, CompanyGuard]
  },
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      { path: '', loadChildren: () => import('./pages/authentication/authentication.module').then(m => m.AuthenticationModule) },
    ]
  },
  {
    path: 'payments',
    component: PaymentsComponent,
    children: [
      { path: '', loadChildren: () => import('./pages/payments/payments.module').then(m => m.PaymentsModule), canLoad: [AuthGuardGuard], canActivate: [CompanyGuard] },
    ]
  },
  { path: 'commerce', loadChildren: () => import('./pages/commerce/commerce.module').then(m => m.CommerceModule), canLoad: [AuthGuardGuard] },
  { path: 'clients', loadChildren: () => import('./pages/clients/clients.module').then(m => m.ClientsModule), canLoad: [AuthGuardGuard], canActivate: [CompanyGuard] },
  { path: 'orders/online', loadChildren: () => import('./pages/online-orders/online-orders.module').then(m => m.OnlineOrdersModule), canLoad: [AuthGuardGuard], canActivate: [CompanyGuard] },
  { path: 'reports', loadChildren: () => import('./pages/reports/reports.module').then(m => m.ReportsModule), canLoad: [AuthGuardGuard], canActivate: [CompanyGuard] },
  { path: 'receipts/sales', loadChildren: () => import('./pages/receipts-sales/receipts-sales.module').then(m => m.ReceiptsSalesModule), canLoad: [AuthGuardGuard], canActivate: [CompanyGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
