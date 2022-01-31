import { Injectable } from '@angular/core';
import { act, Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError, of } from 'rxjs';
import { CommerceService } from '../../../../../shared/services/commerce.service';
import { OAuth } from '../../../../../shared/models/Auth';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../../app.reducer';
import * as actions from '../actions/geocities.actions';


@Injectable()
export class GeoCitiesEffects {

  seccion: OAuth | any;

  constructor(
    private store:  Store<AppState>,
    private actions$: Actions,
    private commerceServices: CommerceService,
  ){
    this.store.select('auth').subscribe( ({access}) => this.seccion = access);
  }

  cargarGeoCities$ = createEffect( () => this.actions$.pipe(
    ofType(actions.cargarGeoCities),
    switchMap( () => this.commerceServices.getGeoCities(this.seccion).pipe(
      map( data => actions.cargarGeoCitiesSuccess({cities: data.result})),
      catchError( (data) => of( actions.cargarGeoCitiesError({payload: data})))
    ))
  ))
}
