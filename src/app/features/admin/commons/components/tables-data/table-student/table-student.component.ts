import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IParent } from 'src/app/features/admin/interfaces/parent';
import { IStudent } from 'src/app/features/admin/interfaces/student';
import { ModalComponent } from 'src/app/shared/components/modals/modal/modal.component';
import { SearchComponent } from 'src/app/shared/components/search/search.component';
import { ParentService } from '../../../services/parent.service';

@Component({
  selector: 'app-table-student',
  templateUrl: './table-student.component.html',
  styleUrls: ['./table-student.component.scss']
})
export class TableStudentComponent implements OnInit {

  @Input() students!: IStudent[];
  parents:IParent[]=[];
  identiParent:string='';
  nomParent:string='';
  @Input() tableName!: string;
  @Input() title!: string;
  
  @Output() studentSave:EventEmitter<IStudent> = new EventEmitter();
  @Output() identiParentSave:EventEmitter<string> = new EventEmitter();
  @Output() studentDelete:EventEmitter<string> = new EventEmitter();
  @Output() studentSearch:EventEmitter<string> = new EventEmitter();

  @ViewChild('modalAdd') modalAdd!: ModalComponent;
  @ViewChild('modalDelete') modalDelete!: ModalComponent;
  @ViewChild('searchParentModal') searchParentModal!:SearchComponent;

  group!: FormGroup;
  optionsDocumentType = [
    {title:"DNI",value:'01'},
    {title:"Pasaporte",value:'02'},
    {title:"RUC",value:'03'},
  ]
  optionsVac =[
    {title:'SI',value:'S'},
    {title:'NO',value:'N'}
  ]
  optionsInsuraceType= [
    {title:'ESSALUD',value:'E'},
    {title:'SIS',value:'S'},
    {title:'Privado',value:'P'},
    {title:'Fuerza Armada',value:'F'}
  ];
  head=["CODIGO","APELLIDOS","NOMBRE","DOC. de IDENTIDAD","VACUNA","ACCIONES"]
  msjDeleteok:string='';

  constructor(private renderer2:Renderer2,private formBuilder:FormBuilder, private parentService:ParentService) {
     
   }
   ngOnInit(): void {
     this.form()
    //  console.log(this.students)
  }
  
  get apelPat(){return this.group.get('apelPat')}
  get apelMat(){return this.group.get('apelMat')}
  get nombre(){return this.group.get('nombre')}
  get tipDoc(){return this.group.get('tipDoc')}
  get numDoc(){return this.group.get('numDoc')}
  get direcc(){return this.group.get('direcc')}
  get fecNaci(){return this.group.get('fecNaci')}
  get apoderado(){return this.group.get('apoderado')}
  get isVacunado(){return this.group.get('isVacunado')}
  get enferm(){return this.group.get('enferm')}
  get nomConPri(){return this.group.get('nomConPri')}
  get nomConSec(){return this.group.get('nomConSec')}
  get telConSec(){return this.group.get('telConSec')}
  get telConPri(){return this.group.get('telConPri')}
  get tipSeg(){return this.group.get('tipSeg')}

  form(item?:IStudent){

    // this.nomParent = item?item.apoderado:'';
    this.group = this.formBuilder.group({
      identi:[item?item.code:null],
      apelPat:[item?item.usuarioDTO.pa_surname:'',[Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      apelMat:[item?item.usuarioDTO.ma_surname:'',[Validators.required, Validators.minLength(3),Validators.maxLength(30)]],
      nombre:[item?item.usuarioDTO.name:'',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
      tipDoc:[item?item.usuarioDTO.type_doc:'',[Validators.required]],
      numDoc:[item?item.usuarioDTO.numdoc:'',[Validators.required,Validators.minLength(8),Validators.maxLength(8)]],
      direcc:[item?item.usuarioDTO.email:'',[Validators.required,Validators.minLength(3),Validators.maxLength(50)]],
      // fecNaci:[item?item.fecNaci:'',[Validators.required]],
      apoderado:[''],
      enferm:[item?item.diseases:''],
      isVacunado: ['',[Validators.required]],
      nomConPri:  [''],
      nomConSec:  [''],
      telConSec:  [''],
      telConPri:[item?item.telcon_pri:'',[Validators.required,Validators.minLength(9),Validators.maxLength(9)]],
      tipSeg: [item?item.type_insurance:'',[Validators.required]]
    });
  }

  searchParent(nom:string){
    this.nomParent = nom;
    this.parentService.getAll(nom,0,5).subscribe(data =>{
      this.parents = data.content;
    })
  }
  // BUSCAR
  search(nom:string){
    this.studentSearch.emit(nom);
  }

  // AGREGAR - ACTUALIZAR
  save(){
    if(this.group.valid){
    this.identiParentSave.emit(this.identiParent)
    this.studentSave.emit(this.group.value)
    }
    this.modalAdd.hiddenModal();
  }

  // ELIMINAR 
  delete(id:string){
    this.studentDelete.emit(id)
    this.modalDelete.hiddenModal();
  }

 
  keyUp(string:string){
    if(string===''){
      this.searchParentModal.hidden()
    }
  }
  //ASIGNA APODERADO
  asingParent(parent:IParent){
    this.nomParent = parent.apelPaterno + ' ' + parent.apelMaterno + ' '+parent.nombre;
    this.identiParent = parent.identi;
    this.searchParentModal.hidden();
  }

}