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
import { IStudent } from '../../interfaces/student';
import { EvaluacionService } from '../../commons/services/evaluacion.service';

@Component({
  selector: 'app-admin-report-notas',
  templateUrl: './admin-report-notas.component.html',
  styleUrls: ['./admin-report-notas.component.scss']
})
export class AdminReportNotasComponent implements OnInit {

  anios: IAnioLectivo[] = [];
  anios3: IAnioLectivo[] = [];

  periods: IPeriod[] = [];
  periodos2: IPeriod[] = [];

  aulas2: IAula[] = [];
  cursos2: ICourse[] = [];
  students: IStudent[] = [];

  paginationData = 'period';
  paginationDataP = 'anio';
  paginationDataC = 'course';
  paginationDataA = 'classroom';
  group!: FormGroup;
  group3!: FormGroup;

  opciones = ['Notas por curso', 'Boleta de notas']
  selectedOption: string = this.opciones[0];

  @ViewChild('anioSelect') anioSelect!: ElementRef;
  selectedAnioName: string = '';
  @ViewChild('periodSelect') periodSelect!: ElementRef;
  selectedPeriodId: string = '';
  @ViewChild('aula2Select') aula2Select!: ElementRef;
  selected2AulaId: string = '';
  @ViewChild('anio3Select') anio3Select!: ElementRef;
  selected3AnioId: string = '';
  @ViewChild('curso2Select') curso2Select!: ElementRef;
  selected2CursoId: string = '';
  @ViewChild('periodo2Select') periodo2Select!: ElementRef;
  selected2PeriodoId: string = '';
  @ViewChild('studentSelect') studentSelect!: ElementRef;
  selectedStudentId: string = '';

  codeAlumno: string = '';
  idAlumno: string = '';
  nameStudent: string = '';
  selectedStudent: string = '';

  constructor(private classroomService: AulaService,
    private pagination: PaginationService,
    private formBuilder: FormBuilder,
    private anioService: AnioLectivoService,
    private courseService: CourseService,
    private periodoService: PeriodService,
    private studentService: StudentService,
    private evaluacionService: EvaluacionService) { }

  ngOnInit(): void {
    this.selectedOption = this.opciones[0];

    let page = this.pagination.getPage(this.paginationDataA);
    let size = this.pagination.getSize(this.paginationDataA);

    this.getAnios();
    this.getAnios3();
    this.form()
  }

  form(): void {
      this.group = this.formBuilder.group({
        periodoDTO: [this.selectedPeriodId, [Validators.required]],
        alumnoDTO: ['', [Validators.required]],
        anioDTO: [this.selectedAnioName, [Validators.required]]
      });
      this.group3 = this.formBuilder.group({
          curso2DTO: [this.selected2CursoId, [Validators.required]],
          aula2DTO: [this.selected2AulaId, [Validators.required]],
          periodo2DTO: [this.selected2PeriodoId , [Validators.required]],
          anioLectivo3DTO: [this.selected3AnioId, [Validators.required]]
      });
  }

  onChangeSelect() {
    this.form();
    console.log(this.selectedOption);
  }

  redirectToNotas() {
    if (this.selectedOption === this.opciones[0]) {
        this.evaluacionService.reporteNotasCurso(this.selected2PeriodoId, this.selected2CursoId, this.selected2AulaId)
    }

    if (this.selectedOption === this.opciones[1]) {
        this.evaluacionService.reporteBoletaNotas(this.selectedStudentId, this.selectedPeriodId);
    }
  }


  //--Funciones para reporte de asistencia de una clase
  onAnioChange3() {
    const selectedOption = this.anio3Select.nativeElement.selectedOptions[0];
    this.selected3AnioId = selectedOption.value;
    this.getPeriodos2();
  }
  onPeriodo2Change() {
    const selectedOption = this.periodo2Select.nativeElement.selectedOptions[0];
    this.selected2PeriodoId = selectedOption.value;
    this.getAulas2();
  }

  onAula2Change() {
    const selectedOption = this.aula2Select.nativeElement.selectedOptions[0];
    this.selected2AulaId = selectedOption.value;
    this.getCursos2();
  }
  onCurso2Change() {
    const selectedOption = this.curso2Select.nativeElement.selectedOptions[0];
    this.selected2CursoId = selectedOption.value;
    this.form();
  }

  getAnios3(){
    this.anioService.getAll('', 0, 100)
      .subscribe(response => {
        if(response.successful && response.data.list){
          this.anios3 = response.data.list;
          this.selected3AnioId = this.anios[this.anios3.length-1].id;
          this.getPeriodos2();
        } else{
          console.log("aqui")
          this.selected3AnioId = "";
          this.anios3 = [];
          this.getPeriodos2();
        }
      })
  }

  getPeriodos2(){
    if(this.selected3AnioId !== ""){
      this.periodoService.getAll(this.selected3AnioId, 0, 20)
        .subscribe(response => {
          if(response.successful && response.data.list){
            this.periodos2 = response.data.list;
            this.selected2PeriodoId = this.periodos2[0].id;
            this.getAulas2();
          } else {
            this.selected2PeriodoId = "";
            this.periodos2 = [];
            this.getAulas2();
          }
        });
    } else {
      this.selected2PeriodoId = "";
      this.periodos2 = [];
      this.getAulas2();
    }
  }

  getAulas2() {
    if(this.selected2PeriodoId !== ""){
      this.classroomService.getAllAnio('', this.selected3AnioId)
        .subscribe(response => {
          if(response.successful && response.data.length>0){
            this.aulas2 = response.data;
            this.selected2AulaId= this.aulas2[0].id;
            this.getCursos2();
          } else {
            this.aulas2 = [];
            this.selected2AulaId = "";
            this.getCursos2();
          }
        });
    } else {
      this.aulas2 = [];
      this.selected2AulaId = "";
      this.getCursos2();
    }
  }
  getCursos2(){
    if(this.selected2AulaId !== ""){
      this.courseService.getAulaAnio(this.selected2AulaId, this.selected3AnioId)
          .subscribe(response => {
            if(response.successful && response.data.length>0){
              this.cursos2 = response.data;
              this.selected2CursoId = this.cursos2[0].id;
              this.form();
            } else{
              this.cursos2 = [];
              this.selected2CursoId = "";
              this.form();
            }
          });
    } else {
      this.cursos2 = [];
      this.selected2CursoId = "";
      this.form();
    }
  }

    //--Funciones para reporte de boleta de notas de periodo de un alumno
  onAnioChange() {
    const selectedOption = this.anioSelect.nativeElement.selectedOptions[0];
    this.selectedAnioName = selectedOption.value;
    this.getPeriodos();
  }

  onPeriodChange() {
    const selectedOption = this.periodSelect.nativeElement.selectedOptions[0];
    this.selectedPeriodId = selectedOption.value;
  }

  getAnios(){
    this.anioService.getAll('', 0, 100)
      .subscribe(response => {
        if(response.successful && response.data.list){
          this.anios = response.data.list;
          this.selectedAnioName = response.data.list[response.data.list.length-1].id;
          console.log(this.selectedAnioName)
          this.getPeriodos();
        } else{
          this.anios = [];
          this.selectedAnioName ="";
          this.getPeriodos();
        }
      });
  }
  getPeriodos(){
    if(this.selectedAnioName !== ""){
      this.periodoService.getAll(this.selectedAnioName, 0, 20)
        .subscribe(response => {
          if(response.successful && response.data.list){
            this.periods = response.data.list;
            this.selectedPeriodId = this.periods[0].id;
          } else {
            this.selectedPeriodId = "";
            this.periods = [];
            this.form();
          }
        });
    } else {
      this.selectedPeriodId = "";
      this.periods = [];
      this.form();
    }
  }
  //buscador alumno
  searchStudent(value: string | undefined) {
    if (value !== undefined) {
      this.nameStudent = value;
      console.log(this.selectedAnioName)
      this.studentService.getAllAnioCursoAula(value, this.selectedAnioName, "", "", 0, 50).subscribe(response => {
        if(response.successful && response.data.list){
          this.students = response.data.list;
        } else {
          this.students= [];
        }
      });
    }
  }
  selectStudent(student: IStudent) {
    this.selectedStudent = `${student.usuarioDTO.pa_surname} ${student.usuarioDTO.ma_surname} ${student.usuarioDTO.name}`;
    this.selectedStudentId = student.id;
  }
  updateStudentId(event: any) {
    const selectedStudent = this.students.find(student => {
      const fullName = `${student.usuarioDTO.pa_surname} ${student.usuarioDTO.ma_surname} ${student.usuarioDTO.name}`;
      return fullName === event;
    });
    if (selectedStudent) {
      this.selectedStudentId = selectedStudent.id;
    }
  }
}
