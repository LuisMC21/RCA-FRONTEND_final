import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortalComponent } from './portal.component';
import { AboutComponent } from './views/about/about.component';
import { HomeView } from './views/home/home.view';


const routes: Routes = [
    {path:'', redirectTo:'home', pathMatch: 'full'},
    { 
        path: '', component: PortalComponent, 
        children:[
            { path:'home',component:HomeView},
            { path:'about',component:AboutComponent},
     ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortalRoutingModule { }