import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, Router, UrlSegment, UrlTree} from '@angular/router';
import { Observable, take } from 'rxjs';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate, CanLoad {


  constructor(
    private router: Router,
    private storageService: StorageService,
  ) {

  }

  canLoad() {
    if (this.storageService.isAuthenticated()) {
       // logged in so return true
       take(1)
       return true;
     }
     // not logged in so redirect to login page)
     this.router.navigate(['/auth']);
     return false;
   }

  canActivate() {
    if (this.storageService.isAuthenticated()) {
       // logged in so return true
       return true;
     }
     // not logged in so redirect to login page)
     this.router.navigate(['/auth']);
     return false;
   }

}
