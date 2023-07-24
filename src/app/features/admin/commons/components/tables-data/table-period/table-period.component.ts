import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IPeriod } from 'src/app/features/admin/interfaces/period';
import { ModalComponent } from 'src/app/shared/components/modals/modal/modal.component';
import { PeriodService } from '../../../services/period.service';
import { IAnioLectivo } from 'src/app/features/admin/interfaces/anio-lectivo';

@Component({
  selector: 'app-table-period',
  templateUrl: './table-period.component.html',
  styleUrls: ['./table-period.component.scss']
})
export class TablePeriodComponent implements OnInit {

  @Input() periods: IPeriod[]=[];
  @Input() anios: IAnioLectivo[] = []
  @Input() tableName!: string;
  @Input() title!: string;


  @Output() idperiodo:EventEmitter<string> = new EventEmitter();
  close_modal!: boolean;


  item: IPeriod={
    id:'',
    code: '',
    name:'',
    date_start: new Date(),
    date_end: new Date(),
    anio_lectivoDTO:  { id: '', code: '', name: '' }
  }

  @Output() periodSave:EventEmitter<IPeriod> = new EventEmitter();
  @Output() periodDelete:EventEmitter<string> = new EventEmitter();
  @Output() periodSearch:EventEmitter<string> = new EventEmitter();

  head=["Code","Nombre","Fecha de Inicio","Fecha de término","Año lectivo","Acciones", "Generar Evaluaciones"]
  group!: FormGroup;

  msjResponse:string='';
  nomSearch:string='';

  @ViewChild('modalAdd') modalAdd!: ModalComponent;
  @ViewChild('modalDelete') modalDelete!: ModalComponent;

  constructor(private formBuilder:FormBuilder, private periodService:PeriodService) { }

  get fecInic(){return this.group.get('date_start')}
  get name(){return this.group.get('name')}
  get fecTer(){return this.group.get('date_end')}
  get anioElec(){return this.group.get('anio_lectivoDTO')}

  ngOnInit(): void {
    this.form();
  }

  form(item?:IPeriod):void{
    if(item){
      this.item = item;
    }
    this.group = this.formBuilder.group({
      id:[item?item.id:null],
      code:[item?item.code:''],
      name:[item?item.name:'', [Validators.required]],
      date_start:[item?item.date_start:'',[Validators.required]],
      date_end:[item?item.date_end:'',[Validators.required]],
      anio_lectivoDTO:[item?item.anio_lectivoDTO:'',[Validators.required]],
  });
}

  //BUSCAR
  search(nom:string){
    console.log(nom);
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

  reset() {
    this.group.reset();
    this.item = {
      id:'',
      code: '',
      name:'',
      date_start: new Date(),
      date_end: new Date(),
      anio_lectivoDTO:  { id: '', code: '', name: '' }
    };
  }

  ejecutarEvaluaciones(id:string) {
    this.idperiodo.emit(id);
    this.modalAdd.hiddenModal();

  }

  getCloseModal(){
    this.reset();
  }

}
