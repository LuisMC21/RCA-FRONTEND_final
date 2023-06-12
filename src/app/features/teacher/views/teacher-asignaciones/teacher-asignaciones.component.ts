import { Component, OnInit } from '@angular/core';
import { CourseTeacherService } from 'src/app/features/admin/commons/services/course-teacher.service';
import { PaginationService } from 'src/app/features/admin/commons/services/pagination.service';
import { ICourseTeacher } from 'src/app/features/admin/interfaces/course-teacher';
import { TokenService } from 'src/app/features/auth/commons/services/token.service';

@Component({
  selector: 'app-teacher-asignaciones',
  templateUrl: './teacher-asignaciones.component.html',
  styleUrls: ['./teacher-asignaciones.component.scss']
})
export class TeacherAsignacionesComponent implements OnInit {

  asignaciones:ICourseTeacher[]=[];
  tableName: string = 'Asignaciones';
  paginationData:string ='course';

  code:string = 'DCN005';

  constructor(private courseTeacherService: CourseTeacherService, 
    private pagination: PaginationService,
    private tokenService: TokenService){
    }

  ngOnInit(){
    let page = this.pagination.getPage(this.paginationData);
    let size = this.pagination.getSize(this.paginationData);
    this.courseTeacherService.getAll(this.code,page,size).subscribe(response =>{
      this.asignaciones = response.data.list;
    })
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
