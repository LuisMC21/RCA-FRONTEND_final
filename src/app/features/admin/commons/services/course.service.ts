import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,map } from 'rxjs';
import { IApiResponse } from 'src/app/core/interfaces/apiResonse.interface';
import { IResponse } from 'src/app/core/interfaces/response';
import { environment } from 'src/environments/environment';
import { ICourse } from '../../interfaces/course';


@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) { }
  getCursoCount(filter: string): Observable<number> {
    return this.http.get<IApiResponse>(`${environment.api}/curso?filter=${filter}`).pipe(
      map(response => response.data.countFilter)
    );
  }
//Listar Cursos
  getAll(nom?:string,page?:number,size?:number):Observable<IApiResponse>{
    
    return this.http.get<IApiResponse>(`${environment.api}/curso?page=${page}&size=${size}`);
  }

  //Agregar curso
  add(course:ICourse):Observable<IApiResponse>{
    console.log(course)
    return this.http.post<IApiResponse>(`${environment.api}/curso`,course)
  }
  
  update(course:ICourse):Observable<IApiResponse>{
    return this.http.put<IApiResponse>(`${environment.api}/curso`,course);
  }

  //Eliminar curso
  delete(id:string):Observable<IApiResponse>{
    return this.http.delete<IApiResponse>(`${environment.api}/curso/`+id);
  }
  
}
