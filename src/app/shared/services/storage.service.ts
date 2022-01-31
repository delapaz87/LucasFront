import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { OAccessToken, OAuth } from '../models/Auth';
import { User } from '../models/User';
import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store';
import * as actions from '../../theme/layout/admin/store/actions';
import * as authActions from '../../pages/authentication/store/actions/auth.actions';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  session: OAuth | any;
  private user$ = new Subject<User>();
  public getAccountUser = this.user$.asObservable();

  constructor(
    private router: Router,
    private store: Store<AppState>,
  ) {
    this.store.select('auth').subscribe( ({access}) => this.session = access);
  }

  setCurrentSession(seccion: OAuth): void {
    new Promise((resolve) => {
      if (seccion) {
        this.user$.next(seccion.user);
      }
      resolve(true)
    })
  }

  loadSessionData(): OAccessToken {
    const sessionStr = this.session?.access_token;
    return (sessionStr) ? JSON.parse(sessionStr): null;
  }

  getCurrentSession(): OAccessToken {
    return this.loadSessionData();
  }

  isAuthenticated(): boolean {
    return (this.getCurrentToken() != '') ? true : false;
  }

  getCurrentToken(): string {
    return (this.session && this.session.access_token) ? this.session.access_token : '';
  }

  getSeccionToken(): OAuth {
    return this.session;
  }


  logout() {
    this.store.dispatch(authActions.unSetUser());
    this.store.dispatch(actions.unSetCommerce());
    this.store.dispatch(actions.unSetTag());
    this.store.dispatch(actions.unSetTypeDocument());
    this.store.dispatch(actions.unSetPaymentAccept());
    this.store.dispatch(actions.unSetStores());
    this.store.dispatch(actions.unSetCoverage());
    this.store.dispatch(actions.unSetClients());
    this.store.dispatch(actions.unSetUsersCompany());
    this.store.dispatch(actions.unSetGeoCities());
    this.store.dispatch(actions.unSetCompanyInscription());
    this.router.navigate(['/auth']);
  }
}
