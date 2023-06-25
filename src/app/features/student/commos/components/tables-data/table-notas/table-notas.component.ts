import { Component, Input, OnInit } from '@angular/core';
import { IEvaluacion } from 'src/app/features/admin/interfaces/evaluacion';

@Component({
  selector: 'app-table-notas',
  templateUrl: './table-notas.component.html',
  styleUrls: ['./table-notas.component.scss']
})
export class TableNotasComponent implements OnInit {

  tableName:string = "Promedios";

  @Input() evaluaciones: IEvaluacion[] = []

  head = ["Código", "Curso", "Fecha","Nota"];

  constructor() { }

  ngOnInit(): void {
  }

}
