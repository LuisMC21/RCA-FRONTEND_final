import { NgModule } from '@angular/core';
import { HomeComponentsModule } from './components/components.module';
import { HomeServicesModule } from './services/services.module';



@NgModule({
  exports: [
    HomeComponentsModule,
    HomeServicesModule
  ]
})
export class HomeCommonsModule { }
