import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.scss']
})
export class RouteComponent implements OnInit {

  @Input() route: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
