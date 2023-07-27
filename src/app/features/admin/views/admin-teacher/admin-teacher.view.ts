import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from 'src/app/shared/components/modals/modal/modal.component';
import { PaginationService } from '../../commons/services/pagination.service';
import { TeacherService } from '../../commons/services/teacher.service';
import { ITeacher } from '../../interfaces/teacher';
import { IAnioLectivo } from '../../interfaces/anio-lectivo';

@Component({
  selector: 'app-admin-teacher',
  templateUrl:

    './admin-teacher.view.html',
  styleUrls: ['./admin-teacher.view.scss']
})
export class AdminTeacherView implements OnInit {

  tableName = "Docente"
  teachers:ITeacher[]=[];
  anios: IAnioLectivo[]=[];
  paginationData:string='teacher';
  msjResponse:string='';
  successful!: boolean;
  totalTeachers: number=0;
  @ViewChild('modalOk') modalOk!:ModalComponent;

  page = this.pagination.getPage(this.paginationData);
  size = this.pagination.getSize(this.paginationData);

  cardMenu=[
    {title:"Matenimiento", image:"bi bi-gear-wide-connected"},
    {title:"Operaciones", image:"bi bi-file-earmark-text"},
    {title:"Consultas", image:"bi bi-plus-circle"},
  ]
  constructor(private teacherService:TeacherService, private pagination:PaginationService) { }

  ngOnInit(): void {
    this.teacherService.getAll('', this.page,this.size)
    .subscribe(response =>{
      this.teachers = response.data.list;
    });

    this.teacherService.getTeacherCount('')
    .subscribe(count => {
      this.totalTeachers = count;
    });
  }
  //BUSCAR
  search(nom:string){
    this.teacherService.getAll(nom,this.page,this.size).subscribe(response =>{
      this.teachers = response.data.list;
    })
  }

  // AGREGAR - ACTUALIZAR
  save(teacher:ITeacher){
    if(teacher.id==null){
      this.teacherService.add(teacher).subscribe(data =>{
        console.log(data.message)
        if(data.successful){
          this.msjResponse = 'Agregado correctamente';
          this.successful = true;
        }else{
          this.msjResponse = 'Error, el docente ya existe';
          this.successful=false;
        }
      });
    }else{
      this.teacherService.update(teacher).subscribe(data =>{
        console.log(teacher.usuarioDTO.tel)
        if(data.successful){
          this.msjResponse = 'Cambios actualizados con éxito';
          this.successful=true;
        }else{
          this.msjResponse = data.message;
          this.successful=false;
        }
      })
    }
    this.modalOk.showModal();
  }

  //ELIMINAR
  delete(id:string){
    this.teacherService.delete(id).subscribe(data =>{
      if(data.successful){
        this.msjResponse = 'Eliminado correctamente';
        this.successful=true;
      } else {
        this.msjResponse = data.message;
        this.successful = true;
      }
    });
    this.modalOk.showModal();
  }

 refresh(): void { window.location.reload(); }

 getPage(event: any) {
  this.page = event;
  this.getTeachers();
}

getSize(event: any) {
  this.size = event;
  this.getTeachers();
}

getTeachers() {
  this.teacherService.getAll('', this.page, this.size)
    .subscribe(response => {
      if (response.successful) {
        this.teachers = response.data.list;
      } else {
        this.teachers = []
      }
    });
}

}
