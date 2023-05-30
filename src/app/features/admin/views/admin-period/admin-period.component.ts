import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from 'src/app/shared/components/modals/modal/modal.component';
import { PaginationService } from '../../commons/services/pagination.service';
import { PeriodService } from '../../commons/services/period.service';
import { IPeriod } from '../../interfaces/period';
import { IAnioLectivo } from '../../interfaces/anio-lectivo';
import { AnioLectivoService } from '../../commons/services/anio-lectivo.service';

@Component({
  selector: 'app-admin-period',
  templateUrl: './admin-period.component.html',
  styleUrls: ['./admin-period.component.scss']
})
export class AdminPeriodComponent implements OnInit {

  periods:IPeriod[]=[];
  anios:IAnioLectivo[] = [];
  tableName: string = 'Periodos';
  paginationData:string ='period';
  paginationDataAnio:string = 'anio';
  msjResponse:string='';

  @ViewChild('modalOk') modalOk!:ModalComponent;

  constructor(private periodService:PeriodService, 
              private pagination:PaginationService,
              private anioService: AnioLectivoService) { }

  ngOnInit(): void {
    let page = this.pagination.getPage(this.paginationData);
    let size = this.pagination.getSize(this.paginationData);
    this.periodService.getAll('', page,size)
    .subscribe(response =>{
      this.periods = response.data.list;
      console.log(this.periods);
    });

    let pageAnio = this.pagination.getPage(this.paginationDataAnio);
    let sizeAnio = this.pagination.getSize(this.paginationDataAnio);
    this.anioService.getAll('', pageAnio,sizeAnio)
    .subscribe(response =>{
      this.anios = response.data.list;
      console.log(this.anios);
    });
  }

   //BUSCAR
   search(nom:string){
    let page = this.pagination.getPage(this.paginationData);
    let size = this.pagination.getSize(this.paginationData);
    this.periodService.getAll(nom,page,size).subscribe(response =>{
      this.periods = response.content;
    })
  }

  // AGREGAR - ACTUALIZAR
  save(period:IPeriod){
    if(period.id==null){
      this.periodService.add(period).subscribe(data =>{
        console.log(data.message)
        if(data.message==='ok'){
          this.msjResponse = 'Agregado correctamente'
        }else{
          this.msjResponse = 'Ha ocurrido un error :('
        }
      });
    }else{
      this.periodService.update(period).subscribe(data =>{
        if(data.message === 'ok'){
          this.msjResponse = 'Cambios actualizados con éxito'
        }else{
          this.msjResponse = 'Ha ocurrido un error :('
        }
      })
    }
    this.modalOk.showModal();
  }

  //ELIMINAR 
  delete(id:string){
    this.periodService.delete(id).subscribe(data =>{
      if(data.message==='ok'){
        this.msjResponse = 'Eliminado correctamente';
      }
    });
    this.modalOk.showModal();
  }

 refresh(): void { window.location.reload(); }

}
