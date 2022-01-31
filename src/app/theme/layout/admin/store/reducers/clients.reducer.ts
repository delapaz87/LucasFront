import { createReducer, on } from '@ngrx/store';
import { cargarClients, cargarClientsSuccess, cargarClientsError, unSetClients } from '../actions/clients.actions';

interface State {
  data      : any,
  loaded    : boolean,
  loading   : boolean,
  error     : any
}

const initialState: State = {
  data      : {},
  loaded    : false,
  loading   : false,
  error     : null
}

const _clientsReducer = createReducer(initialState,

  on(cargarClients, state => ({ ...state, loading: true})),
  on(cargarClientsSuccess, (state, { clients }) => ({
    ...state,
    loading : false,
    loaded  : true,
    data    : clients,
    error   : null
  })),
  on(cargarClientsError, (state, { payload }) => ({
    ...state,
    loading : false,
    loaded  : true,
    error: {
      url     : payload.url,
      name    : payload.name,
      message : payload.message
    }
  })),
  on(unSetClients, state => ({ ...initialState })),

);

export function clientsReducer(state: any, action: any) {
    return _clientsReducer(state, action);
}
