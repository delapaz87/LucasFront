import { createAction, props } from '@ngrx/store';
import { Company, TarifaDelivery } from '../../../../../shared/models/Company';

export const cargarCommerce = createAction('[Commerce Component] Cargar Commerce');
export const cargarCommerceSuccess = createAction(
  '[Commerce Component] Cargar Commerce Success',
  props<{ company: Company }>()
  );
export const cargarCommerceError = createAction(
  '[Commerce Component] Cargar Commerce Error',
  props<{ payload: any}>()
  );

export const updateCommerceDelivery = createAction(
  '[Commerce Component] Update Delivery',
  props<{ rate: TarifaDelivery}>()
);
export const updateCommerceTag = createAction(
  '[Commerce Component] Update Tag',
  props<{ tag: []}>()
);
export const updateCommerce = createAction(
  '[Commerce Component] Update Commerce',
  props<{ company: Company}>()
);

export const saveCommerce = createAction(
  '[Commerce Component] Save Commerce'
);
export const unSetCommerce = createAction('[Commerce Component] UnSet Commerce');
