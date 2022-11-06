import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IApiResponse } from 'src/app/core/interfaces/api-response';
import { environment } from 'src/environments/environment';
import { IAsegurado } from '../../interfaces/asegurado';


@Injectable({
  providedIn: 'root'
})
export class AseguradoService {
  
  initAsegurado!: IAsegurado;
  private asegurado$ = new BehaviorSubject<IAsegurado>(this.initAsegurado);

  constructor(private http:HttpClient) { }

  get selectAsegurado$():Observable<IAsegurado>{
    return this.asegurado$.asObservable();
  }

  setAsegurado(asegurado: IAsegurado){
    this.asegurado$.next(asegurado);
  }

  getAll(filter:string, page:number, size:number):Observable<IApiResponse>{
      return this.http.get<IApiResponse>(`${environment.api}/asegurados?filter=${filter}&page=${page}&size=${size}`);
  }

  getAsignacionFilter(voluntarioId:number, page:number, size:number, filter?:string):Observable<IApiResponse>{
    return this.http.get<IApiResponse>(`${environment.api}/asignacion/filter?voluntarioId=${voluntarioId}&page=${page}&size=${size}&filter=${filter}`)
  }
}
