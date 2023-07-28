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

  courses: ICourse[] = [];
  grades: IGrade[] = [];
  tableName: string = 'Cursos';
  paginationData = 'course'
  msjResponse: string = '';
  successful!: boolean;
  totalTeachers: number = 0;
  filterSearch = "";
  @ViewChild('modalOk') modalOk!: ModalComponent;
  page = 0;
  size = 10;

  constructor(
    private courseService: CourseService,
    private gradeService: GradeService) { }

  ngOnInit(): void {
    this.getCursos();

    this.gradeService.getAll('', 0, 10).subscribe(response => {
      this.grades = response.data.list;
    });

    this.courseService.getCursoCount('')
      .subscribe(count => {
        this.totalTeachers = count;
      });
  }

  //BUSCAR
  search(filter: string) {
    this.filterSearch = filter
    this.getCursos();
  }

  // AGREGAR - ACTUALIZAR
  save(course: ICourse) {
    if (course.id == null) {
      this.courseService.add(course).subscribe(data => {
        if (data.successful) {
          this.getCursos();
          this.msjResponse = 'Agregado correctamente';
          this.successful = true;
        } else {
          this.msjResponse = data.message;
          this.successful = false;
        }
      });
    } else {
      this.courseService.update(course).subscribe(data => {
        if (data.successful) {
          this.getCursos()
          this.msjResponse = 'Cambios actualizados con éxito';
          this.successful = true;
        } else {
          this.msjResponse = data.message;
          this.successful = false;
        }
      })
    }
    this.modalOk.showModal();
  }

  //ELIMINAR
  delete(id: string) {
    this.courseService.delete(id).subscribe(data => {
      if (data.successful) {
        this.getCursos();
        this.msjResponse = 'Eliminado correctamente';
        this.successful = true;
      } else {
        this.msjResponse = data.message;
        this.successful = true;
      }
    });
    this.modalOk.showModal();
  }

  getPage(event: any) {
    this.page = event;
    this.getCursos();
  }

  getSize(event: any) {
    this.size = event;
    this.getCursos();
  }

  getCursos() {
    this.courseService.getAll(this.filterSearch, this.page, this.size)
      .subscribe(response => {
        if (response.successful) {
          this.courses = response.data.list;
        } else {
          this.courses = []
        }
      });
  }
}
