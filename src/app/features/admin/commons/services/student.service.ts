import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IApiResponse } from 'src/app/core/interfaces/apiResonse.interface';
import { environment } from 'src/environments/environment';
import { IStudent } from '../../interfaces/student';
import { TokenService } from 'src/app/features/auth/commons/services/token.service';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  token = this.tokenService.getToken();

  constructor(private http: HttpClient, private tokenService: TokenService) { }
  getOne(id:string):Observable<IApiResponse>{
    return this.http.get<IApiResponse>(`${environment.api}/alumno/${id}`);
  }
  getAlumnosCount(filter: string): Observable<number> {
    return this.http.get<IApiResponse>(`${environment.api}/alumno?filter=${filter}`).pipe(
      map(response => response.data.countFilter)
    );
  }
  //Listar alumnos
  getAll(filter?:string,page?:number,size?:number):Observable<IApiResponse>{
    return this.http.get<IApiResponse>(`${environment.api}/alumno?filter=${filter}&page=${page}&size=${size}`);
  }

  getAllAnioCursoAula(filter?:string, anio?:string, aula?:string, curso?:string,page?:number,size?:number):Observable<IApiResponse>{
    return this.http.get<IApiResponse>(`${environment.api}/alumno/auc?filter=${filter}&page=${page}&size=${size}&anio=${anio}&aula=${aula}&curso=${curso}`);
  }


  //Agregar alumno
  add(student:IStudent):Observable<IApiResponse>{
    console.log(student)
    return this.http.post<IApiResponse>(`${environment.api}/alumno`,student)
  }

  //Modificar alumno
  update(student:IStudent):Observable<IApiResponse>{
    return this.http.put<IApiResponse>(`${environment.api}/alumno`,student);
  }

  //Eliminar alumno
  delete(id:string):Observable<IApiResponse>{
    return this.http.delete<IApiResponse>(`${environment.api}/alumno/`+id);
  }

  getReporteDatosPersonales(id_alumno:string){
    const url = `${environment.api}/alumno/datosPersonales?uniqueIdentifier=${id_alumno}`;
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

}
