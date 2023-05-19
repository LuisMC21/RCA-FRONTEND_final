import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUsername';
const AUTHORITIES_KEY = 'AuthAuthorities';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  roles: Array<string> = [];
  constructor(private router: Router) { }

  public setToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken() :any {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public getUserName(): any {
    return sessionStorage.getItem(USERNAME_KEY);
  }

  public setUsername(nombreUsuario: string): void {
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY, nombreUsuario);
  }

  public getUsername() :any {
    return sessionStorage.getItem(USERNAME_KEY);
  }

  public setAuthorities(roles: Array<string>): void {
    window.sessionStorage.removeItem(AUTHORITIES_KEY);
    window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(roles));
  }

  public getAuthorities(): string[] {
    this.roles = [];
    const arrayAuth = sessionStorage.getItem(AUTHORITIES_KEY)
    if(arrayAuth != null){
      console.log(arrayAuth);
      JSON.parse(arrayAuth).forEach((authority: any) => {
        this.roles.push(authority.authority);
      });
    }
    return this.roles;
  }

  public logOut(): void{
    window.sessionStorage.clear();
  }
}
