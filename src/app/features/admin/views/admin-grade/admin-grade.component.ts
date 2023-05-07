import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from 'src/app/shared/components/modals/modal/modal.component';
import { GradeService } from '../../commons/services/grade.service';
import { PaginationService } from '../../commons/services/pagination.service';
import { IGrade } from '../../interfaces/grade';

@Component({
  selector: 'app-admin-grade',
  templateUrl: './admin-grade.component.html',
  styleUrls: ['./admin-grade.component.scss']
})
export class AdminGradeComponent implements OnInit {

  grades:IGrade[]=[];
  tableName: string = 'Grados';
  paginationData = 'grade'
  msjResponse:string ='';
  successful: boolean=false;
  
  @ViewChild('modalOk') modalOk!:ModalComponent;

  constructor(private gradeService:GradeService, private pagination:PaginationService) { }

  ngOnInit(): void {
    let page = this.pagination.getPage(this.paginationData);
    let size = this.pagination.getSize(this.paginationData);
    this.gradeService.getAll('', page,size)
    .subscribe(response =>{
      this.grades = response.data.list;
    
    });
  }

  
  //BUSCAR
  search(nom:string){
    let page = this.pagination.getPage(this.paginationData);
    let size = this.pagination.getSize(this.paginationData);
    this.gradeService.getAll(nom,page,size).subscribe(response =>{
      this.grades = response.data.list;
    })
  }

  // AGREGAR - ACTUALIZAR
  save(grade:IGrade){
console.log(grade)
    if(grade.id==null){
      this.gradeService.add(grade).subscribe(data =>{
        console.log(data.message)
        if(data.successful===true){
          this.msjResponse = 'Agregado correctamente';
          this.successful=true;
        }else{
          this.msjResponse = 'Ha ocurrido un error :(';
          this.successful=false;
        }
      });
    }else{
      this.gradeService.update(grade).subscribe(data =>{
        if(data.successful=== true){
          this.msjResponse = 'Cambios actualizados con éxito';
          this.successful=true;
        }else{
          this.msjResponse = 'Ha ocurrido un error :v';
          this.successful=false;
        }
      })
    }
    this.modalOk.showModal();
  }

  //ELIMINAR 
  delete(id:string){
    this.gradeService.delete(id).subscribe(data =>{
      
      if(data.successful===true){
        this.msjResponse = 'Eliminado correctamente';
        this.successful===true;
      }
    });
    this.modalOk.showModal();
  }

 refresh(): void { window.location.reload(); }

}
