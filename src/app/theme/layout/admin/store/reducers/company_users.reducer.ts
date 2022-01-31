import { createReducer, on } from '@ngrx/store';
import { cargarUsersCompany, cargarUsersCompanySuccess, cargarUsersCompanyError, unSetUsersCompany } from '../actions/company_users.actions';
import { UserCompany } from '../../../../../shared/models/Company';


interface State {
  data      : UserCompany[],
  loaded    : boolean,
  loading   : boolean,
  error     : any
}

export const userCompanyinitialState: State = {
  data      : [],
  loaded    : false,
  loading   : false,
  error     : null
}

const _userCompanyReducer = createReducer(userCompanyinitialState,

    on(cargarUsersCompany, state => ({ ...state, loading: true})),
    on(cargarUsersCompanySuccess, (state, { user_company }) => ({
      ...state,
      loading : false,
      loaded  : true,
      data    : user_company,
      error   : null
    })),
    on(cargarUsersCompanyError, (state, { payload }) => ({
      ...state,
      loading : false,
      loaded  : true,
      error: {
        url     : payload.url,
        name    : payload.name,
        message : payload.message
      }
    })),
    on(unSetUsersCompany, state => ({ ...userCompanyinitialState })),
);

export function userCompanyReducer(state: any, action: any) {
    return _userCompanyReducer(state, action);
}
