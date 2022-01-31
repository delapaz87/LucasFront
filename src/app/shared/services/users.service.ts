import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, tap } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { NextConfig } from '../config';
import { OAuth, OChangePassword, ODialogData, OForgotPassword, Ologin, OValidateCode, OCheckUser, OAccessToken } from '../models/Auth';
import { UrlResponse } from '../models/UrlResponse';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private store: Store<AppState>,
    private http: HttpClient
  ) {

  }

  getUserByEmail (email: string) {
    const headers = new HttpHeaders({
      'Content-Type':  'application/json'});
    return this.http.get(
      NextConfig.config.url + NextConfig.config.versionapi + '/' + 'getuserbyemail/'+ email,
      {headers},
    ).pipe(map(res => res as UrlResponse<OCheckUser>));
  }

  getUserCompanyByEmail (email: string) {
    const headers = new HttpHeaders({
      'Content-Type':  'application/json'});
    return this.http.get(
      NextConfig.config.url + NextConfig.config.versionapi + '/' + 'getusercompanybyemail/'+ email,
      {headers},
    ).pipe(map(res => res as UrlResponse<OCheckUser>));
  }

   postLogin (data: Ologin) {
    const headers = new HttpHeaders({
      'Content-Type':  'application/json'});
    return this.http.post(
      NextConfig.config.url + NextConfig.config.versionapi + '/' + 'login',
      data,
      {headers},
    ).pipe(map(res => res as UrlResponse<OAuth>));
  }

  postForgotPassword (data: OForgotPassword) {
    const headers = new HttpHeaders({
      'Content-Type':  'application/json'});
    return this.http.post(
      NextConfig.config.url + NextConfig.config.versionapi + '/' + 'forgotpassword',
      data,
      {headers},
    ).pipe(map(res => res as UrlResponse<OValidateCode>));
  }

  postGenerateCodeforMail (data: OForgotPassword) {
    const headers = new HttpHeaders({
      'Content-Type':  'application/json'});
    return this.http.post(
      NextConfig.config.url + NextConfig.config.versionapi + '/' + 'generatecodeformail',
      data,
      {headers},
    ).pipe(map(res => res as UrlResponse<OValidateCode>));
  }

  postValidateCode (data: ODialogData) {
    const headers = new HttpHeaders({
      'Content-Type':  'application/json'});
    return this.http.post(
      NextConfig.config.url + NextConfig.config.versionapi + '/' + 'validatecode',
      data,
      {headers},
    ).pipe(map(res => res as UrlResponse<Object>));
  }

  postChangePasswordWithForgotPassword (token: string, data: OChangePassword) {
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'auth-lucapos-token': token
    });
    return this.http.post(
      NextConfig.config.url + NextConfig.config.versionapi + '/' + 'changepasswordwithforgotpassword',
      data,
      {headers},
    ).pipe(map(res => res as UrlResponse<OAuth>));
  }

  postRegisterCompany (data: any) {
    const headers = new HttpHeaders({
      'Content-Type':  'application/json'});
    return this.http.post(
      NextConfig.config.url + NextConfig.config.versionapi + '/' + 'registercompany',
      data,
      {headers},
    ).pipe(map(res => res as UrlResponse<Object>));
  }

}
