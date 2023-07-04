import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AnioLectivoService } from 'src/app/features/admin/commons/services/anio-lectivo.service';
import { AsistenciaService } from 'src/app/features/admin/commons/services/asistencia.service';
import { CourseTeacherService } from 'src/app/features/admin/commons/services/course-teacher.service';
import { PaginationService } from 'src/app/features/admin/commons/services/pagination.service';
import { PeriodService } from 'src/app/features/admin/commons/services/period.service';
import { IAnioLectivo } from 'src/app/features/admin/interfaces/anio-lectivo';
import { IAsistencia } from 'src/app/features/admin/interfaces/asistencia';
import { IAula } from 'src/app/features/admin/interfaces/aula';
import { ICourse } from 'src/app/features/admin/interfaces/course';
import { ICourseTeacher } from 'src/app/features/admin/interfaces/course-teacher';
import { IEvaluacion } from 'src/app/features/admin/interfaces/evaluacion';
import { IPeriod } from 'src/app/features/admin/interfaces/period';
import { TokenService } from 'src/app/features/auth/commons/services/token.service';

@Component({
  selector: 'app-student-asistencias',
  templateUrl: './student-asistencias.component.html',
  styleUrls: ['./student-asistencias.component.scss']
})
export class StudentAsistenciasComponent implements OnInit {

  periods: IPeriod[] = [];
  cursos: ICourse[] = [];
  anios: IAnioLectivo[] = [];
  asistencias: IAsistencia[] = [];

  @ViewChild('periodSelect') periodSelect!: ElementRef;
  selectedPeriodId: string = '';

  @ViewChild('cursoSelect') cursoSelect!: ElementRef;
  selectedCursoId: string = '';

  @ViewChild('anioSelect') anioSelect!: ElementRef;
  selectedAnioId: string = '';

  title!: string;
  tableName: string = 'Notas';

  paginationDataStudent = 'student';
  paginationDataPeriod = 'period';

  msjResponse: string = '';
  successful: boolean = false;

  idAlumno = '';

  constructor(
    private pagination: PaginationService,
    private periodoService: PeriodService,
    private asistenciaService: AsistenciaService,
    private anioService: AnioLectivoService, 
    private tokenService: TokenService,
    private courseTeacherService: CourseTeacherService) { }

  ngOnInit(): void {

    this.idAlumno = this.tokenService.getUserId();
    console.log(this.idAlumno);

    this.selectedPeriodId = localStorage.getItem('selectedPeriodo') || '';
    this.selectedCursoId = localStorage.getItem('selectedCurso') || '';
    this.selectedAnioId = localStorage.getItem('selectedAnio') || '';

    this.anioService.getAll('', 0, 5).subscribe(response=>{
      this.anios = response.data.list;
    })

    this.periodoService.getAll(this.selectedAnioId,0,5).subscribe(response=>{
      this.periods = response.data.list;
    })

    this.asistenciaService.getAllPeriodoAlumnoCurso('',0,5, this.selectedPeriodId, this.idAlumno, this.selectedCursoId).subscribe(response => {
      this.asistencias = response.data.list;
    })
  }

  onAnioChange(){
    const selectedOption = this.anioSelect.nativeElement.selectedOptions[0];
    this.selectedAnioId = selectedOption.value;

    const anioName = this.anios.find((a)=>a.id = this.selectedAnioId)?.name;

    this.periodoService.getAll(anioName, 0,10).subscribe(response =>{
      this.periods = response.data.list;
    })  

    this.courseTeacherService.getAllAlumnoAnio('',this.idAlumno, this.selectedAnioId, 0,5).subscribe(response=>{
      const lista: ICourseTeacher[] = response.data.list;
        this.cursos = lista.map((ct) => ct.cursoDTO);
    })

    localStorage.setItem('selectedAnio', this.selectedAnioId);
  }

  onPeriodoChange() {
    const selectedOption = this.periodSelect.nativeElement.selectedOptions[0];
    this.selectedPeriodId = selectedOption.value;

    this.asistenciaService.getAll('', 0, 5).subscribe(response => {
      this.asistencias = response.data.list;
    })

    this.asistenciaService.getAllPeriodoAlumnoCurso('',0,5, this.selectedPeriodId, this.idAlumno, this.selectedCursoId).subscribe(response => {
      this.asistencias = response.data.list;
    })

    localStorage.setItem('selectedPeriodo', this.selectedPeriodId);
  }

  onCursoChange() {
    const selectedOption = this.cursoSelect.nativeElement.selectedOptions[0];
    this.selectedCursoId = selectedOption.value;

    this.asistenciaService.getAllPeriodoAlumnoCurso('',0,5, this.selectedPeriodId, this.idAlumno, this.selectedCursoId).subscribe(response => {
      this.asistencias = response.data.list;
    })

    localStorage.setItem('selectedCurso', this.selectedCursoId);
  }
  

}
