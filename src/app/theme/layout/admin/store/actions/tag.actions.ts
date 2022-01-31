import { createAction, props } from '@ngrx/store';

export const cargarTag = createAction('[Tag] Cargar Tag');
export const cargarTagSuccess = createAction(
  '[Tag] Cargar Tag Success',
  props<{ tag: any }>()
  );
export const cargarTagError = createAction(
  '[Tag] Cargar Tag Error',
  props<{ payload: any}>()
  );
export const saveTag = createAction(
  '[Tag] Save Tag',
  props<{ tag: any}>()
  );
export const unSetTag = createAction('[Tag] UnSet Tag');

