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
    return this.http.get<IApiResponse>(`${environment.api}/matricula/?page=${page}&size=${size}&nom=`+nom);
  }

  //Agregar 
  add(enrollment:IEnrollment):Observable<IResponse>{
    return this.http.post<IResponse>(`${environment.api}/matricula/`,enrollment)
  }

  //Modificar 
  update(enrollment:IEnrollment):Observable<IResponse>{
    return this.http.put<IResponse>(`${environment.api}/matricula/`,enrollment);
  }

  //Eliminar 
  delete(id:string):Observable<IResponse>{
    return this.http.delete<IResponse>(`${environment.api}/matricula/`+id);
  }
}
