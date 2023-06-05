import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CourseTeacherService } from 'src/app/features/admin/commons/services/course-teacher.service';
import { EvaluacionService } from 'src/app/features/admin/commons/services/evaluacion.service';
import { PaginationService } from 'src/app/features/admin/commons/services/pagination.service';
import { PeriodService } from 'src/app/features/admin/commons/services/period.service';
import { StudentService } from 'src/app/features/admin/commons/services/student.service';
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

  alumnos: IStudent[] = [];
  periods: IPeriod[] = [];
  aulas: IAula[] = [];
  courses: ICourse[] = [];
  courseTeachers: ICourseTeacher[] = [];
  evaluaciones: IEvaluacion[] = [];

  periodo?:IPeriod;
  courseTeacher?: ICourseTeacher;


  @ViewChild('periodSelect') periodSelect!: ElementRef;
  selectedPeriodId: string = '';

  @ViewChild('aulaSelect') aulaSelect!: ElementRef;
  selectedAulaId: string = '';

  @ViewChild('courseSelect') courseSelect!: ElementRef;
  selectedCourseId: string = '';

  tableName: string = 'Notas';
  selectedAnioName = '2022';

  code:string = 'DCN005';
  id:string = '5f4fd454-2eaa-4be7-81b7-8276de3a6f92';

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
    private courseTeacherService: CourseTeacherService,
    private evaluacionService: EvaluacionService) {
  }

  ngOnInit(): void {

    this.selectedPeriodId = localStorage.getItem('selectedPeriodo') || '';
    this.selectedCourseId = localStorage.getItem('selectedCurso') || '';
    this.selectedAulaId = localStorage.getItem('selectedAula') || '';

    let page = this.pagination.getPage(this.paginationDataDxC);
    let size = this.pagination.getSize(this.paginationDataDxC);
    this.courseTeacherService.getAll(this.code, 0, 10).subscribe(response => {
        this.courseTeachers = response.data.list;

        this.aulas = this.courseTeachers.map((courseTeacher) => courseTeacher.aulaDTO).filter((aula, index, self) => {
            return index === self.findIndex((a) => (
              a.id === aula.id
            ));
          });

          const registrosFiltrados = this.courseTeachers.filter((courseTeacher) => {
            return (
              courseTeacher.aulaDTO.id === this.selectedAulaId &&
              courseTeacher.docenteDTO.code === this.code
            );
          });
          
          // Obtener solo los atributos cursoDTO de los registros filtrados en un nuevo arreglo
          this.courses = registrosFiltrados.map((courseTeacher) => courseTeacher.cursoDTO);
      });

    let pagePe = this.pagination.getPage(this.paginationDataPeriod);
    let sizePe = this.pagination.getSize(this.paginationDataPeriod);
    this.periodoService.getAll(this.selectedAnioName.toString(), pagePe, sizePe)
      .subscribe(response => {
        this.periods = response.data.list;
      });

    this.evaluacionService.getAllPeriodoAulaCurso('', pagePe, sizePe, this.selectedPeriodId, this.selectedAulaId, this.selectedCourseId).subscribe(response => {
      this.evaluaciones = response.data.list;
    })
  }

  onPeriodoChange() {
    const selectedOption = this.periodSelect.nativeElement.selectedOptions[0];
    this.selectedPeriodId = selectedOption.value;

    this.evaluacionService.getAllPeriodoAulaCurso('', 0, 5, this.selectedPeriodId, '', '').subscribe(response => {
      this.evaluaciones = response.data.list;
    })

    localStorage.setItem('selectedPeriodo', this.selectedPeriodId);
  }

  onAulasChange() {
    const selectedOption = this.aulaSelect.nativeElement.selectedOptions[0];
    this.selectedAulaId = selectedOption.value;

    this.evaluacionService.getAllPeriodoAulaCurso('', 0, 5, this.selectedPeriodId, this.selectedAulaId, '').subscribe(response => {
      this.evaluaciones = response.data.list;
    })

    const registrosFiltrados = this.courseTeachers.filter((courseTeacher) => {
      return (
        courseTeacher.aulaDTO.id === this.selectedAulaId &&
        courseTeacher.docenteDTO.code === this.code
      );
    });
    
    // Obtener solo los atributos cursoDTO de los registros filtrados en un nuevo arreglo
    this.courses = registrosFiltrados.map((courseTeacher) => courseTeacher.cursoDTO);
    localStorage.setItem('selectedAula', this.selectedAulaId);

  }

  onCourseChange(){
    const selectedOption = this.courseSelect.nativeElement.selectedOptions[0];
    this.selectedCourseId = selectedOption.value;

    this.evaluacionService.getAllPeriodoAulaCurso('', 0, 5, this.selectedPeriodId, this.selectedAulaId, this.selectedCourseId).subscribe(response => {
      this.evaluaciones = response.data.list;
    })

    
    localStorage.setItem('selectedCurso', this.selectedCourseId);

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
