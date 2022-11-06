import { Component, OnInit } from '@angular/core';
import { LibroService } from '../../commons/services/libro.service';
import { ILibro } from '../../interfaces/libro';
import { DatePipe } from '@angular/common';
import { AseguradoService } from '../../commons/services/asegurado.service';
import { IAsignacion } from '../../interfaces/asignacion';
import { EmitterService } from '../../commons/services/emitter.service';

@Component({
  selector: 'app-registro-llamadas',
  templateUrl: './registro-llamadas.view.html',
  styleUrls: ['./registro-llamadas.view.scss']
})
export class RegistroLlamadasView implements OnInit {

  libros!:ILibro[];
  asegurado$ = this.aseguradoService.selectAsegurado$;
  asignacion!:IAsignacion;
  testPresent:boolean=false;

  constructor(
    private aseguradoService:AseguradoService,
    private libroService:LibroService,
    private datePipe: DatePipe,
    private emittService:EmitterService
    ) { }

  ngOnInit(): void {
    this.getLibros();
    this.asignacion= JSON.parse(localStorage.getItem('asignacion')||JSON.stringify(''));
  }
  transformDate(date: Date): string {
    return this.datePipe.transform(date, 'yyyy-MM-dd') + ' 00:00:00';
  }


  //GET FILTERS
  getLibros(){
    this.libroService.getAll('',0,20).subscribe(response=>{
      this.libros =  response.data.list;
    })
  }
}
