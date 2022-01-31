import { createReducer, on } from '@ngrx/store';
import { cargarCompanyInscription, cargarCompanyInscriptionSuccess, cargarCompanyInscriptionError, unSetCompanyInscription } from '../actions/company_inscription.actions';
import { CompanyInscription } from '../../../../../shared/models/Company';


export interface companyInscriptionState {
    data      : CompanyInscription,
    loaded    : boolean,
    loading   : boolean,
    error     : any
}

export const companyInscriptioninitialState: companyInscriptionState = {
    data      : {},
    loaded    : false,
    loading   : false,
    error     : null
}

const _companyInscriptionReducer = createReducer(companyInscriptioninitialState,
    on(cargarCompanyInscription, state => ({ ...state, loading: true})),
    on(cargarCompanyInscriptionSuccess, (state, { company }) => ({
      ...state,
      loading : false,
      loaded  : true,
      data    : company,
      error   : null
    })),
    on(cargarCompanyInscriptionError, (state, { payload }) => ({
      ...state,
      loading : false,
      loaded  : true,
      error: {
        url     : payload.url,
        name    : payload.name,
        message : payload.message
      }
    })),
    on(unSetCompanyInscription, state => ({ ...companyInscriptioninitialState })),

);

export function companyInscriptionReducer(state: any, action: any) {
    return _companyInscriptionReducer(state, action);
}

