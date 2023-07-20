import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableNotaComponent } from './tables-data/table-nota/table-nota.component';
import { SharedComponentsModule } from 'src/app/shared/components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableComponent } from './table/table/table.component';
import { TableAsignacionesComponent } from './tables-data/table-asignaciones/table-asignaciones.component';
import { TableClaseComponent } from './tables-data/table-clase/table-clase.component';
import { TableAsistenciaComponent } from './tables-data/table-asistencia/table-asistencia.component';
import { RouteComponent } from './route/route.component';



@NgModule({
  declarations: [
    TableNotaComponent,
    TableComponent,
    TableAsignacionesComponent,
    TableClaseComponent,
    TableAsistenciaComponent,
    RouteComponent,
  ],
  imports: [
    CommonModule,
    SharedComponentsModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  exports:[
    TableComponent,
    TableNotaComponent,
    TableAsignacionesComponent,
    TableClaseComponent,
    TableAsistenciaComponent,
    RouteComponent
  ]
})
export class ComponentsModule { }
