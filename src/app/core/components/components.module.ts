import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { NavComponent } from './nav/nav.component';
import { HeaderComponent } from './header/header.component';
import { HeaderAdminComponent } from './header-admin/header-admin.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SharedComponentsModule } from 'src/app/shared/components/components.module';
import { NavAdminComponent } from './nav-admin/nav-admin.component';



@NgModule({
  declarations: [
    FooterComponent,
    NavComponent,
    HeaderComponent,
    HeaderAdminComponent,
    NavAdminComponent
  ],
  exports:[
    NavComponent,
    FooterComponent,
    HeaderComponent,
    HeaderAdminComponent,
    NavAdminComponent
  ],
  imports: [
    CommonModule,
    SharedComponentsModule
  ]
})
export class CoreComponentsModule { }
