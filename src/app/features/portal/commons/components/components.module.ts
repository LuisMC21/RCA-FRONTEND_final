import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './home/main/main.component';
import { NewsComponent } from './home/news/news.component';
import { AboutReviewComponent } from './about/about-review/about-review.component';
import { SharedComponentsModule } from 'src/app/shared/components/components.module';



@NgModule({
  declarations: [
    MainComponent,
    NewsComponent,
    AboutReviewComponent
  ],
  exports:[
    MainComponent,
    NewsComponent,
    AboutReviewComponent
  ],
  imports: [
    CommonModule,
    SharedComponentsModule
  ]
})
export class ComponentsModule { }
