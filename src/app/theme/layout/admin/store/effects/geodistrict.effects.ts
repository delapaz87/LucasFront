import { Injectable } from '@angular/core';
import { act, Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError, of } from 'rxjs';
import { CommerceService } from '../../../../../shared/services/commerce.service';
import { OAuth } from '../../../../../shared/models/Auth';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../../app.reducer';
import * as actions from '../actions/geodistric.actions';


@Injectable()
export class GeoDistrictEffects {

  seccion: OAuth | any;

  constructor(
    private store:  Store<AppState>,
    private actions$: Actions,
    private commerceServices: CommerceService,
  ){
    this.store.select('auth').subscribe( ({access}) => this.seccion = access);
  }

  cargarGeoDistrict$ = createEffect( () => this.actions$.pipe(
    ofType(actions.cargarGeoDistrict),
    switchMap( (data) => this.commerceServices.getGeoDistrict(this.seccion, data.id).pipe(
      map( data => actions.cargarGeoDistrictSuccess({district: data.result})),
      catchError( (data) => of( actions.cargarGeoDistrictError({payload: data})))
    ))
  ))
}
