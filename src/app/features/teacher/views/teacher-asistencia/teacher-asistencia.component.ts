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
  courses: ICourse[] = [];
  asignaciones: ICourseTeacher[] = [];
  clases: IClase[] = [];
  aulas: IAula[] = [];
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

  @ViewChild('claseSelect') claseSelect!: ElementRef;
  selectedClaseId: string = '';

  tableName: string = 'Asistencias';

  title!: string;
  teacher = '';

  msjResponse: string = '';
  successful!: boolean;

  paginationData = 'grade';

  @ViewChild('modalOk') modalOk!: ModalComponent;

  constructor(private pagination: PaginationService,
    private periodoService: PeriodService,
    private anioService: AnioLectivoService,
    private claseService: ClaseService,
    private tokenService: TokenService,
    private courseService: CourseService,
    private courseTeacherService: CourseTeacherService,
    private asistenciaService: AsistenciaService) { }

  ngOnInit(): void {

    this.teacher = this.tokenService.getUserId() || '';

    this.selectedAnioId = localStorage.getItem('selectedAnioAs') || '',
      this.selectedPeriodId = localStorage.getItem('selectedPeriodoAs') || '';
    this.selectedCourseId = localStorage.getItem('selectedCursoAs') || '';
    this.selectedAulaId = localStorage.getItem('selectedAulaAs') || '';
    this.selectedClaseId = localStorage.getItem('selectedClaseAs') || '';

    this.anioService.getAll('', 0, 10).subscribe(response => {
      this.anios = response.data.list;
    });

    let page = this.pagination.getPage(this.paginationData);
    let size = this.pagination.getSize(this.paginationData);


    if (this.selectedAnioId != '') {
      this.periodoService.getAll(this.selectedAnioId, 0, 10).subscribe(response => {
        this.periods = response.data.list;
      })

      this.courseTeacherService.getAllDocenteAnio('', this.teacher, this.selectedAnioId, page, size)
        .subscribe(response => {
          this.asignaciones = response.data.list;

          this.aulas = this.asignaciones.reduce((result: IAula[], asignacion: ICourseTeacher) => {
            const aula = asignacion.aulaDTO;
            if (!result.some((aulaUnica: IAula) => aulaUnica.gradoDTO.id === aula.gradoDTO.id && aulaUnica.seccionDTO.id === aula.seccionDTO.id)) {
              result.push(aula);
            }
            return result;
          }, []);
        });
    }

    if (this.selectedPeriodId != '') {
      this.asistenciaService.getAllPeriodoAulaCursoClase('', 0, 5, this.selectedPeriodId, this.selectedAulaId, this.selectedCourseId, this.selectedClaseId).subscribe(response => {
        console.log(response);
        this.asistencias = response.data.list;
      })
    }

    if (this.selectedAulaId != '') {
      this.courses = [];

      this.courses = this.getCursosUnicosPorAula(this.selectedAulaId);
    }
  }

  onAnioChange() {
    const selectedOption = this.anioSelect.nativeElement.selectedOptions[0];
    this.selectedAnioId = selectedOption.value;

    this.periodoService.getAll(this.selectedAnioId, 0, 10).subscribe(response => {
      this.periods = response.data.list;
    })

    this.aulas = [];

    this.courseTeacherService.getAllDocenteAnio('', this.teacher, this.selectedAnioId, 0, 5)
      .subscribe(response => {
        this.asignaciones = response.data.list;

        this.aulas = this.asignaciones.reduce((result: IAula[], asignacion: ICourseTeacher) => {
          const aula = asignacion.aulaDTO;
          if (!result.some((aulaUnica: IAula) => aulaUnica.gradoDTO.id === aula.gradoDTO.id && aulaUnica.seccionDTO.id === aula.seccionDTO.id)) {
            result.push(aula);
          }
          return result;
        }, []);
      });

    localStorage.setItem('selectedAnioAs', this.selectedAnioId);
  }

  onPeriodoChange() {
    const selectedOption = this.periodSelect.nativeElement.selectedOptions[0];
    this.selectedPeriodId = selectedOption.value;

    this.claseService.getAllPeriodoAulaCurso('', 0, 5, this.selectedPeriodId, this.selectedAulaId, '').subscribe(response => {
      this.clases = response.data.list;
    })

    this.asistenciaService.getAllPeriodoAulaCursoClase('', 0, 5, this.selectedPeriodId, this.selectedAulaId, this.selectedCourseId, '').subscribe(response => {
      console.log(response);
      this.asistencias = response.data.list;
    })

    localStorage.setItem('selectedPeriodoAs', this.selectedPeriodId);
  }


  onAulasChange() {
    const selectedOption = this.aulaSelect.nativeElement.selectedOptions[0];
    this.selectedAulaId = selectedOption.value;

    this.courses = [];

    this.courses = this.getCursosUnicosPorAula(this.selectedAulaId);

    this.asistenciaService.getAllPeriodoAulaCursoClase('', 0, 5, this.selectedPeriodId, this.selectedAulaId, this.selectedCourseId, '').subscribe(response => {
      console.log(response);
      this.asistencias = response.data.list;
    })

    this.claseService.getAllPeriodoAulaCurso('', 0, 5, this.selectedPeriodId, this.selectedAulaId, '').subscribe(response => {
      this.clases = response.data.list;
    })


    console.log(this.selectedAulaId);
    localStorage.setItem('selectedAulaAs', this.selectedAulaId);

  }

  onCourseChange() {
    const selectedOption = this.courseSelect.nativeElement.selectedOptions[0];
    this.selectedCourseId = selectedOption.value;

    this.claseService.getAllPeriodoAulaCurso('', 0, 40, this.selectedPeriodId, this.selectedAulaId, this.selectedCourseId).subscribe(response => {
      this.clases = response.data.list;
    })

    this.asistenciaService.getAllPeriodoAulaCursoClase('', 0, 5, this.selectedPeriodId, this.selectedAulaId, this.selectedCourseId, '').subscribe(response => {
      this.asistencias = response.data.list;
    })

    localStorage.setItem('selectedCursoAs', this.selectedCourseId);
  }

  onClaseChange() {
    const selectedOption = this.claseSelect.nativeElement.selectedOptions[0];
    this.selectedClaseId = selectedOption.value;

    this.asistenciaService.getAllPeriodoAulaCursoClase('', 0, 5, this.selectedPeriodId, this.selectedAulaId, this.selectedCourseId, this.selectedClaseId).subscribe(response => {
      this.asistencias = response.data.list;
    })

    localStorage.setItem('selectedClaseAs', this.selectedCourseId);
  }

  //BUSCAR
  search(nom: string) {
    this.asistenciaService.getAll(nom, 0, 5).subscribe(response => {
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

  getCursosUnicosPorAula(idAulaSeleccionada: string): ICourse[] {
    const asignacionesFiltradas: ICourseTeacher[] = this.asignaciones.filter((asignacion: ICourseTeacher) => {
      return asignacion.aulaDTO.id === idAulaSeleccionada;
    });

    const cursosUnicos: ICourse[] = asignacionesFiltradas.reduce((result: ICourse[], asignacion: ICourseTeacher) => {
      const curso = asignacion.cursoDTO;
      if (!result.some((cursoUnico: ICourse) => cursoUnico.id === curso.id)) {
        result.push(curso);
      }
      return result;
    }, []);

    return cursosUnicos;
  }

}
