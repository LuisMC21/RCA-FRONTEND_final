import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ParentService } from '../../services/parent.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() tableName!: string;
  @Input() title!: string;
  modalAdd:boolean = false;
  
  constructor(private parentService:ParentService) { }

  ngOnInit(): void {
  }

  showModalAdd(){
    this.parentService.modalAddShow.next(true);
  }
}
