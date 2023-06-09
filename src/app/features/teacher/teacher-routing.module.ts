
import { RouterModule, Routes } from '@angular/router';
import { TeacherComponent } from './teacher.component';
import { NgModule } from '@angular/core';
import { TeacherNotasComponent } from './views/teacher-notas/teacher-notas.component';
import { TeacherClasesComponent } from './views/teacher-clases/teacher-clases.component';
import { TeacherAsignacionesComponent } from './views/teacher-asignaciones/teacher-asignaciones.component';

const routes: Routes = [
    {
        path: '', component: TeacherComponent,
        children:[
            { path: 'asignaciones', component: TeacherAsignacionesComponent },
            { path: 'notas', component: TeacherNotasComponent },
            { path: 'clases', component: TeacherClasesComponent },
        ]
    },
    { path: '**', redirectTo: ''}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class TeacherRoutingModule { }
