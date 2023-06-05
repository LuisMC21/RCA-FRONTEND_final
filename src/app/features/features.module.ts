import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponentsModule } from '../shared/components/components.module';
import { TeacherComponent } from './teacher/teacher.component';
import { TutorComponent } from './tutor/tutor.component';
import { CoreComponentsModule } from "../core/components/components.module";
import { AdminComponent } from './admin/admin.component';



@NgModule({
    declarations: [
        TutorComponent,
    ],
    imports: [
        CommonModule,
        SharedComponentsModule,
        CoreComponentsModule
    ]
})
export class FeaturesModule { }
