import { createAction, props } from '@ngrx/store';
import { Ologin } from '../../../../shared/models/Auth';


export const setUser = createAction(
  '[Auth] Set User',
  props<{ access: any}>()
  );

export const updateUser = createAction(
  '[Auth] Update User',
  props<{ access: any}>()
  );

export const unSetUser = createAction(
  '[Auth] UnSet User'
  );

export const loginUser = createAction(
  '[Auth] Login',
  props<{ login: Ologin}>()
  );

export const logoutUser = createAction(
  '[Auth] Logout'
  );

export const loginUserError = createAction(
  '[Auth] Login Error',
  props<{ payload: any}>()
);
