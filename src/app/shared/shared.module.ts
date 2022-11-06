import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedServicesModule } from './services/services.module';
import { SharedComponentsModule } from './components/components.module';
import { MaterialModule } from './material/material.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports:[
    SharedServicesModule,
    SharedComponentsModule,
    MaterialModule
  ]
})
export class SharedModule { }
