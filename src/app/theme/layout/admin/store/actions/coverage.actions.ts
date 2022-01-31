import { createAction, props } from '@ngrx/store';

export const cargarCoverage = createAction(
  '[Coverage Component] Cargar Coverage',
  props<{ id: string }>()
);
export const cargarCoverageSuccess = createAction(
  '[Coverage Component] Cargar Coverage Success',
  props<{ coverage: any }>()
  );
export const cargarCoverageError = createAction(
  '[Coverage Component] Cargar Coverage Error',
  props<{ payload: any}>()
  );
  export const unSetCoverage = createAction('[Coverage Component] UnSet Coverage');
