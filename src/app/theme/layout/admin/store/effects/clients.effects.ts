import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as actions from '../actions';
import { switchMap, map, catchError, of } from 'rxjs';
import { CommerceService } from '../../../../../shared/services/commerce.service';
import { OAuth } from '../../../../../shared/models/Auth';
import { Store } from '@ngrx/store';
import { AppStateWithCommerce } from '../../../../../app.reducer';
import { Company } from '../../../../../shared/models/Company';


@Injectable()
export class ClientsEffects {

  seccion: OAuth | any;
  company: Company | any;

  constructor(
    private store:  Store<AppStateWithCommerce>,
    private actions$: Actions,
    private commerceServices: CommerceService,
  ) {
    this.store.select('auth').subscribe( ({access}) => this.seccion = access);
    this.store.select('commerce').subscribe( ({company}) => this.company = company?.data )
   }

  cargarClients$ = createEffect( () => this.actions$.pipe(
    ofType(actions.cargarClients),
    switchMap( (data) => this.commerceServices.getClientsByCompany(this.seccion, data.id).pipe(
      map( data => actions.cargarClientsSuccess({ clients: data.result })),
      catchError( (data) => of( actions.cargarClientsError({ payload: data })))
    ))
  ))

/*   saveClients$ = createEffect( () => this.actions$.pipe(
    ofType(actions.saveClients),
    switchMap( data => this.commerceServices.postCompany(this.seccion, this.company).pipe(
      map( data => actions.cargarClientsSuccess({ company: data.result })),
      catchError( (data) => of( actions.cargarClientsError({ payload: data })))
    ))
  )) */

}
