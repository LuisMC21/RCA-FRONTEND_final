import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IApiResponse } from 'src/app/core/interfaces/api-response';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LibroService {

  constructor(private http:HttpClient) {}

  getAll(filter:string, page:number, size:number):Observable<IApiResponse>{
    return this.http.get<IApiResponse>(`${environment.api}/libros?filter=${filter}&page=${page}&size=${size}`);
  }

}
