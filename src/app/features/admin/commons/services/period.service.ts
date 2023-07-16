import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponse } from 'src/app/core/interfaces/apiResonse.interface';
import { IResponse } from 'src/app/core/interfaces/response';
import { environment } from 'src/environments/environment';
import { IPeriod } from '../../interfaces/period';

@Injectable({
  providedIn: 'root'
})
export class PeriodService {

  constructor(private http:HttpClient) { }

  //Listar 
  getAll(nom?:string,page?:number,size?:number):Observable<IApiResponse>{
    return this.http.get<IApiResponse>(`${environment.api}/periodo?filter=${nom}&page=${page}&size=${size}`);
  }

  getOne(id?:string):Observable<IApiResponse>{
    return this.http.get<IApiResponse>(`${environment.api}/periodo/`+id)
  }

  //Agregar 
  add(period:IPeriod):Observable<IApiResponse>{
    return this.http.post<IApiResponse>(`${environment.api}/periodo`,period)
  }

  //Modificar 
  update(period:IPeriod):Observable<IApiResponse>{
    return this.http.put<IApiResponse>(`${environment.api}/periodo`,period);
  }

  //Eliminar 
  delete(id:string):Observable<IApiResponse>{
    return this.http.delete<IApiResponse>(`${environment.api}/periodo/`+id);
  }
}
