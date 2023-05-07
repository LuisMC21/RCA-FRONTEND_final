import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ISeccion } from 'src/app/features/admin/interfaces/seccion';
import { ModalComponent } from 'src/app/shared/components/modals/modal/modal.component';

@Component({
  selector: 'app-table-seccion',
  templateUrl: './table-seccion.component.html',
  styleUrls: ['./table-seccion.component.scss']
})
export class TableSeccionComponent implements OnInit {

  @Input() sections: ISeccion[] = [];
  @Input() tableName!: string;
  @Input() title!: string;

  @Output() sectionSave: EventEmitter<ISeccion> = new EventEmitter();
  @Output() sectionDelete: EventEmitter<string> = new EventEmitter();
  @Output() sectionSearch: EventEmitter<string> = new EventEmitter();

  head = ["Codigo", "Secciones", "Acciones"]
  group!: FormGroup;

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

  form(item?: ISeccion): void {
    this.group = this.formBuilder.group({
      id: [item ? item.id : null],
      code: [item ? item.code : ''],
      name: [item ? item.name : '', [Validators.required, Validators.minLength(1), Validators.maxLength(1), Validators.pattern(/^[a-zA-Z]+$/)]],
    });
  }

  //BUSCAR
  search(name: string) {
    this.sectionSearch.emit(name);
  }

  // AGREGAR - ACTUALIZAR
  save() {
    if (this.group.valid) {
      this.sectionSave.emit(this.group.value)
    }
    this.modalAdd.hiddenModal();
  }

  // ELIMINAR 
  delete(id: string) {
    this.sectionDelete.emit(id)
    this.modalDelete.hiddenModal();
  }

  refresh(): void { window.location.reload(); }

  reset():void{
    this.group.reset(); 
  }

}
