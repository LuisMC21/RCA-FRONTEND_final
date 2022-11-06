import { DatePipe } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IApiResponse } from 'src/app/core/interfaces/api-response';
import { AuthService } from 'src/app/features/auth/commons/services/auth.service';
import { environment } from 'src/environments/environment';
import { IAsignacion } from '../../interfaces/asignacion';
import { ILlamada } from '../../interfaces/llamada';

@Injectable({
  providedIn: 'root'
})
export class LlamadaService {

  currentAsignacion: BehaviorSubject<IAsignacion>;
  nameUserLS:string = 'asignacion'
  
  constructor(private http: HttpClient,
    private authService: AuthService,
    private datePipe: DatePipe) { 
      this.currentAsignacion = new BehaviorSubject(
        JSON.parse(localStorage.getItem(this.nameUserLS)||'{}')
      )
    }

  transformDate(date: Date): string {
    return this.datePipe.transform(date, 'yyyy-MM-dd') +' 00:00:00';
  }
  
  transformDateEjm(date: Date): string {
    return this.datePipe.transform(date, 'yyyy-MM-dd HH:mm a')+ '';
  }

  transformDateFn(date: Date): string {
    return this.datePipe.transform(date, 'yyyy-MM-dd') +' 23:00:00';
  }
  transformTime(time: Date): string {
    return this.datePipe.transform(time, '') + 'HH:mm a';
  }
  setAsingacionLS(asignacion:IAsignacion){
    localStorage.setItem(this.nameUserLS,JSON.stringify(asignacion));
  }

  //Se filtran las llamadas por asegurado
  getAseguradoLlamada(page:number,size:number, asignacionId:number):Observable<IApiResponse>{
    return this.http.get<IApiResponse>(`${environment.api}/llamadas?asignacionId=${asignacionId}&page=${page}&size=${size}`);
  }

  getLLamadasLecturas(page:number,size:number,fechaInicio:Date,fechaFin:Date):Observable<IApiResponse>{
    
    let fechaIni = this.transformDate(fechaInicio)
    let fechaFn = this.transformDateFn(fechaFin)
    let params = new HttpParams();
    params=params.append('fechaInicio', fechaIni);
    params=params.append('fechaFin', fechaFn);
    params=params.append('page', page.toString());
    params=params.append('size', size.toString());

    return this.http.get<IApiResponse>(`${environment.api}/llamadas?${params}`)
  }


  //AGREGAR LLAMADA
  save(data: ILlamada): Observable<IApiResponse> {
    
console.log("hora inicio",data.horaInicio)
console.log("hora fin",data.horaFin)

    let toSave = {
      id: null,
      libroId: data.libro.id,
      asignacionId: data.asignacion,
      llamadaRealizada: data.llamadaRealizada,
      tipo: data.tipo,
      medio: data.medio,
      fechaLectura: this.transformDate(data.fechaLectura),
      userCreacion: this.authService.currentUser.value.userName,
      horaInicio:data.horaInicio,
      horaFin:data.horaFin,
      finLectura:data.finLectura,
      tiempoLeido: data.tiempoLeido,
      observaciones: data.observaciones
    }
    console.log("tosave",toSave);
    
    return this.http.post<IApiResponse>(`${environment.api}/llamadas`, toSave);
  }
}
