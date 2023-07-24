import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/features/admin/commons/services/news.service';
import { INews } from 'src/app/features/admin/interfaces/news';
import { INewsGet } from 'src/app/features/admin/interfaces/newsGet';

@Component({
  selector: 'app-home',
  templateUrl: './home.view.html',
  styleUrls: ['./home.view.scss']
})
export class HomeView implements OnInit {

  news:INewsGet[]=[]
  constructor(private newsService:NewsService) { }

  ngOnInit(): void {
    this.newsService.getAll('',0,10).subscribe(response=>{
      if(response && response.data && response.data.list){
        this.news = response.data.list;
      }
    })
  }

}
