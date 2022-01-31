import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import * as ui from './shared/ui.reducer';
import * as auth from './pages/authentication/store/reducers/auth.redutor';

export interface AppState {
   ui: ui.State,
   auth: auth.State,
}

export interface AppStateWithCommerce extends AppState {
  commerce: any,
  cash: number,
}

export const appReducers: ActionReducerMap<AppState> = {
   ui:    ui.uiReducer,
   auth:  auth.authReducer,
}
