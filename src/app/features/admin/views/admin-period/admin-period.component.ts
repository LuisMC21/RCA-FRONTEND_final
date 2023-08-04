import { Component, OnInit, ViewChild } from '@angular/core';
import { PeriodService } from '../../commons/services/period.service';
import { IPeriod } from '../../interfaces/period';
import { IAnioLectivo } from '../../interfaces/anio-lectivo';
import { AnioLectivoService } from '../../commons/services/anio-lectivo.service';
import { IStudent } from '../../interfaces/student';
import { IAula } from '../../interfaces/aula';
import { ICourseTeacher } from '../../interfaces/course-teacher';
import { EvaluacionService } from '../../commons/services/evaluacion.service';
import { ICourse } from '../../interfaces/course';
import { ModalResponseComponent } from 'src/app/shared/components/modals/modal-response/modal-response.component';

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
  paginationData= 'period';

  courseTeachers: ICourseTeacher[] = [];
  aulas: IAula[] = []
  filterSearch = "";
  tableName: string = 'Periodos';

  paginationStudent = 'student';
  paginationDataAnio: string = 'anio';
  msjResponse: string = '';
  successful!: boolean;


  page = 0;
  size = 10;
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

  @ViewChild('modalOk') modalOk!: ModalResponseComponent;

  constructor(private periodService: PeriodService,
    private anioService: AnioLectivoService,
    private evaluacionService: EvaluacionService) { }

  ngOnInit(): void {
    //listar periodos
    this.getPeriods();

    this.anioService.getAll('', 0, 50).subscribe(response => {
      this.anios = response.data.list;
    })

  }

  //BUSCAR
  search(filter: string) {
    this.filterSearch = filter;
    this.getPeriods();
  }

  // AGREGAR - ACTUALIZAR
  save(period: IPeriod) {
    if (period.id == null) {
      this.periodService.add(period).subscribe(data => {
        if (data.successful) {
          this.getPeriods();
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
          this.getPeriods();
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
    this.periodService.delete(id).subscribe(data => {
      if (data.successful) {
        this.getPeriods();
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

  generarEvaluaciones(id: string) {
    this.evaluacionService.generarEvaluaciones(id, '').subscribe(response => {
      if(response.successful){
        this.getPeriods();
      this.msjResponse = "Evaluaciones generadas exitosamente";
      this.successful = true;
      } else {
        this.msjResponse = response.message;
        this.successful = false;
      }
    })
    this.modalOk.showModal();
    this.msjResponse = "";
  }

getPeriods(){
  this.periodService.getAll(this.filterSearch, this.page, this.size)
    .subscribe(response => {
      if (response.successful) {
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

