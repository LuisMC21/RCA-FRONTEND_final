import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AnioLectivoService } from 'src/app/features/admin/commons/services/anio-lectivo.service';
import { EvaluacionService } from 'src/app/features/admin/commons/services/evaluacion.service';
import { PaginationService } from 'src/app/features/admin/commons/services/pagination.service';
import { PeriodService } from 'src/app/features/admin/commons/services/period.service';
import { IAnioLectivo } from 'src/app/features/admin/interfaces/anio-lectivo';
import { IAula } from 'src/app/features/admin/interfaces/aula';
import { IEvaluacion } from 'src/app/features/admin/interfaces/evaluacion';
import { IPeriod } from 'src/app/features/admin/interfaces/period';

@Component({
  selector: 'app-student-notas',
  templateUrl: './student-notas.component.html',
  styleUrls: ['./student-notas.component.scss']
})
export class StudentNotasComponent implements OnInit {

  periods: IPeriod[] = [];
  aulas: IAula[] = [];
  anios: IAnioLectivo[] = [];
  evaluaciones: IEvaluacion[] = [];

  @ViewChild('periodSelect') periodSelect!: ElementRef;
  selectedPeriodId: string = '';

  @ViewChild('anioSelect') anioSelect!: ElementRef;
  selectedAnioId: string = '';

  title!: string;
  tableName: string = 'Notas';

  paginationDataStudent = 'student';
  paginationDataPeriod = 'period';

  msjResponse: string = '';
  successful: boolean = false;

  constructor(
    private pagination: PaginationService,
    private periodoService: PeriodService,
    private evaluacionService: EvaluacionService,
    private anioService: AnioLectivoService) { }

  ngOnInit(): void {

    this.selectedPeriodId = localStorage.getItem('selectedPeriodo') || '';
    this.selectedAnioId = localStorage.getItem('selectedAnio') || '';

    this.anioService.getAll('',0,5).subscribe(response => {
      this.anios = response.data.list;
    })

    this.evaluacionService.getAll('').subscribe(response => {
      this.evaluaciones = response.data.list;
    })

  }

  onAnioChange(){
    const selectedOption = this.anioSelect.nativeElement.selectedOptions[0];
    this.selectedAnioId = selectedOption.value;

    this.periodoService.getAll(this.selectedAnioId, 0,10).subscribe(response =>{
      this.periods = response.data.list;
    })  


  }

  onPeriodoChange() {
    const selectedOption = this.periodSelect.nativeElement.selectedOptions[0];
    this.selectedPeriodId = selectedOption.value;

    /*this.evaluacionService.getAllPeriodoAulaCurso('', 0, 5, this.selectedPeriodId, '', '').subscribe(response => {
      this.evaluaciones = response.data.list;
    })
    */
    localStorage.setItem('selectedPeriodo', this.selectedPeriodId);
  }


}
