import { Component, OnInit, ViewChild } from '@angular/core';
import { ISeccion } from '../../interfaces/seccion';
import { ModalComponent } from 'src/app/shared/components/modals/modal/modal.component';
import { SeccionService } from '../../commons/services/seccion.service';
import { PaginationService } from '../../commons/services/pagination.service';
import { sanitizeIdentifier } from '@angular/compiler';

@Component({
  selector: 'app-admin-section',
  templateUrl: './admin-section.component.html',
  styleUrls: ['./admin-section.component.scss']
})
export class AdminSectionComponent implements OnInit {

  sections: ISeccion[] = [];
  tableName: string = 'Secciones';
  paginationData:string = 'grade';
  msjResponse: string = '';
  successful!: boolean;

  page = this.pagination.getPage(this.paginationData);
  size = this.pagination.getSize(this.paginationData);

  @ViewChild('modalOk') modalOk!: ModalComponent;

  constructor(private sectionService: SeccionService, private pagination: PaginationService) { }

  ngOnInit(): void {
    this.page = this.pagination.getPage(this.paginationData);
    this.size = this.pagination.getSize(this.paginationData);
    this.sectionService.getAll('', this.page, this.size)
      .subscribe(response => {
        this.sections = response.data.list;
      });
  }

  //BUSCAR
  search(name: string) {
    this.sectionService.getAll(name, this.page, this.size).subscribe(response => {
      this.sections = response.data.list;
    })
  }

  // AGREGAR - ACTUALIZAR
  save(section: ISeccion) {
    console.log(section)
    if (section.id == null) {
      this.sectionService.add(section).subscribe(data => {
        console.log(data.message)
        if (data.successful === true) {
          this.msjResponse = 'Agregado correctamente';
          this.successful = true;
        } else {
          this.msjResponse = data.message;
          this.successful = false;
        }
      });
    } else {
      this.sectionService.update(section).subscribe(data => {
        if (data.successful === true) {
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
    this.sectionService.delete(id).subscribe(data => {
      if (data.successful) {
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

}
