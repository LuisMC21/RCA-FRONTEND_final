import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponse } from 'src/app/core/interfaces/apiResonse.interface';
import { Image } from 'src/app/core/interfaces/image';
import { IResponse } from 'src/app/core/interfaces/response';
import { environment } from 'src/environments/environment';
import { INews } from '../../features/admin/interfaces/news';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) { }

  get(titulo:string,page:number, size:number):Observable<IApiResponse>{
    return this.http.get<IApiResponse>(`${environment.api}/noticia/?page=${page}&size=${size}&titulo=`+titulo)
  }

  add(news:INews, imgNew:string):Observable<IResponse>{
    console.log(`${environment.api}/noticia/noticia?nombre=${imgNew}`)
    return this.http.post<IResponse>(`${environment.api}/noticia/noticia?nombre=${imgNew}`,news);
  }

  update(news:INews){
    return this.http.put<IResponse>(`${environment.api}/noticia/noticia/`,news)
  }

  //Eliminar 
  delete(id:string):Observable<IResponse>{
    return this.http.delete<IResponse>(`${environment.api}/noticia/`+id);
  }

  //imagen

  addImg(multipartFile:any):Observable<Image>{
    return this.http.post<Image>(`${environment.api}/noticia/img`,multipartFile)
  }
}
