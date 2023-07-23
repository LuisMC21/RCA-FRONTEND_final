import { EventEmitter, Injectable, Output } from '@angular/core';
import { IPaginationStorage } from 'src/app/core/interfaces/paginationStorage';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  constructor() {
  }

  pageSelect = 0;
  sizeSelect = 10;

  pagination:IPaginationStorage[]=[
    {title:'parent',page:0,size:5},
    {title:'section',page:0,size:5},
    {title:'teacher',page:0,size:5},
    {title:'course',page:0,size:5},
    {title:'student',page:0,size:5},
    {title:'grade',page:0,size:5},
    {title:'period',page:0,size:5},
    {title:'noticias',page:0,size:5},
    {title:'image',page:0,size:5},
    {title:'anio',page:0,size:5},
    {title:'courseTeacher',page:0,size:5},
    {title:'role',page:0,size:5},
    {title:'classroom',page:0,size:5},
    {title:'evaluacion',page:0,size:5},
    {title:'clase',page:0,size:5},
    {title:'notas', page:0, size:5},
    {title:'asistenciaTc', page:0, size:5}
  ]

  getPage(paginationData: string){
    return this.pageSelect;

  }

  setPage(page:number){
     this.pageSelect =  page;
  }
  getSize(paginationData: string){
    return this.sizeSelect;
  }
  setSize(size:number){
    this.sizeSelect = size;
 }
}
