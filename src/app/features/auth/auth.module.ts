import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginView } from './views/login/login.view';
import { AuthComponent } from './auth.component';
import { AuthCommonsModule } from './commons/commons.module';
import { MaterialModule } from './commons/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LoginView,
    AuthComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    AuthCommonsModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class AuthModule { }
