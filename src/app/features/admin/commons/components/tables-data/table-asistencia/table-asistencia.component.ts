import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IAsistencia } from 'src/app/features/admin/interfaces/asistencia';
import { IAula } from 'src/app/features/admin/interfaces/aula';
import { ModalComponent } from 'src/app/shared/components/modals/modal/modal.component';
import { AsistenciaService } from '../../../services/asistencia.service';


@Component({
  selector: 'app-table-asistencia',
  templateUrl: './table-asistencia.component.html',
  styleUrls: ['./table-asistencia.component.scss']
})

export class TableAsistenciaComponent implements OnInit {

  @Input() asistencias: IAsistencia[] = []
  @Input() successful!: boolean;

  @Input() tableName!: string;
  @Input() title!: string;

  @Output() asistenciaSave: EventEmitter<IAsistencia> = new EventEmitter();
  @Output() asistenciaDelete: EventEmitter<string> = new EventEmitter();
  @Output() asistenciaSearch: EventEmitter<string> = new EventEmitter();
  @Output() aulaSearch: EventEmitter<IAula> = new EventEmitter();


  @ViewChild('modalAdd') modalAdd!: ModalComponent;
  @ViewChild('modalDelete') modalDelete!: ModalComponent;


  head = ["Código", "Alumno", "Clase", "Estado"]
  group!: FormGroup;
  optionsEst = [{ title: "PRESENTE", value: '01' }, { title: "AUSENTE", value: '02' }]


  msjResponse: string = '';
  nomSearch: string = '';
  asistenciasFiltradas: any;

  constructor(private formBuilder: FormBuilder, private asistenciaService: AsistenciaService) { }

  ngOnInit(): void {

  }

  //BUSCAR
  search(filter: any) {
    this.asistenciaSearch.emit(filter);
  }

  // AGREGAR - ACTUALIZAR
  save() {
    if (this.group.valid) {
      this.asistenciaSave.emit(this.group.value)
    }
    this.modalAdd.hiddenModal();
  }
  // ELIMINAR
  delete(id: string) {
    this.asistenciaDelete.emit(id)
    this.modalDelete.hiddenModal();
  }
}
