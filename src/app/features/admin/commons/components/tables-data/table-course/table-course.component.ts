import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
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

  @Input() courses: ICourse[] = [];
  @Input() grades: IGrade[] = [];
  @Input() tableName!: string;
  @Input() title!: string;
  @Input() successful!: boolean;
  titulo: string = "Registrar Curso";
  @Output() courseSave: EventEmitter<ICourse> = new EventEmitter();
  @Output() courseDelete: EventEmitter<string> = new EventEmitter();
  @Output() courseSearch: EventEmitter<string> = new EventEmitter();

  @ViewChild('modalAdd') modalAdd!: ModalComponent;
  @ViewChild('modalDelete') modalDelete!: ModalComponent;

  head = ["Codigo", "Curso", "Acciones"]
  group!: FormGroup;
  msjResponse: string = '';
  nomSearch: string = '';
  close_modal!: boolean;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form();

  }

  get id() { return this.group.get('id') }
  get code() { return this.group.get('code') }
  get name() { return this.group.get('name') }
  // get descripcion(){return this.group.get('descripcion')}

  form(item?: ICourse): void {
    this.group = this.formBuilder.group({
      id: [item ? item.id : null],
      code: [item ? item.code : ''],
      name: [item ? item.name : '', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],

    });
  }

  //BUSCAR
  search(nom: string) {
    this.courseSearch.emit(nom);
  }

  // AGREGAR - ACTUALIZAR
  save() {
    if (this.group.valid) {
      this.courseSave.emit(this.group.value)
    }
  }
  onUpdateButtonClick(item: any) {

    this.titulo = "Actualizar Curso";
    this.form(item); // Call the form() function if needed for your logic
    this.modalAdd.showModal();
  }

  // Function to handle when the "Add" button is clicked
  onAddButtonClick() {
    this.group.reset();
    this.titulo = "Registrar Curso";
    this.modalAdd.showModal();
  }
  // ELIMINAR
  delete(id: string) {
    this.courseDelete.emit(id)
  }

  getCloseModal() {
    this.group.reset();
  }

  // para poder cerrar y abrirel app-modal automáticamente dependiendo de la rpt de la transacción
  ngOnChanges(changes: SimpleChanges) {
    if (this.successful) {
      this.modalAdd.hiddenModal();
    }
  }

}
