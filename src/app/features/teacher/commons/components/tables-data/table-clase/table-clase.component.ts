import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IClase } from 'src/app/features/admin/interfaces/clase';
import { ICourseTeacher } from 'src/app/features/admin/interfaces/course-teacher';
import { IPeriod } from 'src/app/features/admin/interfaces/period';
import { ModalComponent } from 'src/app/shared/components/modals/modal/modal.component';

@Component({
  selector: 'app-table-clase',
  templateUrl: './table-clase.component.html',
  styleUrls: ['./table-clase.component.scss']
})
export class TableClaseComponent implements OnInit {

  @Input() clases: IClase[] = [];
  @Input() tableName!: string;
  @Input() title!: string;
  @Input() periodo!: IPeriod;
  @Input() courseTeacher!: ICourseTeacher

  item?: IClase;

  @Output() claseSave: EventEmitter<IClase> = new EventEmitter();
  @Output() claseDelete: EventEmitter<string> = new EventEmitter();
  @Output() claseSearch: EventEmitter<string> = new EventEmitter();

  titulo = 'Agregar Clase';

  head = ["Codigo", "Fecha"];
  group!: FormGroup;

  msjResponse: string = '';
  nomSearch: string = '';

  @ViewChild('modalAdd') modalAdd!: ModalComponent;
  @ViewChild('modalDelete') modalDelete!: ModalComponent;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form();
  }

  form(item?: IClase): void {
    if (item) {
      this.item = item;
    }

    this.group = this.formBuilder.group({
      id: [item ? item.id : null],
      code: [item ? item.code : ''],
      date: [item ? item.date:null, Validators.required],
      docentexCursoDTO: [item?item.docentexCursoDTO:null],
      periodoDTO:[item?item.periodoDTO:null]

    });
  }

  search(name: string) {
    this.claseSearch.emit(name);
  }

  // AGREGAR - ACTUALIZAR
  save() {
    if (this.group.valid) {
      this.group.get("periodoDTO")?.setValue(this.periodo);
      this.group.get("docentexCursoDTO")?.setValue(this.courseTeacher);
      console.log(this.group.value)
      this.claseSave.emit(this.group.value)
    }
    this.modalAdd.hiddenModal();
    if (this.titulo = 'Actualizar Evaluación') {
      this.titulo = 'Agregar Evaluación';
    }
  }

  // ELIMINAR 
  delete(id: string) {
    this.claseDelete.emit(id)
    this.modalDelete.hiddenModal();
  }

  refresh(): void { window.location.reload(); }

  reset() {
    if (this.titulo = 'Actualizar Evaluación') {
      this.titulo = 'Agregar Evaluación';
    }
    this.group.reset();
  }


}
