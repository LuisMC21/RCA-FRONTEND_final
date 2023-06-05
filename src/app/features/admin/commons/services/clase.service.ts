import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponse } from 'src/app/core/interfaces/apiResonse.interface';
import { environment } from 'src/environments/environment';
import { IClase } from '../../interfaces/clase';

@Injectable({
  providedIn: 'root'
})
export class ClaseService {

  constructor(private http: HttpClient) { }
  //Listar Clases
  getAll(nom?:string,page?:number,size?:number):Observable<IApiResponse>{
    
    return this.http.get<IApiResponse>(`${environment.api}/clase?page=${page}&size=${size}`);
  }

  getAllPeriodoAulaCurso(nom?:string,page?:number,size?:number, periodo?:string, aula?:string, curso?:string):Observable<IApiResponse>{
    
    return this.http.get<IApiResponse>(`${environment.api}/clase?page=${page}&size=${size}`);
  }

   //Agregar clase
   add(clase:IClase):Observable<IApiResponse>{
    console.log(clase)
    return this.http.post<IApiResponse>(`${environment.api}/clase`,clase)
  }
    //Modificar clase
    update(clase:IClase):Observable<IApiResponse>{
      return this.http.put<IApiResponse>(`${environment.api}/clase`,clase);
    }

    
  //Eliminar clase
  delete(id:string):Observable<IApiResponse>{
    return this.http.delete<IApiResponse>(`${environment.api}/clase/`+id);
  }
}
