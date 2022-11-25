import { Component, Input, OnInit } from '@angular/core'
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
  
  
  constructor(private paginationService:PaginationService) { }
  
  ngOnInit(): void {
    this.page = this.paginationService.getPage(this.paginationData); 
    this.size = this.paginationService.getSize(this.paginationData);
  }

  previousPage(){
    this.page = (this.paginationService.getPage(this.paginationData))-1 
    this.paginationService.setPage(this.paginationData,this.page);
    this.refresh()
  }

  nextPage(){
    this.page = (this.paginationService.getPage(this.paginationData))+1 
    this.paginationService.setPage(this.paginationData,this.page);
    this.refresh()
  }

  updateSize(size:number){
    console.log(size)
    this.paginationService.setSize(this.paginationData,size)
    this.refresh();
  }

  getSizeOption(){
    if(this.sizeOption==false){
      this.sizeOption = true;
    }else{
      this.sizeOption = false;
    }
  }

  refresh(){
    window.location.reload();
  }

}
