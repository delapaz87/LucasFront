import { createReducer, on } from '@ngrx/store';
import { total, operador, reset, punto, exact } from './cash.action';


export const initialState : number = 0;

const _calcCalculator = createReducer(
  initialState,
  on(total, (state) => state),
  on(reset, (state) => initialState),
  on(operador, (state, { valor, punto }) => punto == true? Number(state + '.' + valor) : Number(state + '' + valor)),
  on(exact, (state, { valor }) => valor),
  on(punto, (state) => Number(state + 0.0000001 )),
);

export function calcCalculator(state: any, action: any) {
  return _calcCalculator(state, action);
}
