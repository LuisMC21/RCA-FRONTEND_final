import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-btn-cancel',
  templateUrl: './btn-cancel.component.html',
  styleUrls: ['./btn-cancel.component.scss']
})
export class BtnCancelComponent implements OnInit {

  @Input() title:string ='';
  constructor() { }

  ngOnInit(): void {
  }

}
