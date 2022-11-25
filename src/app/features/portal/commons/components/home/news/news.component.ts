import { Component, Input, OnInit } from '@angular/core';
import { INews } from 'src/app/features/admin/interfaces/news';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  @Input() news:INews[]=[];
  constructor() { }

  ngOnInit(): void {
  }

}
