import { Component, OnInit, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { ModalComponent } from 'src/app/shared/components/modals/modal/modal.component';
import { GradeService } from '../../commons/services/grade.service';
import { PaginationService } from '../../commons/services/pagination.service';
import { IGrade } from '../../interfaces/grade';
import { ModalResponseComponent } from 'src/app/shared/components/modals/modal-response/modal-response.component';

@Component({
  selector: 'app-admin-grade',
  templateUrl: './admin-grade.component.html',
  styleUrls: ['./admin-grade.component.scss']
})
export class AdminGradeComponent implements OnInit {

  grades: IGrade[] = [];
  tableName: string = 'Grados';
  paginationData = 'grade';
  msjResponse: string = '';
  successful!: boolean;
  page = 0;
  size = 10;
  filterSearch = "";

  @ViewChild('modalOk') modalOk!: ModalResponseComponent;

  constructor(private gradeService: GradeService) { }

  ngOnInit(): void {
    this.getGrades();
  }

  //BUSCAR
  search(filter: string) {
    this.filterSearch = filter;
    this.getGrades();
  }

  // AGREGAR - ACTUALIZAR
  save(grade: IGrade) {
    if (grade.id == null) {
      this.gradeService.add(grade).subscribe(data => {
        if (data.successful) {
          this.getGrades();
          this.msjResponse = 'Agregado correctamente';
          this.successful = true;
        } else {
          this.msjResponse = data.message;
          this.successful = false;
        }
      });
    } else {
      this.gradeService.update(grade).subscribe(data => {
        if (data.successful) {
          this.getGrades();
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
    this.gradeService.delete(id).subscribe(data => {
      if (data.successful) {
        this.getGrades();
        this.msjResponse = 'Eliminado correctamente';
        this.successful = true;
      }else {
        this.msjResponse = data.message;
        this.successful = false;
      }
    });
    this.modalOk.showModal();
    this.msjResponse = "";
  }

  getGrades(){
    this.gradeService.getAll(this.filterSearch, this.page, this.size)
      .subscribe(response => {
        if(response.successful){
          this.grades = response.data.list;
        } else {
          this.grades = []
        }
      });
  }

  getPage(event:any){
    this.page = event;
    this.getGrades();
  }

  getSize(event:any){
    this.size = event;
    this.getGrades();
  }
}
