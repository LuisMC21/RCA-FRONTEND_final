import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IAsistencia } from 'src/app/features/admin/interfaces/asistencia';
import { IClase } from 'src/app/features/admin/interfaces/clase';
import { IStudent } from 'src/app/features/admin/interfaces/student';
import { ModalComponent } from 'src/app/shared/components/modals/modal/modal.component';

@Component({
  selector: 'app-table-asistencia',
  templateUrl: './table-asistencia.component.html',
  styleUrls: ['./table-asistencia.component.scss']
})
export class TableAsistenciaComponent implements OnInit {
@Input() asistencia:IAsistencia[]=[];
@Input() student:IStudent[]=[];
@Input() clase:IClase[]=[];
@Input() tableName!: string;
@Input() title!: string;


@Output() asistenciaSave:EventEmitter<IAsistencia> = new EventEmitter();
@Output() asistenciaDelete:EventEmitter<string> = new EventEmitter();
@Output() asistenciaSearch:EventEmitter<string> = new EventEmitter();

@ViewChild('modalAdd') modalAdd!: ModalComponent;
@ViewChild('modalDelete') modalDelete!: ModalComponent;


head=["Código","Alumno","Clase","Estado","Acciones"]
group!: FormGroup;
optionsEst = [{title:"PRESENTE",value:'01'},{title:"AUSENTE",value:'02'}]

msjResponse:string='';
nomSearch:string='';

  constructor(private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.form();
  
  }
  get id(){return this.group.get('id')}
  get code(){return this.group.get('code')}
  get est(){return this.group.get('estado')}
  get alumno(){return this.group.get('alumnoDTO')}
  get clas(){return this.group.get('claseDTO')}
  get name(){return this.group.get('name')}
  form(item?:IAsistencia):void{
    this.group = this.formBuilder.group({
      id:[item?item.id:null],
      code:[item?item.code:'',[Validators.required,Validators.minLength(3),Validators.maxLength(30)]],
      state:[item?item.state:''],
      name:[item?item.alumnoDTO.usuarioDTO.name:''],
      pa_surname:[item?item.alumnoDTO.usuarioDTO.pa_surname:''],
      ma_surname:[item?item.alumnoDTO.usuarioDTO.ma_surname:''],
      date:[item?item.claseDTO.date:''],
   
  });
}

  //BUSCAR
search(name:string){
  this.asistenciaSearch.emit(name);
}

   // AGREGAR - ACTUALIZAR
save(){
  if(this.group.valid){
  this.asistenciaSave.emit(this.group.value)
  }
  this.modalAdd.hiddenModal();
}

// ELIMINAR 
delete(id:string){
  this.asistenciaDelete.emit(id)
  this.modalDelete.hiddenModal();
}
}
