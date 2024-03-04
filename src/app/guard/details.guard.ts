import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetailsGuard implements CanActivate {
  constructor( public authService: AuthService, public router: Router )
  { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.authService.userData.pipe(
        map((state) => {
          // console.log(state);
          if (state == null) {

            this.router.navigate(['/trips']);
            return false;
          }

          return true;
        })
      );
    }
  }


