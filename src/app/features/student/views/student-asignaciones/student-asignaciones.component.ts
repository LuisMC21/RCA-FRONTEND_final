import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AnioLectivoService } from 'src/app/features/admin/commons/services/anio-lectivo.service';
import { AsistenciaService } from 'src/app/features/admin/commons/services/asistencia.service';
import { CourseTeacherService } from 'src/app/features/admin/commons/services/course-teacher.service';
import { PaginationService } from 'src/app/features/admin/commons/services/pagination.service';
import { IAnioLectivo } from 'src/app/features/admin/interfaces/anio-lectivo';
import { ICourseTeacher } from 'src/app/features/admin/interfaces/course-teacher';
import { TokenService } from 'src/app/features/auth/commons/services/token.service';

@Component({
  selector: 'app-student-asignaciones',
  templateUrl: './student-asignaciones.component.html',
  styleUrls: ['./student-asignaciones.component.scss']
})

export class StudentAsignacionesComponent implements OnInit {

  anios: IAnioLectivo[] = [];
  asignaciones: ICourseTeacher[] = [];

  tableName = 'Cursos';

  @ViewChild('anioSelect') anioSelect!: ElementRef;
  selectedAnioId: string = '';

  paginationData = 'student';
  paginationDataPeriod = 'period';

  msjResponse: string = '';
  successful: boolean = false;

  alumno = '';

  constructor(private pagination: PaginationService,
    private anioService: AnioLectivoService, 
    private tokenService: TokenService,
    private courseTeacherService: CourseTeacherService) { }

  ngOnInit(): void {

    this.alumno = this.tokenService.getUserId() || '';

    this.selectedAnioId = localStorage.getItem('selectedAnio') || '';
    console.log(this.alumno);

    this.anioService.getAll('', 0, 5).subscribe(response=>{
      this.anios = response.data.list;
    });

    this.courseTeacherService.getAllAlumnoAnio('',this.alumno,this.selectedAnioId,0,5).subscribe(response=>{
      console.log(response);
      this.asignaciones = response.data.list;
    })

  }

  onAnioChange(){
    const selectedOption = this.anioSelect.nativeElement.selectedOptions[0];
    this.selectedAnioId = selectedOption.value;
    
    this.courseTeacherService.getAllAlumnoAnio('',this.alumno,this.selectedAnioId,0,5).subscribe(response=>{
      this.asignaciones = response.data.list;
    })

    localStorage.setItem('selectedAnio', this.selectedAnioId);
  }

}
