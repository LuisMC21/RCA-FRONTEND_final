import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo:'portal', pathMatch:'full'},
  {path: 'portal', loadChildren:()=> import('./features/portal/portal.module').then(m =>m.PortalModule) },
  {path: 'auth', loadChildren:()=> import('./features/auth/auth.module').then(m =>m.AuthModule) },
  {path: 'admin', loadChildren:()=> import('./features/admin/admin.module').then(m =>m.AdminModule) },
  {path: 'teacher', loadChildren:()=> import('./features/teacher/teacher.module').then(m =>m.TeacherModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

