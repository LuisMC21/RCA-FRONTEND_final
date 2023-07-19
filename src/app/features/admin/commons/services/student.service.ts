import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IApiResponse } from 'src/app/core/interfaces/apiResonse.interface';
import { environment } from 'src/environments/environment';
import { IStudent } from '../../interfaces/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  constructor(private http: HttpClient) { }
  getOne(id:string):Observable<IApiResponse>{
    return this.http.get<IApiResponse>(`${environment.api}/alumno/${id}`);
  }
  getAlumnosCount(filter: string): Observable<number> {
    return this.http.get<IApiResponse>(`${environment.api}/alumno?filter=${filter}`).pipe(
      map(response => response.data.countFilter)
    );
  }
  //Listar alumnos
  getAll(filter?:string,page?:number,size?:number):Observable<IApiResponse>{
    return this.http.get<IApiResponse>(`${environment.api}/alumno?filter=${filter}&page=${page}&size=${size}`);
  }

  getAllAnioCursoAula(nom?:string,page?:number,size?:number, anio?:string, aula?:string, curso?:string):Observable<IApiResponse>{
    return this.http.get<IApiResponse>(`${environment.api}/alumno/auc?page=${page}&size=${size}&anio=${anio}&aula=${aula}&curso=${curso}`);
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
