import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../commons/services/student.service';
import { TeacherService } from '../../commons/services/teacher.service';
import { AulaService } from '../../commons/services/aula.service';
import { CourseService } from '../../commons/services/course.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.view.html',
  styleUrls: ['./dashboard.view.scss']
})
export class DashboardView implements OnInit {
  totalStudents: number = 0;
  totalTeachers: number = 0;
  totalAulas:number=0;
  totalCursos:number=0;
  constructor(private studentService: StudentService,private teacherService:TeacherService,private aulaService:AulaService,private courseService:CourseService) {
  }

  ngOnInit(): void {
    this.studentService.getAlumnosCount('')
    .subscribe(count => {
      this.totalStudents = count;
      
    });
    this.teacherService.getTeacherCount('')
    .subscribe(count => {
      this.totalTeachers = count;
    });
    this.aulaService.getAulaCount('')
    .subscribe(count=>{
      this.totalAulas=count;
    })

    this.courseService.getCursoCount('')
    .subscribe(count=>{
      this.totalCursos=count;
    })

  }

}
  

