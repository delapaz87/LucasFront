import { createAction, props } from '@ngrx/store';

export const cargarPaymentAccept = createAction('[Payment Accept] Payment Accept');

export const cargarPaymentAcceptSuccess = createAction(
  '[Payment Accept] Cargar Type Document Success',
  props<{ typedoc: any }>()
  );
export const cargarPaymentAcceptError = createAction(
  '[Payment Accept] Cargar Type Document Error',
  props<{ payload: any}>()
  );

export const unSetPaymentAccept = createAction('[Payment Accept] UnSet Payment Accept');
