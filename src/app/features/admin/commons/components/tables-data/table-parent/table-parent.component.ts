import { Component,EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from 'src/app/core/services/storage.service';
import { IParent } from 'src/app/features/admin/interfaces/parent';
import { ModalComponent } from 'src/app/shared/components/modals/modal/modal.component';
import { ParentService } from '../../../services/parent.service';

@Component({
  selector: 'app-table-parent',
  templateUrl: './table-parent.component.html',
  styleUrls: ['./table-parent.component.scss']
})
export class TableParentComponent implements OnInit {

  @Input() parents: IParent[]=[];
  @Input() tableName!: string;
  @Input() title!: string;

  @Output() parentSave:EventEmitter<IParent> = new EventEmitter();
  @Output() parentDelete:EventEmitter<string> = new EventEmitter();
  @Output() parentSearch:EventEmitter<string> = new EventEmitter();

  @ViewChild('modalAdd') modalAdd!: ModalComponent;
  @ViewChild('modalDelete') modalDelete!: ModalComponent;

  group!: FormGroup;
  groupUpdate!:FormGroup;
  head=["Codigo","Apoderado","Doc. de identidad","Telefono","Acciones"]
  optionsDocumentType = [{title:"DNI",value:'01'},{title:"Pasaporte",value:'02'},{title:"RUC",value:'03'}]
  optionsVac =[{title:'SI',value:'S'},{title:'NO',value:'N'}]
  nom:string='';

  constructor(private formBuilder:FormBuilder) {}

  get apelPaterno(){return this.group.get('apelPaterno')}
  get apelMaterno(){return this.group.get('apelMaterno')}
  get nombre(){return this.group.get('nombre')}
  get telefono(){return this.group.get('telefono')}
  get numDocumento(){return this.group.get('numDocumento')}
  get vacunas(){return this.group.get('vacunas')}

  ngOnInit(): void {
    this.form();
  }

  form(item?:IParent):void{
      this.group = this.formBuilder.group({
        identi:[item?item.identi:null],
        apelPaterno:[item?item.apelPaterno:'',[Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
        apelMaterno:[item?item.apelMaterno:'',[Validators.required, Validators.minLength(3),Validators.maxLength(20)]],
        nombre:[item?item.nombre:'',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
        tipDocumento:[item?item.tipDocumento:'',[Validators.required]],
        numDocumento:[item?item.numDocumento:'',[Validators.required,Validators.minLength(8),Validators.maxLength(8)]],
        telefono:[item?item.telefono:'',[Validators.required,Validators.minLength(9),Validators.maxLength(9)]],
        vacunas:[item?item.vacunas:'',[Validators.required]]
    });
  }

  // BUSCAR
  search(nom:string){
    this.parentSearch.emit(nom);
  }

  // AGREGAR - ACTUALIZAR
  save(){
    if(this.group.valid){
    this.parentSave.emit(this.group.value)
    }
    this.modalAdd.hiddenModal();
  }

  // ELIMINAR 
  delete(id:string){
    this.parentDelete.emit(id)
    this.modalDelete.hiddenModal();
  }

}
