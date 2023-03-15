import { HttpClient } from '@angular/common/http';
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
//Listar Asistencia
getAll(nom?:string,page?:number,size?:number):Observable<IApiResponse>{
    
  return this.http.get<IApiResponse>(`${environment.api}/asistencia?page=${page}&size=${size}`);
}
  //Agregar asistencia
  add(asistencia:IAsistencia):Observable<IResponse>{
    console.log(asistencia)
    return this.http.post<IResponse>(`${environment.api}/asistencia`,asistencia)
  }

  //Modificar asistencia
  update(asistencia:IAsistencia):Observable<IResponse>{
    return this.http.put<IResponse>(`${environment.api}/asistencia`,asistencia);
  }

  //Eliminar asistencia
  delete(id:string):Observable<IResponse>{
    return this.http.delete<IResponse>(`${environment.api}/asistencia`+id);
  }
  
}
