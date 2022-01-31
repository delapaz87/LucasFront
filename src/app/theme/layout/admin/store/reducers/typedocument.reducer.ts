import { createReducer, on } from '@ngrx/store';
import { cargarTypeDocument, cargarTypeDocumentSuccess, cargarTypeDocumentError, unSetTypeDocument } from '../actions/typedocument.actions';
import { Parameter } from '../../../../../shared/models/Company';

interface State {
    data: Parameter;
    loaded    : boolean,
    loading   : boolean,
    error     : any
}

export const typedocumentinitialState: State = {
  data: { },
  loaded    : false,
  loading   : false,
  error     : null
}

const _typedocumentReducer = createReducer(typedocumentinitialState,

  on(cargarTypeDocument, state => ({ ...state, loading: true})),
  on(cargarTypeDocumentSuccess, (state, { typedoc }) => ({
    ...state,
    loading : false,
    loaded  : true,
    data: [ ...typedoc ]
  })),
  on(cargarTypeDocumentError, (state, { payload }) => ({
    ...state,
    loading : false,
    loaded  : true,
    error: {
      url : payload.url,
      name: payload.name,
      message: payload.message
    }
  })),
  on(unSetTypeDocument, state => ({ ...typedocumentinitialState })),

);

export function typedocumentReducer(state: any, action: any) {
    return _typedocumentReducer(state, action);
}
