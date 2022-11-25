import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponse } from 'src/app/core/interfaces/apiResonse.interface';
import { IResponse } from 'src/app/core/interfaces/response';
import { environment } from 'src/environments/environment';
import { IGrade } from '../../interfaces/grade';

@Injectable({
  providedIn: 'root'
})
export class GradeService {

  constructor(private http: HttpClient) { }

  //Listar 
  getAll(nom?:string,page?:number,size?:number):Observable<IApiResponse>{
    return this.http.get<IApiResponse>(`${environment.api}/grado/?page=${page}&size=${size}&nom=`+nom);
  }

  //Agregar 
  add(course:IGrade):Observable<IResponse>{
    console.log(course)
    return this.http.post<IResponse>(`${environment.api}/grado/`,course)
  }

  //Modificar 
  update(course:IGrade):Observable<IResponse>{
    return this.http.put<IResponse>(`${environment.api}/grado/`,course);
  }

  //Eliminar 
  delete(id:string):Observable<IResponse>{
    return this.http.delete<IResponse>(`${environment.api}/grado/`+id);
  }
}
