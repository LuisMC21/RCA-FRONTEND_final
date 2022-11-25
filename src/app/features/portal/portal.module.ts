import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeView } from './views/home/home.view';
import { PortalCommonsModule } from './commons/commons.module';
import { PortalRoutingModule } from './portal-routing.module';
import { PortalComponent } from './portal.component';
import { CoreComponentsModule } from 'src/app/core/components/components.module';
import { AboutComponent } from './views/about/about.component';
import { SharedComponentsModule } from 'src/app/shared/components/components.module';



@NgModule({
  declarations: [
    PortalComponent,
    HomeView,
    AboutComponent,
  ],
  imports: [
    CommonModule,
    PortalRoutingModule,
    PortalCommonsModule,
    CoreComponentsModule,
    SharedComponentsModule
  ]
})
export class PortalModule { }
