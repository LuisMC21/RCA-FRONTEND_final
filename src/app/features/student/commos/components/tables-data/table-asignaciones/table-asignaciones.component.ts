import { Component, Input, OnInit } from '@angular/core';
import { ICourseTeacher } from 'src/app/features/admin/interfaces/course-teacher';

@Component({
  selector: 'app-table-asignaciones',
  templateUrl: './table-asignaciones.component.html',
  styleUrls: ['./table-asignaciones.component.scss']
})
export class TableAsignacionesComponent implements OnInit {

  tableName = 'Cursos';

  @Input() asignaciones: ICourseTeacher[] = [];

  head = ["Código", "Aula", "Curso", "Docente", "Teléfono docente"];

  constructor() { }

  ngOnInit(): void {
  }


}
