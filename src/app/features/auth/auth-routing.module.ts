import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LoginView } from './views/login/login.view';


const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    { 
        path: '', component: AuthComponent, 
        children:[
            { path:'login',component:LoginView},
     ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }