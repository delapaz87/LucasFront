import { createReducer, on } from '@ngrx/store';
import { setUser, unSetUser, updateUser, loginUserError } from '../actions/auth.actions';
import { User } from '../../../../shared/models/User';
import { OAccessToken } from '../../../../shared/models/Auth';

export interface State {
    access: any  | null;
    loaded    : boolean,
    loading   : boolean,
    error     : any
}

export const initialState: State = {
   access    : null,
   loaded    : false,
   loading   : false,
   error     : null
}

const _authReducer = createReducer(initialState,

    on(setUser, (state, { access }) => ({
      ...state,
      access: { ...access },
      loading : false,
      loaded  : true,
      error   : null
    })),
    on(updateUser, (state, { access }) => ({
      ...state,
      access: Object.assign({...state.access}, {'user': Object.assign({...state.access.user}, access)}),
      loading : false,
      loaded  : true,
      error   : null
    })),
    on(loginUserError, (state, { payload }) => ({
      ...state,
      loading : false,
      loaded  : true,
      error: {
        url     : payload.url,
        name    : payload.name,
        message : payload.error.statusMessage
      }
    })),
    on(unSetUser, state => ({ ...initialState })),

);

export function authReducer(state: any, action: any) {
    return _authReducer(state, action);
}
