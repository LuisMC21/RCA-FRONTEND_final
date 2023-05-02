import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from 'src/app/shared/components/modals/modal/modal.component';
import { AsistenciaService } from '../../commons/services/asistencia.service';
import { ClaseService } from '../../commons/services/clase.service';
import { PaginationService } from '../../commons/services/pagination.service';
import { StudentService } from '../../commons/services/student.service';
import { IAsistencia } from '../../interfaces/asistencia';
import { IClase } from '../../interfaces/clase';
import { IStudent } from '../../interfaces/student';

@Component({
  selector: 'app-admin-asistencia',
  templateUrl: './admin-asistencia.component.html',
  styleUrls: ['./admin-asistencia.component.scss']
})
export class AdminAsistenciaComponent implements OnInit {
 asistencia:IAsistencia[]=[];
 student:IStudent[]=[];
 clase:IClase[]=[];
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
  ) { }

  ngOnInit(): void {
    let page = this.pagination.getPage(this.paginationData);
    let size = this.pagination.getSize(this.paginationData);
    this.asistenciaService.getAll('', page,size)
    .subscribe(response =>{
      this.asistencia = response.data.list;
      
    });
    this.alumnoService.getAll('',0,10).subscribe(response =>{
      this.student = response.data.list;
    })

    this.claseService.getAll('',0,10).subscribe(response =>{
      this.clase = response.data.list;
    })
  }

    //BUSCAR
    search(nom:string){
      let page = this.pagination.getPage(this.paginationData);
      let size = this.pagination.getSize(this.paginationData);
      this.alumnoService.getAll(nom,page,size).subscribe(response =>{
        this.student = response.data.list;
        console.log(response.data.list)
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
          this.msjResponse = 'Ha ocurrido un error :(';
          this.successful = false;
        }
      });
    }else{
      this.asistenciaService.update(asistencia).subscribe(data =>{
        if(data.successful===true){
          this.msjResponse = 'Cambios actualizados con éxito';
          this.successful = true;
        }else{
          this.msjResponse = 'Ha ocurrido un error :(';
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
