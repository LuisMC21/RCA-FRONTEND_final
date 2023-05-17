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
    return this.http.get<IApiResponse>(`${environment.api}/alumno?page=${page}&size=${size}`);
  }

  //Agregar alumno
  add(student:IStudent):Observable<IApiResponse>{
    console.log(student)
    return this.http.post<IApiResponse>(`${environment.api}/alumno`,student)
  }

  //Modificar alumno
  update(student:IStudent):Observable<IApiResponse>{
    return this.http.put<IApiResponse>(`${environment.api}/alumno`,student);
  }

  //Eliminar alumno
  delete(id:string):Observable<IApiResponse>{
    return this.http.delete<IApiResponse>(`${environment.api}/alumno/`+id);
  }
}
