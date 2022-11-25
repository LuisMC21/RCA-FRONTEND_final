import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  showBoolean:boolean=true;
  @ViewChild('modalSearch') modalSearch!: ElementRef;

  constructor() { 
    
  }

  ngOnInit(): void {
  }

  show(){
    this.showBoolean=true;
  }

  hidden(){
    this.showBoolean=false;
  }

}
