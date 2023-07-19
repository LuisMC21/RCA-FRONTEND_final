import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherRoutingModule } from './teacher-routing.module';
import { CoreComponentsModule } from 'src/app/core/components/components.module';
import { SharedComponentsModule } from 'src/app/shared/components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TeacherCommonsModule } from './commons/commons.module';
import { TeacherNotasComponent } from './views/teacher-notas/teacher-notas.component';
import { TeacherClasesComponent } from './views/teacher-clases/teacher-clases.component';
import { TeacherComponent } from './teacher.component';
import { TeacherAsignacionesComponent } from './views/teacher-asignaciones/teacher-asignaciones.component';
import { TeacherDatosComponent } from './views/teacher-datos/teacher-datos.component';
import { TeacherAsistenciaComponent } from './views/teacher-asistencia/teacher-asistencia.component';


@NgModule({
  declarations: [
    TeacherComponent,
    TeacherNotasComponent,
    TeacherClasesComponent,
    TeacherAsignacionesComponent,
    TeacherDatosComponent,
    TeacherAsistenciaComponent
  ],
  imports: [
    CommonModule,
    TeacherRoutingModule,
    TeacherCommonsModule,
    FormsModule,
    CoreComponentsModule,
    SharedComponentsModule,
    ReactiveFormsModule
  ]
})
export class TeacherModule { }
