import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICourse } from 'src/app/features/admin/interfaces/course';
import { ITeacher } from 'src/app/features/admin/interfaces/teacher';
import { ModalComponent } from 'src/app/shared/components/modals/modal/modal.component';
import { CourseService } from '../../../services/course.service';
import { TeacherService } from '../../../services/teacher.service';

@Component({
  selector: 'app-table-teacher',
  templateUrl: './table-teacher.component.html',
  styleUrls: ['./table-teacher.component.scss']
})
export class TableTeacherComponent implements OnInit {

  @Input() teachers!: ITeacher[];
  @Input() tableName!: string;
  @Input() title!: string;

  @Output() teacherSave:EventEmitter<ITeacher> = new EventEmitter();
  @Output() teacherDelete:EventEmitter<string> = new EventEmitter();
  @Output() teacherSearch:EventEmitter<string> = new EventEmitter();

  @ViewChild('modalAdd') modalAdd!: ModalComponent;
  @ViewChild('modalDelete') modalDelete!: ModalComponent;

  group!: FormGroup;

  optionsDocumentType = [
    {title:"DNI",value:'01'},
    {title:"CE",value:'04'},
    {title:"Pasaporte",value:'07'},
    {title:"Partida de Nacimiento",value:'11'},
  ]
  optionsVac =[
    {title:'SI',value:'S'},
    {title:'NO',value:'N'}
  ]
  optionsGrade= [
    {title:'Superior Técnica',value:'T'},
    {title:'Superior Universitaria',value:'U'}];
  
  optionsInsuraceType= [
    {title:'ESSALUD',value:'E'},
    {title:'SIS',value:'S'},
    {title:'Privado',value:'P'},
    {title:'Fuerza Armada',value:'F'}
  ];

  head=["Codigo","Docente","DNI","Curso","Grado","Acciones"]
  msjResponse:string='';

  constructor(private formBuilder:FormBuilder, private teacherService:TeacherService, private cursoService:CourseService) { }

  get apelPaterno(){return this.group.get('apelPaterno')}
  get apelMaterno(){return this.group.get('apelMaterno')}
  get nombre(){return this.group.get('nombre')}
  get tipDocumento(){return this.group.get('tipDocumento')}
  get numDocumento(){return this.group.get('numDocumento')}
  get gradDoc(){return this.group.get('gradDoc')}
  get especializacion(){return this.group.get('especializacion')}
  get tipSeguro(){return this.group.get('tipSeguro')}

  ngOnInit(): void {
    this.form();
  }

  form(item?:ITeacher){
    this.group = this.formBuilder.group({
      identi:[item?item.identi:null],
      apelPaterno:[item?item.apelPaterno:'',[Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      apelMaterno:[item?item.apelMaterno:'',[Validators.required, Validators.minLength(3),Validators.maxLength(20)]],
      nombre:[item?item.name:'',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
      tipDocumento:[item?item.tipDocumento:'',[Validators.required]],
      gradDoc:[item?item.gradDoc:'',[Validators.required]],
      numDocumento:[item?item.numDocumento:'',[Validators.required,Validators.minLength(8),Validators.maxLength(8)]],
      especializacion:[item?item.specialty:'',[Validators.required,Validators.minLength(3),Validators.maxLength(30)]],
      tipSeguro:[item?item.tipSeguro:'',Validators.required]
  });
  }
 // BUSCAR
 search(nom:string){
  this.teacherSearch.emit(nom);
}

// AGREGAR - ACTUALIZAR
save(){
  if(this.group.valid){
   this.teacherSave.emit(this.group.value)
  }
  this.modalAdd.hiddenModal();
}

// ELIMINAR 
delete(id:string){
  this.teacherDelete.emit(id)
  this.modalDelete.hiddenModal();
}

}
