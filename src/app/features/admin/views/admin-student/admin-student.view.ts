import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ModalComponent } from 'src/app/shared/components/modals/modal/modal.component';
import { PaginationService } from '../../commons/services/pagination.service';
import { StudentService } from '../../commons/services/student.service';
import { IStudent } from '../../interfaces/student';
import { IApiResponse } from 'src/app/core/interfaces/apiResonse.interface';
import { ModalResponseComponent } from 'src/app/shared/components/modals/modal-response/modal-response.component';
import { ParentService } from '../../commons/services/parent.service';
import { IParent } from '../../interfaces/parent';

@Component({
  selector: 'app-admin-student',
  templateUrl: './admin-student.view.html',
  styleUrls: ['./admin-student.view.scss']
})
export class AdminStudentView implements OnInit {

  tableName = "Estudiante"
  cardMenu=[
    {title:"Mantenimiento", image:"bi bi-gear-wide-connected"},
    {title:"Matrícula", image:"bi bi-calendar"},
    {title:"Operaciones", image:"bi bi-file-earmark-text"},
    {title:"Consultas", image:"bi bi-plus-circle"},
  ]
  students:IStudent[]=[];

  apiResponse!: IApiResponse;
  paginationData = 'student'
  totalStudents: number=0;
  msjResponse:string='';
  icon:string='';
  identiParent:string='';
  filterSearch = "";

  successful!: boolean;

  page = 0;
  size = 10;

  @ViewChild('modalOk') modalOk!:ModalResponseComponent;

  constructor(private studentService:StudentService) { }

  ngOnInit(): void {

    this.getStudents();

    this.studentService.getAlumnosCount('')
    .subscribe(count => {
      this.totalStudents = count;
    });
  }


  //BUSCAR
  search(filter:string){
    this.filterSearch = filter;
    this.getStudents();
  }

  // AGREGAR - ACTUALIZAR
  save(student:IStudent){
    // student.apoderado = this.identiParent;
    if(student.id==null){
      this.studentService.add(student).subscribe(data =>{
        if(data.successful){
          this.getStudents();
          this.msjResponse = 'Alumno agregado correctamente'
          this.successful = true;
        }else{
          this.msjResponse = data.message;
          this.successful = false;
        }
      });
    }else{
      this.studentService.update(student).subscribe(data =>{
        if(data.successful){
          this.getStudents();
          this.msjResponse = 'Cambios actualizados con éxito';
          this.successful = true;
        }else{
          this.msjResponse = data.message;
          this.successful = false;
        }
      })
    }
    this.modalOk.showModal();
    this.msjResponse = "";
  }

  getIdentiParent(identiParent:string){
    this.identiParent = identiParent;
  }
  //ELIMINAR
  delete(id:string){
    this.studentService.delete(id).subscribe(data =>{
      if(data.successful){
        this.getStudents();
        this.msjResponse = 'Eliminado correctamente';
        this.successful = true;
      } else {
        this.msjResponse = data.message;
        this.successful = true;
      }
    });
    this.modalOk.showModal();
    this.msjResponse = "";
  }

  //Lista de students
  getStudents(){
    this.studentService.getAll(this.filterSearch, this.page, this.size)
      .subscribe(response =>{
        if(response.successful){
          this.students = response.data.list;
        } else {
          this.students = [];
        }
      });
  }
  //pagination
  getPage(event: any) {
    this.page = event;
    this.getStudents();
  }

  getSize(event: any) {
    this.size = event;
    this.getStudents();
  }
}
