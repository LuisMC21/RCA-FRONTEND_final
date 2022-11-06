import { Injectable } from '@angular/core';
import { ISignInRequest } from '../../interfaces/sign-in-request';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IApiResponse } from 'src/app/core/interfaces/api-response';
import { Router } from '@angular/router';
import { IUser } from 'src/app/features/home/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser: BehaviorSubject<IUser>;
  nameUserLS:string = 'currentUser'

  constructor(private http: HttpClient, private router:Router) { 
    this.currentUser = new BehaviorSubject(
      JSON.parse(localStorage.getItem(this.nameUserLS)||'{}')
    )
  }

  signInRequest(data:ISignInRequest):Observable<IApiResponse>{
    return this.http.post<IApiResponse>(`${environment.api}/auth`,data);
  }

  setUserLocalStorage(user:IUser){
    localStorage.setItem(this.nameUserLS,JSON.stringify(user));
  }

  logout(){
    localStorage.removeItem(this.nameUserLS)
    localStorage.removeItem('asignacion')
    this.currentUser.next(null as any)
    this.router.navigateByUrl(`${environment.api}/auth`)
  }
}
