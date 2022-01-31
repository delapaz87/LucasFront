import { createAction, props } from '@ngrx/store';

export const total = createAction('[CASH] Total');
export const reset = createAction('[CASH] Reset');

export const exact = createAction(
  '[CASH] Exact',
  props<{valor: number}>()
  );

export const operador = createAction(
  '[CASH] Operador',
  props<{valor: number, punto: boolean}>()
  );

export const punto = createAction(
  '[CASH] Punto'
  );

