import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NextConfig } from '../config';
import { map } from 'rxjs';
import { UrlResponse } from '../models/UrlResponse';
import { OAuth } from '../models/Auth';
import { Parameter, TarifaDelivery, Company, CompanyInscription, Store, UserCompany } from '../models/Company';

@Injectable({
  providedIn: 'root'
})
export class CommerceService {

  constructor(
    private http: HttpClient,
  ) { }

  gettypedocument(seccion: OAuth) {
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization':  seccion.token_type + ' ' + seccion.access_token
    });
    return this.http.get(
      NextConfig.config.url + NextConfig.config.versionapi + '/ui/typedocument',
      {headers},
    ).pipe(
        map(res => res as UrlResponse<Parameter> )
      );
  }

  gettypepaymentaccepted(seccion: OAuth) {
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization':  seccion.token_type + ' ' + seccion.access_token
    });
    return this.http.get(
      NextConfig.config.url + NextConfig.config.versionapi + '/ui/typepaymentaccepted',
      {headers},
    ).pipe(
        map(res => res as UrlResponse<Parameter> )
      );
  }

  gettag(seccion: OAuth) {
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization':  seccion.token_type + ' ' + seccion.access_token
    });
    return this.http.get(
      NextConfig.config.url + NextConfig.config.versionapi + '/ui/tag',
      {headers},
    ).pipe(
        map(res => res as UrlResponse<Parameter> )
      );
  }

  saveTag(seccion: OAuth, data: string) {
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization':  seccion.token_type + ' ' + seccion.access_token
    });
    return this.http.post(
      NextConfig.config.url + NextConfig.config.versionapi + '/ui/tag',
      data,
      {headers},
    ).pipe(
        map(res => res as UrlResponse<Parameter> )
      );
  }

  getCompany(seccion: OAuth) {
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization':  seccion.token_type + ' ' + seccion.access_token
    });
    return this.http.get(
      NextConfig.config.url + NextConfig.config.versionapi + '/commerce/company',
      {headers},
    ).pipe(
        map(res => res as UrlResponse<Company> )
      );
  }

  postCompany(seccion: OAuth, data: any) {
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization':  seccion.token_type + ' ' + seccion.access_token
    });
    return this.http.put(
      NextConfig.config.url + NextConfig.config.versionapi + '/commerce/company',
      data,
      {headers},
    ).pipe(
        map(res => res as UrlResponse<Company> )
      );
  }

  getCompanyInscriptcion(seccion: OAuth) {
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization':  seccion.token_type + ' ' + seccion.access_token
    });
    return this.http.get(
      NextConfig.config.url + NextConfig.config.versionapi + '/commerce/inscription',
      {headers},
    ).pipe(
        map(res => res as UrlResponse<CompanyInscription> )
    );
  }

  getStores(seccion: OAuth) {
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization':  seccion.token_type + ' ' + seccion.access_token
    });
    return this.http.get(
      NextConfig.config.url + NextConfig.config.versionapi + '/stores',
      {headers},
    ).pipe(
        map(res => res as UrlResponse<Store[]> )
    );
  }

  putStores(seccion: OAuth, data: any) {
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization':  seccion.token_type + ' ' + seccion.access_token
    });
    return this.http.put(
      NextConfig.config.url + NextConfig.config.versionapi + '/stores',
      data,
      {headers},
    ).pipe(
        map(res => res as UrlResponse<Store[]> )
      );
  }

  postStores(seccion: OAuth, data: any) {
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization':  seccion.token_type + ' ' + seccion.access_token
    });
    return this.http.post(
      NextConfig.config.url + NextConfig.config.versionapi + '/stores',
      data,
      {headers},
    ).pipe(
        map(res => res as UrlResponse<Store[]> )
      );
  }

  putStoresHours(seccion: OAuth, data: any) {
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization':  seccion.token_type + ' ' + seccion.access_token
    });
    return this.http.put(
      NextConfig.config.url + NextConfig.config.versionapi + '/stores/hours',
      data,
      {headers},
    ).pipe(
        map(res => res as UrlResponse<Store[]> )
      );
  }

  getTarifaDelivery(seccion: OAuth) {
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization':  seccion.token_type + ' ' + seccion.access_token
    });
    return this.http.get(
      NextConfig.config.url + NextConfig.config.versionapi + '/commerce/deliveryrate',
      {headers},
    ).pipe(
        map(res => res as UrlResponse<TarifaDelivery> )
      );
  }

  postTarifaDelivery(seccion: OAuth, data: any) {
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization':  seccion.token_type + ' ' + seccion.access_token
    });
    return this.http.put(
      NextConfig.config.url + NextConfig.config.versionapi + '/commerce/deliveryrate',
      data,
      {headers},
    ).pipe(
        map(res => res as UrlResponse<TarifaDelivery> )
      );
  }

  getCompanytag(seccion: OAuth) {
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization':  seccion.token_type + ' ' + seccion.access_token
    });
    return this.http.get(
      NextConfig.config.url + NextConfig.config.versionapi + '/commerce/tag',
      {headers},
    ).pipe(
        map(res => res as UrlResponse<any> )
      );
  }

  validatorRuc(seccion: OAuth, data: any){
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization':  seccion.token_type + ' ' + seccion.access_token
    });
    return this.http.put(
      NextConfig.config.url + NextConfig.config.versionapi + '/validator/ruc',
      data,
      {headers},
    ).pipe(
        map(res => res as UrlResponse<TarifaDelivery> )
      );
  }

  getGeoCities(seccion: OAuth) {
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization':  seccion.token_type + ' ' + seccion.access_token
    });
    return this.http.get(
      NextConfig.config.url + NextConfig.config.versionapi + '/ui/cities',
      {headers},
    ).pipe(
        map(res => res as UrlResponse<any> )
      );
  }

  getGeoProvince(seccion: OAuth, id:string) {
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization':  seccion.token_type + ' ' + seccion.access_token
    });
    return this.http.get(
      NextConfig.config.url + NextConfig.config.versionapi + '/ui/provinces/'+id,
      {headers},
    ).pipe(
        map(res => res as UrlResponse<any> )
      );
  }

  getGeoDistrict(seccion: OAuth, id:string) {
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization':  seccion.token_type + ' ' + seccion.access_token
    });
    return this.http.get(
      NextConfig.config.url + NextConfig.config.versionapi + '/ui/districts/'+id,
      {headers},
    ).pipe(
        map(res => res as UrlResponse<any> )
      );
  }

  getUsersCompany(seccion: OAuth) {
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization':  seccion.token_type + ' ' + seccion.access_token
    });
    return this.http.get(
      NextConfig.config.url + NextConfig.config.versionapi + '/company/users',
      {headers},
    ).pipe(
        map(res => res as UrlResponse<UserCompany[]> )
      );
  }

  postUsersCompany(seccion: OAuth, data: any) {
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization':  seccion.token_type + ' ' + seccion.access_token
    });
    return this.http.post(
      NextConfig.config.url + NextConfig.config.versionapi + '/changepassword',
      data,
      {headers},
    ).pipe(
        map(res => res as UrlResponse<any> )
      );
  }

  postAssignStore(seccion: OAuth, data: any) {
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization':  seccion.token_type + ' ' + seccion.access_token
    });
    return this.http.post(
      NextConfig.config.url + NextConfig.config.versionapi + '/stores/assign',
      data,
      {headers},
    ).pipe(
        map(res => res as UrlResponse<any> )
      );
  }

  uploadImg(seccion: OAuth, data: any) {
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization':  seccion.token_type + ' ' + seccion.access_token
    });
    return this.http.post(
      NextConfig.config.url + NextConfig.config.versionapi + '/ui/upload',
      data,
      {headers},
    ).pipe(
        map(res => res as UrlResponse<any> )
      );
  }

  checkRuc(ruc: number) {
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
    });
    return this.http.get(
      NextConfig.config.url + NextConfig.config.versionapi + '/validator/ruc/' + ruc,
      {headers}
    ).pipe(
        map(res => res as UrlResponse<any> )
      );
  }

  getCoverage(seccion: OAuth, id: string) {
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization':  seccion.token_type + ' ' + seccion.access_token
    });
    return this.http.get(
      NextConfig.config.url + NextConfig.config.versionapi + '/stores/coverage/' + id,
      {headers},
    ).pipe(
        map(res => res as UrlResponse<Company> )
      );
  }

  getClientsByCompany(seccion: OAuth, company_id: string) {
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization':  seccion.token_type + ' ' + seccion.access_token
    });
    return this.http.get(
      NextConfig.config.url + NextConfig.config.versionapi + '/clients/company/' + company_id,
      {headers},
    ).pipe(
        map(res => res as UrlResponse<Company> )
      );
  }
}
