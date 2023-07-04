import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponentsModule } from '../shared/components/components.module';
import { TeacherComponent } from './teacher/teacher.component';
import { TutorComponent } from './tutor/tutor.component';
import { CoreComponentsModule } from "../core/components/components.module";
import { AdminComponent } from './admin/admin.component';
import { StudentComponent } from './student/student.component';
import { StudentAsignacionesComponent } from './student/views/student-asignaciones/student-asignaciones.component';
import { StudentNotasComponent } from './student/views/student-notas/student-notas.component';
import { StudentAsistenciasComponent } from './student/views/student-asistencias/student-asistencias.component';



@NgModule({
    declarations: [
    ],
    imports: [
        CommonModule,
        SharedComponentsModule,
        CoreComponentsModule
    ]
})
export class FeaturesModule { }
