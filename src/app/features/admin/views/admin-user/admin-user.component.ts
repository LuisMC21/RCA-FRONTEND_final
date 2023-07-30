import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalResponseComponent } from 'src/app/shared/components/modals/modal-response/modal-response.component';
import { IUser } from '../../interfaces/user';
import { UsuarioService } from '../../commons/services/usuario.service';
import { PaginationService } from '../../commons/services/pagination.service';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.scss']
})
export class AdminUserComponent implements OnInit {

  tableName = "Administrador"
  users: IUser[] = [];
  paginationData: string = 'teacher';
  msjResponse: string = '';
  filterSearch = "";
  successful!: boolean;
  totalTeachers: number = 0;

  page = 0;
  size = 10;
  @ViewChild('modalOk') modalOk!: ModalResponseComponent;

  constructor(private usuarioService: UsuarioService, private paginationService: PaginationService) { }

  ngOnInit(): void {
    this.getTeachers();

    /*this.teacherService.getTeacherCount('')
      .subscribe(count => {
        this.totalTeachers = count;
      });*/
  }

  //BUSCAR
  search(filter: string) {
    this.filterSearch = filter;
    this.getTeachers();
  }

  // AGREGAR - ACTUALIZAR
  save(teacher: IUser) {
    if (teacher.id == null) {
      this.usuarioService.add(teacher).subscribe(data => {
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
      this.usuarioService.update(teacher).subscribe(data => {
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
    this.msjResponse = "";
  }

  //ELIMINAR
  delete(id: string) {
    this.usuarioService.delete(id).subscribe(data => {
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
    this.msjResponse = "";
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
    this.usuarioService.getAll(this.filterSearch, this.page, this.size)
      .subscribe(response => {
        if (response.successful) {
          this.users = response.data.list;
        } else {
          this.users = []
        }
      });
  }

}
