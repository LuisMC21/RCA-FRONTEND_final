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
  selectedAnioId: string = '1970ee3c-d611-4343-9b24-7a3ac4da5af0';
  @ViewChild('periodSelect') periodSelect!: ElementRef;
  selectedPeriodId: string = '';
  @ViewChild('courseSelect') courseSelect!: ElementRef;
  selectedCourseId: string = '';

  codeAlumno:string = '';

  constructor(private classroomService: AulaService, private pagination: PaginationService,
    private formBuilder: FormBuilder, private anioService: AnioLectivoService,
    private courseService: CourseService, private periodoService: PeriodService) { }

  ngOnInit(): void {

    this.form();

    let page = this.pagination.getPage(this.paginationDataA);
    let size = this.pagination.getSize(this.paginationDataA);
    this.classroomService.getAll('', page, size)
      .subscribe(response => {
        this.classrooms = response.data.list;
        console.log(this.classrooms);
      });

    let pageP = this.pagination.getPage(this.paginationDataP);
    let sizeP = this.pagination.getSize(this.paginationDataP);
    this.anioService.getAll('', pageP, sizeP)
      .subscribe(response => {
        this.anios = response.data.list;
        console.log(this.anios);
      });

    let pageC = this.pagination.getPage(this.paginationDataC);
    let sizeC = this.pagination.getSize(this.paginationDataC);
    this.courseService.getAll('', pageC, sizeC)
      .subscribe(response => {
        this.courses = response.data.list;
        console.log(this.anios);
      });

    let pagePe = this.pagination.getPage(this.paginationData);
    let sizePe = this.pagination.getSize(this.paginationData);
    this.periodoService.getAll('', pagePe, sizePe)
      .subscribe(response => {
        this.periods = response.data.list;
        console.log(this.anios);
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
  }

  redirectToNotas() {
    if (this.selectedOption === this.opciones[0]) {
      const url = `http://localhost:8080/evaluacion/cursoNotas?periodo=${this.selectedPeriodId}&anio=${this.selectedAnioId}&curso=${this.selectedCourseId}&aula=${this.selectedClassroomId}`;
      window.location.href = url;
    }
    
    if (this.selectedOption === this.opciones[1]) {
      const url = `http://localhost:8080/evaluacion/boletaNotas?periodo=${this.selectedPeriodId}&anio=${this.selectedAnioId}&alumno=${this.codeAlumno}`;
      window.location.href = url;
    }
  }
}
