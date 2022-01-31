import { createReducer, on } from '@ngrx/store';
import { cargarCoverage, cargarCoverageSuccess, cargarCoverageError, unSetCoverage } from '../actions/coverage.actions';


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

const _coverageReducer = createReducer(initialState,

  on(cargarCoverage, state => ({ ...state, loading: true})),
  on(cargarCoverageSuccess, (state, { coverage }) => ({
    ...state,
    loading : false,
    loaded  : true,
    data    : coverage,
    error   : null
  })),
  on(cargarCoverageError, (state, { payload }) => ({
    ...state,
    loading : false,
    loaded  : true,
    error: {
      url     : payload.url,
      name    : payload.name,
      message : payload.message
    }
  })),
  on(unSetCoverage, state => ({ ...initialState })),

);

export function coverageReducer(state: any, action: any) {
    return _coverageReducer(state, action);
}
