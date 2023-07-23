import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from 'src/app/shared/components/modals/modal/modal.component';
import { AnioLectivoService } from '../../commons/services/anio-lectivo.service';
import { PaginationService } from '../../commons/services/pagination.service';
import { IAnioLectivo } from '../../interfaces/anio-lectivo';

@Component({
  selector: 'app-admin-aniolectivo',
  templateUrl: './admin-aniolectivo.component.html',
  styleUrls: ['./admin-aniolectivo.component.scss']
})
export class AdminAniolectivoComponent implements OnInit {

  anio: IAnioLectivo[] = [];

  tableName: string = 'Año lectivo';
  paginationData = 'anio'
  msjResponse: string = '';
  successful!: boolean;
  page = this.pagination.getPage(this.paginationData);
  size = this.pagination.getSize(this.paginationData);
  @ViewChild('modalOk') modalOk!: ModalComponent;
  constructor(

    private anioService: AnioLectivoService,
    private pagination: PaginationService,
  ) { }



  ngOnInit(): void {

    this.getAnios();


  }
  //BUSCAR
  search(nom: string) {
    let page = this.pagination.getPage(this.paginationData);
    let size = this.pagination.getSize(this.paginationData);
    this.anioService.getAll(nom, page, size).subscribe(response => {
      this.anio = response.data.list;
      console.log(response.data.list)
    })
  }

  // AGREGAR - ACTUALIZAR
  save(anio: IAnioLectivo) {
    console.log(anio)
    if (anio.id == null) {
      this.anioService.add(anio).subscribe(data => {
        console.log(data.message)
        if (data.successful === true) {
          this.msjResponse = 'Agregado correctamente';
          this.successful = true;
        } else {
          this.msjResponse = 'Ha ocurrido un error :(';
          this.successful = false;
        }
      });
    } else {
      this.anioService.update(anio).subscribe(data => {
        if (data.successful === true) {
          this.msjResponse = 'Cambios actualizados con éxito';
          this.successful = true;
        } else {
          this.msjResponse = 'Ha ocurrido un error :(';
          this.successful = false;
        }
      })
    }
    this.modalOk.showModal();
  }

  //ELIMINAR
  delete(id: string) {
    this.anioService.delete(id).subscribe(data => {
      if (data.successful === true) {
        this.msjResponse = 'Eliminado correctamente';
        this.successful = true;
      }
      this.successful = true;
    });
    this.modalOk.showModal();
  }

  refresh(): void { window.location.reload(); }

  getPage(event: any) {
    this.page = event;
    this.getAnios();
  }

  getSize(event: any) {
    this.size = event;
    this.getAnios();
  }

  getAnios() {
    this.anioService.getAll('', this.page, this.size)
      .subscribe(response => {
        if (response.successful) {
          this.anio = response.data.list;
        } else {
          this.anio = []
        }
      });
  }
}
