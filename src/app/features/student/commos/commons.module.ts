import { NgModule } from "@angular/core";
import { TableComponent } from "./components/table/table/table.component";
import { CommonModule } from "@angular/common";
import { SharedComponentsModule } from "src/app/shared/components/components.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TableAsignacionesComponent } from "./components/tables-data/table-asignaciones/table-asignaciones.component";
import { TableNotasComponent } from "./components/tables-data/table-notas/table-notas.component";
import { TableAsistenciasComponent } from "./components/tables-data/table-asistencias/table-asistencias.component";
import { RouteComponent } from './components/route/route.component';

@NgModule({
    declarations:[
        TableComponent,
        TableAsignacionesComponent,
        TableNotasComponent,
        TableAsistenciasComponent,
        RouteComponent
    ],
    imports:[
        CommonModule,
        SharedComponentsModule,
        FormsModule, 
        ReactiveFormsModule
    ],
    exports:[
        TableComponent,
        TableAsignacionesComponent,
        TableNotasComponent,
        TableAsistenciasComponent,
        RouteComponent
    ]
})

export class StudentCommonsModule { }