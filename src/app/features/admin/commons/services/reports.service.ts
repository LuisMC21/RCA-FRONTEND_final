import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponse } from 'src/app/core/interfaces/apiResonse.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(private http:HttpClient) { }

  //Alumnos matriculados
  matGrado(iden?:string,page?:number,size?:number,opcion?:boolean):Observable<IApiResponse>{
    console.log(`${environment.api}/alumno/matGradoXLSX?iden=${iden}&page=${page}&size=${size}&opcion=`+opcion)
    return this.http.get<IApiResponse>(`${environment.api}/alumno/matGradoXLSX?iden=${iden}&page=${page}&size=${size}&opcion=`+opcion);
  }
  //Alumnos matriculados (Excel)
  matGradoExcel(iden?:string,page?:number,size?:number,opcion?:boolean):Observable<any>{
    console.log(`${environment.api}/alumno/matGradoXLSX?iden=${iden}&page=${page}&size=${size}&opcion=`+opcion)
    const headers = new HttpHeaders().set('Content-Type','text/plain')
    return this.http.get(`${environment.api}/alumno/matGradoXLSX?iden=${iden}&page=${page}&size=${size}&opcion=`+opcion,{ headers, responseType:'blob'as 'json'});
  }

  //Curso por grado
  curGradoXLSX(iden?:string,page?:number,size?:number,opcion?:boolean):Observable<IApiResponse>{
    return this.http.get<IApiResponse>(`${environment.api}/curso/curGradoXLSX?iden=${iden}&page=${page}&size=${size}&opcion=`+opcion);
  }
  //Curso por grado (Excel)
  curGradoXLSXExcel(iden?:string,page?:number,size?:number,opcion?:boolean):Observable<any>{
    const headers = new HttpHeaders().set('Content-Type','text/plain')
    return this.http.get(`${environment.api}/curso/curGradoXLSX?iden=${iden}&page=${page}&size=${size}&opcion=`+opcion, { headers, responseType:'blob'as 'json'});
  }
}
