import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IToken } from 'src/app/shared/interfaces/token.interface';
import { environment } from 'src/environments/environment';
import { ISignInRequest } from '../../interfaces/sign-in-request.interface';
import { AuthServicesModule } from './services.module';
import { LoginUsuario } from '../../interfaces/login-usuario';
import { IApiResponse } from 'src/app/core/interfaces/apiResonse.interface';
import { JwtDTO } from '../../interfaces/jwt-dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

   signInRequest(request: ISignInRequest):Observable<IToken>{
    return this.http.post<IToken>(`${environment.api}/auth/sig-in`,request);
  }

  public login(loginUsuario: LoginUsuario): Observable<IApiResponse> {
    return this.http.post<IApiResponse>(`${environment.api}/auth/login`, loginUsuario);
  }

  public refresh(jwtDTO: JwtDTO): Observable<IApiResponse>{
    return this.http.post<IApiResponse>(`${environment.api}/auth/refresh`, jwtDTO);
  }
}
