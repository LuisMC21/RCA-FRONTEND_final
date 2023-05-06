import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponse } from 'src/app/core/interfaces/apiResonse.interface';
import { IResponse } from 'src/app/core/interfaces/response';
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
   //Agregar clase
   add(clase:IClase):Observable<IResponse>{
    console.log(clase)
    return this.http.post<IResponse>(`${environment.api}/clase`,clase)
  }
    //Modificar clase
    update(clase:IClase):Observable<IResponse>{
      return this.http.put<IResponse>(`${environment.api}/clase`,clase);
    }

    
  //Eliminar clase
  delete(id:string):Observable<IResponse>{
    return this.http.delete<IResponse>(`${environment.api}/clase`+id);
  }
}
