import {
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, concatMap, throwError } from 'rxjs';
import { TokenService } from '../features/auth/commons/services/token.service';
import { JwtDTO } from '../features/auth/interfaces/jwt-dto';
import { AuthService } from '../features/auth/commons/services/auth.service';

const AUTHORIZATION = 'Authorization';
@Injectable({
  providedIn: 'root',
})
export class AdminInterceptorService implements HttpInterceptor {
  constructor(
    private tokenService: TokenService,
    private authService: AuthService
  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!this.tokenService.isLogged()) {
      return next.handle(req);
    }

    let intReq = req;
    const token = this.tokenService.getToken();

    intReq = this.addToken(req, token);

    return next.handle(intReq).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          const tDto: JwtDTO = new JwtDTO(this.tokenService.getToken());
          return this.authService.refresh(tDto).pipe(
            concatMap((data: any) => {
              console.log('refreshing...');
              this.tokenService.setToken(data.data.token);
              intReq = this.addToken(req, data.data.token);
              return next.handle(intReq);
            })
          );
        } else if (err.status === 403) {
          this.tokenService.logOut();
          return throwError(err);
        } else {
          return throwError(err);
        }
      })
    );
  }

  private addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({
      headers: req.headers.set(AUTHORIZATION, 'Bearer ' + token),
    });
  }
}

export const interceptorProvider = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AdminInterceptorService,
    multi: true,
  },
];
