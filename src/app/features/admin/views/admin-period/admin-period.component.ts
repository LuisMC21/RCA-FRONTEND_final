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

    //listar periodos
    let page = this.pagination.getPage(this.paginationData);
    let size = this.pagination.getSize(this.paginationData);
    this.periodService.getAll('', page, size)
      .subscribe(response => {
        this.periods = response.data.list;
      });

    //listar años
    let pageAnio = this.pagination.getPage(this.paginationDataAnio);
    let sizeAnio = this.pagination.getSize(this.paginationDataAnio);
    this.anioService.getAll('', pageAnio, sizeAnio)
      .subscribe(response => {
        this.anios = response.data.list;
        console.log(this.anios);
      });

    //obtener todas las aulas activas por año
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

  generarEvaluaciones(id: string) {

    let totalevaluaciones = 0;

    this.evaluacionService.getAll(id, 0, 5).subscribe(response => {
      console.log(response);
      totalevaluaciones = response.data.countFilter || 0;
      this.countEvaluciones(totalevaluaciones, id);
    })
  }

  async countEvaluciones(totalevaluaciones: number, id:string) {
    try{
      if (totalevaluaciones == 0) {
        //periodo para el que se agregarán las evaluaciones
        const response = await this.periodService.getOne(id).toPromise();
        if (response && response.data) {
          this.period = response.data;
        } else {
          console.error('Error: No se encontraron datos en la respuesta o la lista está vacía.');
        }
      } else {
        this.msjResponse = 'Promedios ya han sigo generados anteriormente';
      }

      for (let index = 0; index < this.aulas.length; index++) {
        console.log(this.aulas[index]);
      }
  
      this.modalOk.showModal();
    }catch(error){
      console.log("Error:", error)
    }
  }

}

