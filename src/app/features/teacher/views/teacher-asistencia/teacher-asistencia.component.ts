import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AnioLectivoService } from 'src/app/features/admin/commons/services/anio-lectivo.service';
import { AsistenciaService } from 'src/app/features/admin/commons/services/asistencia.service';
import { AulaService } from 'src/app/features/admin/commons/services/aula.service';
import { ClaseService } from 'src/app/features/admin/commons/services/clase.service';
import { CourseTeacherService } from 'src/app/features/admin/commons/services/course-teacher.service';
import { CourseService } from 'src/app/features/admin/commons/services/course.service';
import { PaginationService } from 'src/app/features/admin/commons/services/pagination.service';
import { PeriodService } from 'src/app/features/admin/commons/services/period.service';
import { IAnioLectivo } from 'src/app/features/admin/interfaces/anio-lectivo';
import { IAsistencia } from 'src/app/features/admin/interfaces/asistencia';
import { IAula } from 'src/app/features/admin/interfaces/aula';
import { IClase } from 'src/app/features/admin/interfaces/clase';
import { ICourse } from 'src/app/features/admin/interfaces/course';
import { ICourseTeacher } from 'src/app/features/admin/interfaces/course-teacher';
import { IPeriod } from 'src/app/features/admin/interfaces/period';
import { AdminAsistenciaComponent } from 'src/app/features/admin/views/admin-asistencia/admin-asistencia.component';
import { TokenService } from 'src/app/features/auth/commons/services/token.service';
import { ModalComponent } from 'src/app/shared/components/modals/modal/modal.component';

@Component({
  selector: 'app-teacher-asistencia',
  templateUrl: './teacher-asistencia.component.html',
  styleUrls: ['./teacher-asistencia.component.scss']
})
export class TeacherAsistenciaComponent implements OnInit {

  anios: IAnioLectivo[] = [];
  periods: IPeriod[] = [];
  aulas: IAula[] = [];
  courses: ICourse[] = [];
  courseTeachers: ICourseTeacher[] = [];
  clases: IClase[] = [];
  asistencias: IAsistencia[] = [];

  route = "Asistencias";

  periodo!: IPeriod;
  courseTeacher!: ICourseTeacher;

  @ViewChild('anioSelect') anioSelect!: ElementRef;
  selectedAnioId: string = '';

  @ViewChild('periodSelect') periodSelect!: ElementRef;
  selectedPeriodId: string = '';

  @ViewChild('aulaSelect') aulaSelect!: ElementRef;
  selectedAulaId: string = '';

  @ViewChild('courseSelect') courseSelect!: ElementRef;
  selectedCourseId: string = '';

  tableName: string = 'Asistencias';

  title!: string;

  msjResponse: string = '';
  successful: boolean = false;

  paginationData = 'grade';

  @ViewChild('modalOk') modalOk!: ModalComponent;

  constructor(private pagination: PaginationService,
    private periodoService: PeriodService,
    private anioService: AnioLectivoService,
    private aulaService: AulaService,
    private claseService: ClaseService,
    private tokenService: TokenService,
    private courseService: CourseService,
    private courseTeacherService: CourseTeacherService,
    private asistenciaService: AsistenciaService) { }

  ngOnInit(): void {

     //obtener codigo docente
    //this.code = this.tokenService.getUserId();
    this.selectedAnioId = localStorage.getItem('selectedAnio') || '',
    this.selectedPeriodId = localStorage.getItem('selectedPeriodo') || '';
    this.selectedCourseId = localStorage.getItem('selectedCurso') || '';
    this.selectedAulaId = localStorage.getItem('selectedAula') || '';

    this.anioService.getAll('', 0, 10).subscribe(response=>{
      console.log(response)
      this.anios = response.data.list;
    });

    if(this.selectedAnioId != ''){
      this.periodoService.getAll(this.selectedAnioId,0,10).subscribe(response=>{
        console.log(response.data.list)
        this.periods = response.data.list;
      })

      this.aulaService.getAllAnio("", this.selectedAnioId).subscribe(response=>{
        this.aulas = response.data;
      })
    }

    if(this.selectedAulaId != '' && this.selectedAnioId != ''){
      this.courseService.getAulaAnio(this.selectedAulaId, this.selectedAnioId).subscribe(response=>{
        console.log(response)
        this.courses = response.data;
      })
    }

    if(this.selectedPeriodId != ''){
      this.obtenerPeriodo();
    }

    this.asistenciaService.getAll('',0,10).subscribe(response=>{
      this.asistencias = response.data.list;
    })

  }

  onAnioChange(){
    const selectedOption = this.anioSelect.nativeElement.selectedOptions[0];
    this.selectedAnioId = selectedOption.value;

    this.periodoService.getAll(this.selectedAnioId,0,10).subscribe(response=>{
      this.periods = response.data.list;
    })

    this.aulaService.getAllAnio("", this.selectedAnioId).subscribe(response=>{
      this.aulas = response.data;
    });

    localStorage.setItem('selectedAnio', this.selectedAnioId);
  }

  onPeriodoChange() {
    const selectedOption = this.periodSelect.nativeElement.selectedOptions[0];
    this.selectedPeriodId = selectedOption.value;

    this.claseService.getAllPeriodoAulaCurso('', 0, 5, this.selectedPeriodId, this.selectedAulaId, '').subscribe(response => {
      this.clases = response.data.list;
    })

    this.obtenerPeriodo();
    console.log(this.periodo);

    localStorage.setItem('selectedPeriodo', this.selectedPeriodId);
  }

  async obtenerPeriodo(){
    try{
      const response = await this.periodoService.getOne(this.selectedPeriodId).toPromise();
      if(response && response.data){
        this.periodo = response.data;
      }
    }catch(error){

    }
  }

  onAulasChange() {
    const selectedOption = this.aulaSelect.nativeElement.selectedOptions[0];
    this.selectedAulaId = selectedOption.value;

    this.courseService.getAulaAnio(this.selectedAulaId, this.selectedAnioId).subscribe(response=>{
      console.log(response)
      this.courses = response.data;
    })

    this.claseService.getAllPeriodoAulaCurso('', 0, 5, this.selectedPeriodId, this.selectedAulaId, '').subscribe(response => {
      this.clases = response.data.list;
    })

    localStorage.setItem('selectedAula', this.selectedAulaId);

  }

  onCourseChange() {
    const selectedOption = this.courseSelect.nativeElement.selectedOptions[0];
    this.selectedCourseId = selectedOption.value;

    this.claseService.getAllPeriodoAulaCurso('', 0, 5, this.selectedPeriodId, this.selectedAulaId, this.selectedCourseId).subscribe(response => {
      this.clases = response.data.list;
    })

    localStorage.setItem('selectedCurso', this.selectedCourseId);
  }

  //BUSCAR
  search(nom: string) {
    this.asistenciaService.getAll(nom, 0,5).subscribe(response => {
      this.asistencias = response.data.list;
    })
  }

  // AGREGAR - ACTUALIZAR
  save(asistencia: IAsistencia) {
    console.log(asistencia);
    if (asistencia.id == null) {
      this.asistenciaService.add(asistencia).subscribe(data => {
        console.log(data.message)
        console.log(data.data);
        if (data.successful === true) {
          this.msjResponse = 'Agregado correctamente';
          this.successful = true;
        } else {
          this.msjResponse = 'Ha ocurrido un error :(';
          this.successful = false;
        }
      });
    } else {
      this.asistenciaService.update(asistencia).subscribe(data => {
        console.log(data)
        if (data.successful === true) {
          this.msjResponse = 'Cambios actualizados con éxito';
          this.successful = true;
        } else {
          this.msjResponse = 'Ha ocurrido un error :v';
          this.successful = false;
        }
      })
    }
    this.modalOk.showModal();
  }

}
