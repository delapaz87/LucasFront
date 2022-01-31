import { createReducer, on } from '@ngrx/store';
import { cargarCommerce,
  cargarCommerceSuccess,
  cargarCommerceError,
  updateCommerce,
  updateCommerceDelivery,
  updateCommerceTag,
  unSetCommerce
} from '../actions';
import { Company } from '../../../../../shared/models/Company';



export interface commerceState {
    data      : Company,
    loaded    : boolean,
    loading   : boolean,
    error     : any
}

export const commerceinitialState: commerceState = {
    data      : {},
    loaded    : false,
    loading   : false,
    error     : null
}

const _commerceReducer = createReducer(commerceinitialState,
    on(cargarCommerce, state => ({ ...state, loading: true})),
    on(cargarCommerceSuccess, (state, { company }) => ({
      ...state,
      loading : false,
      loaded  : true,
      data    : company,
      error   : null
    })),
    on(cargarCommerceError, (state, { payload }) => ({
      ...state,
      loading : false,
      loaded  : true,
      error: {
        url     : payload.url,
        name    : payload.name,
        message : payload.message
      }
    })),
    on(updateCommerce, (state, { company }) => ({
      ...state,
      data: Object.assign({...state.data}, company),
      loading : false,
      loaded  : true,
      error   : null,
    })),
    on(updateCommerceDelivery, (state, { rate }) => ({
      ...state,
      data: Object.assign({...state.data}, {'company_delivery': rate }),
      loading : false,
      loaded  : true,
      error   : null,
    })),
    on(updateCommerceTag, (state, { tag }) => ({
      ...state,
      data: Object.assign({...state.data}, {'company_tag': tag }),
      loading : false,
      loaded  : true,
      error   : null,
    })),
    on(unSetCommerce, state => ({ ...commerceinitialState })),

);

export function commerceReducer(state: any, action: any) {
    return _commerceReducer(state, action);
}

