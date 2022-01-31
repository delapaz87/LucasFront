import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError, of } from 'rxjs';
import { CommerceService } from '../../../../../shared/services/commerce.service';
import * as actions from '../actions/tag.actions';
import { OAuth } from '../../../../../shared/models/Auth';
import { AppState } from '../../../../../app.reducer';
import { Store } from '@ngrx/store';
import { saveTag } from '../actions/tag.actions';


@Injectable()
export class TagEffects {

  seccion: OAuth | any;

  constructor(
    private store:  Store<AppState>,
    private actions$: Actions,
    private commerceServices: CommerceService,
  ){
    this.store.select('auth').subscribe( ({access}) => this.seccion = access);
  }

  cargarTag$ = createEffect( () => this.actions$.pipe(
    ofType(actions.cargarTag),
    switchMap( () => this.commerceServices.gettag(this.seccion).pipe(
      map( data => actions.cargarTagSuccess({tag: data.result})),
      catchError( (data) => of( actions.cargarTagError({payload: data})))
    ))
  ))

  saveTag$ = createEffect( () => this.actions$.pipe(
    ofType(actions.saveTag),
    switchMap( (data) => this.commerceServices.saveTag(this.seccion, data.tag).pipe(
      map( data => actions.cargarTagSuccess({tag: data.result})),
      catchError( (data) => of( actions.cargarTagError({payload: data})))
    ))
  ))
}
