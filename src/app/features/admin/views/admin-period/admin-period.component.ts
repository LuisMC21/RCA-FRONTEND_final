import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from 'src/app/shared/components/modals/modal/modal.component';
import { PaginationService } from '../../commons/services/pagination.service';
import { PeriodService } from '../../commons/services/period.service';
import { IPeriod } from '../../interfaces/period';
import { IAnioLectivo } from '../../interfaces/anio-lectivo';
import { AnioLectivoService } from '../../commons/services/anio-lectivo.service';
import { StudentService } from '../../commons/services/student.service';
import { IStudent } from '../../interfaces/student';
import { IAula } from '../../interfaces/aula';
import { ICourseTeacher } from '../../interfaces/course-teacher';
import { CourseTeacherService } from '../../commons/services/course-teacher.service';
import { EvaluacionService } from '../../commons/services/evaluacion.service';
import { IEvaluacion } from '../../interfaces/evaluacion';

@Component({
  selector: 'app-admin-period',
  templateUrl: './admin-period.component.html',
  styleUrls: ['./admin-period.component.scss']
})
export class AdminPeriodComponent implements OnInit {

  periods: IPeriod[] = [];
  anios: IAnioLectivo[] = [];
  student: IStudent[] = [];
  courseTeachers: ICourseTeacher[] = [];
  aulas: IAula[] = []
  tableName: string = 'Periodos';
  paginationData: string = 'period';
  paginationStudent = 'student';
  paginationDataAnio: string = 'anio';
  msjResponse: string = '';

  period: IPeriod = {
    id: '',
    code: '',
    name: '',
    date_start: new Date(),
    date_end: new Date(),
    anio_lectivoDTO: {
      id: '',
      code: '',
      name: ''
    }
  };

  anio = '2022'
  @ViewChild('modalOk') modalOk!: ModalComponent;

  constructor(private periodService: PeriodService,
    private pagination: PaginationService,
    private anioService: AnioLectivoService,
    private studentService: StudentService,
    private courseTeacherService: CourseTeacherService,
    private evaluacionService: EvaluacionService) { }

  ngOnInit(): void {
    let page = this.pagination.getPage(this.paginationData);
    let size = this.pagination.getSize(this.paginationData);
    this.periodService.getAll('', page, size)
      .subscribe(response => {
        this.periods = response.data.list;
      });

    let pageAnio = this.pagination.getPage(this.paginationDataAnio);
    let sizeAnio = this.pagination.getSize(this.paginationDataAnio);
    this.anioService.getAll('', pageAnio, sizeAnio)
      .subscribe(response => {
        this.anios = response.data.list;
        console.log(this.anios);
      });

    let pageCourseT = this.pagination.getPage(this.paginationStudent);
    let sizeCourseT = this.pagination.getSize(this.paginationStudent);
    this.courseTeacherService.getAll('', pageCourseT, sizeCourseT)
      .subscribe(response => {
        this.courseTeachers = response.data.list;
        console.log(this.courseTeachers);

        this.aulas = this.courseTeachers.map((courseTeacher) => courseTeacher.aulaDTO).filter((aula, index, self) => {
          return index === self.findIndex((a) => (
            a.id === aula.id
          ));
        });

        console.log(this.aulas)
      });

  }

  //BUSCAR
  search(nom: string) {
    let page = this.pagination.getPage(this.paginationData);
    let size = this.pagination.getSize(this.paginationData);
    this.periodService.getAll(nom, page, size).subscribe(response => {
      this.periods = response.content;
    })
  }

  // AGREGAR - ACTUALIZAR
  save(period: IPeriod) {
    if (period.id == null) {
      this.periodService.add(period).subscribe(data => {
        if (data.message === 'ok') {
          this.period = data.data;
          this.generarEvaluaciones();
          this.msjResponse = 'Agregado correctamente'
        } else {
          this.msjResponse = 'Ha ocurrido un error :('
        }
      });
    } else {
      this.periodService.update(period).subscribe(data => {
        console.log(data.message)
        if (data.message === 'ok') {
          this.msjResponse = 'Cambios actualizados con éxito'
        } else {
          this.msjResponse = 'Ha ocurrido un error :('
        }
      })
    }
    this.modalOk.showModal();


  }

  //ELIMINAR 
  delete(id: string) {
    this.periodService.delete(id).subscribe(data => {
      if (data.message === 'ok') {
        this.msjResponse = 'Eliminado correctamente';
      }
    });
    this.modalOk.showModal();
  }

  refresh(): void { window.location.reload(); }

  generarEvaluaciones() {
    for (let index = 0; index < this.aulas.length; index++) {
      const element = this.aulas[index];

      const filteredCourseTeachers = this.courseTeachers.filter((courseTeacher) => {
        return courseTeacher.aulaDTO === element;
      });

      console.log(filteredCourseTeachers);

      let pageStudent = this.pagination.getPage(this.paginationStudent);
      let sizeStudent = this.pagination.getSize(this.paginationStudent);
      this.studentService.getAllAnioCursoAula('', pageStudent, sizeStudent, this.anio, element.id, '')
        .subscribe(response => {
          this.student = response.data.list;
          console.log(this.student) // Acá sí me imprime todos los datos

          if (filteredCourseTeachers !== undefined && this.student !== undefined) {

            for (let index = 0; index < filteredCourseTeachers.length; index++) {
              const courseTeacher = filteredCourseTeachers[index];
    
              console.log(this.student)  // aquí está vacío
              for (let index = 0; index < this.student.length; index++) {
    
                console.log("Ciclo student" + index);
    
                const element = this.student[index];
                const evaluacion: IEvaluacion = {
                  id: '',
                  code: '',
                  date: null,
                  note: "",
                  periodoDTO: this.period,
                  docentexCursoDTO: courseTeacher,
                  alumnoDTO: element
                };
                console.log(evaluacion)
                this.evaluacionService.add(evaluacion).subscribe(data => {
                  console.log(data.message)
                });;
              }
            }
          }
        });

      
    }
  }

}
