import { Component, OnInit, ViewChild } from '@angular/core';
import { IAula } from '../../interfaces/aula';
import { ITeacher } from '../../interfaces/teacher';
import { ICourse } from '../../interfaces/course';
import { ICourseTeacher } from '../../interfaces/course-teacher';
import { AulaService } from '../../commons/services/aula.service';
import { TeacherService } from '../../commons/services/teacher.service';
import { CourseTeacherService } from '../../commons/services/course-teacher.service';
import { CourseService } from '../../commons/services/course.service';
import { IAnioLectivo } from '../../interfaces/anio-lectivo';
import { AnioLectivoService } from '../../commons/services/anio-lectivo.service';
import { ModalResponseComponent } from 'src/app/shared/components/modals/modal-response/modal-response.component';

@Component({
  selector: 'app-admin-course-teacher',
  templateUrl: './admin-course-teacher.component.html',
  styleUrls: ['./admin-course-teacher.component.scss']
})
export class AdminCourseTeacherComponent implements OnInit {

  courseTeachers: ICourseTeacher[] = [];
  classrooms: IAula[] = [];
  anios: IAnioLectivo[] = [];
  teachers: ITeacher[] = [];
  courses: ICourse[] = [];

  tableName: string = 'Asignatura';

  paginationData = 'course';
  paginationDataClassroom = 'classroom';
  paginationDataTeachers = 'teacher';
  paginationDataCourse = 'course';
  paginationDataAnio = 'anio';
  msjResponse: string = '';
  successful!: boolean;

  page = 0;
  size = 10;
  filterSearch = "";
  @ViewChild('modalOk') modalOk!: ModalResponseComponent;

  constructor(private classroomService: AulaService,
    private teacherService: TeacherService,
    private courseService: CourseService,
    private anioService: AnioLectivoService,
    private courseTeacherService: CourseTeacherService) { }

  ngOnInit(): void {

    this.getAsignaturas();

    this.classroomService.getAll('', 0, 50)
      .subscribe(response => {
        this.classrooms = response.data.list;
      });

    this.teacherService.getAll('', 0, 50)
      .subscribe(response => {
        this.teachers = response.data.list;
      });

    this.courseService.getAll('', 0, 40)
      .subscribe(response => {
        this.courses = response.data.list;
      });

    this.anioService.getAll('', 0, 50)
      .subscribe(response => {
        this.anios = response.data.list;
      });
  }

  //BUSCAR
  search(filter: string) {
    this.filterSearch = filter;
    this.getAsignaturas();
  }

  // AGREGAR - ACTUALIZAR
  save(courseTeacher: ICourseTeacher) {
    if (courseTeacher.id == null) {
      this.courseTeacherService.add(courseTeacher).subscribe(data => {
        if (data.successful) {
          this.getAsignaturas();
          this.msjResponse = 'Agregado correctamente';
          this.successful = true;
        } else {
          this.msjResponse = data.message;
          this.successful = false;
        }
      });
    } else {
      this.courseTeacherService.update(courseTeacher).subscribe(data => {
        if (data.successful) {
          this.getAsignaturas();
          this.msjResponse = 'Cambios actualizados con éxito';
          this.successful = true;
        } else {
          this.msjResponse = data.message;
          this.successful = false;
        }
      })
    }
    this.modalOk.showModal();
    this.msjResponse = "";
  }

  //ELIMINAR
  delete(id: string) {
    this.courseTeacherService.delete(id).subscribe(data => {
      if (data.successful) {
        this.getAsignaturas();
        this.msjResponse = 'Eliminado correctamente';
        this.successful = true;
      } else {
        this.msjResponse = data.message;
        this.successful = false;
      }
    });
    this.modalOk.showModal();
    this.msjResponse = "";
  }

  //Pagination
  getPage(event: any) {
    this.page = event;
    this.getAsignaturas();
  }

  getSize(event: any) {
    this.size = event;
    this.getAsignaturas();
  }

  getAsignaturas() {
    this.courseTeacherService.getAll(this.filterSearch, this.page, this.size)
      .subscribe(response => {
        this.courseTeachers = response.data.list;
      });
  }
}
