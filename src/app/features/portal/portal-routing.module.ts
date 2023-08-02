import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortalComponent } from './portal.component';
import { AboutComponent } from './views/about/about.component';
import { HomeView } from './views/home/home.view';
import { NewsComponent } from './commons/components/home/news/news.component';
import { MainComponent } from './commons/components/home/main/main.component';


const routes: Routes = [
    {path:'', redirectTo:'home', pathMatch: 'full'},
    { 
        path: '', component: PortalComponent, 
        children:[
            { path:'home',component:HomeView},
            { path:'about',component:AboutComponent},
            { path:'news',component:NewsComponent},
            { path:'main',component:MainComponent},
     ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortalRoutingModule { }