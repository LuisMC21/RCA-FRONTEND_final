import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from 'src/app/shared/components/modals/modal/modal.component';
import { PaginationService } from '../../commons/services/pagination.service';
import { PeriodService } from '../../commons/services/period.service';
import { IPeriod } from '../../interfaces/period';

@Component({
  selector: 'app-admin-period',
  templateUrl: './admin-period.component.html',
  styleUrls: ['./admin-period.component.scss']
})
export class AdminPeriodComponent implements OnInit {

  periods:IPeriod[]=[];
  tableName: string = 'Periodos';
  paginationData:string ='period';
  msjResponse:string='';

  @ViewChild('modalOk') modalOk!:ModalComponent;

  constructor(private periodService:PeriodService, private pagination:PaginationService) { }

  ngOnInit(): void {
    let page = this.pagination.getPage(this.paginationData);
    let size = this.pagination.getSize(this.paginationData);
    this.periodService.getAll('', page,size)
    .subscribe(response =>{
      this.periods = response.data.list;
      console.log("Periodo" + response.data.list);
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
  save(course:IPeriod){
    if(course.code==null){
      this.periodService.add(course).subscribe(data =>{
        console.log(data.msj)
        if(data.msj==='OK'){
          this.msjResponse = 'Agregado correctamente'
        }else{
          this.msjResponse = 'Ha ocurrido un error :('
        }
      });
    }else{
      this.periodService.update(course).subscribe(data =>{
        if(data.msj === 'OK'){
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
      if(data.msj==='OK'){
        this.msjResponse = 'Eliminado correctamente';
      }
    });
    this.modalOk.showModal();
  }

 refresh(): void { window.location.reload(); }

}
