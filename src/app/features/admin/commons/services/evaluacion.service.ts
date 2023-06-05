import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponse } from 'src/app/core/interfaces/apiResonse.interface';
import { environment } from 'src/environments/environment';
import { IEvaluacion } from '../../interfaces/evaluacion';

@Injectable({
  providedIn: 'root'
})
export class EvaluacionService {

  constructor(private http: HttpClient) { }

  getAll(nom?:string, page?:number, size?: number): Observable<IApiResponse>{
    return this.http.get<IApiResponse>(`${environment.api}/evaluacion?page=${page}&size=${size}`);
  }

  getAllPeriodoAulaCurso(nom?:string, page?:number, size?: number, periodo?:string, aula?:string, curso?:string): Observable<IApiResponse>{
    return this.http.get<IApiResponse>(`${environment.api}/evaluacion/epac?page=${page}&size=${size}&periodo=${periodo}&aula=${aula}&curso=${curso}`);
  }

  //add
  add(evaluacion?: IEvaluacion):Observable<IApiResponse>{
    return this.http.post<IApiResponse>(`${environment.api}/evaluacion`, evaluacion);
  }

  //update
  update(evaluacion?: IEvaluacion):Observable<IApiResponse>{
    return this.http.put<IApiResponse>(`${environment.api}/evaluacion`, evaluacion);
  }

  //delete
  delete(id: string):Observable<IApiResponse>{
    return this.http.delete<IApiResponse>(`${environment.api}/evaluacion/` + id);
  }
}
