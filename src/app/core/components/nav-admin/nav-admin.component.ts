import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-admin',
  templateUrl: './nav-admin.component.html',
  styleUrls: ['./nav-admin.component.scss']
})
export class NavAdminComponent implements OnInit {

  constructor(private router:Router, private renderer2:Renderer2) { }
  
  @ViewChild('inicio') inicio!: ElementRef;
  @ViewChild('mantenimiento') mant!: ElementRef;
  @ViewChild('confALectivo') confALectivo!: ElementRef;
  @ViewChild('operaciones') operaciones!: ElementRef;

  showSubmenuMant:boolean=false;
  showSubmenuConfALectivo:boolean=false;
  showSubmenuOper:boolean=false;
  
  ngOnInit(): void {
  }

  Optinicio(){
    this.showSubmenuConfALectivo=false;
    this.showSubmenuMant = false;
    this.renderer2.setStyle( this.inicio.nativeElement, 'background-color', 'rgb(32, 36, 59)');
    this.renderer2.setStyle(this.operaciones.nativeElement, 'background-color', 'rgb(11, 13, 24)');
    this.renderer2.setStyle(this.mant.nativeElement, 'background-color', 'rgb(11, 13, 24)');
    this.renderer2.setStyle(this.confALectivo.nativeElement, 'background-color', 'rgb(11, 13, 24)');
  }

  submenuOper(){
    this.showSubmenuConfALectivo=false;
    this.showSubmenuMant = false;
    this.showSubmenuOper = !this.showSubmenuOper;
    this.renderer2.setStyle( this.operaciones.nativeElement, 'background-color', 'rgb(32, 36, 59)');
    this.renderer2.setStyle(this.inicio.nativeElement, 'background-color', 'rgb(11, 13, 24)');
    this.renderer2.setStyle(this.confALectivo.nativeElement, 'background-color', 'rgb(11, 13, 24)');
    this.renderer2.setStyle(this.mant.nativeElement, 'background-color', 'rgb(11, 13, 24)');
  
  }

  submenuMant(){
    this.showSubmenuConfALectivo=false;
    this.showSubmenuOper = false;
    this.showSubmenuMant = !this.showSubmenuMant;
    this.renderer2.setStyle( this.mant.nativeElement, 'background-color', 'rgb(32, 36, 59)');
    this.renderer2.setStyle(this.inicio.nativeElement, 'background-color', 'rgb(11, 13, 24)');
    this.renderer2.setStyle(this.confALectivo.nativeElement, 'background-color', 'rgb(11, 13, 24)');
    this.renderer2.setStyle(this.operaciones.nativeElement, 'background-color', 'rgb(11, 13, 24)');
  }

  // submenuALectivo(){
  //   this.showSubmenuMant = false;
  //   this.showSubmenuOper = false;
  //   this.showSubmenuConfALectivo=!this.showSubmenuConfALectivo;
  //   this.renderer2.setStyle( this.mant.nativeElement, 'background-color', 'rgb(11, 13, 24)');
  //   this.renderer2.setStyle(this.inicio.nativeElement, 'background-color', 'rgb(11, 13, 24)');
  //   // this.renderer2.setStyle(this.confALectivo.nativeElement, 'background-color', 'rgb(32, 36, 59)');
  //   this.renderer2.setStyle(this.operaciones.nativeElement, 'background-color', 'rgb(11, 13, 24)');
  // }
  redirectTo(index:string):void{
    this.router.navigateByUrl('admin/'+ index);
  }
}
