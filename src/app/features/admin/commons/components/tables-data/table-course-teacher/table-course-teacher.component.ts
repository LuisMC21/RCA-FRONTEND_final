import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IAula } from 'src/app/features/admin/interfaces/aula';
import { ICourse } from 'src/app/features/admin/interfaces/course';
import { ICourseTeacher } from 'src/app/features/admin/interfaces/course-teacher';
import { ITeacher } from 'src/app/features/admin/interfaces/teacher';
import { ModalComponent } from 'src/app/shared/components/modals/modal/modal.component';

@Component({
  selector: 'app-table-course-teacher',
  templateUrl: './table-course-teacher.component.html',
  styleUrls: ['./table-course-teacher.component.scss']
})
export class TableCourseTeacherComponent implements OnInit {

  @Input() classrooms: IAula[] = [];
  @Input() courseTeachers: ICourseTeacher[] = [];
  @Input() teachers: ITeacher[] = [];
  @Input() courses: ICourse[] = [];

  @Input() tableName!: string;
  @Input() title!: string;

  titulo:string = 'Agregar asignatura';

  item: ICourseTeacher = {
    id: '',
    code: '',
    cursoDTO: { id: '', code: '', name: '' },
    docenteDTO: {
      id: '',
      code: '',
      experience: '',
      dose: '',
      specialty: '',
      usuarioDTO: {
        id: '',
        code: '',
        nombreUsuario: '',
        name: '',
        pa_surname: '',
        ma_surname: '',
        birthdate: new Date(),
        type_doc: '',
        numdoc: '',
        tel: '',
        gra_inst: '',
        email: '',
        password: '',
        rol: ''
      }
    },
    aulaDTO: {
      id: '',
      code: '',
      gradoDTO: { id: '', code: '', name: '' },
      seccionDTO: { id: '', code: '', name: '' }
    },
    anioLectivoDTO:{
      id:'',
      code:'',
      name: ''
    }

  }

  @Output() courseTeacherSave: EventEmitter<ICourseTeacher> = new EventEmitter();
  @Output() courseTeacherDelete: EventEmitter<string> = new EventEmitter();
  @Output() courseTeacherSearch: EventEmitter<string> = new EventEmitter();

  head = ["Codigo", "Docente", "Aula", "Curso"];
  group!: FormGroup;

  msjResponse: string = '';
  nomSearch: string = '';

  @ViewChild('modalAdd') modalAdd!: ModalComponent;
  @ViewChild('modalDelete') modalDelete!: ModalComponent;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form();
  }

  form(item?: ICourseTeacher): void {
    if(item){
      this.item = item;
      this.titulo = 'Actualizar asignatura';
    }
    this.group = this.formBuilder.group({
      id: [item ? item.id : null],
      code: [item ? item.code : ''],
      aulaDTO: [item ? item.aulaDTO : '', [Validators.required]],
      docenteDTO: [item ? item.docenteDTO : '', [Validators.required]],
      cursoDTO: [item ? item.cursoDTO : '', [Validators.required]],
    });

  }

  search(name: string) {
    this.courseTeacherSearch.emit(name);
  }

  // AGREGAR - ACTUALIZAR
  save() {
    if (this.group.valid) {
      this.courseTeacherSave.emit(this.group.value)
    }
    this.modalAdd.hiddenModal();
    if(this.titulo=="Actualizar Asignatura"){
      this.titulo = "Agregar Docente";
    }
  }

  // ELIMINAR 
  delete(id: string) {
    this.courseTeacherDelete.emit(id)
    this.modalDelete.hiddenModal();
  }


  refresh(): void { window.location.reload(); }

  reset() {
    this.item={
      id: '',
      code: '',
      cursoDTO: { id: '', code: '', name: '' },
      docenteDTO: {
        id: '',
        code: '',
        experience: '',
        dose: '',
        specialty: '',
        usuarioDTO: {
          id: '',
          code: '',
          nombreUsuario: '',
          name: '',
          pa_surname: '',
          ma_surname: '',
          birthdate: new Date(),
          type_doc: '',
          numdoc: '',
          tel: '',
          gra_inst: '',
          email: '',
          password: '',
          rol: ''
        }
      },
      aulaDTO: {
        id: '',
        code: '',
        gradoDTO: { id: '', code: '', name: '' },
        seccionDTO: { id: '', code: '', name: '' }
      },
      anioLectivoDTO:{
        id:'',
        code:'',
        name: ''
      }
    }
    this.group.reset();
    if(this.titulo=="Actualizar Asignatura"){
      this.titulo = "Agregar Docente";
    }
  }

}
