import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginView } from './views/login/login.view';
import { AuthRoutingModule } from './auth-routing.module';
import { CoreComponentsModule } from 'src/app/core/components/components.module';
import { AuthComponent } from './auth.component';
import { AuthCommonsModule } from './commons/commons.module';
import { NotFoundView } from './views/not-found/not-found.view';



@NgModule({
  declarations: [
    AuthComponent,
    LoginView,
    NotFoundView
  ],
  imports: [
    AuthRoutingModule,
    CommonModule,
    CoreComponentsModule,
    AuthCommonsModule
  ]
})
export class AuthModule { }
