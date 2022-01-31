import { createAction, props } from '@ngrx/store';

export const cargarTypeDocument = createAction('[Document Type] Cargar Type Document');
export const cargarTypeDocumentSuccess = createAction(
  '[Document Type] Cargar Type Document Success',
  props<{ typedoc: any }>()
  );
export const cargarTypeDocumentError = createAction(
  '[Document Type] Cargar Type Document Error',
  props<{ payload: any}>()
  );
  export const unSetTypeDocument = createAction('[Document Type] UnSet Type Document');
