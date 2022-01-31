import { createAction, props } from '@ngrx/store';

export const cargarClient = createAction(
  '[Clientes Component] Cargar Cliente',
  props<{ id: string }>()
  );

export const cargarClientSuccess = createAction(
  '[Cliente Component] Cargar Cliente Success',
  props<{ clients: any }>()
  );

export const cargarClientError = createAction(
  '[Cliente Component] Cargar Cliente Error',
  props<{ payload: any}>()
  );

export const unSetClient = createAction('[Cliente Component] UnSet Cliente');
