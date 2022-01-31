import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError, of } from 'rxjs';
import { CommerceService } from '../../../../../shared/services/commerce.service';
import * as paymentActions from '../actions/payment-accept.actions';
import { OAuth } from '../../../../../shared/models/Auth';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../../app.reducer';


@Injectable()
export class PaymentAcceptEffects {

  seccion: OAuth | any;

  constructor(
    private store:  Store<AppState>,
    private actions$: Actions,
    private commerceServices: CommerceService,
  ){
    this.store.select('auth').subscribe( ({access}) => this.seccion = access);
  }

  cargarPaymetAccept$ = createEffect( () => this.actions$.pipe(
    ofType(paymentActions.cargarPaymentAccept),
    switchMap( () => this.commerceServices.gettypepaymentaccepted(this.seccion).pipe(
      map( data => paymentActions.cargarPaymentAcceptSuccess({typedoc: data.result})),
      catchError( (data) => of( paymentActions.cargarPaymentAcceptError({payload: data})))
    ))
  ))
}
