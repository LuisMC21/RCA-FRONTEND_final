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

  cardMenu=[
    {title:"Matenimiento", image:"bi bi-gear-wide-connected"},
    {title:"Operaciones", image:"bi bi-file-earmark-text"},
    {title:"Consultas", image:"bi bi-plus-circle"},
  ]
  constructor(private teacherService:TeacherService, private pagination:PaginationService) { }

  ngOnInit(): void {
    let page = this.pagination.getPage(this.paginationData);
    let size = this.pagination.getSize(this.paginationData);
    this.teacherService.getAll('', page,size)
    .subscribe(response =>{
      this.teachers = response.data.list;
      console.log(this.teachers);
    });

    this.teacherService.getTeacherCount('')
    .subscribe(count => {
      this.totalTeachers = count;
      console.log(this.totalTeachers);
    });
  }
  //BUSCAR
  search(nom:string){
    let page = this.pagination.getPage(this.paginationData);
    let size = this.pagination.getSize(this.paginationData);
    this.teacherService.getAll(nom,page,size).subscribe(response =>{
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
          this.msjResponse = 'Ha ocurrido un error :(';
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
        this.successful = true;
      }
    });
    this.modalOk.showModal();
  }

 refresh(): void { window.location.reload(); }

}
