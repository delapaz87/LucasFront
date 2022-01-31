import { createAction, props } from '@ngrx/store';

export const cargarClients = createAction(
  '[Clientes Component] Cargar Clientes',
  props<{ id: string }>()
  );
export const cargarClientsSuccess = createAction(
  '[Clientes Component] Cargar Clientes Success',
  props<{ clients: any }>()
  );
export const cargarClientsError = createAction(
  '[Clientes Component] Cargar Clientes Error',
  props<{ payload: any}>()
  );
export const unSetClients = createAction('[Clientes Component] UnSet Clientes');


