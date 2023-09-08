import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
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

  titulo = 'Registrar Grado';

  @Output() gradeSave: EventEmitter<IGrade> = new EventEmitter();
  @Output() gradeDelete: EventEmitter<string> = new EventEmitter();
  @Output() gradeSearch: EventEmitter<string> = new EventEmitter();

  head = ["Codigo", "Grado", "Acciones"]
  group!: FormGroup;

  @Input() successful!: boolean;

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
    this.group = this.formBuilder.group({
      id: [item ? item.id : null],
      code: [item ? item.code : ''],
      name: [item ? item.name : '', [Validators.required, Validators.minLength(1), Validators.maxLength(1), Validators.pattern("^[0-9]*$")]],
    });
  }

  //BUSCAR
  search(name: string) {
    this.gradeSearch.emit(name);
  }

  // AGREGAR - ACTUALIZAR
  save() {
    if (this.group.valid) {
      this.gradeSave.emit(this.group.value)
    }
  }

  // ELIMINAR
  delete(id: string) {
    this.gradeDelete.emit(id);
  }

  onUpdateButtonClick(item: any) {
    this.titulo = "Actualizar Grado";
    this.form(item);
    this.modalAdd.showModal();
  }

  // Function to handle when the "Add" button is clicked
  onAddButtonClick() {
    this.titulo = "Registrar Grado";
    this.group.reset();
    // Any other logic related to the "Add" button can be added here
    this.modalAdd.showModal();
  }

  getCloseModal() {
    this.group.reset();
  }

  titleAgregar() {
    this.titulo = "Registrar grado";
  }
  // para poder cerrar y abrirel app-modal automáticamente dependiendo de la rpt de la transacción
  ngOnChanges(changes: SimpleChanges) {
    if (this.successful) {
      this.modalAdd.hiddenModal();
    }
  }
}
