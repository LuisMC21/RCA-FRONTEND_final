import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponse } from 'src/app/core/interfaces/apiResonse.interface';
import { environment } from 'src/environments/environment';
import { IEvaluacion } from '../../interfaces/evaluacion';
import { TokenService } from 'src/app/features/auth/commons/services/token.service';

@Injectable({
  providedIn: 'root'
})
export class EvaluacionService {
  token = this.tokenService.getToken();

  constructor(private http: HttpClient, private tokenService: TokenService) {
   }


  getAll(nom?:string, page?:number, size?: number): Observable<IApiResponse>{
    return this.http.get<IApiResponse>(`${environment.api}/evaluacion?filter=${nom}&page=${page}&size=${size}`);
  }

  getAllPeriodoAulaCurso(nom?:string, page?:number, size?: number, periodo?:string, aula?:string, curso?:string): Observable<IApiResponse>{
    return this.http.get<IApiResponse>(`${environment.api}/evaluacion/epac?page=${page}&size=${size}&periodo=${periodo}&aula=${aula}&curso=${curso}`);
  }

  getAllPeriodoAlumno(nom?:string, page?:number, size?: number, periodo?:string, alumno?:string): Observable<IApiResponse>{
    return this.http.get<IApiResponse>(`${environment.api}/evaluacion/epwal?filter=${nom}&page=${page}&size=${size}&periodo=${periodo}&alumno=${alumno}`);
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

  reporteBoletaNotas(id_alumno: string, id_periodo:string){
    const url = `${environment.api}/evaluacion/boletaNotas?periodo=${id_periodo}&alumno=${id_alumno}`;
    this.http.get(url, {
      headers: {
        Authorization: `Bearer ${this.token}`
      },
      responseType: 'blob' // Indicamos que esperamos una respuesta de tipo blob
    }).subscribe({
      next: (response) => {
        // Crear una URL del objeto Blob
        const fileURL = URL.createObjectURL(response);
        // Abrir el archivo PDF en una nueva pestaña o ventana
        window.open(fileURL);
      },
      error: (error) => {
        // Manejar cualquier error que ocurra durante la solicitud
        console.error(error);
      }
    })
  }

  reporteNotasCurso(id_periodo:string, id_curso:string, id_aula:string){
      const url = `${environment.api}/evaluacion/cursoNotas?periodo=${id_periodo}&curso=${id_curso}&aula=${id_aula}`;
      this.http.get(url, {
        headers: {
          Authorization: `Bearer ${this.token}`
        },
        responseType: 'blob' // Indicamos que esperamos una respuesta de tipo blob
      }).subscribe({
        next: (response) => {
          // Crear una URL del objeto Blob
          const fileURL = URL.createObjectURL(response);
          // Abrir el archivo PDF en una nueva pestaña o ventana
          window.open(fileURL);
        },
        error: (error) => {
          // Manejar cualquier error que ocurra durante la solicitud
          console.error(error);
        }
      });
  }
}
