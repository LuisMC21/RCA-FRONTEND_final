import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IAnioLectivo } from 'src/app/features/admin/interfaces/anio-lectivo';
import { ModalComponent } from 'src/app/shared/components/modals/modal/modal.component';
@Component({
  selector: 'app-table-anio-lectivo',
  templateUrl: './table-anio-lectivo.component.html',
  styleUrls: ['./table-anio-lectivo.component.scss']
})
export class TableAnioLectivoComponent implements OnInit {
  @Input() anios: IAnioLectivo[]=[];
  @Input() tableName!: string;
  @Input() title!: string;

  titulo:string = 'Agregar Año Lectivo';

  @Output() anioSave:EventEmitter<IAnioLectivo> = new EventEmitter();
  @Output() anioDelete:EventEmitter<string> = new EventEmitter();
  @Output() anioSearch:EventEmitter<string> = new EventEmitter();


  @ViewChild('modalAdd') modalAdd!: ModalComponent;
  @ViewChild('modalDelete') modalDelete!: ModalComponent;

  head=["Código","Año","Acciones"]
  group!: FormGroup;

  msjResponse:string='';
  nomSearch:string='';

  constructor(private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.form();
  }

  get code(){return this.group.get('code')}
  get name(){return this.group.get('name')}
  get id(){return this.group.get('id')}

  form(item?:IAnioLectivo):void{
    this.group = this.formBuilder.group({
      id:[item?item.id:null],
      code:[item?item.code:''],
      name:[item?item.name:'',[Validators.required,Validators.minLength(4),Validators.maxLength(4)]],
      // descripcion:[item?item.descripcion:'',]
  });

}


  //BUSCAR
  search(nom:string){
    this.anioSearch.emit(nom);
  }
  onUpdateButtonClick(item: any) {
    this.titulo = "Actualizar Año Lectivo";
    this.form(item); // Call the form() function if needed for your logic
    this.modalAdd.showModal();
  }

  // Function to handle when the "Add" button is clicked
  onAddButtonClick() {
    this.titulo = "Agregar Año Lectivo";
    // Any other logic related to the "Add" button can be added here
    this.modalAdd.showModal();
  }
   // AGREGAR - ACTUALIZAR
  save(){
    if(this.group.valid){
    this.anioSave.emit(this.group.value)
    }

    this.modalAdd.hiddenModal();

  }
 // ELIMINAR
 delete(id:string){
  this.anioDelete.emit(id)
  this.modalDelete.hiddenModal();
}

reset(){

  this.group.reset();
}


}
