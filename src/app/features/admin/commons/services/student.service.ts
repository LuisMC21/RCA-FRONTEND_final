import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponse } from 'src/app/core/interfaces/apiResonse.interface';
import { IResponse } from 'src/app/core/interfaces/response';
import { environment } from 'src/environments/environment';
import { IStudent } from '../../interfaces/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  constructor(private http: HttpClient) { }

  //Listar alumnos
  getAll(nom?:string,page?:number,size?:number):Observable<IApiResponse>{
    return this.http.get<IApiResponse>(`${environment.api}/alumno/?page=${page}&size=${size}&nom=`+nom);
  }

  //Agregar alumno
  add(student:IStudent):Observable<IResponse>{
    console.log(student)
    return this.http.post<IResponse>(`${environment.api}/alumno/`,student)
  }

  //Modificar alumno
  update(student:IStudent):Observable<IResponse>{
    return this.http.put<IResponse>(`${environment.api}/alumno/`,student);
  }

  //Eliminar alumno
  delete(id:string):Observable<IResponse>{
    return this.http.delete<IResponse>(`${environment.api}/alumno/`+id);
  }
}
