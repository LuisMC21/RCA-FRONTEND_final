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
  head=["Codigo","Apoderado","Doc. de identidad","Telefono","Correo","Acciones"]
  optionsDocumentType = [{title:"DNI",value:'01'},{title:"Pasaporte",value:'02'},{title:"RUC",value:'03'}]
  optionsVac =[{title:'SI',value:'S'},{title:'NO',value:'N'}]
  nom:string='';

  constructor(private formBuilder:FormBuilder) {}
  get code(){return this.group.get('code')}
  get email(){return this.group.get('email')}
  get nombreUsuario(){return this.group.get('email')}
  get name(){return this.group.get('name')}
  get pa_surname(){return this.group.get('pa_surname')}
  get ma_surname(){return this.group.get('ma_surname')}
  get birthdate(){return this.group.get('birthdate')}
  get type_doc(){return this.group.get('type_doc')}
  get numdoc(){return this.group.get('numdoc')}
  get tel(){return this.group.get('tel')}
  get gra_inst(){return this.group.get('gra_inst')}
  get password(){return this.group.get('password')}
  get rol(){return this.group.get('rol')}

  ngOnInit(): void {
    this.form();
  }

  form(item?:IParent):void{
      this.group = this.formBuilder.group({
        id:[item?item.id:null],
        code:[item?item.code:''],
        email:[item?item.email:''],
        nombreUsuario:[item?item.usuarioDTO.nombreUsuario:''],
        pa_surname:[item?item.usuarioDTO.pa_surname:'',[Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
        ma_surname:[item?item.usuarioDTO.ma_surname:'',[Validators.required, Validators.minLength(3),Validators.maxLength(20)]],
        birthdate:[item?item.usuarioDTO.birthdate:''],
        name:[item?item.usuarioDTO.name:'',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
        type_doc:[item?item.usuarioDTO.type_doc:''],
        numdoc:[item?item.usuarioDTO.numdoc:'',[Validators.required,Validators.minLength(8),Validators.maxLength(8)]],
        tel:[item?item.usuarioDTO.tel:'',[Validators.required,Validators.minLength(9),Validators.maxLength(9)]],
        gra_inst:[item?item.usuarioDTO.gra_inst:'',[Validators.required,Validators.minLength(5),Validators.maxLength(15)]],
        password:[item?item.usuarioDTO.password:'',[Validators.required,Validators.minLength(8),Validators.maxLength(8)]],
        rol:[item?item.usuarioDTO.rol:''],
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
