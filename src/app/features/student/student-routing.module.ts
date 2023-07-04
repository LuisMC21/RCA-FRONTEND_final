import { RouterModule, Routes } from "@angular/router";
import { StudentComponent } from "./student.component";
import { StudentAsignacionesComponent } from "./views/student-asignaciones/student-asignaciones.component";
import { StudentAsistenciasComponent } from "./views/student-asistencias/student-asistencias.component";
import { NgModule } from "@angular/core";
import { StudentNotasComponent } from "./views/student-notas/student-notas.component";

const routes:Routes = [
    {
        path: '', component: StudentComponent,
        children:[
            { path: 'asignaciones', component: StudentAsignacionesComponent},
            { path: 'notas', component: StudentNotasComponent },
            { path: 'asistencias', component: StudentAsistenciasComponent }
        ]
    },
    { path: '**', redirectTo: ''}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class StudentRoutingModule { }
