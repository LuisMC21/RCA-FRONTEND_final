import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../features/auth/commons/services/token.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(
    private tokenService: TokenService,
    private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if(this.tokenService.isLogged()){
      if (this.tokenService.isAdmin()) {
        this.router.navigate(['/admin']);
      } else {
        if (this.tokenService.isTeacher()) {
          this.router.navigate(['/teacher']);
        } else {
            this.router.navigate(['/tutor']);
        }
      }
      return false;
    }
    return true;
  }

}
