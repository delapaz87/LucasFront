import { createAction, props } from '@ngrx/store';

export const cargarGeoDistrict = createAction(
  '[GeoDistrict] Cargar GeoDistrict',
  props<{ id: string  }>()
);

export const cargarGeoDistrictSuccess = createAction(
  '[GeoDistrict] Cargar GeoDistrict Success',
  props<{ district: any }>()
);
export const cargarGeoDistrictError = createAction(
  '[GeoDistrict] Cargar GeoDistrict Error',
  props<{ payload: any}>()
);

export const unSetGeoDistrict = createAction('[GeoDistrict] UnSet GeoDistrict');
