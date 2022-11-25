import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { NewsService } from 'src/app/core/services/news.service';
import { ModalComponent } from 'src/app/shared/components/modals/modal/modal.component';
import { PaginationService } from '../../commons/services/pagination.service';
import { INews } from '../../interfaces/news';

@Component({
  selector: 'app-admin-news',
  templateUrl: './admin-news.view.html',
  styleUrls: ['./admin-news.view.scss']
})
export class AdminNewsView implements OnInit {

  constructor(private newsService:NewsService, private pagination:PaginationService) { }

  news:INews[]=[];
  tableName:string ='Noticias'
  paginationData:string='noticias'
  msjResponse:string='';
  successful:boolean=false;
  Imgfile:any;
  nomImg:string ='';

  @ViewChild('modalOk') modalOk!:ModalComponent;

  ngOnInit(): void {
  }
  search(nom:string){
    let page = this.pagination.getPage(this.paginationData);
    let size = this.pagination.getSize(this.paginationData);
    this.newsService.get(nom,page,size).subscribe(response =>{
      this.news = response.content;
    })
  }

  // AGREGAR - ACTUALIZAR
  save(noticia:INews){
    if(noticia.identi==null){
      const formularioImg = new FormData();
  formularioImg.append('multipartFile',this.Imgfile)

  //Agregar imagen
  this.newsService.addImg(formularioImg).subscribe(response =>{
    this.nomImg = response.nom;
    //Agregar noticia
  this.newsService.add(noticia,this.nomImg).subscribe(data=>{
    console.log(data.msj)
    if(data.msj==='OK'){
      this.msjResponse = 'Agregado correctamente';
      this.successful=true;
    }else{
      this.msjResponse = 'Ha ocurrido un error :(';
      this.successful=false;
    }
  })
  })
    }else{
      this.newsService.update(noticia).subscribe(data =>{
        if(data.msj === 'OK'){
          this.msjResponse = 'Cambios actualizados con éxito';
          this.successful=true;
        }else{
          this.msjResponse = 'Ha ocurrido un error :(';
          this.successful=false;
        }
      })
    }
    this.modalOk.showModal();
  }

  //ELIMINAR 
  delete(id:string){
    this.newsService.delete(id).subscribe(data =>{
      if(data.msj==='OK'){
        this.msjResponse = 'Eliminado correctamente';
        this.successful=true;
      }
    });
    this.modalOk.showModal();
  }

  //IMAGEN
captureFile(event: any):string{
  this.Imgfile = event.target.files[0];
  return this.Imgfile;
}

 refresh(): void { window.location.reload(); }

}
