import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IPeriod } from 'src/app/features/admin/interfaces/period';
import { ModalComponent } from 'src/app/shared/components/modals/modal/modal.component';
import { PeriodService } from '../../../services/period.service';

@Component({
  selector: 'app-table-period',
  templateUrl: './table-period.component.html',
  styleUrls: ['./table-period.component.scss']
})
export class TablePeriodComponent implements OnInit {

  @Input() periods: IPeriod[]=[];
  @Input() tableName!: string;
  @Input() title!: string;

  @Output() periodSave:EventEmitter<IPeriod> = new EventEmitter();
  @Output() periodDelete:EventEmitter<string> = new EventEmitter();
  @Output() periodSearch:EventEmitter<string> = new EventEmitter();

  head=["Fecha de Inicio","Fecha de término","Año lectivo","Acciones"]
  group!: FormGroup;
  
  msjResponse:string='';
  nomSearch:string='';

  @ViewChild('modalAdd') modalAdd!: ModalComponent;
  @ViewChild('modalDelete') modalDelete!: ModalComponent;

  constructor(private formBuilder:FormBuilder, private periodService:PeriodService) { }

  get fecInic(){return this.group.get('fecInic')}
  get fecTer(){return this.group.get('fecTer')}
  get anioElec(){return this.group.get('anioElec')}

  ngOnInit(): void {
    this.form();
  }

  form(item?:IPeriod):void{
    this.group = this.formBuilder.group({
      identi:[item?item.code:null],
      fecInic:[item?item.date_start:'',[Validators.required]],
      fecTer:[item?item.date_end:'',[Validators.required]],
      anioElec:[item?item.anio_lectivoDTO:'',[Validators.required, Validators.minLength(4), Validators.minLength(4)]],
  });
}

  //BUSCAR
  search(nom:string){
    this.periodSearch.emit(nom);
  }

   // AGREGAR - ACTUALIZAR
   save(){
    if(this.group.valid){
     this.periodSave.emit(this.group.value)
    }
    this.modalAdd.hiddenModal();
  }

  // ELIMINAR 
  delete(id:string){
    this.periodDelete.emit(id)
    this.modalDelete.hiddenModal();
  }

  refresh(): void { window.location.reload(); }

}
