import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { INews } from 'src/app/features/admin/interfaces/news';
import { ModalComponent } from 'src/app/shared/components/modals/modal/modal.component';

@Component({
  selector: 'app-table-news',
  templateUrl: './table-news.component.html',
  styleUrls: ['./table-news.component.scss']
})
export class TableNewsComponent implements OnInit {

  group!: FormGroup;
  nomSearch:string='';

  @Input() news:INews[]=[]
  @Input() tableName!: string;

  @Output() newSave:EventEmitter<INews> = new EventEmitter;
  @Output() newDelete:EventEmitter<string> = new EventEmitter;
  @Output() newSearch:EventEmitter<string> = new EventEmitter;
  @Output() imgFile:EventEmitter<any> = new EventEmitter;
  
  @ViewChild('modalAdd') modalAdd!:ModalComponent
  @ViewChild('modalDelete') modalDelete!:ModalComponent

  constructor(private formBuilder:FormBuilder) { }

  ngOnInit(): void {
  this.form();
  }
  
  get titulo(){return this.group.get('titulo')}
  get sumilla(){return this.group.get('sumilla')}
  get descripcion(){return this.group.get('descripcion')}
  get fecha(){return this.group.get('fecha')}
  get imagen(){return this.group.get('imagen')}
  
  form(item?:INews):void{
    this.group = this.formBuilder.group({
      administrativoId:['1'],
      identi:[item?item.identi:null],
      titulo:[item?item.titulo:'',[Validators.required,Validators.minLength(3),Validators.maxLength(50)]],
      sumilla:[item?item.sumilla:'',[Validators.required]],
      descripcion:[item?item.descripcion:'',[Validators.required]],
      fecha:[item?item.fecha:'',[Validators.required]],
      imagen:[item?item.imagen:'',[Validators.required]]
  });
}
  //BUSCAR
  search(nom:string){
    this.newSearch.emit(nom);
  }
// AGREGAR - ACTUALIZAR
  save(){
    if(this.group.valid){
     this.newSave.emit(this.group.value)
    }
    this.modalAdd.hiddenModal();
  }

  // ELIMINAR 
  delete(id:string){
    this.newDelete.emit(id)
    this.modalDelete.hiddenModal();
  }

  captureFile(imgFile:any){
    this.imgFile.emit(imgFile)
  }

  refresh(): void { window.location.reload(); }

}
