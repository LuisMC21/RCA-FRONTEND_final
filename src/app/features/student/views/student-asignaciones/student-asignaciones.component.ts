import { HttpClient } from '@angular/common/http';
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
  route = 'Asignaciones'

  tableName = 'Cursos';

  @ViewChild('anioSelect') anioSelect!: ElementRef;
  selectedAnioId: string = '';

  paginationData = 'student';

  msjResponse: string = '';
  successful: boolean = false;

  alumno = '';

  page = this.pagination.getPage(this.paginationData);
  size = this.pagination.getSize(this.paginationData);

  constructor(private pagination: PaginationService,
    private anioService: AnioLectivoService, 
    private tokenService: TokenService,
    private courseTeacherService: CourseTeacherService,
    private http: HttpClient) { }

  ngOnInit(): void {

    this.alumno = this.tokenService.getUserId() || '';

    this.selectedAnioId = localStorage.getItem('selectedAnioA') || '';

    this.anioService.getAll('', 0, 5).subscribe(response=>{
      console.log(response)
      this.anios = response.data.list;
    });

    this.courseTeacherService.getAllAlumnoAnio('',this.alumno,this.selectedAnioId,this.page,this.size).subscribe(response=>{
      console.log(response);
      this.asignaciones = response.data.list;
    })

  }

  onAnioChange(){
    const selectedOption = this.anioSelect.nativeElement.selectedOptions[0];
    this.selectedAnioId = selectedOption.value;
    
    this.courseTeacherService.getAllAlumnoAnio('',this.alumno,this.selectedAnioId,this.page,this.size).subscribe(response=>{
      this.asignaciones = response.data.list;
    })

    localStorage.setItem('selectedAnioA', this.selectedAnioId);
  }

  getAsignaciones(){
    this.courseTeacherService.getAllAlumnoAnio('',this.alumno,this.selectedAnioId,this.page,this.size).subscribe(response=>{
      console.log(response);
      this.asignaciones = response.data.list;
    })
  }

  getPage(event: any) {
    this.page = event;
    this.getAsignaciones();
  }

  getSize(event: any) {
    this.size = event;
    this.getAsignaciones();
  }


  redirectToMatricula() {
      const token = this.tokenService.getToken();
      const url = `http://localhost:8080/matricula/exportMatricula?id_alumno=${this.alumno}&id_aniolectivo=${this.selectedAnioId}`;
      
      this.http.get(url, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        responseType: 'blob' // Indicamos que esperamos una respuesta de tipo blob
      }).subscribe(
        (response) => {
          // Crear una URL del objeto Blob
          const fileURL = URL.createObjectURL(response);

          // Abrir el archivo PDF en una nueva pestaña o ventana
          window.open(fileURL);
        },
        (error) => {
          // Manejar cualquier error que ocurra durante la solicitud
          console.error(error);
        }
      );
  }

}
