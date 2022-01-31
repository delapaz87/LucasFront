import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material/material.module';
import { AuthComponent } from './theme/layout/auth/auth.component';
import { AdminModule } from './theme/layout/admin/admin.module';
import { PaymentsModule } from './pages/payments/payments.module';
import { TicketComponent } from './shared/shared/ticket/ticket.component';
import { SharedModule } from './shared/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from 'src/environments/environment';
import { AuthGuardGuard } from './shared/guard/auth-guard.guard';
import { StorageService } from './shared/services/storage.service';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { CustomPipeModule } from './shared/pipe/custom-pipe.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { NavegationModule } from './theme/layout/admin/navegation/navegation.module';
import { appReducers } from './app.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CompanyGuard } from './shared/guard/company.guard';
import { metaReducers } from './store/reducers';
import { OnlineOrdersModule } from './pages/online-orders/online-orders.module';
import { ReportsModule } from './pages/reports/reports.module';
import { ReceiptsSalesModule } from './pages/receipts-sales/receipts-sales.module';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    AdminModule,
    PaymentsModule,
    SharedModule,
    CustomPipeModule,
    ToastrModule.forRoot( { preventDuplicates: true }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production, registrationStrategy: 'registerWhenStable:30000' }),
    StoreModule.forRoot(appReducers, { metaReducers }),
    EffectsModule.forRoot(),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),
    NavegationModule,
    OnlineOrdersModule,
    ReportsModule,
    ReceiptsSalesModule,
  ],
  providers: [
    AuthGuardGuard,
    CompanyGuard,
    StorageService,
    {
      provide: MAT_RADIO_DEFAULT_OPTIONS,
      useValue: { color: 'primary' },
    },
  ],
  bootstrap: [AppComponent],
  exports:[
    TicketComponent
  ],
})
export class AppModule { }
