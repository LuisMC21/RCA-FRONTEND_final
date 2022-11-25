import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthComponentsModule } from './components/components.module';
import { AuthServicesModule } from './services/services.module';



@NgModule({
  exports:[
    AuthComponentsModule,
    AuthServicesModule
  ],
  
  imports: [
    CommonModule,
    AuthServicesModule
  ]
})
export class AuthCommonsModule { }
