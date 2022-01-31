import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError, of } from 'rxjs';
import { CommerceService } from '../../../../../shared/services/commerce.service';
import * as typedocumentActions from '../actions/typedocument.actions';
import { OAuth } from '../../../../../shared/models/Auth';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../../app.reducer';


@Injectable()
export class TypeDocumentEffects {

  seccion: OAuth | any;

  constructor(
    private store:  Store<AppState>,
    private actions$: Actions,
    private commerceServices: CommerceService,
  ){
    this.store.select('auth').subscribe( ({access}) => this.seccion = access);
  }

  cargarTypeDocument$ = createEffect( () => this.actions$.pipe(
    ofType(typedocumentActions.cargarTypeDocument),
    switchMap( () => this.commerceServices.gettypedocument(this.seccion).pipe(
      map( data => typedocumentActions.cargarTypeDocumentSuccess({typedoc: data.result})),
      catchError( (data) => of( typedocumentActions.cargarTypeDocumentError({payload: data})))
    ))
  ))
}
