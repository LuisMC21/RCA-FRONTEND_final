import { Component, OnInit, ViewChild } from '@angular/core';
import { AnioLectivoService } from '../../commons/services/anio-lectivo.service';
import { IAnioLectivo } from '../../interfaces/anio-lectivo';
import { ModalResponseComponent } from 'src/app/shared/components/modals/modal-response/modal-response.component';

@Component({
  selector: 'app-admin-aniolectivo',
  templateUrl: './admin-aniolectivo.component.html',
  styleUrls: ['./admin-aniolectivo.component.scss']
})
export class AdminAniolectivoComponent implements OnInit {

  anio: IAnioLectivo[] = [];

  tableName: string = 'Año lectivo';
  paginationData = 'anio'
  filterSearch = "";
  msjResponse: string = '';
  successful!: boolean;
  page =  0;
  size = 10;
  @ViewChild('modalOk') modalOk!: ModalResponseComponent;
  constructor(

    private anioService: AnioLectivoService,
  ) { }

  ngOnInit(): void {
    this.getAnios();
  }
  //BUSCAR
  search(filter: string) {
    this.filterSearch = filter;
    this.getAnios();
  }

  // AGREGAR - ACTUALIZAR
  save(anio: IAnioLectivo) {
    if (anio.id == null) {
      this.anioService.add(anio).subscribe(data => {
        if (data.successful) {
          this.getAnios();
          this.msjResponse = 'Agregado correctamente';
          this.successful = true;
        } else {
          this.msjResponse = data.message;
          this.successful = false;
        }
      });
    } else {
      this.anioService.update(anio).subscribe(data => {
        if (data.successful) {
          this.getAnios();
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
    this.anioService.delete(id).subscribe(data => {
      if (data.successful) {
        this.getAnios();
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
    this.getAnios();
  }

  getSize(event: any) {
    this.size = event;
    this.getAnios();
  }

  getAnios() {
    this.anioService.getAll(this.filterSearch, this.page, this.size)
      .subscribe(response => {
        if (response.successful) {
          this.anio = response.data.list;
        } else {
          this.anio = []
        }
      });
  }
}
