import { Component, Input, OnInit } from '@angular/core';
import { IAsistencia } from 'src/app/features/admin/interfaces/asistencia';

@Component({
  selector: 'app-table-asistencias',
  templateUrl: './table-asistencias.component.html',
  styleUrls: ['./table-asistencias.component.scss']
})
export class TableAsistenciasComponent implements OnInit {

  tableName = 'Asistencias';

  @Input() asistencias: IAsistencia[] = [];

  head = ["Código", "Estado", "Fecha"];

  constructor() { }

  ngOnInit(): void {
  }

}
