import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IAula } from '../../interfaces/aula';
import { AulaService } from '../../commons/services/aula.service';
import { PaginationService } from '../../commons/services/pagination.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IAnioLectivo } from '../../interfaces/anio-lectivo';
import { AnioLectivoService } from '../../commons/services/anio-lectivo.service';

@Component({
  selector: 'app-admin-report-matricula',
  templateUrl: './admin-report-matricula.component.html',
  styleUrls: ['./admin-report-matricula.component.scss']
})
export class AdminReportMatriculaComponent implements OnInit {

  classrooms: IAula[] = [];
  anios: IAnioLectivo[] = [];
  paginationData = 'classroom';
  paginationDataP = 'anio'
  group!: FormGroup;

  opciones = ['Alumnos matriculados por aula', 'Apoderados por aula']
  selectedOption: string = this.opciones[0];
  aula: string = '';
  periodo: string = '';

  @ViewChild('classroomSelect') classroomSelect!: ElementRef;
  selectedClassroomId: string = '';

  @ViewChild('anioSelect') anioSelect!: ElementRef;
  selectedAnioId: string = '';


  constructor(private classroomService: AulaService, private pagination: PaginationService,
    private formBuilder: FormBuilder, private anioService: AnioLectivoService) { }

  ngOnInit(): void {
    this.form();

    let page = this.pagination.getPage(this.paginationData);
    let size = this.pagination.getSize(this.paginationData);
    this.classroomService.getAll('', page, size)
      .subscribe(response => {
        this.classrooms = response.data.list;
        console.log(this.classrooms);
      });

    let pageP = this.pagination.getPage(this.paginationDataP);
    let sizeP = this.pagination.getSize(this.paginationDataP);
    this.anioService.getAll('', pageP, sizeP)
      .subscribe(response => {
        this.anios = response.data.list;
        console.log(this.anios);
      });
  }

  form(): void {

    this.group = this.formBuilder.group({
      aulaDTO: ['', [Validators.required]],
      periodoDTO: ['', [Validators.required]]
    });

  }

  onChangeSelect() {
    console.log(this.selectedOption);
  }

  onClassroomChange() {
    const selectedOption = this.classroomSelect.nativeElement.selectedOptions[0];
    this.selectedClassroomId = selectedOption.value;
  }

  onAnioChange() {
    const selectedOption = this.anioSelect.nativeElement.selectedOptions[0];
    this.selectedAnioId = selectedOption.value;
  }

  redirectToMatriculaAula() {
    if (this.selectedOption == this.opciones[0]) {
      const url = `http://localhost:8080/matricula/alumnosAula?uniqueIdentifierAula=${this.selectedClassroomId}&uniqueIdentifierAnio=${this.selectedAnioId}`;
      window.location.href = url;
    }

    if(this.selectedOption == this.opciones[1]){
      const url = `http://localhost:8080/aula/exportApoderados?id_aula=${this.selectedClassroomId}&id_aniolectivo=${this.selectedAnioId}`;
      window.location.href = url;
    }
  }
}

