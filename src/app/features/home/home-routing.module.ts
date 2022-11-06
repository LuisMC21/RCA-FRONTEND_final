import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { MisAseguradosView } from './views/mis-asegurados/mis-asegurados.view';
import { RegistroLecturasView } from './views/registro-lecturas/registro-lecturas.view';
import { RegistroLlamadasView } from './views/registro-llamadas/registro-llamadas.view';

const routes: Routes = [
  {
    path:'', component:HomeComponent,
    children:[
      {path: 'mis-asegurados',component:MisAseguradosView},
      {path: 'registro-lecturas',component:RegistroLecturasView},
      {path: 'registro-llamadas',component:RegistroLlamadasView}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
