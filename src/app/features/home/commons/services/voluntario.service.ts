import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { IApiResponse } from 'src/app/core/interfaces/api-response';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VoluntarioService {

  constructor(private http:HttpClient) { }

  isVoluntario(idPersona:number):Observable<IApiResponse>{
    return this.http.get<IApiResponse>(`${environment.api}/voluntario?idPersona=${idPersona}`)
  } 
}
