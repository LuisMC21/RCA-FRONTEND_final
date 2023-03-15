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

msjResponse:string='';
nomSearch:string='';

  constructor(private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.form();
  
  }
  get code(){return this.group.get('code')}
  get est(){return this.group.get('estado')}
  get alumno(){return this.group.get('alumnoDTO')}
  get clas(){return this.group.get('claseDTO')}

  form(item?:IAsistencia):void{
    this.group = this.formBuilder.group({
      code:[item?item.code:'',[Validators.required,Validators.minLength(3),Validators.maxLength(30)]],
      state:[item?item.state:'',[Validators.required,Validators.minLength(3),Validators.maxLength(30)]],
      alumno:[item?item.alumnoDTO:'',[Validators.required,Validators.minLength(3),Validators.maxLength(30)]],
      clase:[item?item.claseDTO:'',[Validators.required,Validators.minLength(3),Validators.maxLength(30)]]
  });
}

  //BUSCAR
search(nom:string){
  this.asistenciaSearch.emit(nom);
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
