import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-btn-ok',
  templateUrl: './btn-ok.component.html',
  styleUrls: ['./btn-ok.component.scss']
})
export class BtnOkComponent implements OnInit {

  @Input() title =''
  constructor() { }

  ngOnInit(): void {
  }

}
