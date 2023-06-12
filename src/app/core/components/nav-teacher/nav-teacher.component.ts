import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-teacher',
  templateUrl: './nav-teacher.component.html',
  styleUrls: ['./nav-teacher.component.scss']
})
export class NavTeacherComponent implements OnInit {

  @ViewChild('notas') notas!: ElementRef;
  @ViewChild('clases') clases!: ElementRef;
  @ViewChild('asignaciones') asignaciones!: ElementRef;

  constructor(private router: Router, private renderer2: Renderer2) { }

  ngOnInit(): void {
  }

  Optnotas() {
    this.renderer2.setStyle(this.notas.nativeElement, 'background-color', 'rgb(32, 36, 59)');
    this.renderer2.setStyle(this.clases.nativeElement, 'background-color', 'rgb(11, 13, 24)');
    this.renderer2.setStyle(this.asignaciones.nativeElement, 'background-color', 'rgb(11, 13, 24)');
  }

  Optclases() {
    this.renderer2.setStyle(this.notas.nativeElement, 'background-color', 'rgb(11, 13, 24)');
    this.renderer2.setStyle(this.clases.nativeElement, 'background-color', 'rgb(32, 36, 59)');
    this.renderer2.setStyle(this.asignaciones.nativeElement, 'background-color', 'rgb(11, 13, 24)');
  }

  Optasignaciones(){
    this.renderer2.setStyle(this.notas.nativeElement, 'background-color', 'rgb(11, 13, 24)');
    this.renderer2.setStyle(this.asignaciones.nativeElement, 'background-color', 'rgb(32, 36, 59)');
    this.renderer2.setStyle(this.clases.nativeElement, 'background-color', 'rgb(11, 13, 24)');
  }

  redirectTo(index:string):void{
    this.router.navigateByUrl('teacher/'+ index);
  }

}


