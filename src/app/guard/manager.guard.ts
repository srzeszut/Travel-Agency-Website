import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ManagerGuard implements CanActivate {
  constructor( public AS: AuthService, public router: Router )
  { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.AS.checkLogged();
      if (
        !this.AS.isLoggedIn ||
        (this.AS.currentRole !== 'manager'&& this.AS.currentRole !== 'admin')
      ) {
        this.router.navigate(['home']);
        return false;
      }
      return true;
  }

}
