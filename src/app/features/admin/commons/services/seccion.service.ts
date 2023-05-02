import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponse } from 'src/app/core/interfaces/apiResonse.interface';
import { IResponse } from 'src/app/core/interfaces/response';
import { environment } from 'src/environments/environment';
import { ISeccion } from '../../interfaces/seccion';

@Injectable({
  providedIn: 'root'
})
export class SeccionService {

  constructor(private http:HttpClient) { }
  //Listar 
  getAll(nom?:string,page?:number,size?:number):Observable<IApiResponse>{
    return this.http.get<IApiResponse>(`${environment.api}/seccion?page=${page}&size=${size}`);
  }

  //Agregar 
  add(seccion:ISeccion):Observable<IResponse>{
    return this.http.post<IResponse>(`${environment.api}/seccion`,seccion)
  }

  //Modificar 
  update(seccion:ISeccion):Observable<IResponse>{
    return this.http.put<IResponse>(`${environment.api}/seccion`,seccion);
  }

  //Eliminar 
  delete(id:string):Observable<IResponse>{
    return this.http.delete<IResponse>(`${environment.api}/seccion`+id);
  }
}
