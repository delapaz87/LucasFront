import { createReducer, on } from '@ngrx/store';
import { cargarGeoCities, cargarGeoCitiesSuccess, cargarGeoCitiesError, unSetGeoCities } from '../actions/geocities.actions';

interface State {
    data      : any;
    loaded    : boolean,
    loading   : boolean,
    error     : any
}

export const citiesinitialState: State = {
  data      : [],
  loaded    : false,
  loading   : false,
  error     : null
}

const _citiesReducer = createReducer(citiesinitialState,

  on(cargarGeoCities, state => ({ ...state, loading: true})),
  on(cargarGeoCitiesSuccess, (state, { cities }) => ({
    ...state,
    loading : false,
    loaded  : true,
    data: [ ...cities ]
  })),
  on(cargarGeoCitiesError, (state, { payload }) => ({
    ...state,
    loading : false,
    loaded  : true,
    error: {
      url : payload.url,
      name: payload.name,
      message: payload.message
    }
  })),
  on(unSetGeoCities, state => ({ ...citiesinitialState })),

);

export function citiesReducer(state: any, action: any) {
    return _citiesReducer(state, action);
}
