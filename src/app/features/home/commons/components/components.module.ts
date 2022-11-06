import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { NewLlamadaComponent } from './form-register/new-llamada/new-llamada.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TestComponent } from './test/test.component';
import { NgxMaterialTimepickerModule}  from 'ngx-material-timepicker';
import { TableMisAseguradosComponent } from './tables/table-mis-asegurados/table-mis-asegurados.component';
import { DialogLlamadasComponent } from './dialog/dialog-llamadas/dialog-llamadas.component';

const COMPONENTS:any = [
  NewLlamadaComponent,
  TestComponent,
  TableMisAseguradosComponent,
  DialogLlamadasComponent
]

@NgModule({
  declarations: [...COMPONENTS, ],
  exports: [...COMPONENTS],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaterialTimepickerModule
  ]
})
export class HomeComponentsModule { }
