import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as actions from '../actions/commerce.actions';
import { switchMap, map, catchError, of } from 'rxjs';
import { CommerceService } from '../../../../../shared/services/commerce.service';
import { OAuth } from '../../../../../shared/models/Auth';
import { Store } from '@ngrx/store';
import { AppStateWithCommerce } from '../../../../../app.reducer';
import { Company } from '../../../../../shared/models/Company';


@Injectable()
export class CommerceEffects {

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

  cargarCommerce$ = createEffect( () => this.actions$.pipe(
    ofType(actions.cargarCommerce),
    switchMap( () => this.commerceServices.getCompany(this.seccion).pipe(
      map( data => actions.cargarCommerceSuccess({ company: data.result })),
      catchError( (data) => of( actions.cargarCommerceError({ payload: data })))
    ))
  ))

  saveCommerce$ = createEffect( () => this.actions$.pipe(
    ofType(actions.saveCommerce),
    switchMap( data => this.commerceServices.postCompany(this.seccion, this.company).pipe(
      map( data => actions.cargarCommerceSuccess({ company: data.result })),
      catchError( (data) => of( actions.cargarCommerceError({ payload: data })))
    ))
  ))

}
