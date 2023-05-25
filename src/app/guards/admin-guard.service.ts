import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../features/auth/commons/services/token.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService implements CanActivate{

  realRol!: string;

  constructor(
    private tokenService: TokenService,
    private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
   const expectedRol = route.data['expectedRol'];

    this.realRol = 'STUDENT';

    if (this.tokenService.isAdmin()) {
      this.realRol = 'ADMINISTRADOR';
    } else {
      if (this.tokenService.isTeacher()) {
        this.realRol = 'TEACHER';
      }
    };

    if(!this.tokenService.isLogged || expectedRol.indexOf(this.realRol) < 0){
      this.router.navigate(['/auth/login']);
      return false;
    }
    return true;
  }
}
