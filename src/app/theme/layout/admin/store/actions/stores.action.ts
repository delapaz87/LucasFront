import { createAction, props } from '@ngrx/store';
import { Store } from '../../../../../shared/models/Company';

export const cargarStores = createAction('[Stores Component] Cargar Stores');
export const cargarStoresSuccess = createAction(
  '[Stores Component] Cargar Stores Success',
  props<{ stores: Store[] }>()
);
export const cargarStoresError = createAction(
  '[Stores Component] Cargar Stores Error',
  props<{ payload: any}>()
);

export const updateStoresHours = createAction(
  '[Stores Component] Update Hours',
    props<{ hours: any }>()
);
export const updateStores = createAction(
  '[Stores Component] Update Stores',
    props<{ stores: Store }>()
);

export const saveStores = createAction(
  '[Stores Component] Save Stores',
    props<{ stores: Store }>()
);

export const unSetStores  = createAction('[Stores Component] UnSet Stores');
