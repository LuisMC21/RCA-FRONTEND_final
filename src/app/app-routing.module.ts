import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuardService as GuardService} from './guards/admin-guard.service';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {path: '', redirectTo:'portal', pathMatch:'full'},
  {path: 'portal', loadChildren:()=> import('./features/portal/portal.module').then(m =>m.PortalModule) },
  {path: 'auth', canActivate: [LoginGuard], loadChildren:()=> import('./features/auth/auth.module').then(m =>m.AuthModule) },
  {path: 'admin',  loadChildren:()=> import('./features/admin/admin.module').then(m =>m.AdminModule) },
  {path: 'teacher', canActivate: [GuardService], data: {expectedRol: ['TEACHER']}, loadChildren:()=> import('./features/teacher/teacher.module').then(m =>m.TeacherModule) },
  {path: 'student',  canActivate: [GuardService], data: {expectedRol: ['STUDENT']}, loadChildren:()=> import('./features/student/student.module').then(m =>m.StudentModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

