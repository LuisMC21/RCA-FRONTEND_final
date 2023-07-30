import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponse } from 'src/app/core/interfaces/apiResonse.interface';
import { environment } from 'src/environments/environment';
import { IUser } from '../../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

   //Listar Docente
   getAll(filter?:string,page?:number,size?:number):Observable<IApiResponse>{
    return this.http.get<IApiResponse>(`${environment.api}/usuario?filter=${filter}&page=${page}&size=${size}`);
  }

  //Agregar docente
  add(user:IUser):Observable<IApiResponse>{
    console.log(user)
    return this.http.post<IApiResponse>(`${environment.api}/usuario`,user)
  }

  //Modificar docente
  update(user:IUser):Observable<IApiResponse>{
    return this.http.put<IApiResponse>(`${environment.api}/usuario`,user);
  }

  //Eliminar docente
  delete(id:string):Observable<IApiResponse>{
    return this.http.delete<IApiResponse>(`${environment.api}/usuario/`+id);
  }
}
