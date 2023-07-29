import { Component, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { IAula } from '../../interfaces/aula';
import { AulaService } from '../../commons/services/aula.service';
import { ISeccion } from '../../interfaces/seccion';
import { IGrade } from '../../interfaces/grade';
import { SeccionService } from '../../commons/services/seccion.service';
import { GradeService } from '../../commons/services/grade.service';
import { ModalResponseComponent } from 'src/app/shared/components/modals/modal-response/modal-response.component';

@Component({
  selector: 'app-admin-classroom',
  templateUrl: './admin-classroom.component.html',
  styleUrls: ['./admin-classroom.component.scss']
})
export class AdminClassroomComponent implements OnInit {

  classrooms: IAula[] = [];
  sections: ISeccion[] = [];
  grades: IGrade[] = [];

  tableName: string = 'Aulas';
  totalAulas: number = 0;
  paginationData = 'classroom';
  paginationDataGrade = 'grade';
  paginationDataSection = 'section';

  msjResponse: string = '';
  successful!: boolean;

  filterSearch = "";

  //paginatio
  page = 0;
  size = 10;

  @ViewChild('modalOk') modalOk!: ModalResponseComponent;


  constructor(private classroomService: AulaService,
    private sectionService: SeccionService,
    private gradeService: GradeService) { }

  ngOnInit(): void {
    this.getClassrooms();
    this.getGradesAndSections();
    this.classroomService.getAulaCount('')
      .subscribe(count => {
        this.totalAulas = count;
      });
  }

  //BUSCAR
  search(filter: string) {
    this.filterSearch = filter;
    this.getClassrooms();
  }

  // AGREGAR - ACTUALIZAR
  save(classroom: IAula) {
    if (classroom.id == null) {
      this.classroomService.add(classroom).subscribe(data => {
        if (data.successful) {
          this.getClassrooms();
          this.msjResponse = 'Agregado correctamente';
          this.successful = true;
        } else {
          this.msjResponse = data.message;
          this.successful = false;
        }
      });
    } else {
      this.classroomService.update(classroom).subscribe(data => {
        if (data.successful) {
          this.getClassrooms();
          this.msjResponse = 'Cambios actualizados con éxito';
          this.successful = true;
        } else {
          this.msjResponse = data.message;
          this.successful = false;
        }
      })
    }
    this.modalOk.showModal();
    this.msjResponse = "";
  }

  //ELIMINAR
  delete(id: string) {
    this.classroomService.delete(id).subscribe(data => {
      if (data.successful) {
        this.getClassrooms();
        this.msjResponse = 'Eliminado correctamente';
        this.successful = true;
      } else {
        this.msjResponse = data.message;
        this.successful = false;
      }

    });
    this.modalOk.showModal();
    this.msjResponse = "";
  }

  //Pagination
  getPage(event: any) {
    this.page = event;
    this.getClassrooms();
  }

  getSize(event: any) {
    this.size = event;
    this.getClassrooms();
  }

  //Funciones de lista
  getClassrooms() {
    this.classroomService.getAll(this.filterSearch, this.page, this.size)
      .subscribe(response => {
        if (response.successful) {
          this.classrooms = response.data.list;
        } else {
          this.classrooms = [];
        }
      });
  }
  getGradesAndSections() {
    this.gradeService.getAll('', 0, 40)
      .subscribe(response => {
        this.grades = response.data.list;

      });
    this.sectionService.getAll('', 0, 40)
      .subscribe(response => {
        this.sections = response.data.list;

      });
  }
}
