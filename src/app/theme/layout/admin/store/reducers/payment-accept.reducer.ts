import { createReducer, on } from '@ngrx/store';
import { cargarPaymentAccept, cargarPaymentAcceptError, cargarPaymentAcceptSuccess, unSetPaymentAccept } from '../actions/payment-accept.actions';
import { Parameter } from '../../../../../shared/models/Company';

interface paymentAcceptState {
  data: Parameter;
  loaded    : boolean,
  loading   : boolean,
  error     : any
}

const paymentAcceptinitialState: paymentAcceptState = {
  data      : { },
  loaded    : false,
  loading   : false,
  error     : null
}

const _paymentAcceptReducer = createReducer(paymentAcceptinitialState,

  on(cargarPaymentAccept, state => ({ ...state, loading: true})),
  on(cargarPaymentAcceptSuccess, (state, { typedoc }) => ({
    ...state,
    loading : false,
    loaded  : true,
    data: [ ...typedoc ]
  })),
  on(cargarPaymentAcceptError, (state, { payload }) => ({
    ...state,
    loading : false,
    loaded  : true,
    error: {
      url : payload.url,
      name: payload.name,
      message: payload.message
    }
  })),
  on(unSetPaymentAccept, state => ({ ...paymentAcceptinitialState })),

);

export function paymentAcceptReducer(state: any, action: any) {
    return _paymentAcceptReducer(state, action);
}
