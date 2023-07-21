import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() title:string ='';
  @Input() icon:string=''
  @ViewChild('modalBack') modalBack!: ElementRef;
  @Output() close_modal:EventEmitter<boolean> = new EventEmitter();
  @Input() successful!:boolean;

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
    if(this.successful){
      this.show = false;
    }
  }
  cancelar(){
    this.show = false;
    this.close_modal.emit(true);
  }

  refresh(){
    return window.location.reload();
  }

}
