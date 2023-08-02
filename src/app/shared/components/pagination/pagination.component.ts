import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { PaginationService } from 'src/app/features/admin/commons/services/pagination.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input() paginationData:string ='';
  page:number= 0;
  size:number=0;
  sizeOption:boolean=false;
  sizeOptionPage =[5,10,25,100]
  @Output() pageUpdate:EventEmitter<number> = new EventEmitter();
  @Output() sizeUpdate:EventEmitter<number> = new EventEmitter();

  constructor(private paginationService:PaginationService) { }

  ngOnInit(): void {
    this.page = this.paginationService.getPage(this.paginationData);
    this.size = this.paginationService.getSize(this.paginationData);
  }

  previousPage(){
    this.page = (this.paginationService.getPage(this.paginationData))-1
    this.pageUpdate.emit(this.page)
    this.paginationService.setPage(this.page);
  }

  nextPage(){
    this.page = (this.paginationService.getPage(this.paginationData))+1
    this.pageUpdate.emit(this.page)
    this.paginationService.setPage(this.page);
  }

  updateSize(size:number){
    this.size=size;
    this.sizeUpdate.emit(size)
    this.paginationService.setSize(size)
  }

  getSizeOption(){
    if(this.sizeOption==false){
      this.sizeOption = true;
    }else{
      this.sizeOption = false;
    }
  }
}
