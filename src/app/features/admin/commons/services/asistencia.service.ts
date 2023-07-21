import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponse } from 'src/app/core/interfaces/apiResonse.interface';
import { IResponse } from 'src/app/core/interfaces/response';
import { environment } from 'src/environments/environment';
import { IAsistencia } from '../../interfaces/asistencia';
import { TokenService } from 'src/app/features/auth/commons/services/token.service';


@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {

  constructor(private http: HttpClient, private tokenService: TokenService) { }


  getAsistenciasByFilters(nom?: string, page?: number, size?: number, periodo?: string, aula?: string, curso?: string): Observable<IApiResponse> {
    return this.http.get<IApiResponse>(`${environment.api}/asistencia/apac?filter=${nom}&page=${page}&size=${size}&periodo=${periodo}&aula=${aula}&curso=${curso}`);
  }
  //Listar Asistencia
  getAll(nom?: string, page?: number, size?: number): Observable<IApiResponse> {
    return this.http.get<IApiResponse>(`${environment.api}/asistencia?page=${page}&size=${size}`);
  }

  getAllByClase(filter?: string, id_clase?:String, page?: number, size?: number): Observable<IApiResponse> {
    return this.http.get<IApiResponse>(`${environment.api}/asistencia/asbyclase?filter=${filter}&id_clase=${id_clase}&page=${page}&size=${size}`);
  }

  getAllPeriodoAlumnoCurso(filter?: string, page?: number, size?: number, periodo?: string, alumno?: string, curso?: string): Observable<IApiResponse> {
    return this.http.get<IApiResponse>(`${environment.api}/asistencia/asfc?filter=${filter}&page=${page}&size=${size}&periodo=${periodo}&alumno=${alumno}&curso=${curso}`);
  }

  getAllPeriodoAulaCursoClase(filter?: string, page?: number, size?: number, periodo?: string, aula?: string, curso?: string, clase?:string): Observable<IApiResponse> {
    return this.http.get<IApiResponse>(`${environment.api}/asistencia/asbypacc?filter=${filter}&page=${page}&size=${size}&periodo=${periodo}&aula=${aula}&curso=${curso}&clase=${clase}`);
  }
  

  //Agregar asistencia
  add(asistencia?: IAsistencia): Observable<IApiResponse> {
    return this.http.post<IApiResponse>(`${environment.api}/asistencia`, asistencia)
  }
  //Modificar asistencia
  update(asistencia?: IAsistencia): Observable<IApiResponse> {
    return this.http.put<IApiResponse>(`${environment.api}/asistencia`, asistencia);
  }
  //Eliminar asistencia
  delete(id: string): Observable<IApiResponse> {
    return this.http.delete<IApiResponse>(`${environment.api}/asistencia/` + id);
  }

  exportAsistAula(id_curso: string, id_aula: string, id_aniolectivo: string) {
    const token = this.tokenService.getToken();
    const url = `${environment.api}/asistencia/exportAsistAula?id_curso=${id_curso}&id_aula=${id_aula}&id_aniolectivo=${id_aniolectivo}`;
    this.http.get(url, {
      headers: {
        Authorization: `Bearer ${token}`
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
  exportAsistClase(id_clase: string) {

    const token = this.tokenService.getToken();
    const url = `${environment.api}/asistencia/exportAsistClase?id_clase=${id_clase}`
    this.http.get(url, {
      headers: {
        Authorization: `Bearer ${token}`
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

}
