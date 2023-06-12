import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AulaService } from 'src/app/features/admin/commons/services/aula.service';
import { ClaseService } from 'src/app/features/admin/commons/services/clase.service';
import { CourseTeacherService } from 'src/app/features/admin/commons/services/course-teacher.service';
import { CourseService } from 'src/app/features/admin/commons/services/course.service';
import { PaginationService } from 'src/app/features/admin/commons/services/pagination.service';
import { PeriodService } from 'src/app/features/admin/commons/services/period.service';
import { IAula } from 'src/app/features/admin/interfaces/aula';
import { IClase } from 'src/app/features/admin/interfaces/clase';
import { ICourse } from 'src/app/features/admin/interfaces/course';
import { ICourseTeacher } from 'src/app/features/admin/interfaces/course-teacher';
import { IPeriod } from 'src/app/features/admin/interfaces/period';
import { TokenService } from 'src/app/features/auth/commons/services/token.service';
import { ModalComponent } from 'src/app/shared/components/modals/modal/modal.component';
import { TableClaseComponent } from '../../commons/components/tables-data/table-clase/table-clase.component';

@Component({
  selector: 'app-teacher-clases',
  templateUrl: './teacher-clases.component.html',
  styleUrls: ['./teacher-clases.component.scss']
})
export class TeacherClasesComponent implements OnInit {

  periods: IPeriod[] = [];
  aulas: IAula[] = [];
  courses: ICourse[] = [];
  courseTeachers: ICourseTeacher[] = [];
  clases: IClase[] = [];

  periodo!: IPeriod;
  courseTeacher!: ICourseTeacher;

  @ViewChild('periodSelect') periodSelect!: ElementRef;
  selectedPeriodId: string = '';

  @ViewChild('aulaSelect') aulaSelect!: ElementRef;
  selectedAulaId: string = '';

  @ViewChild('courseSelect') courseSelect!: ElementRef;
  selectedCourseId: string = '';

  @ViewChild(TableClaseComponent) tableComponent!: TableClaseComponent;

  tableName: string = 'Clases';
  selectedAnioName = '2022';

  code: string = 'DCN005';

  title!: string;

  paginationData = 'grade';
  paginationDataStudent = 'student';
  paginationDataPeriod = 'period';
  paginationDataDxC = 'grade';

  msjResponse: string = '';
  successful: boolean = false;

  @ViewChild('modalOk') modalOk!: ModalComponent;

  constructor(private pagination: PaginationService,
    private periodoService: PeriodService,
    private courseTeacherService: CourseTeacherService,
    private claseService: ClaseService,
    private tokenService: TokenService) { }

  ngOnInit(): void {

    //obtener codigo docente
    //this.code = this.tokenService.getUserId();

    this.selectedPeriodId = localStorage.getItem('selectedPeriodo') || '';
    this.selectedCourseId = localStorage.getItem('selectedCurso') || '';
    this.selectedAulaId = localStorage.getItem('selectedAula') || '';

    let page = this.pagination.getPage(this.paginationDataDxC);
    let size = this.pagination.getSize(this.paginationDataDxC);
    this.courseTeacherService.getAll(this.code, 0, 10).subscribe(response => {
      this.courseTeachers = response.data.list;
      console.log(this.courseTeachers);

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
        this.filtered();
      });

    this.claseService.getAllPeriodoAulaCurso('', pagePe, sizePe, this.selectedPeriodId, this.selectedAulaId, this.selectedCourseId).subscribe(response => {
      this.clases = response.data.list;
    })

    this.performFiltering();

  }

  async performFiltering(): Promise<void> {
    await this.filtered();
  }

  onPeriodoChange() {
    const selectedOption = this.periodSelect.nativeElement.selectedOptions[0];
    this.selectedPeriodId = selectedOption.value;

    this.claseService.getAllPeriodoAulaCurso('', 0, 5, this.selectedPeriodId, '', '').subscribe(response => {
      this.clases = response.data.list;
    })

    localStorage.setItem('selectedPeriodo', this.selectedPeriodId);
  }

  onAulasChange() {
    const selectedOption = this.aulaSelect.nativeElement.selectedOptions[0];
    this.selectedAulaId = selectedOption.value;

    this.claseService.getAllPeriodoAulaCurso('', 0, 5, this.selectedPeriodId, this.selectedAulaId, '').subscribe(response => {
      this.clases = response.data.list;
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

  onCourseChange() {
    const selectedOption = this.courseSelect.nativeElement.selectedOptions[0];
    this.selectedCourseId = selectedOption.value;

    this.claseService.getAllPeriodoAulaCurso('', 0, 5, this.selectedPeriodId, this.selectedAulaId, this.selectedCourseId).subscribe(response => {
      this.clases = response.data.list;
    })

    localStorage.setItem('selectedCurso', this.selectedCourseId);

    this.filtered();

  }

  async filtered(): Promise<void> {

    const filteredCourseTeacher: ICourseTeacher | undefined = this.courseTeachers.find(courseTeacher =>
      courseTeacher.aulaDTO.id === this.selectedAulaId &&
      courseTeacher.cursoDTO.id === this.selectedCourseId &&
      courseTeacher.docenteDTO.code === this.code
    );

    if (filteredCourseTeacher !== undefined) {
      this.courseTeacher = filteredCourseTeacher;
    }

    const filteredPeriod: IPeriod | undefined = this.periods.find(period => period.id === this.selectedPeriodId);

    if (filteredPeriod !== undefined) {
      this.periodo = filteredPeriod;
    }


  }

  //BUSCAR
  search(nom: string) {
    let page = this.pagination.getPage(this.paginationData);
    let size = this.pagination.getSize(this.paginationData);
    this.claseService.getAll(nom, page, size).subscribe(response => {
      this.clases = response.data.list;
    })
  }

  // AGREGAR - ACTUALIZAR
  save(clase: IClase) {
    console.log(clase);
    if (clase.id == null) {
      this.claseService.add(clase).subscribe(data => {
        console.log(data)
        if (data.successful === true) {
          this.msjResponse = 'Agregado correctamente';
          this.successful = true;
        } else {
          this.msjResponse = 'Ha ocurrido un error :(';
          this.successful = false;
        }
      });
    } else {
      this.claseService.update(clase).subscribe(data => {
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
    this.claseService.delete(id).subscribe(data => {
      console.log(data)
      if (data.successful === true) {
        this.msjResponse = 'Eliminado correctamente';
        this.successful === true;
      }
    });
    this.modalOk.showModal();
  }

  refresh(): void { window.location.reload(); }

}
