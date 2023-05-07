import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IGrade } from 'src/app/features/admin/interfaces/grade';
import { ModalComponent } from 'src/app/shared/components/modals/modal/modal.component';
import { GradeService } from '../../../services/grade.service';

@Component({
  selector: 'app-table-grade',
  templateUrl: './table-grade.component.html',
  styleUrls: ['./table-grade.component.scss']
})
export class TableGradeComponent implements OnInit {
  
  @Input() grades: IGrade[]=[];
  @Input() tableName!: string;
  @Input() title!: string;

  @Output() gradeSave:EventEmitter<IGrade> = new EventEmitter();
  @Output() gradeDelete:EventEmitter<string> = new EventEmitter();
  @Output() gradeSearch:EventEmitter<string> = new EventEmitter();

  head=["Codigo","Grado","Acciones"]
  group!: FormGroup;
  
  msjResponse:string='';
  nomSearch:string='';

  @ViewChild('modalAdd') modalAdd!: ModalComponent;
  @ViewChild('modalDelete') modalDelete!: ModalComponent;

  constructor(private formBuilder:FormBuilder) { }
  
  get id(){return this.group.get('id')}
  get name(){return this.group.get('name')}
  get code(){return this.group.get('code')}
  ngOnInit(): void {
    this.form();
  }

  form(item?:IGrade):void{
    this.group = this.formBuilder.group({
      id:[item?item.id:null],
      code:[item?item.code:null],
      name:[item?item.name:'',[Validators.required,Validators.minLength(1),Validators.maxLength(40)]],
  });
}

  //BUSCAR
  search(nom:string){
    this.gradeSearch.emit(nom);
  }

   // AGREGAR - ACTUALIZAR
   save(){
    if(this.group.valid){
     this.gradeSave.emit(this.group.value)
    }
    this.modalAdd.hiddenModal();
  }

  // ELIMINAR 
  delete(id:string){
    this.gradeDelete.emit(id)
    this.modalDelete.hiddenModal();
  }

  refresh(): void { window.location.reload(); }
}
