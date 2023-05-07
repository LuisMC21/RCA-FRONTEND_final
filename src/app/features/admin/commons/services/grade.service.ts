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
    return this.http.get<IApiResponse>(`${environment.api}/grado?page=${page}&size=${size}`);
  }

  //Agregar 
  add(grade:IGrade):Observable<IApiResponse>{
    return this.http.post<IApiResponse>(`${environment.api}/grado`,grade)
  }

  //Modificar 
  update(grade:IGrade):Observable<IApiResponse>{
    return this.http.put<IApiResponse>(`${environment.api}/grado`,grade);
  }

  //Eliminar 
  delete(id:string):Observable<IApiResponse>{
    return this.http.delete<IApiResponse>(`${environment.api}/grado/`+id);
  }
}
