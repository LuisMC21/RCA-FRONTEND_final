import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AnioLectivoService } from 'src/app/features/admin/commons/services/anio-lectivo.service';
import { AulaService } from 'src/app/features/admin/commons/services/aula.service';
import { CourseTeacherService } from 'src/app/features/admin/commons/services/course-teacher.service';
import { CourseService } from 'src/app/features/admin/commons/services/course.service';
import { EvaluacionService } from 'src/app/features/admin/commons/services/evaluacion.service';
import { PaginationService } from 'src/app/features/admin/commons/services/pagination.service';
import { PeriodService } from 'src/app/features/admin/commons/services/period.service';
import { StudentService } from 'src/app/features/admin/commons/services/student.service';
import { IAnioLectivo } from 'src/app/features/admin/interfaces/anio-lectivo';
import { IAula } from 'src/app/features/admin/interfaces/aula';
import { ICourse } from 'src/app/features/admin/interfaces/course';
import { ICourseTeacher } from 'src/app/features/admin/interfaces/course-teacher';
import { IEvaluacion } from 'src/app/features/admin/interfaces/evaluacion';
import { IPeriod } from 'src/app/features/admin/interfaces/period';
import { IStudent } from 'src/app/features/admin/interfaces/student';
import { ModalComponent } from 'src/app/shared/components/modals/modal/modal.component';

@Component({
  selector: 'app-teacher-notas',
  templateUrl: './teacher-notas.component.html',
  styleUrls: ['./teacher-notas.component.scss']
})
export class TeacherNotasComponent implements OnInit {

  anios: IAnioLectivo[] = [];
  alumnos: IStudent[] = [];
  periods: IPeriod[] = [];
  aulas: IAula[] = [];
  courses: ICourse[] = [];
  courseTeachers: ICourseTeacher[] = [];
  evaluaciones: IEvaluacion[] = [];

  route = "Promedios";

  periodo?:IPeriod;
  courseTeacher?: ICourseTeacher;


  @ViewChild('anioSelect') anioSelect!: ElementRef;
  selectedAnioId: string = '';

  @ViewChild('periodSelect') periodSelect!: ElementRef;
  selectedPeriodId: string = '';

  @ViewChild('aulaSelect') aulaSelect!: ElementRef;
  selectedAulaId: string = '';

  @ViewChild('courseSelect') courseSelect!: ElementRef;
  selectedCourseId: string = '';

  tableName: string = 'Notas';
  selectedAnioName = '2022';

  code:string = 'DCN005';

  title!: string;

  paginationData = 'grade';
  paginationDataStudent = 'student';
  paginationDataPeriod = 'period';
  paginationDataDxC = 'grade';

  msjResponse: string = '';
  successful: boolean = false;

  @ViewChild('modalOk') modalOk!: ModalComponent;

  constructor(private studentService: StudentService,
    private pagination: PaginationService,
    private periodoService: PeriodService,
    private evaluacionService: EvaluacionService,
    private anioService: AnioLectivoService,
    private aulaService: AulaService,
    private courseService: CourseService) {
  }

  ngOnInit(): void {

    this.selectedAnioId = localStorage.getItem('selectedAnioN') || '';
    this.selectedPeriodId = localStorage.getItem('selectedPeriodoN') || '';
    this.selectedCourseId = localStorage.getItem('selectedCursoN') || '';
    this.selectedAulaId = localStorage.getItem('selectedAulaN') || '';

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

    let page = this.pagination.getPage(this.paginationDataDxC);
    let size = this.pagination.getSize(this.paginationDataDxC);

    this.evaluacionService.getAllPeriodoAulaCurso('', page, size, this.selectedPeriodId, this.selectedAulaId, this.selectedCourseId).subscribe(response => {
      this.evaluaciones = response.data.list;
    })
  }

  onAnioChange(){
    const selectedOption = this.anioSelect.nativeElement.selectedOptions[0];
    this.selectedAnioId = selectedOption.value;

    this.periodoService.getAll(this.selectedAnioId,0,10).subscribe(response=>{
      this.periods = response.data.list;
    })

    this.aulaService.getAllAnio("", this.selectedAnioId).subscribe(response=>{
      console.log(response)
      this.aulas = response.data;
    })

    console.log(this.selectedAnioId);

    localStorage.setItem('selectedAnioN', this.selectedAnioId);
  }

  onPeriodoChange() {
    const selectedOption = this.periodSelect.nativeElement.selectedOptions[0];
    this.selectedPeriodId = selectedOption.value;

    this.evaluacionService.getAllPeriodoAulaCurso('', 0, 5, this.selectedPeriodId, '', '').subscribe(response => {
      this.evaluaciones = response.data.list;
    })

    localStorage.setItem('selectedPeriodoN', this.selectedPeriodId);
  }

  onAulasChange() {
    const selectedOption = this.aulaSelect.nativeElement.selectedOptions[0];
    this.selectedAulaId = selectedOption.value;

    this.courseService.getAulaAnio(this.selectedAulaId, this.selectedAnioId).subscribe(response=>{
      this.courses = response.data;
    })

    this.evaluacionService.getAllPeriodoAulaCurso('', 0, 5, this.selectedPeriodId, this.selectedAulaId, '').subscribe(response => {
      this.evaluaciones = response.data.list;
    })

    localStorage.setItem('selectedAulaN', this.selectedAulaId);

  }

  onCourseChange(){
    const selectedOption = this.courseSelect.nativeElement.selectedOptions[0];
    this.selectedCourseId = selectedOption.value;

    this.evaluacionService.getAllPeriodoAulaCurso('', 0, 5, this.selectedPeriodId, this.selectedAulaId, this.selectedCourseId).subscribe(response => {
      this.evaluaciones = response.data.list;
    })

    localStorage.setItem('selectedCursoN', this.selectedCourseId);
  }

  //BUSCAR
  search(nom: string) {
    let page = this.pagination.getPage(this.paginationData);
    let size = this.pagination.getSize(this.paginationData);
    this.evaluacionService.getAll(nom, page, size).subscribe(response => {
      this.evaluaciones = response.data.list;
    })
  }

  // AGREGAR - ACTUALIZAR
  save(evaluacion: IEvaluacion) {
    console.log(evaluacion);
    if (evaluacion.id == null) {
      this.evaluacionService.add(evaluacion).subscribe(data => {
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
      this.evaluacionService.update(evaluacion).subscribe(data => {
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

  //ELIMINAR
  delete(id: string) {
    this.evaluacionService.delete(id).subscribe(data => {
      if (data.successful === true) {
        this.msjResponse = 'Eliminado correctamente';
        this.successful === true;
      }
    });
    this.modalOk.showModal();
  }

  refresh(): void { window.location.reload(); }

}
