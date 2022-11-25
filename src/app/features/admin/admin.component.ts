import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  optionShowNews:boolean=false;

  constructor() { }

  ngOnInit(): void {
  }

  showNews(){
    this.optionShowNews = !this.optionShowNews;
  }


}
