import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICourseTeacher } from 'src/app/features/admin/interfaces/course-teacher';

@Component({
  selector: 'app-table-asignaciones',
  templateUrl: './table-asignaciones.component.html',
  styleUrls: ['./table-asignaciones.component.scss']
})
export class TableAsignacionesComponent implements OnInit {

  @Input() asignaciones: ICourseTeacher[] = [];
  @Input() tableName!: string;
  @Input() title!: string;

  
  nomSearch:string='';

  @Output() asignacionesSearch:EventEmitter<string> = new EventEmitter();

  head=["Code","Grado","Sección","Curso"]

  constructor() { }

  ngOnInit(): void {
  }

  search(nom:string){
    this.asignacionesSearch.emit(nom);
  }

}
