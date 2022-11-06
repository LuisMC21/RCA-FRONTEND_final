import { EventEmitter, Injectable, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IAsegurado } from '../../interfaces/asegurado';

@Injectable({
  providedIn: 'root'
})
export class DatosService {

  asegurado:any
  
  constructor() { }
}
