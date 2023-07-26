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

  @Input() grades: IGrade[] = [];
  @Input() tableName!: string;
  @Input() title!: string;

  titulo = 'Agregar Grado';

  @Output() gradeSave: EventEmitter<IGrade> = new EventEmitter();
  @Output() gradeDelete: EventEmitter<string> = new EventEmitter();
  @Output() gradeSearch: EventEmitter<string> = new EventEmitter();

  head = ["Codigo", "Grado", "Acciones"]
  group!: FormGroup;

  @Input() successful: boolean = true;

  msjResponse: string = '';
  nomSearch: string = '';

  @ViewChild('modalAdd') modalAdd!: ModalComponent;
  @ViewChild('modalDelete') modalDelete!: ModalComponent;

  constructor(private formBuilder: FormBuilder) { }

  get id() { return this.group.get('id') }
  get name() { return this.group.get('name') }
  get code() { return this.group.get('code') }

  ngOnInit(): void {
    this.form();
  }

  form(item?: IGrade): void {
    if(item){
      
    }
    this.group = this.formBuilder.group({
      id: [item ? item.id : null],
      code: [item ? item.code : ''],
      name: [item ? item.name : '', [Validators.required, Validators.minLength(1), Validators.maxLength(1), Validators.pattern("^[0-9]*$")]],
    });
  }

  //BUSCAR
  search(name: string) {
    console.log(name);
    this.gradeSearch.emit(name);
  }

  // AGREGAR - ACTUALIZAR
  save() {
    if (this.group.valid) {
      console.log(this.group.value)
      this.gradeSave.emit(this.group.value)
    }
    this.modalAdd.hiddenModal();
   
  }

  // ELIMINAR
  delete(id: string) {
    this.gradeDelete.emit(id)
    this.modalDelete.hiddenModal();
  }

  refresh(): void { window.location.reload(); }

  reset() {
  
    this.group.reset();
  }
  
onUpdateButtonClick(item: any) {
  this.titulo = "Actualizar Grado";
  this.form(item); // Call the form() function if needed for your logic
  this.modalAdd.showModal();
}

// Function to handle when the "Add" button is clicked
onAddButtonClick() {
  this.titulo = "Agregar Grado";
  // Any other logic related to the "Add" button can be added here
  this.modalAdd.showModal();
}

  getCloseModal(){
    this.group.reset();
  }

  titleAgregar(){
    this.titulo = "Agregar grado";
  }
}
