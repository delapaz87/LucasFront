import { createReducer, on } from '@ngrx/store';
import { cargarGeoProvince, cargarGeoProvinceSuccess, cargarGeoProvinceError, unSetGeoProvince } from '../actions/geoprovince.action';

interface State {
    data      : any;
    loaded    : boolean,
    loading   : boolean,
    error     : any
}

export const provinceinitialState: State = {
  data      : [],
  loaded    : false,
  loading   : false,
  error     : null
}

const _provinceReducer = createReducer(provinceinitialState,

  on(cargarGeoProvince, state => ({ ...state, loading: true})),
  on(cargarGeoProvinceSuccess, (state, { province }) => ({
    ...state,
    loading : false,
    loaded  : true,
    data: [ ...province ]
  })),
  on(cargarGeoProvinceError, (state, { payload }) => ({
    ...state,
    loading : false,
    loaded  : true,
    error: {
      url : payload.url,
      name: payload.name,
      message: payload.message
    }
  })),
  on(unSetGeoProvince, state => ({ ...provinceinitialState })),

);

export function provinceReducer(state: any, action: any) {
    return _provinceReducer(state, action);
}
