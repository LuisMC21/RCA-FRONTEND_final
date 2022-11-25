import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IToken } from 'src/app/shared/interfaces/token.interface';
import { environment } from 'src/environments/environment';
import { ISignInRequest } from '../../interfaces/sign-in-request.interface';
import { AuthServicesModule } from './services.module';

@Injectable({
  providedIn: AuthServicesModule
})
export class AuthService {

  constructor(private http: HttpClient) { }

   signInRequest(request: ISignInRequest):Observable<IToken>{
    return this.http.post<IToken>(`${environment.api}/auth/sig-in`,request);
  }
}
