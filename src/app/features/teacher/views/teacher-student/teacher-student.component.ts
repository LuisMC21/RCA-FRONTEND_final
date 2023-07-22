import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AnioLectivoService } from 'src/app/features/admin/commons/services/anio-lectivo.service';
import { AulaService } from 'src/app/features/admin/commons/services/aula.service';
import { CourseTeacherService } from 'src/app/features/admin/commons/services/course-teacher.service';
import { PaginationService } from 'src/app/features/admin/commons/services/pagination.service';
import { StudentService } from 'src/app/features/admin/commons/services/student.service';
import { IAnioLectivo } from 'src/app/features/admin/interfaces/anio-lectivo';
import { IAula } from 'src/app/features/admin/interfaces/aula';
import { ICourseTeacher } from 'src/app/features/admin/interfaces/course-teacher';
import { IStudent } from 'src/app/features/admin/interfaces/student';
import { TokenService } from 'src/app/features/auth/commons/services/token.service';
import { ModalComponent } from 'src/app/shared/components/modals/modal/modal.component';

@Component({
  selector: 'app-teacher-student',
  templateUrl: './teacher-student.component.html',
  styleUrls: ['./teacher-student.component.scss']
})
export class TeacherStudentComponent implements OnInit {

  anios: IAnioLectivo[] = [];
  asignaciones: ICourseTeacher[] = [];
  students: IStudent[] = [];
  route = 'Estudiantes';
  

  @ViewChild('anioSelect') anioSelect!: ElementRef;
  selectedAnioId: string = '';

  @ViewChild('aulaSelect') aulaSelect!: ElementRef;
  selectedAulaId: string = '';

  tableName: string = 'Estudiantes';

  title!: string;
  teacher = '';
  paginationData:string ='course';

  msjResponse: string = '';
  successful: boolean = false;

  @ViewChild('modalOk') modalOk!: ModalComponent;

  constructor(private pagination: PaginationService,
    private anioService: AnioLectivoService,
    private aulaService: AulaService,
    private studentService: StudentService,
    private tokenService: TokenService,
    private courseTeacherService: CourseTeacherService,
    private http: HttpClient) { }

  ngOnInit(): void {

    this.teacher = this.tokenService.getUserId() || '';

    this.selectedAnioId = localStorage.getItem('selectedAnioE') || '',
    this.selectedAulaId = localStorage.getItem('selectedAulaE') || '';

    this.anioService.getAll('', 0, 10).subscribe(response=>{
      console.log(response)
      this.anios = response.data.list;
    });

    let page = this.pagination.getPage(this.paginationData);
    let size = this.pagination.getSize(this.paginationData);
    this.courseTeacherService.getAllDocenteAnio('',this.teacher, this.selectedAnioId,page,size).subscribe(response =>{
      this.asignaciones = response.data.list;
    })

    if(this.selectedAnioId != '' && this.selectedAulaId != ''){
      this.studentService.getAllAnioCursoAula('',this.selectedAnioId, this.selectedAulaId, '',0,5).subscribe(response=>{
        this.students = response.data.list;
      })
    }
  }

  onAnioChange(){
    const selectedOption = this.anioSelect.nativeElement.selectedOptions[0];
    this.selectedAnioId = selectedOption.value;

    this.courseTeacherService.getAllDocenteAnio('',this.teacher, this.selectedAnioId,0,5).subscribe(response =>{
      this.asignaciones = response.data.list;
    })

    localStorage.setItem('selectedAnioE', this.selectedAnioId);
    localStorage.removeItem('selectedAulaE');
    this.selectedAulaId = '';
    this.students = [];
  }

  onAulasChange() {
    const selectedOption = this.aulaSelect.nativeElement.selectedOptions[0];
    this.selectedAulaId = selectedOption.value;

    this.studentService.getAllAnioCursoAula('',this.selectedAnioId, this.selectedAulaId, '',0,5).subscribe(response=>{
      this.students = response.data.list;
    })

    localStorage.setItem('selectedAulaE', this.selectedAulaId); 
  }

  search(name: string){

  }

  redirectToEstudiantes(){
    const token = this.tokenService.getToken();
      const url = `http://localhost:8080/matricula/alumnosAula?uniqueIdentifierAula=${this.selectedAulaId}&uniqueIdentifierAnio=${this.selectedAnioId}`;
      
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

  redirecToApoderados(){
    const token = this.tokenService.getToken();
      const url = `http://localhost:8080/aula/exportApoderados?id_aula=${this.selectedAulaId}&id_aniolectivo=${this.selectedAnioId}`;
      
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
