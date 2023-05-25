import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponse } from 'src/app/core/interfaces/apiResonse.interface';
import { Image } from 'src/app/core/interfaces/image';
import { IResponse } from 'src/app/core/interfaces/response';
import { environment } from 'src/environments/environment';
import { INews } from '../../interfaces/news';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) { }

  getAll(titulo:string,page:number, size:number):Observable<IApiResponse>{
    return this.http.get<IApiResponse>(`${environment.api}/noticia?page=${page}&size=${size}`)
  }

  add(news: INews): Observable<IApiResponse> {
    return this.http.post<IApiResponse>(`${environment.api}/noticia`, news);
  }

  update(news:INews){
    return this.http.put<IApiResponse>(`${environment.api}/noticia`,news)
  }

  //Eliminar 
  delete(id:string):Observable<IApiResponse>{
    return this.http.delete<IApiResponse>(`${environment.api}/noticia/`+id);
  }

  //imagen

  addImg(multipartFile:any):Observable<Image>{
    return this.http.post<Image>(`${environment.api}/noticia/img`,multipartFile)
  }
}
