import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IStudent } from '../../interfaces/student';
import { IPeriod } from '../../interfaces/period';
import { IAnioLectivo } from '../../interfaces/anio-lectivo';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PeriodService } from '../../commons/services/period.service';
import { PaginationService } from '../../commons/services/pagination.service';
import { AnioLectivoService } from '../../commons/services/anio-lectivo.service';
import { IAsistencia } from '../../interfaces/asistencia';
import { StudentService } from '../../commons/services/student.service';
import { TokenService } from 'src/app/features/auth/commons/services/token.service';
import { HttpClient } from '@angular/common/http';
import { AulaService } from '../../commons/services/aula.service';
import { IAula } from '../../interfaces/aula';
import { ICourse } from '../../interfaces/course';
import { CourseService } from '../../commons/services/course.service';
import { AsistenciaService } from '../../commons/services/asistencia.service';
import { IClase } from '../../interfaces/clase';
import { ClaseService } from '../../commons/services/clase.service';

@Component({
  selector: 'app-admin-report-asistencia',
  templateUrl: './admin-report-asistencia.component.html',
  styleUrls: ['./admin-report-asistencia.component.scss']
})
export class AdminReportAsistenciaComponent implements OnInit {
  students: IStudent[] = [];
  periodos: IPeriod[] = [];
  periodos2: IPeriod[] = [];
  anios: IAnioLectivo[] = [];
  anios2: IAnioLectivo[] = [];
  anios3: IAnioLectivo[] = [];
  aulas: IAula[] = [];
  aulas2: IAula[] = [];
  cursos: ICourse[] = [];
  cursos2: ICourse[] = [];
  asistencias: IAsistencia[] = [];
  clases: IClase[] = [];
  group!: FormGroup;
  group2!: FormGroup;
  group3!: FormGroup;
  selectedOption: string | undefined; // La opción seleccionada se almacenará en esta variable
  paginationData = 'period';
  nameStudent: string = '';
  identiStudent: string = '';
  studentident: string = '';
  selectedStudent: string = '';
  searchForm!: FormGroup;
  options: string[] = [
    'Asistencia por Alumnos',
    'Asistencia por Curso',
    'Asistencia por Clase'
  ];
  period: string = '';
  period2: string = '';
  anio: string = '';


  @ViewChild('studentSelect') studentSelect!: ElementRef;
  selectedStudentId: string = '';
  @ViewChild('periodoSelect') periodoSelect!: ElementRef;
  selectedPeriodoId: string = '';
  @ViewChild('periodo2Select') periodo2Select!: ElementRef;
  selected2PeriodoId: string = '';
  @ViewChild('anioSelect') anioSelect!: ElementRef;
  selectedAnioId: string = '';
  @ViewChild('anio2Select') anio2Select!: ElementRef;
  selected2AnioId: string = '';
  @ViewChild('anio3Select') anio3Select!: ElementRef;
  selected3AnioId: string = '';
  @ViewChild('aulaSelect') aulaSelect!: ElementRef;
  selectedAulaId: string = '';
  @ViewChild('aula2Select') aula2Select!: ElementRef;
  selected2AulaId: string = '';
  @ViewChild('cursoSelect') cursoSelect!: ElementRef;
  selectedCursoId: string = '';
  @ViewChild('curso2Select') curso2Select!: ElementRef;
  selected2CursoId: string = '';
  @ViewChild('claseSelect') claseSelect!: ElementRef;
  selectedClaseId: string = '';
  constructor(private studentService: StudentService,
    private periodService: PeriodService,
    private aulaService: AulaService,
    private claseService: ClaseService,
    private pagination: PaginationService,
    private anioService: AnioLectivoService,
    private cursoService: CourseService,
    private asistenciaService: AsistenciaService,
    private formBuilder: FormBuilder,
    private tokenService: TokenService,
    private http: HttpClient) { }

  ngOnInit(): void {
    this.selectedOption = this.options[0];

    let page = this.pagination.getPage(this.paginationData);
    let size = this.pagination.getSize(this.paginationData);

    //Funciones para reporte asistencia por alumno
    this.getAnios();
    //---
    //Funciones para reporte asistencia por curso
    this.getAnios2();
    //----
    //Funciones para reporte asistencia por clase
    this.getAnios3();
    //----

    this.form();

  }

  form(): void {
    this.group = this.formBuilder.group(
      {
        alumnoDTO: ['', [Validators.required]],
        periodoDTO: [this.selectedPeriodoId , [Validators.required]],
        anioLectivoDTO: [this.selectedAnioId, [Validators.required]]
      }
    );
    this.searchForm = this.formBuilder.group({
      searchStudent: ['', [Validators.required]]
    });

    this.group2 = this.formBuilder.group(
      {
        cursoDTO: [this.selectedCursoId, [Validators.required]],
        aulaDTO: [this.selectedAulaId, [Validators.required]],
        anioLectivo2DTO: [this.selected2AnioId, [Validators.required]]
      }
    );

    this.group3 = this.formBuilder.group(
      {
        claseDTO: ['', [Validators.required]],
        curso2DTO: [this.selected2CursoId, [Validators.required]],
        aula2DTO: [this.selected2AulaId, [Validators.required]],
        periodo2DTO: [this.selected2PeriodoId , [Validators.required]],
        anioLectivo3DTO: [this.selected3AnioId, [Validators.required]]
      }
    );
  }
  searchStudent(value: string | undefined) {
    if (value !== undefined) {
      this.nameStudent = value;
      console.log(this.selectedAnioId)
      this.studentService.getAllAnioCursoAula(value, this.selectedAnioId, "", "", 0, 50).subscribe(response => {
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


  onChangeSelect() {
    console.log(this.selectedOption);
  }


  redirectToAsistenciaAlumno() {

    if (this.selectedOption === this.options[0]) {
      const token = this.tokenService.getToken();
      const url = `http://localhost:8080/asistencia/exportAsistencia?id_alumno=${this.selectedStudentId}&id_periodo=${this.selectedPeriodoId}&id_aniolectivo=${this.selectedAnioId}`;
      this.http.get(url, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        responseType: 'blob' // Indicamos que esperamos una respuesta de tipo blob
      }).subscribe({
        next: (response) => {
          // Crear una URL del objeto Blob
          const fileURL = URL.createObjectURL(response);
          // Abrir el archivo PDF en una nueva pestaña o ventana
          window.open(fileURL);
        },
        error: (error) => {
          // Manejar cualquier error que ocurra durante la solicitud
          console.error(error);
        }
      });
    }
    if (this.selectedOption === this.options[1]) {
      this.asistenciaService.exportAsistAula(this.selectedCursoId, this.selectedAulaId, this.selected2AnioId)
    }
    if (this.selectedOption === this.options[2]) {
      this.asistenciaService.exportAsistClase(this.selectedClaseId)
    }
  }
  resetForm() {
    this.group.reset(); // Restablece los valores del formulario a su estado inicial
    this.nameStudent = ''; // Limpia el campo de búsqueda de estudiantes
    this.selectedStudentId = ''; // Limpia el ID del estudiante seleccionado
  }

  //Funciones para reporte asistencia por curso
  onAnioChange2() {
    const selectedOption = this.anio2Select.nativeElement.selectedOptions[0];
    this.selected2AnioId = selectedOption.value;
    this.getAulas();
  }
  onAulaChange() {
    const selectedOption = this.aulaSelect.nativeElement.selectedOptions[0];
    this.selectedAulaId = selectedOption.value;
    this.getCursos();
  }
  onCursoChange() {
    const selectedOption = this.cursoSelect.nativeElement.selectedOptions[0];
    this.selectedCursoId = selectedOption.value;
  }
  getAnios2() {
    this.anioService.getAll('', 0, 100)
      .subscribe(response => {
        if(response.successful && response.data.list){
          this.anios2 = response.data.list;
          this.selected2AnioId = this.anios2[this.anios2.length-1].id
          this.getAulas();
        } else {
          this.anios2 = [];
          this.getAulas();
        }
      })
  }
  getAulas() {
    this.aulaService.getAllAnio('', this.selected2AnioId)
      .subscribe(response => {
        if(response.successful){
          this.aulas = response.data;
          this.selectedAulaId= this.aulas[0].id;
          this.getCursos();
        } else {
          this.aulas = [];
          this.getCursos();
        }
      })
  }
  getCursos(){
    this.cursoService.getAulaAnio(this.selectedAulaId, this.selected2AnioId)
        .subscribe(response => {
          if(response.successful){
            this.cursos = response.data;
            this.selectedCursoId = this.cursos[0].id;
            this.form();
          } else{
            this.cursos = []
          }
        })
  }
  //-----

  //Funciones para el reporte asistencia por alumnos
  onAnioChange() {
    const selectedOption = this.anioSelect.nativeElement.selectedOptions[0];
    this.selectedAnioId = selectedOption.value;
    this.getPeriodos();
  }
  onPeriodoChange() {
    const selectedOption = this.periodoSelect.nativeElement.selectedOptions[0];
    this.selectedPeriodoId = selectedOption.value;
  }
  getAnios(){
    this.anioService.getAll('', 0, 100)
      .subscribe(response => {
        if(response.successful && response.data.list){
          this.anios = response.data.list;
          this.selectedAnioId = this.anios[this.anios.length-1].id;
          this.getPeriodos();
        } else{
          this.anios = [];
          this.selectedAnioId = "";
          this.getPeriodos();
        }
      })
  }
  getPeriodos(){
    this.periodService.getAll(this.selectedAnioId, 0, 20)
      .subscribe(response => {
        if(response.successful && response.data.list){
          this.periodos = response.data.list;
          this.selectedPeriodoId = this.periodos[0].id;
        } else {
          this.periodos = []
        }
      })
  }
  //--

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
    this.getClases();
  }
  onClaseChange() {
    const selectedOption = this.claseSelect.nativeElement.selectedOptions[0];
    this.selectedClaseId = selectedOption.value;
  }


  getAnios3(){
    this.anioService.getAll('', 0, 100)
      .subscribe(response => {
        if(response.successful && response.data.list){
          this.anios3 = response.data.list;
          this.selected3AnioId = this.anios[this.anios3.length-1].id;
          this.getPeriodos2();
        } else{
          this.selected3AnioId = "";
          this.anios3 = [];
          this.getPeriodos2();
        }
      })
  }

  getPeriodos2(){
    if(this.selected3AnioId !== ""){
      this.periodService.getAll(this.selected3AnioId, 0, 20)
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
      this.aulaService.getAllAnio('', this.selected3AnioId)
        .subscribe(response => {
          if(response.successful){
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
      this.cursoService.getAulaAnio(this.selected2AulaId, this.selected3AnioId)
          .subscribe(response => {
            if(response.successful){
              this.cursos2 = response.data;
              this.selected2CursoId = this.cursos2[0].id;
              this.getClases();
              this.form();
            } else{
              this.cursos2 = [];
              this.selected2CursoId = "";
              this.getClases();
            }
          });
    } else {
      this.cursos2 = [];
      this.selected2CursoId = "";
      this.getClases();
    }
  }

  getClases(){
    if(this.selected2PeriodoId !== "" && this.selected2AulaId !== "" && this.selected2CursoId !==""){
      this.claseService.getAllPeriodoAulaCurso('', 0, 50, this.selected2PeriodoId, this.selected2AulaId, this.selected2CursoId).subscribe(response => {
        if(response.successful && response.data.list){
          this.clases = response.data.list;
          this.form();
        } else{
          this.clases = [];
          this.form();
        }
      });
    } else {
      this.clases = [];
      this.form();
    }
  }

}
