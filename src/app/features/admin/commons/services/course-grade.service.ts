import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponse } from 'src/app/core/interfaces/apiResonse.interface';
import { IResponse } from 'src/app/core/interfaces/response';
import { environment } from 'src/environments/environment';
import { ICourseGrade } from '../../interfaces/course-grade';

@Injectable({
  providedIn: 'root'
})
export class CourseGradeService {

  constructor(private http:HttpClient) { }
  //Listar 
  getAll(nom?:string,page?:number,size?:number):Observable<IApiResponse>{
    return this.http.get<IApiResponse>(`${environment.api}/cursoxgrado/?page=${page}&size=${size}&nom=`+nom);
  }

  //Agregar 
  add(courseGrade:ICourseGrade):Observable<IResponse>{
    return this.http.post<IResponse>(`${environment.api}/cursoxgrado/`,courseGrade)
  }

  //Modificar 
  update(courseGrade:ICourseGrade):Observable<IResponse>{
    return this.http.put<IResponse>(`${environment.api}/cursoxgrado/`,courseGrade);
  }

  //Eliminar 
  delete(id:string):Observable<IResponse>{
    return this.http.delete<IResponse>(`${environment.api}/cursoxgrado/`+id);
  }
}

