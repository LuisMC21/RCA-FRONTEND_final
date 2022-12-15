import { Component, OnInit, ViewChild } from '@angular/core';
import { IApiResponse } from 'src/app/core/interfaces/apiResonse.interface';
import { IResponse } from 'src/app/core/interfaces/response';
import { ModalComponent } from 'src/app/shared/components/modals/modal/modal.component';
import { PaginationService } from '../../commons/services/pagination.service';
import { ParentService } from '../../commons/services/parent.service';
import { IParent } from '../../interfaces/parent';

@Component({
  selector: 'app-admin-parent',
  templateUrl: './admin-parent.view.html',
  styleUrls: ['./admin-parent.view.scss']
})
export class AdminParentView implements OnInit {

  parents:IParent[]=[]
  apiResponse!: IApiResponse;
  response!:IResponse;
  msjResponse:string='';
  paginationData = 'parent'
  successful: boolean=false;

  @ViewChild('modalOk') modalOk!:ModalComponent;

  tableName = "Apoderado"
  constructor(private parentService:ParentService, private pagination:PaginationService) { }

  ngOnInit(): void {
    let page = this.pagination.getPage(this.paginationData);
    let size = this.pagination.getSize(this.paginationData);
    this.parentService.getAll('', page,size)
    .subscribe(response =>{
      this.parents = response.data.list;
      console.log("Apoderados:"+ response.data.list)
    });
  }

  //BUSCAR
  search(nom:string){
    let page = this.pagination.getPage(this.paginationData);
    let size = this.pagination.getSize(this.paginationData);
    this.parentService.getAll(nom,page,size).subscribe(response =>{
      this.parents = response.data.list;
    })
  }

  // AGREGAR - ACTUALIZAR
  save(parent:IParent){
    if(parent.identi==null){
      this.parentService.add(parent).subscribe(data =>{
        console.log(data.msj)
        if(data.msj==='OK'){
          this.msjResponse = 'Agregado correctamente';
          this.successful = true;
        }else{
          this.msjResponse = 'Ha ocurrido un error :(';
          this.successful = false;
        }
      });
    }else{
      this.parentService.update(parent).subscribe(data =>{
        if(data.msj === 'OK'){
          this.msjResponse = 'Cambios actualizados con éxito';
          this.successful = true;
        }else{
          this.msjResponse = 'Ha ocurrido un error :(';
          this.successful = false;
        }
      })
    }
    this.modalOk.showModal();
  }

  //ELIMINAR 
  delete(id:string){
    this.parentService.delete(id).subscribe(data =>{
      if(data.msj==='OK'){
        this.msjResponse = 'Eliminado correctamente';
        this.successful = true;
      }
    });
    this.modalOk.showModal();
  }

 refresh(): void { window.location.reload(); }

}
