import { createAction, props } from '@ngrx/store';
import { UserCompany } from '../../../../../shared/models/Company';

export const cargarUsersCompany = createAction('[UsersCompany Component] Cargar UsersCompanys');
export const cargarUsersCompanySuccess = createAction(
  '[UsersCompany Component] Cargar UsersCompanys Success',
  props<{ user_company: UserCompany[] }>()
);
export const cargarUsersCompanyError = createAction(
  '[UsersCompany Component] Cargar UsersCompanys Error',
  props<{ payload: any}>()
);

export const updateUsersCompany = createAction(
  '[UsersCompany Component] Update UsersCompanys',
    props<{ user_company: UserCompany }>()
);

export const saveUsersCompany = createAction(
  '[UsersCompany Component] Save UsersCompany',
    props<{ user_company: UserCompany }>()
);

export const unSetUsersCompany = createAction('[UsersCompany Component] UnSet UsersCompany');
