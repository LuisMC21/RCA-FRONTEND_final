import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/features/auth/commons/services/auth.service';
import { IAsegurado } from 'src/app/features/home/interfaces/asegurado';
import { IAsignacion } from 'src/app/features/home/interfaces/asignacion';
import { ILlamada } from 'src/app/features/home/interfaces/llamada';
import { IVoluntario } from 'src/app/features/home/interfaces/voluntario';
import { AseguradoService } from '../../../services/asegurado.service';
import { EmitterService } from '../../../services/emitter.service';
import { LlamadaService } from '../../../services/llamada.service';
import { VoluntarioService } from '../../../services/voluntario.service';
import { DialogLlamadasComponent } from '../../dialog/dialog-llamadas/dialog-llamadas.component';

@Component({
  selector: 'app-table-mis-asegurados',
  templateUrl: './table-mis-asegurados.component.html',
  styleUrls: ['./table-mis-asegurados.component.scss']
})
export class TableMisAseguradosComponent implements OnInit {

  asegurados:IAsegurado[]=[]

  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'determinate';
  value = 50;
  // MatPaginator Inputs
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  // MatPaginator Output
  pageEvent!: PageEvent;
  asegurado!:IAsegurado;
  llamadas:ILlamada[]=[];
  asignacion:IAsignacion[]=[];

  constructor( private router:Router,
    private dialog:MatDialog,
    private aseguradoService:AseguradoService,
    private authService:AuthService,
    private voluntarioService:VoluntarioService,
    private llamadaService: LlamadaService) { }

  ngOnInit(): void {
    this.aseguradoService.selectAsegurado$.subscribe(response =>{
      this.asegurado = response;
    })
    this.getAseguradosFilter();
  }

  //FILTRAMOS LOS ASEGURADOS DE VOLUNTARIOS
  getAseguradosFilter(){
    let personaId= this.authService.currentUser.value.persona.id;
    this.voluntarioService.isVoluntario(personaId).subscribe(response =>{
      let voluntarioId = response.data.id;
      this.aseguradoService.getAsignacionFilter(voluntarioId,0,20,'').subscribe(response =>{
        this.asignacion = response.data.list;
      })
    })
  }
  
 

  redirectTo(item:IAsignacion){
    
    localStorage.setItem('asignacion', JSON.stringify(item))
    this.router.navigateByUrl('home/registro-llamadas');
  }
   //Modal llamadas
   dialogLlamadas(item:IAsignacion){
    const dialogRef = this.dialog.open(DialogLlamadasComponent, {
      width: '850px',
      height:"auto",
      data: {title: "Llamadas realizadas", asignacion: item}
    });

    dialogRef.afterClosed().subscribe(result => {
    });
   
  }
}
