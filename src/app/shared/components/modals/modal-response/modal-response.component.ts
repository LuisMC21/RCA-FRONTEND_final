import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-modal-response',
  templateUrl: './modal-response.component.html',
  styleUrls: ['./modal-response.component.scss']
})
export class ModalResponseComponent implements OnInit {

  @Input() title:string ='';
  @Input() successful:boolean = true;

  @ViewChild('modalBack') modalBack!: ElementRef;

  public show = false;
  icon:string='';

  constructor(private rendered: Renderer2) { 
    this.rendered.listen('window','click',(e: Event)=>{
      if(this.modalBack && e.target === this.modalBack.nativeElement){
        this.show = false;
      }
    })
  }

  ngOnInit(): void {

  }

  showModal(){
    this.show = true;
  }

  hiddenModal(){
    this.show = false;
  }

  refresh(){
    return window.location.reload();
  }
}
