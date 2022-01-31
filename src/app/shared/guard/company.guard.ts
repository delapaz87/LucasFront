import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState, AppStateWithCommerce } from '../../app.reducer';

@Injectable({
  providedIn: 'root'
})
export class CompanyGuard implements CanActivate {

  user: any;

  constructor(
    private store: Store<AppStateWithCommerce>,
    private router: Router,
  ) {
    this.store.select('auth').subscribe( ({ access }) =>  {
      this.user = access?.user;
    });
  }

  canActivate() {
    if(this.user?.cia_id != '' && this.user?.cia_id != null && this.user?.cia_id != undefined) {
      return true;
    }
     // not logged in so redirect to login page)
     this.router.navigate(['/commerce/company']);
     return false;
   }

}
