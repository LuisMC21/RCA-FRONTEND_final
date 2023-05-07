import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponse } from 'src/app/core/interfaces/apiResonse.interface';
import { IResponse } from 'src/app/core/interfaces/response';
import { environment } from 'src/environments/environment';
import { ICourse } from '../../interfaces/course';


@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) { }
//Listar Cursos
  getAll(nom?:string,page?:number,size?:number):Observable<IApiResponse>{
    
    return this.http.get<IApiResponse>(`${environment.api}/curso?page=${page}&size=${size}`);
  }

  //Agregar curso
  add(course:ICourse):Observable<IResponse>{
    console.log(course)
    return this.http.post<IResponse>(`${environment.api}/curso`,course)
  }
  
  update(course:ICourse):Observable<IResponse>{
    return this.http.put<IResponse>(`${environment.api}/curso`,course);
  }

  //Eliminar curso
  delete(id:string):Observable<IResponse>{
    return this.http.delete<IResponse>(`${environment.api}/curso/`+id);
  }
  
}
