import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICourse } from 'src/app/features/admin/interfaces/course';
import { IGrade } from 'src/app/features/admin/interfaces/grade';
import { ModalComponent } from 'src/app/shared/components/modals/modal/modal.component';
import { CourseService } from '../../../services/course.service';

@Component({
  selector: 'app-table-course',
  templateUrl: './table-course.component.html',
  styleUrls: ['./table-course.component.scss']
})
export class TableCourseComponent implements OnInit {

  @Input() courses: ICourse[]=[];
  @Input() grades:IGrade[]=[];
  @Input() tableName!: string;
  @Input() title!: string;

  @Output() courseSave:EventEmitter<ICourse> = new EventEmitter();
  @Output() courseDelete:EventEmitter<string> = new EventEmitter();
  @Output() courseSearch:EventEmitter<string> = new EventEmitter();

  @ViewChild('modalAdd') modalAdd!: ModalComponent;
  @ViewChild('modalDelete') modalDelete!: ModalComponent;

  head=["Codigo","Curso","Acciones"]
  group!: FormGroup;

  msjResponse:string='';
  nomSearch:string='';

  constructor(private formBuilder:FormBuilder) { }
  
  ngOnInit(): void {
    this.form();
  
  }
  get code(){return this.group.get('code')}
  get nom(){return this.group.get('nom')}
  // get descripcion(){return this.group.get('descripcion')}
  
  form(item?:ICourse):void{
    this.group = this.formBuilder.group({
      code:[item?item.code:'',[Validators.required,Validators.minLength(3),Validators.maxLength(30)]],
      nom:[item?item.name:'',[Validators.required,Validators.minLength(3),Validators.maxLength(30)]],
      // descripcion:[item?item.descripcion:'',]
  });
}

  //BUSCAR
  search(nom:string){
    this.courseSearch.emit(nom);
  }

   // AGREGAR - ACTUALIZAR
  save(){
    if(this.group.valid){
    this.courseSave.emit(this.group.value)
    }
    this.modalAdd.hiddenModal();
  }

  // ELIMINAR 
  delete(id:string){
    this.courseDelete.emit(id)
    this.modalDelete.hiddenModal();
  }

}
