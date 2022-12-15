import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponse } from 'src/app/core/interfaces/apiResonse.interface';
import { IResponse } from 'src/app/core/interfaces/response';
import { environment } from 'src/environments/environment';
import { IGradePeriod } from '../../interfaces/grade-period';

@Injectable({
  providedIn: 'root'
})
export class GradePeriodService {

  constructor(private http:HttpClient) { }

  //Listar 
  getAll(nom?:string,page?:number,size?:number):Observable<IApiResponse>{
    return this.http.get<IApiResponse>(`${environment.api}/periodo/?page=${page}&size=${size}`);
  }
  //Buscar por Id 
  getByIden(iden?:string):Observable<IGradePeriod>{
    return this.http.get<IGradePeriod>(`${environment.api}/periodo/`+iden);
  }

  //Agregar 
  add(gradePeriod:IGradePeriod):Observable<IResponse>{
    console.log(gradePeriod)
    return this.http.post<IResponse>(`${environment.api}/periodo/`,gradePeriod)
  }

  //Modificar 
  update(gradePeriod:IGradePeriod):Observable<IResponse>{
    return this.http.put<IResponse>(`${environment.api}/periodo/`,gradePeriod);
  }

  //Eliminar 
  delete(id:string):Observable<IResponse>{
    return this.http.delete<IResponse>(`${environment.api}/periodo/`+id);
  }
}
