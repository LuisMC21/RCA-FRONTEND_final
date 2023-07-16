import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IAnioLectivo } from '../../interfaces/anio-lectivo';
import { ICourse } from '../../interfaces/course';
import { IPeriod } from '../../interfaces/period';
import { IAula } from '../../interfaces/aula';
import { AulaService } from '../../commons/services/aula.service';
import { PaginationService } from '../../commons/services/pagination.service';
import { AnioLectivoService } from '../../commons/services/anio-lectivo.service';
import { CourseService } from '../../commons/services/course.service';
import { PeriodService } from '../../commons/services/period.service';
import { TokenService } from 'src/app/features/auth/commons/services/token.service';
import { HttpClient } from '@angular/common/http';
import { StudentService } from '../../commons/services/student.service';

@Component({
  selector: 'app-admin-report-notas',
  templateUrl: './admin-report-notas.component.html',
  styleUrls: ['./admin-report-notas.component.scss']
})
export class AdminReportNotasComponent implements OnInit {

  anios: IAnioLectivo[] = [];
  courses: ICourse[] = [];
  periods: IPeriod[] = [];
  classrooms: IAula[] = [];

  paginationData = 'period';
  paginationDataP = 'anio';
  paginationDataC = 'course';
  paginationDataA = 'classroom';
  group!: FormGroup;

  opciones = ['Notas por curso', 'Boleta de notas']
  selectedOption: string = this.opciones[0];

  @ViewChild('classroomSelect') classroomSelect!: ElementRef;
  selectedClassroomId: string = '';
  @ViewChild('anioSelect') anioSelect!: ElementRef;
  selectedAnioName: string = '';
  @ViewChild('periodSelect') periodSelect!: ElementRef;
  selectedPeriodId: string = '';
  @ViewChild('courseSelect') courseSelect!: ElementRef;
  selectedCourseId: string = '';

  codeAlumno: string = '';
  idAlumno: string = '';

  constructor(private classroomService: AulaService, private pagination: PaginationService,
    private formBuilder: FormBuilder, private anioService: AnioLectivoService,
    private courseService: CourseService, private periodoService: PeriodService, private tokenService: TokenService, private http: HttpClient, private studentService: StudentService) { }

  ngOnInit(): void {

    this.form();

    let page = this.pagination.getPage(this.paginationDataA);
    let size = this.pagination.getSize(this.paginationDataA);
    this.classroomService.getAll('', page, size)
      .subscribe(response => {
        this.classrooms = response.data.list;
      });

    this.anioService.getAll('', page, size)
      .subscribe(response => {
        this.anios = response.data.list;
      });

    this.courseService.getAll('', page, size)
      .subscribe(response => {
        this.courses = response.data.list;
        console.log(this.courses);
      });
  }

  form(): void {

    if (this.selectedOption === this.opciones[0]) {
      this.group = this.formBuilder.group({
        periodoDTO: ['', [Validators.required]],
        aulaDTO: ['', [Validators.required]],
        cursoDTO: ['', [Validators.required]]
      });
    } else if (this.selectedOption === this.opciones[1]) {
      this.group = this.formBuilder.group({
        periodoDTO: ['', [Validators.required]],
        alumno: ['', [Validators.required]]
      });
    }
  }

  onChangeSelect() {
    this.form();
    console.log(this.selectedOption);
  }

  onAnioChange() {
    const selectedOption = this.anioSelect.nativeElement.selectedOptions[0];
    this.selectedAnioName = selectedOption.value;

    let pagePe = this.pagination.getPage(this.paginationData);
    let sizePe = this.pagination.getSize(this.paginationData);
    this.periodoService.getAll(this.selectedAnioName.toString(), pagePe, sizePe)
      .subscribe(response => {
        this.periods = response.data.list;
        console.log(this.periods);
      });
  }

  onPeriodChange() {
    const selectedOption = this.periodSelect.nativeElement.selectedOptions[0];
    this.selectedPeriodId = selectedOption.value;

  }

  onCourseChange() {
    const selectedOption = this.courseSelect.nativeElement.selectedOptions[0];
    this.selectedCourseId = selectedOption.value;
  }

  onClassroomChange() {
    const selectedOption = this.classroomSelect.nativeElement.selectedOptions[0];
    this.selectedClassroomId = selectedOption.value;

    if(this.selectedAnioName != '' && this.selectedClassroomId != ''){
      this.courseService.getAulaAnio('', this.selectedClassroomId, this.selectedAnioName, 0,5).subscribe(response=>{
        console.log(response);
        this.courses = response.data.list
      })
    }
  }

  redirectToNotas() {
    if (this.selectedOption === this.opciones[0]) {
      const token = this.tokenService.getToken();
      const url = `http://localhost:8080/evaluacion/cursoNotas?periodo=${this.selectedPeriodId}&curso=${this.selectedCourseId}&aula=${this.selectedClassroomId}`;

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

    if (this.selectedOption === this.opciones[1]) {

      this.studentService.getAll(this.codeAlumno, 0, 5).subscribe(response=>{
        this.idAlumno = response.data.list[0].id || '';
        console.log(this.idAlumno)
        console.log(this.codeAlumno);
      })

      const token = this.tokenService.getToken();
      const url = `http://localhost:8080/evaluacion/boletaNotas?periodo=${this.selectedPeriodId}&alumno=${this.idAlumno}`;

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
}