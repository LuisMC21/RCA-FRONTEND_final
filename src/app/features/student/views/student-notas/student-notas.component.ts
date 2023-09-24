import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AnioLectivoService } from 'src/app/features/admin/commons/services/anio-lectivo.service';
import { EvaluacionService } from 'src/app/features/admin/commons/services/evaluacion.service';
import { PaginationService } from 'src/app/features/admin/commons/services/pagination.service';
import { PeriodService } from 'src/app/features/admin/commons/services/period.service';
import { IAnioLectivo } from 'src/app/features/admin/interfaces/anio-lectivo';
import { IAula } from 'src/app/features/admin/interfaces/aula';
import { IEvaluacion } from 'src/app/features/admin/interfaces/evaluacion';
import { IPeriod } from 'src/app/features/admin/interfaces/period';
import { TokenService } from 'src/app/features/auth/commons/services/token.service';
import { environment } from 'src/environments/environment';

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

  paginationData = 'notas';

  msjResponse: string = '';
  successful: boolean = false;

  page = this.pagination.getPage(this.paginationData);
  size = this.pagination.getSize(this.paginationData);

  idAlumno = '';
  route = 'Notas';

  constructor(
    private pagination: PaginationService,
    private periodoService: PeriodService,
    private evaluacionService: EvaluacionService,
    private anioService: AnioLectivoService,
    private tokenService: TokenService,
    private http: HttpClient) { }

  ngOnInit(): void {

    this.idAlumno = this.tokenService.getUserId() || '';

    this.selectedPeriodId = localStorage.getItem('selectedPeriodoN') || '';
    this.selectedAnioId = localStorage.getItem('selectedAnioN') || '';

    this.anioService.getAll('',0,5).subscribe(response => {
      this.anios = response.data.list;
    })

    this.periodoService.getAll(this.selectedAnioId, 0,10).subscribe(response =>{
      this.periods = response.data.list;
    })  

    
    this.evaluacionService.getAllPeriodoAlumno('', this.page, this.size, this.selectedPeriodId, this.idAlumno).subscribe(response => {
      this.evaluaciones = response.data.list;
    })

  }

  onAnioChange(){
    const selectedOption = this.anioSelect.nativeElement.selectedOptions[0];
    this.selectedAnioId = selectedOption.value;

    this.periodoService.getAll(this.selectedAnioId, this.page, this.size).subscribe(response =>{
      this.periods = response.data.list;
    })  

    this.evaluaciones = [];
    
    localStorage.setItem('selectedAnioN', this.selectedAnioId);
    localStorage.removeItem('selectedPeriodN');
    this.selectedPeriodId = '';

  }

  onPeriodoChange() {
    const selectedOption = this.periodSelect.nativeElement.selectedOptions[0];
    this.selectedPeriodId = selectedOption.value;

    this.evaluacionService.getAllPeriodoAlumno('', this.page, this.size, this.selectedPeriodId, this.idAlumno).subscribe(response => {
      this.evaluaciones = response.data.list;
    })

    localStorage.setItem('selectedPeriodoN', this.selectedPeriodId);
  }

  getPage(event: any) {
    this.page = event;
    this.getNotas();
  }

  getSize(event: any) {
    this.size = event;
    this.getNotas();
  }

  getNotas(){
    this.evaluacionService.getAllPeriodoAlumno('', this.page, this.size, this.selectedPeriodId, this.idAlumno).subscribe(response => {
      this.evaluaciones = response.data.list;
    })
  }

  redirectToNotas(){
      const token = this.tokenService.getToken();
      const url = `http://${environment.api}/evaluacion/boletaNotas?periodo=${this.selectedPeriodId}&alumno=${this.idAlumno}`;
      
      this.http.get(url, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        responseType: 'blob' // Indicamos que esperamos una respuesta de tipo blob
      }).subscribe(
        (response) => {
          // Crear una URL del objeto Blob
          const fileURL = URL.createObjectURL(response);

          // Abrir el archivo PDF en una nueva pestaña o ventana
          window.open(fileURL);
        },
        (error) => {
          // Manejar cualquier error que ocurra durante la solicitud
          console.error(error);
        }
      );
  }

}
