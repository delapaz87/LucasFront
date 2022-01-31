import { createAction, props } from '@ngrx/store';

export const cargarGeoCities = createAction('[GeoCities] Cargar GeoCities');

export const cargarGeoCitiesSuccess = createAction(
  '[GeoCities] Cargar GeoCities Success',
  props<{ cities: any }>()
  );
export const cargarGeoCitiesError = createAction(
  '[GeoCities] Cargar GeoCities Error',
  props<{ payload: any}>()
  );

export const unSetGeoCities = createAction('[GeoCities] UnSet GeoCities');
