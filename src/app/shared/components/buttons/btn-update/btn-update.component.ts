import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-btn-update',
  templateUrl: './btn-update.component.html',
  styleUrls: ['./btn-update.component.scss']
})
export class BtnUpdateComponent implements OnInit {

  constructor() { }

  @Input() title:string='';

  ngOnInit(): void {
  }

}
