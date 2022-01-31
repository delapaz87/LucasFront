import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
