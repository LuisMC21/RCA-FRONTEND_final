import { NgModule } from '@angular/core';

import { AuthComponentsModule } from './components/components.module';
import { MaterialModule } from './material/material.module';
import { AuthServicesModule } from './services/services.module';



@NgModule({
  exports: [
    AuthComponentsModule,
    AuthServicesModule,
    MaterialModule
  ]
})
export class AuthCommonsModule { }
