import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form/form.component';
import { NavLoginComponent } from './nav-login/nav-login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedComponentsModule } from 'src/app/shared/components/components.module';



@NgModule({
  declarations: [
    FormComponent,
    NavLoginComponent
  ],
  exports:[
    FormComponent,
    NavLoginComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedComponentsModule
  ]
})
export class AuthComponentsModule { }
