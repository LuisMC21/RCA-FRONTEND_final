import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() title:string ='';
  @Input() icon:string=''
  @ViewChild('modalBack') modalBack!: ElementRef;
  public show = false;

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

}
