import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IStudent } from 'src/app/features/admin/interfaces/student';

@Component({
  selector: 'app-table-student',
  templateUrl: './table-student.component.html',
  styleUrls: ['./table-student.component.scss']
})
export class TableStudentComponent implements OnInit {

  @Input() students: IStudent[] = [];
  @Input() tableName!: string;
  @Input() title!: string;

  @Output() studentSearch: EventEmitter<string> = new EventEmitter();

  head = ["Codigo", "Estudiante", "Apoderado", "Teléfono"];

  msjResponse: string = '';
  nomSearch: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  //BUSCAR
  search(name: string) {
    this.studentSearch.emit(name);
  }

}
