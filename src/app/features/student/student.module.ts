import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CoreComponentsModule } from "src/app/core/components/components.module";
import { SharedComponentsModule } from "src/app/shared/components/components.module";
import { StudentRoutingModule } from "./student-routing.module";
import { StudentCommonsModule } from "./commos/commons.module";
import { StudentComponent } from "./student.component";
import { StudentNotasComponent } from "./views/student-notas/student-notas.component";
import { StudentAsignacionesComponent } from "./views/student-asignaciones/student-asignaciones.component";
import { StudentAsistenciasComponent } from "./views/student-asistencias/student-asistencias.component";
import { StudentDatosAlumnoComponent } from './views/student-datos-alumno/student-datos-alumno.component';
import { StudentDatosApoderadoComponent } from './views/student-datos-apoderado/student-datos-apoderado.component';

@NgModule({
    declarations:[
        StudentComponent,
        StudentNotasComponent,
        StudentAsignacionesComponent,
        StudentAsistenciasComponent,
        StudentDatosAlumnoComponent,
        StudentDatosApoderadoComponent
    ],
    imports:[
        CommonModule,
        FormsModule,
        CoreComponentsModule,
        SharedComponentsModule,
        ReactiveFormsModule,
        StudentRoutingModule,
        StudentCommonsModule
    ]
})

export class StudentModule{}