import { createReducer, on } from '@ngrx/store';
import { Store } from 'src/app/shared/models/Company';
import { cargarStores, cargarStoresSuccess, cargarStoresError, unSetStores } from '../actions/stores.action';

export interface State {
  data      : Store[],
  loaded    : boolean,
  loading   : boolean,
  error     : any
}

export const storeinitialState: State = {
  data      : [],
  loaded    : false,
  loading   : false,
  error     : null
}

const _storeReducer = createReducer(storeinitialState,

    on(cargarStores, state => ({ ...state, loading: true})),
    on(cargarStoresSuccess, (state, { stores }) => ({
      ...state,
      loading : false,
      loaded  : true,
      data    : stores,
      error   : null
    })),
    on(cargarStoresError, (state, { payload }) => ({
      ...state,
      loading : false,
      loaded  : true,
      error: {
        url     : payload.url,
        name    : payload.name,
        message : payload.message
      }
    })),
    on(unSetStores, state => ({ ...storeinitialState })),

);

export function storeReducer(state: any, action: any) {
    return _storeReducer(state, action);
}
