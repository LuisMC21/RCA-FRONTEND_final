import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AsistenciaService } from 'src/app/features/admin/commons/services/asistencia.service';
import { IAsistencia } from 'src/app/features/admin/interfaces/asistencia';
import { IClase } from 'src/app/features/admin/interfaces/clase';
import { ICourseTeacher } from 'src/app/features/admin/interfaces/course-teacher';
import { IPeriod } from 'src/app/features/admin/interfaces/period';
import { AdminAsistenciaComponent } from 'src/app/features/admin/views/admin-asistencia/admin-asistencia.component';
import { TeacherAsistenciaComponent } from 'src/app/features/teacher/views/teacher-asistencia/teacher-asistencia.component';
import { ModalComponent } from 'src/app/shared/components/modals/modal/modal.component';

@Component({
  selector: 'app-table-clase',
  templateUrl: './table-clase.component.html',
  styleUrls: ['./table-clase.component.scss']
})
export class TableClaseComponent implements OnInit {

  @Input() clases: IClase[] = [];
  @Input() tableName!: string;
  @Input() title!: string;
  @Input() periodo!: IPeriod;
  @Input() courseTeacher!: ICourseTeacher

  asistencias: IAsistencia[] = [];

  tableNameA = 'Asistencias'

  item?: IClase;

  @Output() claseSave: EventEmitter<IClase> = new EventEmitter();
  @Output() claseDelete: EventEmitter<string> = new EventEmitter();
  @Output() claseSearch: EventEmitter<string> = new EventEmitter();

  titulo = 'Agregar Clase';

  head = ["Codigo", "Título", "Fecha","Editar", "Asistencias"];
  group!: FormGroup;

  msjResponse: string = '';
  successful: boolean = false;
  nomSearch: string = '';
  close_modal!: boolean;

  paginationData = 'grade';

  @ViewChild('modalAdd') modalAdd!: ModalComponent;
  @ViewChild('modalDelete') modalDelete!: ModalComponent;
  @ViewChild('modalAsistencias') modalAsistencias!: ModalComponent;

  @ViewChild(TeacherAsistenciaComponent) asistenciaModal!: AdminAsistenciaComponent;

  constructor(private formBuilder: FormBuilder, private asistenciaService: AsistenciaService) { }

  ngOnInit(): void {
    this.form();
  }

  form(item?: IClase): void {
    if (item) {
      this.item = item;
    }

    this.group = this.formBuilder.group({
      id: [item ? item.id : null],
      code: [item ? item.code : ''],
      date: [item ? item.date:null, Validators.required],
      name:[item?item.name:'', Validators.required],
      docentexCursoDTO: [item?item.docentexcursoDTO:null],
      periodoDTO:[item?item.periodoDTO:null]

    });
  }

  search(name: string) {
    this.claseSearch.emit(name);
  }

  // AGREGAR - ACTUALIZAR
  save() {
    if (this.group.valid) {
      this.group.get("periodoDTO")?.setValue(this.periodo);
      this.group.get("docentexCursoDTO")?.setValue(this.courseTeacher);
      this.claseSave.emit(this.group.value)
    }
    if (this.titulo = 'Actualizar Evaluación') {
      this.titulo = 'Agregar Evaluación';
    }
  }

  saveAsistencia(IAsistencia: IAsistencia){
    this.asistenciaModal.save(IAsistencia);
  }

  // ELIMINAR
  delete(id: string) {
    this.claseDelete.emit(id)
    this.modalDelete.hiddenModal();
  }

  refresh(): void { window.location.reload(); }

  reset() {
    if (this.titulo = 'Actualizar Evaluación') {
      this.titulo = 'Agregar Evaluación';
    }
    this.group.reset();
  }

  openAsistencias(id:string){
    this.obtenerAsistencias(id);
    this.modalAsistencias.showModal();
  }

  async obtenerAsistencias(id:string){
    try {
      const response = await this.asistenciaService.getAllByClase('', id,0,5).toPromise();
      if(response && response.data && response.data.list){
        this.asistencias = response.data.list;
      }
    } catch (error) {

    }
  }

  getCloseModal(){
    this.group.reset();
  }

}
