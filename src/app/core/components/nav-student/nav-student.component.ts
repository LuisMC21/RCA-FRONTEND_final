import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-student',
  templateUrl: './nav-student.component.html',
  styleUrls: ['./nav-student.component.scss']
})
export class NavStudentComponent implements OnInit {

  @ViewChild('notas') notas!: ElementRef;
  @ViewChild('asistencias') asistencias!: ElementRef;
  @ViewChild('asignaciones') asignaciones!: ElementRef;
  @ViewChild('datos') datos!: ElementRef;

  menuVisible = true;

  constructor(private router: Router, private renderer2: Renderer2) { }

  ngOnInit(): void {
  }

  Optnotas() {
    this.renderer2.setStyle(this.notas.nativeElement, 'background-color', 'rgb(32, 36, 59)');
    this.renderer2.setStyle(this.asistencias.nativeElement, 'background-color', 'rgb(11, 13, 24)');
    this.renderer2.setStyle(this.asignaciones.nativeElement, 'background-color', 'rgb(11, 13, 24)');
    this.renderer2.setStyle(this.datos.nativeElement, 'background-color', 'rgb(11, 13, 24)');
  }

  Optasistencias() {
    this.renderer2.setStyle(this.notas.nativeElement, 'background-color', 'rgb(11, 13, 24)');
    this.renderer2.setStyle(this.asistencias.nativeElement, 'background-color', 'rgb(32, 36, 59)');
    this.renderer2.setStyle(this.datos.nativeElement, 'background-color', 'rgb(11, 13, 24)');
    this.renderer2.setStyle(this.asignaciones.nativeElement, 'background-color', 'rgb(11, 13, 24)');
  }

  Optasignaciones(){
    this.renderer2.setStyle(this.notas.nativeElement, 'background-color', 'rgb(11, 13, 24)');
    this.renderer2.setStyle(this.asignaciones.nativeElement, 'background-color', 'rgb(32, 36, 59)');
    this.renderer2.setStyle(this.datos.nativeElement, 'background-color', 'rgb(11, 13, 24)');
    this.renderer2.setStyle(this.asistencias.nativeElement, 'background-color', 'rgb(11, 13, 24)');
  }

  Optdatos(){
    this.renderer2.setStyle(this.notas.nativeElement, 'background-color', 'rgb(11, 13, 24)');
    this.renderer2.setStyle(this.datos.nativeElement, 'background-color', 'rgb(32, 36, 59)');
    this.renderer2.setStyle(this.asistencias.nativeElement, 'background-color', 'rgb(11, 13, 24)');
    this.renderer2.setStyle(this.asignaciones.nativeElement, 'background-color', 'rgb(11, 13, 24)');
  }

  
  redirectTo(index:string):void{
    this.router.navigateByUrl('student/'+ index);
  }

  toggleMenu() {
    this.menuVisible = !this.menuVisible;
  }


}
