import { createReducer, on } from '@ngrx/store';
import { Tag } from '../../../../../shared/models/Company';
import { cargarTag, cargarTagSuccess, cargarTagError, unSetTag } from '../actions/tag.actions';


interface TagState {
  data      : Tag[];
  loaded    : boolean,
  loading   : boolean,
  error     : any
}

export const initialTagState: TagState = {
  data      : [],
  loaded    : false,
  loading   : false,
  error     : null
}

const _tagReducer = createReducer(initialTagState,

    on(cargarTag, state => ({ ...state, loading: true})),
    on(cargarTagSuccess, (state, { tag }) => ({
      ...state,
      loading : false,
      loaded  : true,
      data: [ ...tag ]
    })),
    on(cargarTagError, (state, { payload }) => ({
      ...state,
      loading : false,
      loaded  : true,
      error: {
        url : payload.url,
        name: payload.name,
        message: payload.message
      }
    })),
    on(unSetTag, state => ({ ...initialTagState })),

);

export function tagReducer(state: any, action: any) {
    return _tagReducer(state, action);
}
