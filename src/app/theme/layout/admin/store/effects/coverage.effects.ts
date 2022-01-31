import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as actions from '../actions';
import { switchMap, map, catchError, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppStateWithCommerce } from '../../../../../app.reducer';
import { OAuth } from '../../../../../shared/models/Auth';
import { CommerceService } from '../../../../../shared/services/commerce.service';



@Injectable()
export class CoverageEffects {

  seccion: OAuth | any;

  constructor(
    private store:  Store<AppStateWithCommerce>,
    private actions$: Actions,
    private commerceServices: CommerceService,
  ) {
    this.store.select('auth').subscribe( ({access}) => this.seccion = access);
   }

  cargarCoverage$ = createEffect( () => this.actions$.pipe(
    ofType(actions.cargarCoverage),
    switchMap( (data) => this.commerceServices.getCoverage(this.seccion, data.id).pipe(
      map( data => actions.cargarCoverageSuccess({ coverage: data.result })),
      catchError( (data) => of( actions.cargarCoverageError({ payload: data })))
    ))
  ))

}
