import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponse } from 'src/app/core/interfaces/apiResonse.interface';
import { IResponse } from 'src/app/core/interfaces/response';
import { environment } from 'src/environments/environment';
import { ITeacher } from '../../interfaces/teacher';


@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(private http: HttpClient) { }

   //Listar Docente
  getAll(nom?:string,page?:number,size?:number):Observable<IApiResponse>{
    return this.http.get<IApiResponse>(`${environment.api}/docente/?page=${page}&size=${size}&nom=`+nom);
  }

  //Agregar docente
  add(teacher:ITeacher):Observable<IResponse>{
    console.log(teacher)
    return this.http.post<IResponse>(`${environment.api}/docente/`,teacher)
  }

  //Modificar docente
  update(teacher:ITeacher):Observable<IResponse>{
    return this.http.put<IResponse>(`${environment.api}/docente/`,teacher);
  }

  //Eliminar docente
  delete(id:string):Observable<IResponse>{
    return this.http.delete<IResponse>(`${environment.api}/docente/`+id);
  }
}
