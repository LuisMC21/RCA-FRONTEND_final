import { Component, OnInit } from '@angular/core';
import { AseguradoService } from '../../commons/services/asegurado.service';
import { DatosService } from '../../commons/services/datos.service';
import { IAsegurado } from '../../interfaces/asegurado';

@Component({
  selector: 'app-mis-asegurados',
  templateUrl: './mis-asegurados.view.html',
  styleUrls: ['./mis-asegurados.view.scss']
})
export class MisAseguradosView implements OnInit {

  asegurados: any[]=[]

  constructor(
    private aseguradoService:AseguradoService) { }

  ngOnInit(): void {
    this.getAsegurados();
  }

  getAsegurados(){
    // this.aseguradosService.getAll('',0,20).subscribe(response =>{
    //   this.asegurados = response.data;
    // })

    this.asegurados = [{ 
        id:1,tipoDocumento:1,numDocumento:"75489568",nombre:"Juan Francisco",apellidoPat:"Flores",apellidoMat:"Galán",
        cam:"1",celular:"78965478",direccionAct:"Jorge Chavez 456",correo:"flores9819@outlook.es",
        preferenciaLit:"Terror",diaLectura:"Martes",horaLectura:"3.00 pm",estado:"estado1"
      },{ 
        id:2,tipoDocumento:1,numDocumento:"75489568",nombre:"Juan Francisco",apellidoPat:"Flores",apellidoMat:"Galán",
        cam:"1",celular:"78965478",direccionAct:"Jorge Chavez 456",correo:"flores9819@outlook.es",
        preferenciaLit:"Terror",diaLectura:"Martes",horaLectura:"3.00 pm",estado:"estado1"
      },{ 
        id:3,tipoDocumento:1,numDocumento:"75489568",nombre:"Juan Francisco",apellidoPat:"Flores",apellidoMat:"Galán",
        cam:"1",celular:"78965478",direccionAct:"Jorge Chavez 456",correo:"flores9819@outlook.es",
        preferenciaLit:"Terror",diaLectura:"Martes",horaLectura:"3.00 pm",estado:"estado1"
      }
    ]
  }
}
