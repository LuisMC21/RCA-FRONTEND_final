import { HttpClient } from '@angular/common/http';
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

  route = 'Asistencias';

  asignaciones: ICourseTeacher[] = [];

  @ViewChild('periodSelect') periodSelect!: ElementRef;
  selectedPeriodId: string = '';

  @ViewChild('cursoSelect') cursoSelect!: ElementRef;
  selectedCursoId: string = '';

  @ViewChild('anioSelect') anioSelect!: ElementRef;
  selectedAnioId: string = '';

  title!: string;
  tableName: string = 'Notas';

  paginationData = 'student';

  msjResponse: string = '';
  successful: boolean = false;

  idAlumno = '';
  anioName = '';

  page = this.pagination.getPage(this.paginationData);
  size = this.pagination.getSize(this.paginationData);

  constructor(
    private pagination: PaginationService,
    private periodoService: PeriodService,
    private asistenciaService: AsistenciaService,
    private anioService: AnioLectivoService, 
    private tokenService: TokenService,
    private courseTeacherService: CourseTeacherService,
    private http: HttpClient) { }

  ngOnInit(): void {

    this.idAlumno = this.tokenService.getUserId();

    this.selectedPeriodId = localStorage.getItem('selectedPeriodo') || '';
    this.selectedCursoId = localStorage.getItem('selectedCurso') || '';
    this.selectedAnioId = localStorage.getItem('selectedAnio') || '';

    this.anioService.getAll('', 0, 5).subscribe(response=>{
      this.anios = response.data.list;
    })

    if(this.selectedAnioId != ''){
      this.periodoService.getAll(this.selectedAnioId, 0,10).subscribe(response =>{
        this.periods = response.data.list;
      })
    } 

    this.asistenciaService.getAllPeriodoAlumnoCurso('',this.page,this.size, this.selectedPeriodId, this.idAlumno, this.selectedCursoId).subscribe(response => {
      console.log(response);
      this.asistencias = response.data.list;
    })

    this.courseTeacherService.getAllAlumnoAnio('',this.idAlumno,this.selectedAnioId,0,10).subscribe(response=>{
      this.asignaciones = response.data.list;
    })
  }

  onAnioChange(){
    const selectedOption = this.anioSelect.nativeElement.selectedOptions[0];
    this.selectedAnioId = selectedOption.value;

    this.periodoService.getAll(this.selectedAnioId, 0,10).subscribe(response =>{
      this.periods = response.data.list;
    })  

    this.courseTeacherService.getAllAlumnoAnio('',this.idAlumno,this.selectedAnioId,0,10).subscribe(response=>{
      this.asignaciones = response.data.list;
    })

    this.asistencias = [];

    localStorage.setItem('selectedAnio', this.selectedAnioId);
    localStorage.removeItem('selectedPeriodN');
    this.selectedPeriodId = '';
  }

  onPeriodoChange() {
    const selectedOption = this.periodSelect.nativeElement.selectedOptions[0];
    this.selectedPeriodId = selectedOption.value;

    this.asistenciaService.getAllPeriodoAlumnoCurso('',this.page,this.size, this.selectedPeriodId, this.idAlumno, this.selectedCursoId).subscribe(response => {
      console.log(response)
      this.asistencias = response.data.list;
    })

    localStorage.setItem('selectedPeriodo', this.selectedPeriodId);
  }

  onCursoChange() {
    const selectedOption = this.cursoSelect.nativeElement.selectedOptions[0];
    this.selectedCursoId = selectedOption.value;

    this.asistenciaService.getAllPeriodoAlumnoCurso('',this.page,this.size, this.selectedPeriodId, this.idAlumno, this.selectedCursoId).subscribe(response => {
      this.asistencias = response.data.list;
    })

    localStorage.setItem('selectedCurso', this.selectedCursoId);
  }

  getPage(event: any) {
    this.page = event;
    this.getAsistencias();
  }

  getSize(event: any) {
    this.size = event;
    this.getAsistencias();
  }

  getAsistencias(){
    this.asistenciaService.getAllPeriodoAlumnoCurso('',this.page,this.size, this.selectedPeriodId, this.idAlumno, this.selectedCursoId).subscribe(response => {
      this.asistencias = response.data.list;
    })
  }

  redirectToAsistencia(){
    const token = this.tokenService.getToken();
      const url = `http://localhost:8080/asistencia/exportAsistencia?id_alumno=${this.idAlumno}&id_periodo=${this.selectedPeriodId}&id_aniolectivo=${this.selectedAnioId}`;
      
      this.http.get(url, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        responseType: 'blob' // Indicamos que esperamos una respuesta de tipo blob
      }).subscribe(
        (response) => {
          // Crear una URL del objeto Blob
          const fileURL = URL.createObjectURL(response);

          // Abrir el archivo PDF en una nueva pestaña o ventana
          window.open(fileURL);
        },
        (error) => {
          // Manejar cualquier error que ocurra durante la solicitud
          console.error(error);
        }
      );
  }
  

}
