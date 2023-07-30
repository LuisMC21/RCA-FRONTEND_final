import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardView } from './views/dashboard/dashboard.view';
import { AdminRoutingModule } from './admin-routing.modules';
import { AdminCommonsModule } from './commons/commons.module';
import { AdminComponent } from './admin.component';
import { CoreComponentsModule } from 'src/app/core/components/components.module';
import { AdminTeacherView } from './views/admin-teacher/admin-teacher.view';
import { AdminStudentView } from './views/admin-student/admin-student.view';
import { SharedComponentsModule } from 'src/app/shared/components/components.module';
import { AdminCourseComponent } from './views/admin-course/admin-course.component';
import { AdminPeriodComponent } from './views/admin-period/admin-period.component';
import { AdminGradeComponent } from './views/admin-grade/admin-grade.component';
import { AdminParentView } from './views/admin-parent/admin-parent.view';
import { AdminEnrollmentView } from './views/admin-enrollment/admin-enrollment.view';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminSchoolYearView } from './views/admin-school-year/admin-school-year.view';
import { AdminNewsView } from './views/admin-news/admin-news.view';
import { AdminImageComponent } from './views/admin-image/admin-image.component';
import { AdminAniolectivoComponent } from './views/admin-aniolectivo/admin-aniolectivo.component';
import { AdminRoleComponent } from './views/admin-role/admin-role.component';
import { AdminAsistenciaComponent } from './views/admin-asistencia/admin-asistencia.component';
import { AdminSectionComponent } from './views/admin-section/admin-section.component';
import { AdminClassroomComponent } from './views/admin-classroom/admin-classroom.component';
import { AdminCourseTeacherComponent } from './views/admin-course-teacher/admin-course-teacher.component';
import { AdminReportMatriculaComponent } from './views/admin-report-matricula/admin-report-matricula.component';
import { AdminReportNotasComponent } from './views/admin-report-notas/admin-report-notas.component';
import { interceptorProvider } from 'src/app/interceptors/admin-interceptor.service';
import { AdminReportAsistenciaComponent } from './views/admin-report-asistencia/admin-report-asistencia.component';
import { AdminUserComponent } from './views/admin-user/admin-user.component';

@NgModule({
  declarations: [
    DashboardView,
    AdminComponent,
    AdminTeacherView,
    AdminStudentView,
    AdminCourseComponent,
    AdminPeriodComponent,
    AdminGradeComponent,
    AdminParentView,
    AdminEnrollmentView,
    AdminSchoolYearView,
    AdminNewsView,
    AdminImageComponent,
    AdminAniolectivoComponent,
    AdminRoleComponent,
    AdminAsistenciaComponent,
    AdminSectionComponent,
    AdminClassroomComponent,
    AdminCourseTeacherComponent,
    AdminReportMatriculaComponent,
    AdminReportNotasComponent,
    AdminReportAsistenciaComponent,
    AdminUserComponent,
    ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AdminCommonsModule,
    CoreComponentsModule,
    SharedComponentsModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AdminModule { }
