import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as actions from '../actions';
import { UsersService } from '../../../../shared/services/users.service';
import { switchMap, map, catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private userService: UsersService,
  ) {}

    loginUser$ = createEffect( () => this.actions$.pipe(
      ofType(actions.loginUser),
      switchMap( (data) => this.userService.postLogin({ email: data.login.email, password: data.login.password}).pipe(
        map( data => actions.setUser({ access: {...data.result}})),
        catchError( (data) => of( actions.loginUserError({ payload: data })))
      ))
    ))

}
