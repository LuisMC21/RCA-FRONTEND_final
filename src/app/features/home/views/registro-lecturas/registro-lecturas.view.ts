import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { LlamadaService } from '../../commons/services/llamada.service';
import { ILlamada } from '../../interfaces/llamada';

@Component({
  selector: 'app-registro-lecturas',
  templateUrl: './registro-lecturas.view.html',
  styleUrls: ['./registro-lecturas.view.scss']
})
export class RegistroLecturasView implements OnInit {

  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  // MatPaginator Output
  pageEvent!: PageEvent;
  llamadas:ILlamada[]=[]

  formFilter!:FormGroup;
  constructor(private formBuider:FormBuilder,
              private llamadaService:LlamadaService) { }

  ngOnInit(): void {
    this.formInit();
    this.getLecturas();
  }

  formInit(){
    this.formFilter = this.formBuider.group({
      fechaInicio:[new Date()],
      fechaFin:[new Date()]
    })
  }

  get fechaInicio(){return this.formFilter.get('fechaInicio')}
  get fechaFin(){return this.formFilter.get('fechaFin')}

  getLecturas(){
    this.llamadaService.getLLamadasLecturas(0,20,this.fechaInicio?.value,this.fechaFin?.value).subscribe(response =>{
      this.llamadas = response.data.list;
    })
  }

}
