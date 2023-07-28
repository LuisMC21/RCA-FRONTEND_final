import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { NewsService } from 'src/app/features/admin/commons/services/news.service';
import { ModalComponent } from 'src/app/shared/components/modals/modal/modal.component';
import { PaginationService } from '../../commons/services/pagination.service';
import { INews } from '../../interfaces/news';
import { INewsGet } from '../../interfaces/newsGet';

@Component({
  selector: 'app-admin-news',
  templateUrl: './admin-news.view.html',
  styleUrls: ['./admin-news.view.scss']
})
export class AdminNewsView implements OnInit {

  constructor(private newsService: NewsService, private pagination: PaginationService) { }

  news: INewsGet[] = [];
  tableName: string = 'Noticias'
  paginationData: string = 'noticias'
  msjResponse: string = '';
  filterSearch = "";
  successful: boolean = false;
  Imgfile: any;
  nomImg: string = '';
  page = 0;
  size = 10
  @ViewChild('modalOk') modalOk!: ModalComponent;

  ngOnInit(): void {
    this.getNews();
  }
  search(filter: string) {
    this.filterSearch = filter;
    this.getNews();
  }

  // AGREGAR - ACTUALIZAR
  save(noticia: INews) {
    if (noticia.id == null) {
        //Agregar noticia
        this.newsService.add(noticia).subscribe(data => {
          if (data.successful) {
            this.getNews();
            this.msjResponse = 'Agregado correctamente';
            this.successful = true;
          } else {
            this.msjResponse = data.message;
            this.successful = false;
          }
      })
    } else {
      this.newsService.update(noticia).subscribe(data => {
        if (data.successful) {
          this.getNews();
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
    this.newsService.delete(id).subscribe(data => {
      console.log(data.message);
      if (data.successful) {
        this.getNews();
        this.msjResponse = 'Eliminado correctamente';
        this.successful = true;
      } else {
        this.msjResponse = data.message;
        this.successful = false;
      }
    });
    this.modalOk.showModal();
  }

  //IMAGEN
  captureFile(event: any): string {
    this.Imgfile = event.target.files[0];
    const archivo: File = event.target.files[0];

    return this.Imgfile;
  }

  getNews(){
    this.newsService.getAll(this.filterSearch, this.page, this.size)
      .subscribe(response => {
        if(response.successful){
          this.news = response.data.list;
        } else {
          this.news = [];
        }
      });
  }

}
