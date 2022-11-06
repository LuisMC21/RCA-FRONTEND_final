import { Output,Injectable,EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IAsignacion } from '../../interfaces/asignacion';

@Injectable({
  providedIn: 'root'
})
export class EmitterService {

asignacion!:IAsignacion;

  @Output() emitterAsignacion: EventEmitter<any> = new EventEmitter();
  private asignacionEmitter = new BehaviorSubject<IAsignacion>( this.asignacion );
  public customAsignacion = this.asignacionEmitter.asObservable();

  public idLlamada = new BehaviorSubject<number>(0);

  constructor() { }

  public changeIdLlamada(idLlamada:number){
    this.idLlamada.next(idLlamada)
  }

  public changeAsignacion(asignacion: IAsignacion): void {
    this.asignacionEmitter.next(asignacion);
  }
}
