import { Component, OnInit, ViewChild } from '@angular/core';
import { IAula } from '../../interfaces/aula';
import { ITeacher } from '../../interfaces/teacher';
import { ICourse } from '../../interfaces/course';
import { ICourseTeacher } from '../../interfaces/course-teacher';
import { ModalComponent } from 'src/app/shared/components/modals/modal/modal.component';
import { AulaService } from '../../commons/services/aula.service';
import { PaginationService } from '../../commons/services/pagination.service';
import { TeacherService } from '../../commons/services/teacher.service';
import { CourseTeacherService } from '../../commons/services/course-teacher.service';
import { CourseService } from '../../commons/services/course.service';
import { IAnioLectivo } from '../../interfaces/anio-lectivo';
import { AnioLectivoService } from '../../commons/services/anio-lectivo.service';

@Component({
  selector: 'app-admin-course-teacher',
  templateUrl: './admin-course-teacher.component.html',
  styleUrls: ['./admin-course-teacher.component.scss']
})
export class AdminCourseTeacherComponent implements OnInit {

  courseTeachers: ICourseTeacher[] = [];
  classrooms: IAula[] = [];
  anios:IAnioLectivo[]=[];
  teachers: ITeacher[] = [];
  courses: ICourse[] = [];

  tableName: string = 'Asignatura';

  paginationData = 'course';
  paginationDataClassroom = 'classroom';
  paginationDataTeachers = 'teacher';
  paginationDataCourse = 'course';
  paginationDataAnio='anio';
  msjResponse: string = '';
  successful!: boolean;

  page = this.pagination.getPage(this.paginationData);
  size = this.pagination.getSize(this.paginationData);
  filterSearch = "";
  @ViewChild('modalOk') modalOk!: ModalComponent;

  constructor(private classroomService: AulaService,
    private pagination: PaginationService,
    private teacherService: TeacherService,
    private courseService: CourseService,
    private anioService:AnioLectivoService,
    private courseTeacherService: CourseTeacherService) { }

  ngOnInit(): void {

    this.getAsignaturas();
    let pageClassroom = this.pagination.getPage(this.paginationDataClassroom);
    let sizeClassroom = this.pagination.getSize(this.paginationDataClassroom);
    this.classroomService.getAll('', pageClassroom, sizeClassroom)
      .subscribe(response => {
        this.classrooms = response.data.list;
      });




    let pageTeacher = this.pagination.getPage(this.paginationDataTeachers);
    let sizeTeacher = this.pagination.getSize(this.paginationDataTeachers);
    this.teacherService.getAll('', pageTeacher, sizeTeacher)
      .subscribe(response => {
        this.teachers = response.data.list;
      });


    this.courseService.getAll('', 0, 40)
      .subscribe(response => {
        console.log(response);
        this.courses = response.data.list;
        console.log(this.courses);
      });

    let pageAnio = this.pagination.getPage(this.paginationDataAnio);
    let sizeAnio = this.pagination.getSize(this.paginationDataAnio);
    this.anioService.getAll('', pageAnio, sizeAnio)
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
        console.log(data.message)
        console.log(data.data);
        if (data.successful === true) {
          this.msjResponse = 'Agregado correctamente';
          this.successful = true;
        } else {
          this.msjResponse = data.message;
          this.successful = false;
        }
      });
    } else {
      this.courseTeacherService.update(courseTeacher).subscribe(data => {
        if (data.successful === true) {
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
    this.courseTeacherService.delete(id).subscribe(data => {

      if (data.successful === true) {
        this.msjResponse = 'Eliminado correctamente';
        this.successful === true;
      } else {
        this.msjResponse = data.message;
        this.successful = false;
      }
    });
    this.modalOk.showModal();
  }

  refresh(): void { window.location.reload(); }

  //Pagination
  getPage(event: any) {
    this.page = event;
    this.getAsignaturas();
  }

  getSize(event: any) {
    this.size = event;
    this.getAsignaturas();
  }

  getAsignaturas(){
    this.courseTeacherService.getAll(this.filterSearch, this.page, this.size)
      .subscribe(response => {
        this.courseTeachers = response.data.list;
        console.log(this.courseTeachers)
      });
  }
}
