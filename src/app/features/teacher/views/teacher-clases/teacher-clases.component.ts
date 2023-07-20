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
import { IAnioLectivo } from 'src/app/features/admin/interfaces/anio-lectivo';
import { AnioLectivoService } from 'src/app/features/admin/commons/services/anio-lectivo.service';

@Component({
  selector: 'app-teacher-clases',
  templateUrl: './teacher-clases.component.html',
  styleUrls: ['./teacher-clases.component.scss']
})
export class TeacherClasesComponent implements OnInit {

  anios: IAnioLectivo[] = [];
  periods: IPeriod[] = [];
  aulas: IAula[] = [];
  courses: ICourse[] = [];
  courseTeachers: ICourseTeacher[] = [];
  clases: IClase[] = [];

  route = "Clases";

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

  tableName: string = 'Clases';

  title!: string;

  paginationData:string ='course';

  msjResponse: string = '';
  successful: boolean = false;

  @ViewChild('modalOk') modalOk!: ModalComponent;

  constructor(private pagination: PaginationService,
    private periodoService: PeriodService,
    private anioService: AnioLectivoService,
    private aulaService: AulaService,
    private claseService: ClaseService,
    private tokenService: TokenService,
    private courseService: CourseService,
    private courseTeacherService: CourseTeacherService) { }

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

    if(this.selectedCourseId != ''){
      this.obtenerCourseTeacher();
    }

    let page = this.pagination.getPage(this.paginationData);
    let size = this.pagination.getSize(this.paginationData);
    this.claseService.getAllPeriodoAulaCurso('',page, size, this.selectedPeriodId, this.selectedAulaId, this.selectedCourseId).subscribe(response => {
      this.clases = response.data.list;
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

    this.obtenerCourseTeacher();
    console.log(this.courseTeacher);

    localStorage.setItem('selectedCurso', this.selectedCourseId);

  }

  async obtenerCourseTeacher(){
    try {
      const response = await this.courseTeacherService.getAulaCurso('',this.selectedAulaId, this.selectedCourseId,0,5).toPromise();
      if(response && response.data && response.data.list){
        this.courseTeacher = response.data.list[0];
      }
    } catch (error) {
      console.log(error)
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
        this.successful === false;
      }
    });
    this.modalOk.showModal();
  }

  refresh(): void { window.location.reload(); }

}
