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
  getAll(filter?:string,page?:number,size?:number):Observable<IApiResponse>{
    return this.http.get<IApiResponse>(`${environment.api}/seccion?filter=${filter}&page=${page}&size=${size}`);
  }

  //Agregar
  add(seccion:ISeccion):Observable<IApiResponse>{
    return this.http.post<IApiResponse>(`${environment.api}/seccion`,seccion)
  }

  //Modificar
  update(seccion:ISeccion):Observable<IApiResponse>{
    return this.http.put<IApiResponse>(`${environment.api}/seccion`,seccion);
  }

  //Eliminar
  delete(id:string):Observable<IApiResponse>{
    return this.http.delete<IApiResponse>(`${environment.api}/seccion/`+id);
  }
}
