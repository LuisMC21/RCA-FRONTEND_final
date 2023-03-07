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
    return this.http.get<IApiResponse>(`${environment.api}/periodo?page=${page}&size=${size}`);
  }

  //Agregar 
  add(period:IPeriod):Observable<IResponse>{
    console.log(period)
    return this.http.post<IResponse>(`${environment.api}/periodo`,period)
  }

  //Modificar 
  update(period:IPeriod):Observable<IResponse>{
    return this.http.put<IResponse>(`${environment.api}/periodo`,period);
  }

  //Eliminar 
  delete(id:string):Observable<IResponse>{
    return this.http.delete<IResponse>(`${environment.api}/periodo`+id);
  }
}
