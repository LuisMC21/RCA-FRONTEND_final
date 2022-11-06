import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { RegistroLecturasView } from './views/registro-lecturas/registro-lecturas.view';
import { HomeCommonsModule } from './commons/commons.module';
import { RegistroLlamadasView } from './views/registro-llamadas/registro-llamadas.view';
import { MaterialModule } from './commons/material/material.module';
import { MisAseguradosView } from './views/mis-asegurados/mis-asegurados.view';
import {MatSidenavModule} from '@angular/material/sidenav';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material/core';


@NgModule({
  declarations: [
    HomeComponent,
    RegistroLecturasView,
    RegistroLlamadasView,
    MisAseguradosView
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    HomeCommonsModule,
    MaterialModule,
    MatSidenavModule,
    ReactiveFormsModule,
  ],
  providers:[
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },

  ]
})
export class HomeModule { }
