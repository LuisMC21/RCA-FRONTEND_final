import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from 'src/app/shared/components/modals/modal/modal.component';
import { AsistenciaService } from '../../commons/services/asistencia.service';
import { ClaseService } from '../../commons/services/clase.service';
import { PaginationService } from '../../commons/services/pagination.service';
import { StudentService } from '../../commons/services/student.service';
import { IAsistencia } from '../../interfaces/asistencia';
import { IClase } from '../../interfaces/clase';
import { IStudent } from '../../interfaces/student';
import { IAula } from '../../interfaces/aula';
import { AulaService } from '../../commons/services/aula.service';
import { IApiResponse } from 'src/app/core/interfaces/apiResonse.interface';
import { ICourse } from '../../interfaces/course';
import { IPeriod } from '../../interfaces/period';

@Component({
  selector: 'app-admin-asistencia',
  templateUrl: './admin-asistencia.component.html',
  styleUrls: ['./admin-asistencia.component.scss']
})
export class AdminAsistenciaComponent implements OnInit {
asistencia:IAsistencia[]=[];
student:IStudent[]=[];
clase:IClase[]=[];

classrooms: IAula[] = [];
courses:ICourse[]=[];
periodos:IPeriod[]=[];

tableName!: string;
paginationData = 'course'
msjResponse:string='';
successful: boolean=false;


  
  @ViewChild('modalOk') modalOk!:ModalComponent;



  constructor(
    private asistenciaService: AsistenciaService, 
    private pagination:PaginationService,
    private alumnoService:StudentService,
    private claseService:ClaseService,
    private aulaService:AulaService
  ) { }

  ngOnInit(): void {
    let page = this.pagination.getPage(this.paginationData);
    let size = this.pagination.getSize(this.paginationData);

    this.asistenciaService.getAll('', page,size)
    .subscribe(response =>{
      this.asistencia = response.data;
    });
    this.alumnoService.getAll('',0,5).subscribe(response =>{
      this.student = response.data;
    })

    this.claseService.getAll('',0,5).subscribe(response =>{
      this.clase = response.data;
    })
    this.aulaService.getAll('',0,5).subscribe(response =>{
      this.classrooms = response.data;
    })

    this.asistenciaService.getAsistenciasByFilters('periodo', 'aula', 'curso')
    .subscribe((response: IApiResponse) => {
      this.asistencia = response.data.list;
      console.log(this.asistencia)
    });
  }
    //Filtrar
    filtrarAsistencias(periodo: string, aula: string, curso: string): void {
      this.asistenciaService.getAsistenciasByFilters(periodo, aula, curso)
        .subscribe((response: IApiResponse) => {
          this.asistencia = response.data.list;
          console.log(this.asistencia);
        });
    }
    
    //BUSCAR
    search(nom:string){
      let page = this.pagination.getPage(this.paginationData);
      let size = this.pagination.getSize(this.paginationData);
      this.alumnoService.getAll(nom,page,size).subscribe(response =>{
        this.student = response.data.list;
      })
    }

    
  // AGREGAR - ACTUALIZAR
  save(asistencia:IAsistencia){
    console.log(asistencia)
    if(asistencia.id==null){
      this.asistenciaService.add(asistencia).subscribe(data =>{
        console.log(data.message)
        if(data.successful===true){
          this.msjResponse = 'Agregado correctamente';
          this.successful = true;
        }else{
          this.msjResponse = data.message;
          this.successful = false;
        }
      });
    }else{
      this.asistenciaService.update(asistencia).subscribe(data =>{
        if(data.successful===true){
          this.msjResponse = 'Cambios actualizados con éxito';
          this.successful = true;
        }else{
          this.msjResponse = data.message;
          this.successful = false;
        }
      })
    }
    this.modalOk.showModal();
  }
  //ELIMINAR 
  delete(id:string){
    this.asistenciaService.delete(id).subscribe(data =>{
      if(data.successful===true){
        this.msjResponse = 'Eliminado correctamente';
        this.successful = true;
      }
    });
    this.modalOk.showModal();
  }

refresh(): void { window.location.reload(); }
}
