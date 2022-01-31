import { createAction, props } from '@ngrx/store';
import { CompanyInscription } from '../../../../../shared/models/Company';

export const cargarCompanyInscription = createAction('[CompanyInscription Component] Cargar CompanyInscription');
export const cargarCompanyInscriptionSuccess = createAction(
  '[CompanyInscription Component] Cargar CompanyInscription Success',
  props<{ company: CompanyInscription }>()
  );
export const cargarCompanyInscriptionError = createAction(
  '[CompanyInscription Component] Cargar CompanyInscription Error',
  props<{ payload: any}>()
  );
export const unSetCompanyInscription = createAction('[CompanyInscription Component] UnSet CompanyInscription');
