import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError, of } from 'rxjs';
import * as actions from '../actions/company_users.actions';
import { AppStateWithCommerce } from '../../../../../app.reducer';
import { CommerceService } from '../../../../../shared/services/commerce.service';
import { OAuth } from '../../../../../shared/models/Auth';

@Injectable()
export class UserCompanyEffects {

  seccion: OAuth | any;

  constructor(
    private store:  Store<AppStateWithCommerce>,
    private actions$: Actions,
    private commerceServices: CommerceService,
  ) {
    this.store.select('auth').subscribe( ({access}) => this.seccion = access);
   }

  cargarUsersCompany$ = createEffect( () => this.actions$.pipe(
    ofType(actions.cargarUsersCompany),
    switchMap( () => this.commerceServices.getUsersCompany(this.seccion).pipe(
      map( data => actions.cargarUsersCompanySuccess({ user_company: data.result })),
      catchError( (data) => of( actions.cargarUsersCompanyError({ payload: data })))
    ))
  ))

}
