import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree,Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( public authService: AuthService, public router: Router )
{ }
canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    | Observable<boolean | UrlTree>    | Promise<boolean | UrlTree>    | boolean    | UrlTree {
    return this.authService.userData.pipe(
      map((state) => {
        // console.log(state);
        if (state == null) {

          this.router.navigate(['/login']);
          return false;
        }

        return true;
      })
    );
  }



}





