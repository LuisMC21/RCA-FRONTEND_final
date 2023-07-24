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
  totalAulas: number=0;
  paginationData = 'classroom';
  paginationDataGrade = 'grade';
  paginationDataSection = 'section';

  msjResponse: string = '';
  successful!: boolean;

  filterSearch = "";

  //paginatio
  page = this.pagination.getPage(this.paginationData);
  size = this.pagination.getSize(this.paginationData);

  @ViewChild('modalOk') modalOk!: ModalComponent;


  constructor(private classroomService: AulaService,
    private pagination: PaginationService,
    private sectionService: SeccionService,
    private gradeService: GradeService) { }

  ngOnInit(): void {
    this.getClassrooms();
    this.getGradesAndSections();

      this.classroomService.getAulaCount('')
      .subscribe(count => {
        this.totalAulas = count;
        console.log(this.totalAulas);
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
        if (data.successful === true) {
          this.getClassrooms();
          this.msjResponse = 'Agregado correctamente';
          this.successful = true;
          this.getClassrooms();
        } else {
          this.msjResponse = data.message;
          this.successful = false;
        }
      });
    } else {
      this.classroomService.update(classroom).subscribe(data => {
        if (data.successful === true) {
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
  }

  //ELIMINAR
  delete(id: string) {
    this.classroomService.delete(id).subscribe(data => {
      if (data.successful === true) {
        this.getClassrooms();
        this.msjResponse = 'Eliminado correctamente';
        this.successful = true;
      } else {
        this.msjResponse = data.message;
        this.successful = false;
      }

    });
    this.modalOk.showModal();
  }
  refresh(): void { window.location.reload(); }


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
  getClassrooms(){
    this.classroomService.getAll(this.filterSearch, this.page, this.size)
      .subscribe(response => {
        if(response.successful){
          this.classrooms = response.data.list;
        } else{
          this.classrooms = [];
        }
      });
  }
  getGradesAndSections(){
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
