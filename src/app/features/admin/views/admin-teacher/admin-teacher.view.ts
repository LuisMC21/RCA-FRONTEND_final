import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from 'src/app/shared/components/modals/modal/modal.component';
import { PaginationService } from '../../commons/services/pagination.service';
import { TeacherService } from '../../commons/services/teacher.service';
import { ITeacher } from '../../interfaces/teacher';
import { IAnioLectivo } from '../../interfaces/anio-lectivo';

@Component({
  selector: 'app-admin-teacher',
  templateUrl:

    './admin-teacher.view.html',
  styleUrls: ['./admin-teacher.view.scss']
})
export class AdminTeacherView implements OnInit {

  tableName = "Docente"
  teachers: ITeacher[] = [];
  anios: IAnioLectivo[] = [];
  paginationData: string = 'teacher';
  msjResponse: string = '';
  filterSearch = "";
  successful!: boolean;
  totalTeachers: number = 0;
  @ViewChild('modalOk') modalOk!: ModalComponent;

  page = 0;
  size = 10;

  cardMenu = [
    { title: "Matenimiento", image: "bi bi-gear-wide-connected" },
    { title: "Operaciones", image: "bi bi-file-earmark-text" },
    { title: "Consultas", image: "bi bi-plus-circle" },
  ]
  constructor(private teacherService: TeacherService) { }

  ngOnInit(): void {
    this.getTeachers();

    this.teacherService.getTeacherCount('')
      .subscribe(count => {
        this.totalTeachers = count;
      });
  }
  //BUSCAR
  search(filter: string) {
    this.filterSearch = filter;
    this.getTeachers();
  }

  // AGREGAR - ACTUALIZAR
  save(teacher: ITeacher) {
    if (teacher.id == null) {
      this.teacherService.add(teacher).subscribe(data => {
        if (data.successful) {
          this.getTeachers();
          this.msjResponse = 'Agregado correctamente';
          this.successful = true;
        } else {
          this.msjResponse = 'Error, el docente ya existe';
          this.successful = false;
        }
      });
    } else {
      this.teacherService.update(teacher).subscribe(data => {
        if (data.successful) {
          this.getTeachers();
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
    this.teacherService.delete(id).subscribe(data => {
      if (data.successful) {
        this.getTeachers();
        this.msjResponse = 'Eliminado correctamente';
        this.successful = true;
      } else {
        this.msjResponse = data.message;
        this.successful = false;
      }
    });
    this.modalOk.showModal();
  }

  getPage(event: any) {
    this.page = event;
    this.getTeachers();
  }

  getSize(event: any) {
    this.size = event;
    this.getTeachers();
  }

  getTeachers() {
    this.teacherService.getAll(this.filterSearch, this.page, this.size)
      .subscribe(response => {
        if (response.successful) {
          this.teachers = response.data.list;
        } else {
          this.teachers = []
        }
      });
  }

}
