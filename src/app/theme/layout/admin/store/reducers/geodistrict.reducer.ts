import { createReducer, on } from '@ngrx/store';
import { cargarGeoDistrict, cargarGeoDistrictSuccess, cargarGeoDistrictError, unSetGeoDistrict } from '../actions/geodistric.actions';


interface State {
    data      : any;
    loaded    : boolean,
    loading   : boolean,
    error     : any
}

export const districtinitialState: State = {
  data      : [],
  loaded    : false,
  loading   : false,
  error     : null
}

const _districtReducer = createReducer(districtinitialState,

  on(cargarGeoDistrict, state => ({ ...state, loading: true})),
  on(cargarGeoDistrictSuccess, (state, { district }) => ({
    ...state,
    loading : false,
    loaded  : true,
    data: [ ...district ]
  })),
  on(cargarGeoDistrictError, (state, { payload }) => ({
    ...state,
    loading : false,
    loaded  : true,
    error: {
      url : payload.url,
      name: payload.name,
      message: payload.message
    }
  })),
  on(unSetGeoDistrict, state => ({ ...districtinitialState })),

);

export function districtReducer(state: any, action: any) {
    return _districtReducer(state, action);
}
