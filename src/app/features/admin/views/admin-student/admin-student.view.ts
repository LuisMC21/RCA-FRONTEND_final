import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ModalComponent } from 'src/app/shared/components/modals/modal/modal.component';
import { PaginationService } from '../../commons/services/pagination.service';
import { StudentService } from '../../commons/services/student.service';
import { IStudent } from '../../interfaces/student';
import { IApiResponse } from 'src/app/core/interfaces/apiResonse.interface';
import { ModalResponseComponent } from 'src/app/shared/components/modals/modal-response/modal-response.component';

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
  successful: boolean=false;
  @Output() successful2:EventEmitter<boolean> = new EventEmitter();

  @ViewChild('modalOk') modalOk!:ModalResponseComponent;

  constructor(private studentService:StudentService, private pagination:PaginationService) { }

  ngOnInit(): void {
    let page = this.pagination.getPage(this.paginationData);
    let size = this.pagination.getSize(this.paginationData);
    this.studentService.getAll('', page,size)
    .subscribe(response =>{
      this.students = response.data.list;
    });

    this.studentService.getAlumnosCount('')
    .subscribe(count => {
      this.totalStudents = count;
      console.log(this.totalStudents);
    });
  }


  //BUSCAR
  search(nom:string){
    let page = this.pagination.getPage(this.paginationData);
    let size = this.pagination.getSize(this.paginationData);
    this.studentService.getAll(nom,page,size).subscribe(response =>{
      this.students = response.data.list;
    })
  }

  // AGREGAR - ACTUALIZAR
  save(student:IStudent){
    // student.apoderado = this.identiParent;
    console.log(student)
    if(student.id==null){
      this.studentService.add(student).subscribe(data =>{
        console.log(data.message)
        if(data.successful===true){
          this.msjResponse = 'Alumno agregado correctamente'
          this.successful = true;
          this.successful2.emit(true);
        }else{
          this.msjResponse = data.message;
          this.successful = false;
          this.successful2.emit(false);
        }
      });
    }else{
      this.studentService.update(student).subscribe(data =>{
        console.log(student)
        console.log(data.message)
        if(data.successful===true){
          this.msjResponse = 'Cambios actualizados con éxito';
          this.successful = true;
          this.successful2.emit(true);
        }else{
          this.msjResponse = 'Ha ocurrido un error :(';
          this.successful = false;
          this.successful2.emit(false);
        }
      })
    }
    this.modalOk.showModal();
  }

  getIdentiParent(identiParent:string){
    this.identiParent = identiParent;
  }
  //ELIMINAR
  delete(id:string){
    this.studentService.delete(id).subscribe(data =>{
      if(data.successful===true){
        this.msjResponse = 'Eliminado correctamente';
        this.successful = true;
        this.successful2.emit(true);
      } else {
        this.successful2.emit(true);
      }
    });
    this.modalOk.showModal();
  }

refresh(): void { window.location.reload(); }


}
