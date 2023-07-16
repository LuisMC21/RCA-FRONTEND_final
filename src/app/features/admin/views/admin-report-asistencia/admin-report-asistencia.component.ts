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

@Component({
  selector: 'app-admin-report-asistencia',
  templateUrl: './admin-report-asistencia.component.html',
  styleUrls: ['./admin-report-asistencia.component.scss']
})
export class AdminReportAsistenciaComponent implements OnInit {
  students:IStudent[]=[];
  periodos:IPeriod[]=[];
  anios:IAnioLectivo[]=[];
  asistencias:IAsistencia[]=[]
  group!:FormGroup;
  selectedOption: string | undefined; // La opción seleccionada se almacenará en esta variable
  paginationData='period';
  nameStudent: string = '';
  identiStudent: string = '';
  studentident:string='';
 selectedStudent:string='';
  searchForm!:FormGroup;
  options: string[] = [
    'Asistencia por Alumnos',
    'Asistencia por Curso',
    'Asistencia por Clase'
  ];
  period:string='';
  anio:string='';
 

  @ViewChild('studentSelect') studentSelect!: ElementRef;
  selectedStudentId: string = '';
  @ViewChild('periodoSelect') periodoSelect!: ElementRef;
  selectedPeriodoId: string = '';
  @ViewChild('anioSelect') anioSelect!: ElementRef;
  selectedAnioId: string = '';

  constructor(private studentService: StudentService, private periodService:PeriodService, private pagination:PaginationService, private anioService:AnioLectivoService,private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.selectedOption = this.options[0];                           
    this.form();
    
    let page=this.pagination.getPage(this.paginationData);
    let size=this.pagination.getSize(this.paginationData);
    this.studentService.getAll('', page, size)
    .subscribe(response => {
      this.students = response.data.list;
      console.log(this.students);
    });
    this.periodService.getAll('',page,size)
    .subscribe(response=>{
      this.periodos=response.data.list;
      console.log(this.periodos)
    })

    this.anioService.getAll('',page,size)
    .subscribe(response=>{
      this.anios=response.data.list;
      console.log(this.anios)
    })

  }

  form():void{
    this.group=this.formBuilder.group(
      {
        alumnoDTO: ['', [Validators.required]],
        periodoDTO:['',[Validators.required]],
        anioLectivoDTO:['',[Validators.required]]
      }
    );
    this.searchForm = this.formBuilder.group({
      searchStudent: ['', [Validators.required]]
    });
  }
  searchStudent(value: string | undefined) {
    if (value !== undefined) {
      this.nameStudent = value;
      this.studentService.getAll(value, 0, 5).subscribe(response => {
        this.students = response.data.list.filter((student: { usuarioDTO: { pa_surname: string; ma_surname: string; name: string; }; }) =>
          student.usuarioDTO.pa_surname.toLowerCase().includes(value.toLowerCase()) ||
          student.usuarioDTO.ma_surname.toLowerCase().includes(value.toLowerCase()) ||
          student.usuarioDTO.name.toLowerCase().includes(value.toLowerCase()) ||
          `${student.usuarioDTO.pa_surname} ${student.usuarioDTO.ma_surname} ${student.usuarioDTO.name}`.toLowerCase().includes(value.toLowerCase())
        );
        console.log(this.students);
      });
    }}
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
        console.log(this.selectedStudentId);
      }
    }
    
    
  
  onChangeSelect() {
    console.log(this.selectedOption);
  }
  onPeriodoChange(){
    const selectedOption=this.periodoSelect.nativeElement.selectedOptions[0];
    this.selectedPeriodoId=selectedOption.value;
    console.log(this.selectedPeriodoId);
  }
  onAnioChange(){
    const selectedOption=this.anioSelect.nativeElement.selectedOptions[0];
    this.selectedAnioId=selectedOption.value;
    console.log(this.selectedAnioId);
  }
redirectToAsistenciaAlumno(){
  if (this.selectedOption == this.options[0]) {
    const url = `http://localhost:8080/asistencia/exportAsistencia?id_alumno=${this.selectedStudentId}&id_periodo=${this.selectedPeriodoId}&id_aniolectivo=${this.selectedAnioId}`;
    window.location.href = url;
    this.resetForm();
  }

}

resetForm() {
  this.group.reset(); // Restablece los valores del formulario a su estado inicial
  this.nameStudent = ''; // Limpia el campo de búsqueda de estudiantes
  this.selectedStudentId = ''; // Limpia el ID del estudiante seleccionado
}
}
 