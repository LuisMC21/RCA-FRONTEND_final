import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IApiResponse } from 'src/app/core/interfaces/apiResonse.interface';
import { IResponse } from 'src/app/core/interfaces/response';
import { environment } from 'src/environments/environment';
import { ITeacher } from '../../interfaces/teacher';


@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(private http: HttpClient) { }
  //Cantidad de profesores:
  getTeacherCount(filter: string): Observable<number> {
    return this.http.get<IApiResponse>(`${environment.api}/docente?filter=${filter}`).pipe(
      map(response => response.data.countFilter)
    );
  }

   //Listar Docente
  getAll(filter?:string,page?:number,size?:number):Observable<IApiResponse>{
    return this.http.get<IApiResponse>(`${environment.api}/docente?filter=${filter}&page=${page}&size=${size}`);
  }

  //Agregar docente
  add(teacher:ITeacher):Observable<IApiResponse>{
    return this.http.post<IApiResponse>(`${environment.api}/docente`,teacher)
  }

  //Modificar docente
  update(teacher:ITeacher):Observable<IApiResponse>{
    return this.http.put<IApiResponse>(`${environment.api}/docente`,teacher);
  }

  //Eliminar docente
  delete(id:string):Observable<IApiResponse>{
    return this.http.delete<IApiResponse>(`${environment.api}/docente/`+id);
  }
}
