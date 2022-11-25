import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from './components/components.module';
import { ServicesModule } from './services/services.module';



@NgModule({
  declarations: [],
  exports:[
    ComponentsModule,
    ServicesModule
  ],
  imports: [
    CommonModule
  ]
})
export class PortalCommonsModule { }
