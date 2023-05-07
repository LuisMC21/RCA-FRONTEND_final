import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IApiResponse } from 'src/app/core/interfaces/apiResonse.interface';
import { IResponse } from 'src/app/core/interfaces/response';
import { environment } from 'src/environments/environment';
import { IParent } from '../../interfaces/parent';

@Injectable({
  providedIn: 'root'
})
export class ParentService {

  modalAddShow:Subject<boolean> = new Subject<boolean>();
  
  constructor(private http: HttpClient ) { }

  //Listar apoderado
  getAll(nom?:string,page?:number,size?:number):Observable<IApiResponse>{
    return this.http.get<IApiResponse>(`${environment.api}/apoderado?page=${page}&size=${size}`);
    
  }
  //Buscar apoderado
  findById(id:string):Observable<IParent>{
    return this.http.get<IParent>(`${environment.api}/apoderado`+id);
  }
  //Agregar apoderado
  add(parent:IParent):Observable<IApiResponse>{
    return this.http.post<IApiResponse>(`${environment.api}/apoderado`,parent)
  }

  //Modificar apoderado
  update(parent:IParent):Observable<IApiResponse>{
    return this.http.put<IApiResponse>(`${environment.api}/apoderado`,parent);
  }

  //Eliminar apoderado
  delete(id:string):Observable<IApiResponse>{
    return this.http.delete<IApiResponse>(`${environment.api}/apoderado/`+id);
  }
}

