import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AnioLectivoService } from 'src/app/features/admin/commons/services/anio-lectivo.service';
import { CourseTeacherService } from 'src/app/features/admin/commons/services/course-teacher.service';
import { PaginationService } from 'src/app/features/admin/commons/services/pagination.service';
import { IAnioLectivo } from 'src/app/features/admin/interfaces/anio-lectivo';
import { ICourseTeacher } from 'src/app/features/admin/interfaces/course-teacher';
import { TokenService } from 'src/app/features/auth/commons/services/token.service';

@Component({
  selector: 'app-teacher-asignaciones',
  templateUrl: './teacher-asignaciones.component.html',
  styleUrls: ['./teacher-asignaciones.component.scss']
})
export class TeacherAsignacionesComponent implements OnInit {

  anios: IAnioLectivo[] = [];
  asignaciones:ICourseTeacher[]=[];
  tableName: string = 'Asignaciones';
  paginationData:string ='courseTeacher';

  route = "Asignaciones";

  teacher = '';

  @ViewChild('anioSelect') anioSelect!: ElementRef;
  selectedAnioId: string = '';


  constructor(private courseTeacherService: CourseTeacherService,
    private pagination: PaginationService,
    private tokenService: TokenService,
    private anioService: AnioLectivoService){
    }

  ngOnInit(){

    this.teacher = this.tokenService.getUserId() || '';
    this.selectedAnioId = localStorage.getItem('selectedAnioA') || '';

    this.anioService.getAll('', 0, 5).subscribe(response=>{
      console.log(response)
      this.anios = response.data.list;
    });

    let page = this.pagination.getPage(this.paginationData);
    let size = this.pagination.getSize(this.paginationData);
    this.courseTeacherService.getAllDocenteAnio('',this.teacher, this.selectedAnioId,page,size).subscribe(response =>{
      this.asignaciones = response.data.list;
    })
  }

  onAnioChange(){
    const selectedOption = this.anioSelect.nativeElement.selectedOptions[0];
    this.selectedAnioId = selectedOption.value;

    this.courseTeacherService.getAllDocenteAnio('',this.teacher, this.selectedAnioId,0,5).subscribe(response =>{
      this.asignaciones = response.data.list;
    })

    localStorage.setItem('selectedAnioA', this.selectedAnioId);
    
  }

  //BUSCAR
  search(nom:string){
    let page = this.pagination.getPage(this.paginationData);
    let size = this.pagination.getSize(this.paginationData);
    this.courseTeacherService.getAll(nom,page,size).subscribe(response =>{
      this.asignaciones = response.content;
    })
  }

}
