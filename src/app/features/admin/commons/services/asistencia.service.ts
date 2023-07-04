import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponse } from 'src/app/core/interfaces/apiResonse.interface';
import { IResponse } from 'src/app/core/interfaces/response';
import { environment } from 'src/environments/environment';
import { IAsistencia } from '../../interfaces/asistencia';


@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {

  constructor(private http: HttpClient) { }


  getAsistenciasByFilters(nom?:string,page?:number,size?:number, periodo?: string, aula?: string, curso?:string): Observable<IApiResponse> {
    return this.http.get<IApiResponse>(`${environment.api}/asistencia/apac?filter=${nom}&page=${page}&size=${size}&periodo=${periodo}&aula=${aula}&curso=${curso}`);
  }
  //Listar Asistencia
  getAll(nom?:string,page?:number,size?:number):Observable<IApiResponse>{
    return this.http.get<IApiResponse>(`${environment.api}/asistencia?page=${page}&size=${size}`);
  }

  getAllPeriodoAlumnoCurso(nom?:string,page?:number,size?:number, periodo?:string, alumno?:string,curso?:string):Observable<IApiResponse>{
    return this.http.get<IApiResponse>(`${environment.api}/asistencia/asfc?page=${page}&size=${size}&periodo=${periodo}&alumno=${alumno}&curso=${curso}`);
  }

  //Agregar asistencia
  add(asistencia?:IAsistencia):Observable<IApiResponse>{
    return this.http.post<IApiResponse>(`${environment.api}/asistencia`,asistencia)
  }
  //Modificar asistencia
  update(asistencia?:IAsistencia):Observable<IApiResponse>{
    return this.http.put<IApiResponse>(`${environment.api}/asistencia`,asistencia);
  }
  //Eliminar asistencia
  delete(id:string):Observable<IApiResponse>{
    return this.http.delete<IApiResponse>(`${environment.api}/asistencia/`+id);
  }
  
}
