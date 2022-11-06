import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ITest } from '../../interfaces/test';
import { Observable } from 'rxjs';
import { IApiResponse } from 'src/app/core/interfaces/api-response';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http:HttpClient) { }

  save(list:ITest[]):Observable<IApiResponse>{
    return this.http.post<IApiResponse>(`${environment.api}/test`,list)
  }
}
