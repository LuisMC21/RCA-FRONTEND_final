import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IParent } from 'src/app/features/admin/interfaces/parent';
import { IStudent } from 'src/app/features/admin/interfaces/student';
import { ModalComponent } from 'src/app/shared/components/modals/modal/modal.component';
import { SearchComponent } from 'src/app/shared/components/search/search.component';
import { ParentService } from '../../../services/parent.service';
import { IUser } from 'src/app/features/admin/interfaces/user';

@Component({
  selector: 'app-table-student',
  templateUrl: './table-student.component.html',
  styleUrls: ['./table-student.component.scss']
})
export class TableStudentComponent implements OnInit {

  @Input() students!: IStudent[];
  parents:IParent[]=[];
  usuario:IUser[]=[]
  identiParent:string='';
  nomParent:string='';
  @Input() tableName!: string;
  @Input() title!: string;

  titulo:string = 'Agregar Alumno';
  
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
  head=["CODIGO","APELLIDOS","NOMBRE","DOC. de IDENTIDAD","CORREO","TELÉFONO","VACUNA","SEGURO","CONTACTO","ACCIONES"]
  msjDeleteok:string='';

  constructor(private renderer2:Renderer2,private formBuilder:FormBuilder, private parentService:ParentService) {
}
ngOnInit(): void {
    this.form()
    //  console.log(this.students)
  }
// ALUMNO
  get id(){return this.group.get('id')}
  get code(){return this.group.get('code')}
  get diseases(){return this.group.get('diseases')}
  get namecon_pri(){return this.group.get('namecon_pri')}
  get telcon_pri(){return this.group.get('telcon_pri')}
  get namecon_sec(){return this.group.get('namecon_sec')}
  get telcon_sec(){return this.group.get('telcon_sec')}
  get vaccine(){return this.group.get('vaccine')}
  get type_insurance(){return this.group.get('type_insurance')}
// USUARIO
  get idUsuario(){return this.group.get('usuarioDTO.id')}
  get codeUsuario(){return this.group.get('usuarioDTO.code')}
  get nombreUsuario(){return this.group.get('usuarioDTO.nombreUsuario')}
  get name(){return this.group.get('usuarioDTO.name')}
  get pa_surname(){return this.group.get('usuarioDTO.pa_surname')}
  get ma_surname(){return this.group.get('usuarioDTO.ma_surname')}
  get birthdate(){return this.group.get('usuarioDTO.birthdate')}
  get type_doc(){return this.group.get('usuarioDTO.type_doc')}
  get numdoc() { return this.group.get('usuarioDTO.numdoc') }
  get tel(){return this.group.get('usuarioDTO.tel')}
  get gra_inst(){return this.group.get('usuarioDTO.gra_inst')}
  get email(){return this.group.get('usuarioDTO.email')}
  get password(){return this.group.get('usuarioDTO.password')}
  get rol(){return this.group.get('usuarioDTO.rol')}
  get apoderado(){return this.group.get('apoderado')}
  get isVacunado(){return this.group.get('isVacunado')}
// APODERADO 
  get idApoderado(){return this.group.get('apoderadoDTO.id')}
  get codeA(){return this.group.get('apoderadoDTO.code')}
  get nameApoderado(){return this.group.get('nameApoderado')}
  get pa_surnameA(){return this.group.get('pa_surnameA')}
  get ma_surnameA(){return this.group.get('ma_surnameA')}

  // Modal
  isEditing: boolean = false;
  form(item?:IStudent){

    if(item){
      this.titulo = "Actualizar Alumno";
    }

    // this.nomParent = item?item.apoderado:'';
    this.group = this.formBuilder.group({
      // ALUMNO
      id:[item?item.id:null],
      code:[item?item.code:''],
      diseases:[item?item.diseases:''],
      namecon_pri:[item?item.namecon_pri:''],
      telcon_pri:[item?item.telcon_pri:''],
      namecon_sec:[item?item.namecon_sec:''],
      telcon_sec:[item?item.telcon_sec:''],
      vaccine:[item?item.vaccine:''],
      type_insurance:[item?item.type_insurance:''],

      
      apoderadoDTO:this.formBuilder.group({
        id:[item?item.apoderadoDTO.id:null],
        code:[item?item.apoderadoDTO.code:''],
        name:[item?item.apoderadoDTO.name + ' ' + item.apoderadoDTO.pa_surname + ' ' + item.apoderadoDTO.ma_surname:''],
      }),
      // USUARIO

      usuarioDTO:this.formBuilder.group({
        id:[item?item.usuarioDTO.id:null],
        code:[item?item.usuarioDTO.code:''],
        nombreUsuario:[item?item.usuarioDTO.nombreUsuario:'',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
        name:[item?item.usuarioDTO.name:'',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
        pa_surname:[item?item.usuarioDTO.pa_surname:'',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
        ma_surname:[item?item.usuarioDTO.ma_surname:'',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
        birthdate:[item?item.usuarioDTO.birthdate:''],
        type_doc:[item?item.usuarioDTO.type_doc:'',[Validators.required]],
        numdoc:[item?item.usuarioDTO.numdoc:'',[Validators.required,Validators.minLength(8),Validators.maxLength(8)]],
        tel:[item?item.usuarioDTO.tel:''],
        gra_inst:[item?item.usuarioDTO.gra_inst:'',[Validators.required,]],
        email:[item?item.usuarioDTO.email:'', [Validators.required,]],
        password:[item?item.usuarioDTO.password:'', [Validators.required,]],
        rol: ['STUDENT']
      }),

     
      // apoderado:[''],
      // isVacunado: ['',[Validators.required]],
      // APODERADO
     
      // pa_surnameA:[item?item.apoderadoDTO.pa_surname:'',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
      // ma_surnameA:[item?item.apoderadoDTO.ma_surname:'',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
      // telConPri:[item?item.telcon_pri:'',[Validators.required,Validators.minLength(9),Validators.maxLength(9)]],
      // tipSeg: [item?item.type_insurance:'',[Validators.required]]
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

    this.studentSave.emit(this.group.value)
    }
    this.modalAdd.hiddenModal();

    if(this.titulo=="Actualizar Alumno"){
      this.titulo = "Agregar Alumno";
    }
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
    this.nomParent = parent.pa_surname + ' ' + parent.ma_surname + ' '+parent.name;
    this.identiParent = parent.id;
    this.searchParentModal.hidden();
  }

  reset(){
    if(this.titulo=="Actualizar Alumno"){
      this.titulo = "Agregar Alumno";
    }
    console.log(this.group.value);
    this.group.reset(); 
    
  }

}