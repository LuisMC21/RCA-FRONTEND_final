import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminAniolectivoComponent } from './views/admin-aniolectivo/admin-aniolectivo.component';
import { AdminAsistenciaComponent } from './views/admin-asistencia/admin-asistencia.component';
import { AdminCourseComponent } from './views/admin-course/admin-course.component';
import { AdminEnrollmentView } from './views/admin-enrollment/admin-enrollment.view';
import { AdminGradeComponent } from './views/admin-grade/admin-grade.component';
import { AdminImageComponent } from './views/admin-image/admin-image.component';
import { AdminNewsView } from './views/admin-news/admin-news.view';
import { AdminParentView } from './views/admin-parent/admin-parent.view';
import { AdminPeriodComponent } from './views/admin-period/admin-period.component';
import { AdminRoleComponent } from './views/admin-role/admin-role.component';
import { AdminSchoolYearView } from './views/admin-school-year/admin-school-year.view';
import { AdminStudentView } from './views/admin-student/admin-student.view';
import { AdminTeacherView } from './views/admin-teacher/admin-teacher.view';
import { DashboardView } from './views/dashboard/dashboard.view';
import { AdminSectionComponent } from './views/admin-section/admin-section.component';
import { AdminClassroomComponent } from './views/admin-classroom/admin-classroom.component';
import { AdminCourseTeacherComponent } from './views/admin-course-teacher/admin-course-teacher.component';
import { AdminReportMatriculaComponent } from './views/admin-report-matricula/admin-report-matricula.component';
import { AdminReportNotasComponent } from './views/admin-report-notas/admin-report-notas.component';


const routes: Routes = [
  {
    path: '', component: AdminComponent,
    children: [
      { path: 'inicio', component: DashboardView },
      { path: 'alumno', component: AdminStudentView },
      { path: 'docente', component: AdminTeacherView },
      { path: 'curso', component: AdminCourseComponent },
      { path: 'grado', component: AdminGradeComponent },
      { path: 'periodo', component: AdminPeriodComponent },
      { path: 'apoderado', component: AdminParentView },
      { path: 'matricula', component: AdminEnrollmentView },
      { path: 'añoLectivo', component: AdminSchoolYearView },
      { path: 'noticias', component: AdminNewsView },
      { path: 'imagenes', component: AdminImageComponent },
      { path: 'anioLectivo', component: AdminAniolectivoComponent },
      { path: 'rol', component: AdminRoleComponent },
      { path: 'asistencia', component: AdminAsistenciaComponent },
      { path: 'seccion', component: AdminSectionComponent },
      { path: 'aula', component: AdminClassroomComponent },
      { path: 'periodo', component: AdminPeriodComponent},
      { path: 'docenteCurso', component: AdminCourseTeacherComponent},
      { path: 'reportesMatricula', component: AdminReportMatriculaComponent},
      { path: 'reportesNotas', component: AdminReportNotasComponent}
    ]
  },
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
