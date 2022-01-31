import { createAction, props } from '@ngrx/store';

export const cargarGeoProvince = createAction(
  '[GeoProvince] Cargar GeoProvince',
  props<{ id: string }>()
);

export const cargarGeoProvinceSuccess = createAction(
  '[GeoProvince] Cargar GeoProvince Success',
  props<{ province: any }>()
);
export const cargarGeoProvinceError = createAction(
  '[GeoProvince] Cargar GeoProvince Error',
  props<{ payload: any}>()
);

export const unSetGeoProvince = createAction('[GeoProvince] UnSet GeoProvince');
