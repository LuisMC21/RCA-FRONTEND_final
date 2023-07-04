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
  selectedAnioName: string = '';
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

  onAnioChange(){
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
  }

  redirectToNotas() {
    if (this.selectedOption === this.opciones[0]) {
      const url = `http://localhost:8080/evaluacion/cursoNotas?periodo=${this.selectedPeriodId}&curso=${this.selectedCourseId}&aula=${this.selectedClassroomId}`;
      window.location.href = url;
    }
    
    if (this.selectedOption === this.opciones[1]) {
      const url = `http://localhost:8080/evaluacion/boletaNotas?periodo=${this.selectedPeriodId}&alumno=${this.codeAlumno}`;
      window.location.href = url;
    }
  }
}
