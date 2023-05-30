import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponse } from 'src/app/core/interfaces/apiResonse.interface';
import { IResponse } from 'src/app/core/interfaces/response';
import { environment } from 'src/environments/environment';
import { IEnrollment } from '../../interfaces/enrollment';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  constructor(private http:HttpClient) { }

  //Listar 
  getAll(nom?:string,page?:number,size?:number):Observable<IApiResponse>{
    return this.http.get<IApiResponse>(`${environment.api}/matricula?page=${page}&size=${size}`);
  }
  //Agregar 
  add(enrollment:IEnrollment):Observable<IApiResponse>{
    return this.http.post<IApiResponse>(`${environment.api}/matricula`,enrollment)
  }

  //Modificar 
  update(enrollment:IEnrollment):Observable<IApiResponse>{
    return this.http.put<IApiResponse>(`${environment.api}/matricula`,enrollment);
  }

  //Eliminar 
  delete(id:string):Observable<IApiResponse>{
    return this.http.delete<IApiResponse>(`${environment.api}/matricula/`+id);
  }
}
