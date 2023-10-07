import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from './components/ComponentsModule';
import { AdminServicesModule } from './services/services.module';



@NgModule({
  declarations: [
  ],
  exports:[
    ComponentsModule
  ],
  imports: [
    CommonModule,
    AdminServicesModule
  ]
})
export class AdminCommonsModule { }
