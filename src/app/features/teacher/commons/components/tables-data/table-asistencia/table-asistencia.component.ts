import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IAsistencia } from 'src/app/features/admin/interfaces/asistencia';
import { ModalComponent } from 'src/app/shared/components/modals/modal/modal.component';

@Component({
  selector: 'app-table-asistencia',
  templateUrl: './table-asistencia.component.html',
  styleUrls: ['./table-asistencia.component.scss']
})
export class TableAsistenciaComponent implements OnInit {

  @Input() asistencias: IAsistencia[] = [];
  @Input() tableName!: string;
  @Input() title!: string;

  item?: IAsistencia;

  @Output() asistenciaSave: EventEmitter<IAsistencia> = new EventEmitter();
  @Output() asistenciaDelete: EventEmitter<string> = new EventEmitter();
  @Output() asistenciaSearch: EventEmitter<string> = new EventEmitter();
  
  titulo = 'Editar asistencia';

  head = ["Codigo", "Apellido Paterno","Apellido Materno","Alumno", "Fecha","Estado"];
  group!: FormGroup;

  msjResponse: string = '';
  nomSearch: string = '';

  @ViewChild('modalAdd') modalAdd!: ModalComponent;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.form();
  }

  form(item?: IAsistencia): void {
    if (item) {
      this.item = item;
    }
    this.group = this.formBuilder.group({
      id: [item ? item.id : null],
      code:[item ? item.code: null],
      name: [item ? item.alumnoDTO.usuarioDTO.name : '', Validators.required],
      pa_surname: [item ? item.alumnoDTO.usuarioDTO.pa_surname : '', [Validators.required]],
      ma_surname: [item ? item.alumnoDTO.usuarioDTO.ma_surname : '', [Validators.required]],
      state: [item ? item.state : ''],
      claseDTO: [item ? item.claseDTO:null],
      alumnoDTO: [item ? item.alumnoDTO:null]
    });
  }

  //BUSCAR
  search(name: string) {
    this.asistenciaSearch.emit(name);
  }

  // AGREGAR - ACTUALIZAR
  save() {
    if (this.group.valid) {
      console.log(this.group.value)
      this.asistenciaSave.emit(this.group.value)
    }
    this.modalAdd.hiddenModal();
  }

  refresh(): void { window.location.reload(); }

  reset() {
    if (this.titulo = 'Actualizar Evaluación') {
      this.titulo = 'Agregar Evaluación';
    }
    this.group.reset();
  }

}
