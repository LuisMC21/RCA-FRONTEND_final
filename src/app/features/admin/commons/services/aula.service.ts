import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponse } from 'src/app/core/interfaces/apiResonse.interface';
import { environment } from 'src/environments/environment';
import { IAula } from '../../interfaces/aula';

@Injectable({
  providedIn: 'root'
})
export class AulaService {

  constructor(private http: HttpClient) { }

  //Listar 
  getAll(nom?:string,page?:number,size?:number):Observable<IApiResponse>{
    return this.http.get<IApiResponse>(`${environment.api}/aula?page=${page}&size=${size}`);
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
