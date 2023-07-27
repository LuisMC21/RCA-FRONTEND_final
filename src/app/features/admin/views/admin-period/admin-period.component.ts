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
import { AulaService } from '../../commons/services/aula.service';
import { CourseService } from '../../commons/services/course.service';
import { ICourse } from '../../interfaces/course';

@Component({
  selector: 'app-admin-period',
  templateUrl: './admin-period.component.html',
  styleUrls: ['./admin-period.component.scss']
})
export class AdminPeriodComponent implements OnInit {

  periods: IPeriod[] = [];
  anios: IAnioLectivo[] = [];
  student: IStudent[] = [];
  courses: ICourse[] = [];

  courseTeachers: ICourseTeacher[] = [];
  aulas: IAula[] = []

  tableName: string = 'Periodos';
  paginationData: string = 'period';
  paginationStudent = 'student';
  paginationDataAnio: string = 'anio';
  msjResponse: string = '';
  successful!: boolean;

  page = this.pagination.getPage(this.paginationData);
  size = this.pagination.getSize(this.paginationData);
  courseTeacher!: ICourseTeacher;

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

  @ViewChild('modalOk') modalOk!: ModalComponent;

  constructor(private periodService: PeriodService,
    private pagination: PaginationService,
    private aulaService:AulaService,
    private courseService:CourseService,
    private anioService: AnioLectivoService,
    private studentService: StudentService,
    private evaluacionService: EvaluacionService,
    private courseTeacherService: CourseTeacherService) { }

  ngOnInit(): void {

    //listar periodos
    this.page = this.pagination.getPage(this.paginationData);
    this.size = this.pagination.getSize(this.paginationData);
    this.periodService.getAll('', this.page, this.size)
      .subscribe(response => {
        this.periods = response.data.list;
      });

    this.anioService.getAll('',0,50).subscribe(response=>{
      this.anios = response.data.list;
    })

  }

  //BUSCAR
  search(nom: string) {
    this.periodService.getAll(nom, this.page, this.size).subscribe(response => {
      this.periods = response.data.list;
    })
  }

  // AGREGAR - ACTUALIZAR
  save(period: IPeriod) {
    if (period.id == null) {
      this.periodService.add(period).subscribe(data => {
        if (data.successful) {
          this.msjResponse = 'Agregado correctamente';
          this.successful = true;
        } else {
          this.msjResponse = data.message;
          this.successful = false;
        }
      });
    } else {
      this.periodService.update(period).subscribe(data => {
        if (data.successful) {
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
    this.periodService.delete(id).subscribe(data => {
      if (data.successful) {
        this.msjResponse = 'Eliminado correctamente';
        this.successful = true;
      } else {
        this.msjResponse = data.message;
        this.successful = false;
      }
    });
    this.modalOk.showModal();
  }

  refresh(): void { window.location.reload(); }

  generarEvaluaciones(id: string) {

    let totalevaluaciones = 0;

    this.evaluacionService.getAll(id, 0, 5).subscribe(response => {
      totalevaluaciones = response.data.countFilter || 0;
      this.countEvaluciones(totalevaluaciones, id);
    })
  }

  async countEvaluciones(totalevaluaciones: number, id: string) {
    /*
    try {
      if (totalevaluaciones == 0) {
        //periodo para el que se agregarán las evaluaciones
        const response = await this.periodService.getOne(id).toPromise();
        if (response && response.data) {
          this.period = response.data;
        } else {
          console.error('Error: No se encontraron datos en la respuesta o la lista está vacía.');
        }

      const response2 = await this.aulaService.getAllAnio().toPromise();

        if (response2 && response2.data && response2.data.list && response2.data.list.length > 0) {
          this.aulas = response2.data.list;
        } else {
          console.error('Error: No se encontraron datos en la respuesta o la lista está vacía.');
        };

        console.log("Ciclo aulas")

        for (const aula of this.aulas) {

          //Obtener todos los cursos por año y aula
          const response2 = await this.courseService.getAulaAnio(aula.id, this.period.anio_lectivoDTO.id).toPromise();
          if (response2 && response2.data && response2.data.list && response2.data.list.length > 0) {
            this.courses = response2.data.list;
          } else {
            console.error('Error: No se encontraron datos en la respuesta o la lista está vacía.');
          }

          console.log(this.courses.length);

          //Obtener todos los alumnos por año, curso y aula
          const response = await this.studentService.getAllAnioCursoAula().toPromise();
          if (response && response.data && response.data.list && response.data.list.length > 0) {
            this.student = response.data.list;
          } else {
            console.error('Error: No se encontraron datos en la respuesta o la lista está vacía.');
          }
          console.log("Student por aula")
          console.log(this.student.length);

          if (this.courses.length > 0 && this.student.length > 0) {
            console.log("Dentro de ciclo IF")
            for (const course of this.courses) {
              const response = await this.courseTeacherService.getAulaCurso('', aula.id, course.id, 0,5).toPromise();
              if (response && response.data && response.data.list && response.data.list.length > 0) {
                this.courseTeacher = response.data.list[0];
              } else {
                console.error('Error: No se encontraron datos en la respuesta o la lista está vacía.');
              }
              console.log(this.courseTeacher);
              for (const student of this.student) {
                const evaluacion: IEvaluacion = {
                  id: '',
                  code: '',
                  date: null,
                  note: "",
                  periodoDTO: this.period,
                  docentexCursoDTO: this.courseTeacher,
                  alumnoDTO: student
                };
                await this.evaluacionService.add(evaluacion).toPromise();
                console.log("Nota creada");
              }
            }
          }
        }

        this.msjResponse = "Promedios generados correctamente"

      } else {
        this.msjResponse = 'Promedios ya han sigo generados anteriormente';
      }

      this.modalOk.showModal()

    } catch (error) {
      console.log("Error:", error)
    }
    */
  }
  getPeriods(){
    this.periodService.getAll('', this.page, this.size)
      .subscribe(response =>{
        if(response.successful){
          this.periods = response.data.list;
        } else {
          this.periods = [];
        }
      });
  }
  getPage(event: any) {
    this.page = event;
    this.getPeriods();
  }

  getSize(event: any) {
    this.size = event;
    this.getPeriods();
  }
}

