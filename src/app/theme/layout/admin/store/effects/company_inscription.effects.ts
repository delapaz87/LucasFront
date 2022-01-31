import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import * as actions from '../actions/company_inscription.actions';
import { OAuth } from '../../../../../shared/models/Auth';
import { AppStateWithCommerce } from '../../../../../app.reducer';
import { CommerceService } from '../../../../../shared/services/commerce.service';

@Injectable()
export class CompanyInscriptionEffects {

  seccion: OAuth | any;

  constructor(
    private store:  Store<AppStateWithCommerce>,
    private actions$: Actions,
    private commerceServices: CommerceService,
  ) {
    this.store.select('auth').subscribe( ({access}) => this.seccion = access);
   }

  cargarCommerce$ = createEffect( () => this.actions$.pipe(
    ofType(actions.cargarCompanyInscription),
    switchMap( () => this.commerceServices.getCompanyInscriptcion(this.seccion).pipe(
      map( data => actions.cargarCompanyInscriptionSuccess({ company: data.result })),
      catchError( (data) => of( actions.cargarCompanyInscriptionError({ payload: data })))
    ))
  ))

}
