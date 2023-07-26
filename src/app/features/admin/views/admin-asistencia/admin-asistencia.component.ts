import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from 'src/app/shared/components/modals/modal/modal.component';
import { AsistenciaService } from '../../commons/services/asistencia.service';
import { PaginationService } from '../../commons/services/pagination.service';
import { IAsistencia } from '../../interfaces/asistencia';
import { IAula } from '../../interfaces/aula';
import { AulaService } from '../../commons/services/aula.service';
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
  successful!: boolean;
  filterSearch = "";
  //paginacion
  page = this.pagination.getPage(this.paginationData);
  size = this.pagination.getSize(this.paginationData);
  //
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
    private aulaService: AulaService,
    private periodoService: PeriodService,
    private cursoService: CourseService,
    private anioService: AnioLectivoService
  ) { }

  ngOnInit(): void {
    this.getAnios();
  }

  //BUSCAR
  search(nom: string) {
    this.filterSearch = nom;
    console.log(this.filterSearch)
    this.getAsistencias();
  }


  // AGREGAR - ACTUALIZAR
  save(asistencia: IAsistencia) {
    if (asistencia.id == null) {
      this.asistenciaService.add(asistencia).subscribe(data => {
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
      } else {
        this.msjResponse = data.message;
        this.successful = false;
      }
    });
    this.modalOk.showModal();
  }

  refresh(): void { window.location.reload(); }
 
  getPage(event: any) {
    this.page = event;
    this.getAsistencias();
  }

  getSize(event: any) {
    this.size = event;
    this.getAsistencias();
  }

  //Funciones para filtros
  onAnioChange() {
    const selectedOption = this.anioSelect.nativeElement.selectedOptions[0];
    this.selectedAnioId = selectedOption.value;
    this.getPeriodos();
  }
  onPeriodoChange() {
    const selectedOption = this.periodSelect.nativeElement.selectedOptions[0];
    this.selectedPeriodId = selectedOption.value;
    this.getAulas();
  }

  onAulasChange() {
    const selectedOption = this.aulaSelect.nativeElement.selectedOptions[0];
    this.selectedAulaId = selectedOption.value;
    this.getCursos();
  }
  onCourseChange() {
    const selectedOption = this.courseSelect.nativeElement.selectedOptions[0];
    this.selectedCourseId = selectedOption.value;
    this.getAsistencias();
  }

  getAnios(){
    this.anioService.getAll('', 0, 20)
      .subscribe(response => {
        if(response.successful && response.data.list){
          this.anios = response.data.list;
          this.selectedAnioId = this.anios[this.anios.length-1].id;
          this.getPeriodos();
        } else{
          this.selectedAnioId = "";
          this.anios = [];
          this.getPeriodos();
        }
      })
  }

  getPeriodos(){
    if(this.selectedAnioId !== ""){
      this.periodoService.getAll(this.selectedAnioId, 0, 20)
        .subscribe(response => {
          if(response.successful && response.data.list){
            this.periods = response.data.list;
            this.selectedPeriodId = this.periods[0].id;
            this.getAulas();
          } else {
            this.selectedPeriodId = "";
            this.periods = [];
            this.getAulas();
          }
        });
    } else {
      this.selectedPeriodId = "";
      this.periods = [];
      this.getAulas();
    }
  }

  getAulas() {
    if(this.selectedPeriodId !== ""){
      this.aulaService.getAllAnio('', this.selectedAnioId)
        .subscribe(response => {
          if(response.successful && response.data.length>0){
            this.aulas = response.data;
            this.selectedAulaId= this.aulas[0].id;

            this.getCursos();
          } else {
            this.aulas = [];
            this.selectedAulaId = "";
            this.getCursos();
          }
        });
    } else {
      this.aulas = [];
      this.selectedAulaId = "";
      this.getCursos();
    }
  }
  getCursos(){
    if(this.selectedAulaId !== ""){
      this.cursoService.getAulaAnio(this.selectedAulaId, this.selectedAnioId)
          .subscribe(response => {
            if(response.successful && response.data.length>0){
              this.courses = response.data;
              this.selectedCourseId = this.courses[0].id;
              this.getAsistencias();
            } else{
              this.courses = [];
              this.selectedCourseId = "";
              this.getAsistencias();
            }
          });
    } else {
      this.courses = [];
      this.selectedCourseId = "";
      this.getAsistencias();
    }
  }

  getAsistencias(){
    if(this.selectedCourseId != '' && this.selectedPeriodId != '' && this.selectedAulaId != ''){
      this.asistenciaService.getAsistenciasByFilters(this.filterSearch,this.page,this.size,this.selectedPeriodId, this.selectedAulaId, this.selectedCourseId)
      .subscribe(response => {
        if(response.successful){
          this.asistencias = response.data.list;
        } else{
          this.asistencias = [];
        }
      });
    }else{
      this.asistencias = [];
    }
  }
}
