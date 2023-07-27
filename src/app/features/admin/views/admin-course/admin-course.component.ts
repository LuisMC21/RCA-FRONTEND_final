import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from 'src/app/shared/components/modals/modal/modal.component';
import { CourseService } from '../../commons/services/course.service';
import { GradeService } from '../../commons/services/grade.service';
import { PaginationService } from '../../commons/services/pagination.service';
import { ICourse } from '../../interfaces/course';
import { IGrade } from '../../interfaces/grade';

@Component({
  selector: 'app-admin-course',
  templateUrl: './admin-course.component.html',
  styleUrls: ['./admin-course.component.scss']
})
export class AdminCourseComponent implements OnInit {

  courses:ICourse[]=[];
  grades:IGrade[]=[];
  tableName: string = 'Cursos';
  paginationData = 'course'
  msjResponse:string='';
  successful!: boolean;
  totalTeachers: number=0;
  @ViewChild('modalOk') modalOk!:ModalComponent;
  page = this.pagination.getPage(this.paginationData);
  size = this.pagination.getSize(this.paginationData);

  constructor(
    private courseService: CourseService,
    private pagination:PaginationService,
    private gradeService:GradeService) { }

  ngOnInit(): void {
    this.courseService.getAll('', this.page,this.size)
    .subscribe(response =>{
      this.courses = response.data.list;

    });

    this.gradeService.getAll('',0,10).subscribe(response =>{
      this.grades = response.data.list;
    });

    this.courseService.getCursoCount('')
    .subscribe(count => {
      this.totalTeachers = count;
    });
  }

  //BUSCAR
  search(nom:string){
    this.courseService.getAll(nom,this.page,this.size).subscribe(response =>{
      this.courses = response.data.list;
    })
  }

  // AGREGAR - ACTUALIZAR
  save(course:ICourse){
    console.log(course)
    if(course.id==null){
      this.courseService.add(course).subscribe(data =>{
        if(data.successful===true){
          this.msjResponse = 'Agregado correctamente';
          this.successful = true;
        }else{
          this.msjResponse = data.message;
          this.successful = false;
        }
      });
    }else{
      this.courseService.update(course).subscribe(data =>{
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
    this.courseService.delete(id).subscribe(data =>{
      if(data.successful===true){
        this.msjResponse = 'Eliminado correctamente';
        this.successful = true;
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
  this.getCursos();
}

getSize(event: any) {
  this.size = event;
  this.getCursos();
}

getCursos() {
  this.courseService.getAll('', this.page, this.size)
    .subscribe(response => {
      if (response.successful) {
        this.courses = response.data.list;
      } else {
        this.courses = []
      }
    });
}
}
