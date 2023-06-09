import { Component, OnInit, ViewChild } from '@angular/core';
import { IAula } from '../../interfaces/aula';
import { ModalComponent } from 'src/app/shared/components/modals/modal/modal.component';
import { AulaService } from '../../commons/services/aula.service';
import { PaginationService } from '../../commons/services/pagination.service';
import { ISeccion } from '../../interfaces/seccion';
import { IGrade } from '../../interfaces/grade';
import { SeccionService } from '../../commons/services/seccion.service';
import { GradeService } from '../../commons/services/grade.service';

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

  paginationData = 'classroom';
  paginationDataGrade = 'grade';
  paginationDataSection = 'section';

  msjResponse: string = '';
  successful: boolean = false;

  @ViewChild('modalOk') modalOk!: ModalComponent;

  constructor(private classroomService: AulaService,
    private pagination: PaginationService,
    private sectionService: SeccionService,
    private gradeService: GradeService) { }

  ngOnInit(): void {
    let page = this.pagination.getPage(this.paginationData);
    let size = this.pagination.getSize(this.paginationData);
    this.classroomService.getAll('', page, size)
      .subscribe(response => {
        this.classrooms = response.data.list;

      });

    let pageGrade = this.pagination.getPage(this.paginationDataGrade);
    let sizeGrade = this.pagination.getSize(this.paginationDataGrade);
    this.gradeService.getAll('', pageGrade, sizeGrade)
      .subscribe(response => {
        this.grades = response.data.list;

      });

    let pageSection = this.pagination.getPage(this.paginationDataSection);
    let sizeSection = this.pagination.getSize(this.paginationDataSection);
    this.sectionService.getAll('', pageSection, sizeSection)
      .subscribe(response => {
        this.sections = response.data.list;

      });
  }

  //BUSCAR
  search(nom: string) {
    let page = this.pagination.getPage(this.paginationData);
    let size = this.pagination.getSize(this.paginationData);
    this.classroomService.getAll(nom, page, size).subscribe(response => {
      this.classrooms = response.data.list;
    })
  }

  // AGREGAR - ACTUALIZAR
  save(classroom: IAula) {
    console.log(classroom);
    if (classroom.id == null) {
      this.classroomService.add(classroom).subscribe(data => {
        console.log(data.message)
        console.log(data.data);
        if (data.successful === true) {
          this.msjResponse = 'Agregado correctamente';
          this.successful = true;
        } else {
          this.msjResponse = 'Ha ocurrido un error :(';
          this.successful = false;
        }
      });
    } else {
      this.classroomService.update(classroom).subscribe(data => {
        if (data.successful === true) {
          this.msjResponse = 'Cambios actualizados con éxito';
          this.successful = true;
        } else {
          this.msjResponse = 'Ha ocurrido un error :v';
          this.successful = false;
        }
      })
    }
    this.modalOk.showModal();
  }

  //ELIMINAR 
  delete(id: string) {
    this.classroomService.delete(id).subscribe(data => {

      if (data.successful === true) {
        this.msjResponse = 'Eliminado correctamente';
        this.successful === true;
      }
    });
    this.modalOk.showModal();
  }

  refresh(): void { window.location.reload(); }


}
