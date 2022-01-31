import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as actions from '../actions/stores.action';
import { switchMap, map, catchError, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppStateWithCommerce } from '../../../../../app.reducer';
import { OAuth } from '../../../../../shared/models/Auth';
import { CommerceService } from '../../../../../shared/services/commerce.service';



@Injectable()
export class StoresEffects {

  seccion: OAuth | any;
  stores: Store | any;

  constructor(
    private store:  Store<AppStateWithCommerce>,
    private actions$: Actions,
    private commerceServices: CommerceService,
  ) {
    this.store.select('auth').subscribe( ({access}) => this.seccion = access);
   }

  cargarStore$ = createEffect( () => this.actions$.pipe(
    ofType(actions.cargarStores),
    switchMap( () => this.commerceServices.getStores(this.seccion).pipe(
      map( data => actions.cargarStoresSuccess({ stores: data.result })),
      catchError( (data) => of( actions.cargarStoresError({ payload: data })))
    ))
  ))

  updateStore$ = createEffect( () => this.actions$.pipe(
      ofType(actions.updateStores),
      switchMap( data => this.commerceServices.putStores(this.seccion, data.stores).pipe(
        map( data => actions.cargarStoresSuccess({ stores: data.result })),
        catchError( (data) => of( actions.cargarStoresError({ payload: data })))
      ))
  ))

  updateStoreHours$ = createEffect( () => this.actions$.pipe(
    ofType(actions.updateStoresHours),
    switchMap( data => this.commerceServices.putStoresHours(this.seccion, data.hours).pipe(
      map( data => actions.cargarStoresSuccess({ stores: data.result })),
      catchError( (data) => of( actions.cargarStoresError({ payload: data })))
    ))
))

  saveStore$ = createEffect( () => this.actions$.pipe(
      ofType(actions.saveStores),
      switchMap( data => this.commerceServices.postStores(this.seccion, data.stores).pipe(
        map( data => actions.cargarStoresSuccess({ stores: data.result })),
        catchError( (data) => of( actions.cargarStoresError({ payload: data })))
      ))
  ))



}
