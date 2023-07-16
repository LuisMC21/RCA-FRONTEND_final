import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from 'src/app/shared/components/modals/modal/modal.component';
import { AsistenciaService } from '../../commons/services/asistencia.service';
import { ClaseService } from '../../commons/services/clase.service';
import { PaginationService } from '../../commons/services/pagination.service';
import { StudentService } from '../../commons/services/student.service';
import { IAsistencia } from '../../interfaces/asistencia';
import { IAula } from '../../interfaces/aula';
import { AulaService } from '../../commons/services/aula.service';
import { IApiResponse } from 'src/app/core/interfaces/apiResonse.interface';
import { ICourse } from '../../interfaces/course';
import { IPeriod } from '../../interfaces/period';
import { PeriodService } from '../../commons/services/period.service';
import { CourseService } from '../../commons/services/course.service';
import { IAnioLectivo } from '../../interfaces/anio-lectivo';
import { AnioLectivoService } from '../../commons/services/anio-lectivo.service';

@Component({
  selector: 'app-admin-asistencia',
  templateUrl: './admin-asistencia.component.html',
  styleUrls: ['./admin-asistencia.component.scss']
})
export class AdminAsistenciaComponent implements OnInit {

  asistencias: IAsistencia[] = [];
  anios: IAnioLectivo[] = []
  periods: IPeriod[] = [];
  aulas: IAula[] = [];
  courses: ICourse[] = [];

  tableName = 'Asistencias';
  paginationData = 'course'
  msjResponse: string = '';
  successful: boolean = false;

  @ViewChild('anioSelect') anioSelect!: ElementRef;
  selectedAnioId: string = '';
  @ViewChild('periodSelect') periodSelect!: ElementRef;
  selectedPeriodId: string = '';
  @ViewChild('aulaSelect') aulaSelect!: ElementRef;
  selectedAulaId: string = '';
  @ViewChild('courseSelect') courseSelect!: ElementRef;
  selectedCourseId: string = '';


  @ViewChild('modalOk') modalOk!: ModalComponent;

  constructor(
    private asistenciaService: AsistenciaService,
    private pagination: PaginationService,
    private claseService: ClaseService,
    private aulaService: AulaService,
    private periodoService: PeriodService,
    private cursoService: CourseService,
    private anioService: AnioLectivoService
  ) { }

  ngOnInit(): void {

    this.anioService.getAll('', 0, 5).subscribe(response => {
      this.anios = response.data.list;
    })

    this.selectedAnioId = localStorage.getItem('selectedAnio') || '';
    this.selectedAulaId = localStorage.getItem('selectedAula') || '';


    this.periodoService.getAll(this.selectedAnioId, 0, 5).subscribe(response => {
      this.periods = response.data.list;
    });
    this.aulaService.getAll('', 0, 5).subscribe(response => {
      this.aulas = response.data.list;
    });

    this.selectedPeriodId = localStorage.getItem('selectedPeriodo') || '';
    this.selectedCourseId = localStorage.getItem('selectedCurso') || '';

    if(this.selectedAnioId != '' && this.selectedAulaId != ''){
      this.cursoService.getAulaAnio('', this.selectedAulaId, this.selectedAnioId, 0,5).subscribe(response=>{
        console.log(response);
        this.courses = response.data.list
      })
    }


    let page = this.pagination.getPage(this.paginationData);
    let size = this.pagination.getSize(this.paginationData);

    if(this.selectedCourseId != '' && this.selectedPeriodId != '' && this.selectedAulaId != ''){
      this.asistenciaService.getAsistenciasByFilters('',0,5,this.selectedPeriodId, this.selectedAulaId, this.selectedCourseId)
      .subscribe(response => {
        this.asistencias = response.data.list;
        console.log(response);
      });
    }else{
      this.asistenciaService.getAll('',0,5).subscribe(response=>{
        this.asistencias = response.data.list;
      })
    }

  }

  onAnioChange() {
    const selectedOption = this.anioSelect.nativeElement.selectedOptions[0];
    this.selectedAnioId = selectedOption.value;

    this.periodoService.getAll(this.selectedAnioId, 0, 5).subscribe(response => {
      this.periods = response.data.list;
    })

    this.aulaService.getAll('', 0, 10).subscribe(response => {
      this.aulas = response.data.list;
    })

    localStorage.setItem('selectedAnio', this.selectedAnioId);

  }

  onPeriodoChange() {
    const selectedOption = this.periodSelect.nativeElement.selectedOptions[0];
    this.selectedPeriodId = selectedOption.value;

    this.asistenciaService.getAsistenciasByFilters('',0,5,this.selectedPeriodId, '', '').subscribe(response => {
      console.log(response);
      console.log(this.selectedPeriodId);
      this.asistencias = response.data.list;
    })

    localStorage.setItem('selectedPeriodo', this.selectedPeriodId);
  }

  onAulasChange() {
    const selectedOption = this.aulaSelect.nativeElement.selectedOptions[0];
    this.selectedAulaId = selectedOption.value;

    this.asistenciaService.getAsistenciasByFilters('',0,5,this.selectedPeriodId, this.selectedAulaId, '').subscribe(response => {
      this.asistencias = response.data.list;
    })

    this.cursoService.getAulaAnio('', this.selectedAulaId, this.selectedAnioId, 0,5).subscribe(response=>{
      console.log(response);
      this.courses = response.data.list
    })

    localStorage.setItem('selectedAula', this.selectedAulaId);
  }

  onCourseChange() {
    const selectedOption = this.courseSelect.nativeElement.selectedOptions[0];
    this.selectedCourseId = selectedOption.value;

    this.asistenciaService.getAsistenciasByFilters('',0,5,this.selectedPeriodId, this.selectedAulaId, this.selectedCourseId).subscribe(response => {
      this.asistencias = response.data.list;
    })

    localStorage.setItem('selectedCurso', this.selectedCourseId);
  }



  //BUSCAR
  /*search(nom: string) {
    let page = this.pagination.getPage(this.paginationData);
    let size = this.pagination.getSize(this.paginationData);
    this.alumnoService.getAll(nom, page, size).subscribe(response => {
      this.student = response.data.list;
    })
  }*/


  // AGREGAR - ACTUALIZAR
  save(asistencia: IAsistencia) {
    console.log(asistencia)
    if (asistencia.id == null) {
      this.asistenciaService.add(asistencia).subscribe(data => {
        console.log(data.message)
        if (data.successful === true) {
          this.msjResponse = 'Agregado correctamente';
          this.successful = true;
        } else {
          this.msjResponse = data.message;
          this.successful = false;
        }
      });
    } else {
      this.asistenciaService.update(asistencia).subscribe(data => {
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
    this.asistenciaService.delete(id).subscribe(data => {
      if (data.successful === true) {
        this.msjResponse = 'Eliminado correctamente';
        this.successful = true;
      }
    });
    this.modalOk.showModal();
  }

  refresh(): void { window.location.reload(); }
}
