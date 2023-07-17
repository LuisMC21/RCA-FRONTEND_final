import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,map } from 'rxjs';

import { IApiResponse } from 'src/app/core/interfaces/apiResonse.interface';
import { environment } from 'src/environments/environment';
import { IAula } from '../../interfaces/aula';

@Injectable({
  providedIn: 'root'
})
export class AulaService {

  constructor(private http: HttpClient) { }
  getAulaCount(filter: string): Observable<number> {
    return this.http.get<IApiResponse>(`${environment.api}/aula?filter=${filter}`).pipe(
      map(response => response.data.countFilter)
    );
  }
  //Listar
  getAll(filter?:string,page?:number,size?:number):Observable<IApiResponse>{
    return this.http.get<IApiResponse>(`${environment.api}/aula?page=${page}&size=${size}&filter=${filter}`);
  }

  getAllAnio(nom?:string, anio?:string, page?:number,size?:number):Observable<IApiResponse>{
    return this.http.get<IApiResponse>(`${environment.api}/aula?anio=${anio}&page=${page}&size=${size}`);
  }

  //agregar
  add(classroom: IAula):Observable<IApiResponse>{
    return this.http.post<IApiResponse>(`${environment.api}/aula`,classroom);
  }

  //editar
  update(classroom: IAula):Observable<IApiResponse>{
    return this.http.put<IApiResponse>(`${environment.api}/aula`,classroom);
  }

  //delete
  delete(id:string):Observable<IApiResponse>{
    return this.http.delete<IApiResponse>(`${environment.api}/aula/`+id);
  }
}
