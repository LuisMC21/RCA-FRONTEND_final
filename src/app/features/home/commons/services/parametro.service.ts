import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IParametro } from '../../interfaces/parametro';
import { IApiResponse } from 'src/app/core/interfaces/api-response';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ParametroService {

  constructor(private http:HttpClient) { }
  
  getPreguntasTest(tipo:string):Observable<IApiResponse>{
    return this.http.get<IApiResponse>(`${environment.api}/parametro?filter=${tipo}`)
  }
}


