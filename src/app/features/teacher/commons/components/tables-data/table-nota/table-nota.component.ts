import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, MinLengthValidator, Validators } from '@angular/forms';
import { ICourseTeacher } from 'src/app/features/admin/interfaces/course-teacher';
import { IEvaluacion } from 'src/app/features/admin/interfaces/evaluacion';
import { IPeriod } from 'src/app/features/admin/interfaces/period';
import { IStudent } from 'src/app/features/admin/interfaces/student';
import { ModalComponent } from 'src/app/shared/components/modals/modal/modal.component';

@Component({
  selector: 'app-table-nota',
  templateUrl: './table-nota.component.html',
  styleUrls: ['./table-nota.component.scss']
})
export class TableNotaComponent implements OnInit {

  @Input() evaluaciones: IEvaluacion[] = [];

  @Input() tableName!: string;
  @Input() title!: string;

  item?: IEvaluacion;

  @Output() evaluacionSave: EventEmitter<IEvaluacion> = new EventEmitter();
  @Output() evaluacionDelete: EventEmitter<string> = new EventEmitter();
  @Output() evaluacionSearch: EventEmitter<string> = new EventEmitter();

  titulo = 'Agregar Nota';

  head = ["Codigo", "Apellido paterno", "Apellido materno", "Nombres", "Fecha","Nota"];
  group!: FormGroup;

  msjResponse: string = '';
  nomSearch: string = '';

  @ViewChild('modalAdd') modalAdd!: ModalComponent;
  @ViewChild('modalDelete') modalDelete!: ModalComponent;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form();
  }

  get name() { return this.group.get('name') }
  get pa_surname() { return this.group.get('pa_surname') }
  get ma_surname() { return this.group.get('ma_surname') }

  form(item?: IEvaluacion): void {
    if (item) {
      this.item = item;
    }
    this.group = this.formBuilder.group({
      id: [item ? item.id : null],
      code:[item ? item.code: null],
      name: [item ? item.alumnoDTO.usuarioDTO.name : ''],
      pa_surname: [item ? item.alumnoDTO.usuarioDTO.pa_surname : '', [Validators.required]],
      ma_surname: [item ? item.alumnoDTO.usuarioDTO.ma_surname : '', [Validators.required]],
      note: ['', [Validators.required, Validators.min(1)]],
      date:[this.obtenerFecha],
      alumnoDTO: [item? item.alumnoDTO:null],
      periodoDTO: [item? item.periodoDTO:null],
      docentexCursoDTO:[item?item.docentexCursoDTO:null]
    });
  }

  obtenerFecha(): string {
    const currentDate = new Date();

    // Obtener los componentes de la fecha actual
    const yyyy = currentDate.getFullYear();
    const mm = String(currentDate.getMonth() + 1).padStart(2, '0'); // Se agrega el 1 porque los meses se cuentan desde 0
    const dd = String(currentDate.getDate()).padStart(2, '0');

    // Construir la fecha actual en el formato deseado
    const formattedDate = `${dd}-${mm}-${yyyy}`;

    return formattedDate;
  }

  //BUSCAR
  search(name: string) {
    this.evaluacionSearch.emit(name);
  }

  // AGREGAR - ACTUALIZAR
  save() {
    if (this.group.valid) {
      console.log(this.group.value)
      this.evaluacionSave.emit(this.group.value)
    }
    this.modalAdd.hiddenModal();
    if (this.titulo = 'Actualizar Evaluación') {
      this.titulo = 'Agregar Evaluación';
    }
  }

  // ELIMINAR 
  delete(id: string) {
    this.evaluacionDelete.emit(id)
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
