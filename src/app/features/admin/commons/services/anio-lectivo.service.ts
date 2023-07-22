import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponse } from 'src/app/core/interfaces/apiResonse.interface';
import { IResponse } from 'src/app/core/interfaces/response';
import { environment } from 'src/environments/environment';
import { IAnioLectivo } from '../../interfaces/anio-lectivo';


@Injectable({
  providedIn: 'root'
})
export class AnioLectivoService {

  constructor(private http: HttpClient) { }
  //Listar 
  getAll(filter?: string, page?: number, size?: number): Observable<IApiResponse> {
    return this.http.get<IApiResponse>(`${environment.api}/aniolectivo?filter=${filter}&page=${page}&size=${size}`);
  }


  //Agregar 
  add(aniolectivo: IAnioLectivo): Observable<IApiResponse> {
    return this.http.post<IApiResponse>(`${environment.api}/aniolectivo`, aniolectivo)
  }

  //Modificar  
  update(aniolectivo: IAnioLectivo): Observable<IApiResponse> {
    return this.http.put<IApiResponse>(`${environment.api}/aniolectivo`, aniolectivo);
  }

  //Eliminar 
  delete(id: string): Observable<IApiResponse> {
    return this.http.delete<IApiResponse>(`${environment.api}/aniolectivo/` + id);
  }
}
