import { Component, OnInit, ViewChild } from '@angular/core';
import { IApiResponse } from 'src/app/core/interfaces/apiResonse.interface';
import { ParentService } from '../../commons/services/parent.service';
import { IParent } from '../../interfaces/parent';
import { ModalResponseComponent } from 'src/app/shared/components/modals/modal-response/modal-response.component';

@Component({
  selector: 'app-admin-parent',
  templateUrl: './admin-parent.view.html',
  styleUrls: ['./admin-parent.view.scss']
})
export class AdminParentView implements OnInit {

  parents: IParent[] = []
  apiResponse!: IApiResponse;
  // response!:IResponse;
  msjResponse: string = '';
  paginationData = 'parent'
  successful: boolean = false;
  filterSearch = "";
  page = 0;
  size = 10;
  @ViewChild('modalOk') modalOk!: ModalResponseComponent;

  tableName = "Apoderado"
  constructor(private parentService: ParentService) {

  }

  ngOnInit(): void {
    this.getParents();
  }

  //BUSCAR
  search(filter: string) {
    this.filterSearch = filter;
    this.getParents();
  }

  // AGREGAR - ACTUALIZAR
  save(parent: IParent) {
    console.log(parent)
    if (parent.id == null) {
      this.parentService.add(parent).subscribe(data => {
        if (data.successful) {
          this.getParents();
          this.msjResponse = 'Agregado correctamente';
          this.successful = true;
        } else {
          this.msjResponse = data.message;
          this.successful = false;
        }
      });
    } else {
      this.parentService.update(parent).subscribe(data => {
        if (data.successful) {
          this.getParents();
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
    this.parentService.delete(id).subscribe(data => {
      if (data.successful) {
        this.getParents();
        this.msjResponse = 'Eliminado correctamente';
        this.successful === true;
      } else {
        this.msjResponse = data.message;
        this.successful = false;
      }
    });
    this.modalOk.showModal();
    this.msjResponse = "";
  }

  getParents() {
    this.parentService.getAll(this.filterSearch, this.page, this.size)
      .subscribe(response => {
        if (response.successful) {
          this.parents = response.data.list;
        } else {
          this.parents = [];
        }
      })
  }
  getPage(event: any) {
    this.page = event;
    this.getParents();
  }
  getSize(event: any) {
    this.size = event;
    this.getParents();
  }
}
