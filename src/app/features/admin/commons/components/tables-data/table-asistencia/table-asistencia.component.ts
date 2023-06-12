import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IAnioLectivo } from 'src/app/features/admin/interfaces/anio-lectivo';
import { IAsistencia } from 'src/app/features/admin/interfaces/asistencia';
import { IAula } from 'src/app/features/admin/interfaces/aula';
import { IClase } from 'src/app/features/admin/interfaces/clase';
import { ICourse } from 'src/app/features/admin/interfaces/course';
import { IPeriod } from 'src/app/features/admin/interfaces/period';
import { IStudent } from 'src/app/features/admin/interfaces/student';
import { ITeacher } from 'src/app/features/admin/interfaces/teacher';
import { ModalComponent } from 'src/app/shared/components/modals/modal/modal.component';


@Component({
  selector: 'app-table-asistencia',
  templateUrl: './table-asistencia.component.html',
  styleUrls: ['./table-asistencia.component.scss']
})
export class TableAsistenciaComponent implements OnInit {


@Input() asistencia:IAsistencia[]=[]
@Input() teachers:ITeacher[]=[];
@Input() students:IStudent[]=[];
@Input() periodos: IPeriod[] = [];
@Input() classrooms: IAula[] = [];
@Input() courses: ICourse[] = [];

@Input() anios: IAnioLectivo[] = [];
@Input() clase:IClase[]=[];
@Input() tableName!: string;
@Input() title!: string;

item: IAsistencia = {
id:'', code:'',state:'',
alumnoDTO:{
  id:'',code:'', diseases:'',namecon_pri:'',telcon_pri:'', namecon_sec:'',telcon_sec:'',vaccine:'',type_insurance:'',
  apoderadoDTO:{
    id:'', code:'', name:'', pa_surname:'',ma_surname:'',birthdate:new Date(), type_doc:'', numdoc:'', email:'', tel:''
  },
  usuarioDTO:{
    id:'',
    code:'',
    nombreUsuario:'',
    name:'',
    pa_surname:'',
    ma_surname:'',
    birthdate: new Date(),
    type_doc:'',
    numdoc:'',
    tel:'',
    gra_inst:'',
    email:'',
    password:'',
    rol:''
  }

},
claseDTO:{
    id:'',code:'',date: new Date(), name:'',
    periodoDTO:{
      id:'', code:'', name:'', date_start: new Date(),date_end:new Date(),
      anio_lectivoDTO:{
        id:'',code:'', name:''
      }
    },
  docentexcursoDTO:{
    id:'',code:'',
    docenteDTO:{
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
    cursoDTO:{
      id: '', code: '', name: ''
    },
    aulaDTO:{
      id: '',
      code: '',
      gradoDTO: { id: '', code: '', name: '' },
      seccionDTO: { id: '', code: '', name: '' }
    },
    anioLectivoDTO:{
      id:'',code:'',name:''
    }
  }
}
}


@Output() asistenciaSave:EventEmitter<IAsistencia> = new EventEmitter();
@Output() asistenciaDelete:EventEmitter<string> = new EventEmitter();
@Output() asistenciaSearch:EventEmitter<string> = new EventEmitter();
@Output() aulaSearch:EventEmitter<IAula> = new EventEmitter();
@Output() filtrarAsistencias: EventEmitter<{ periodo: string, aula: string, curso: string }> = new EventEmitter();


@ViewChild('modalAdd') modalAdd!: ModalComponent;
@ViewChild('modalDelete') modalDelete!: ModalComponent;


head=["Código","Alumno","Estado","Acciones"]
group!: FormGroup;
optionsEst = [{title:"PRESENTE",value:'01'},{title:"AUSENTE",value:'02'}]


msjResponse:string='';
nomSearch:string='';

  constructor(private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.form();
    
  }

  get id(){return this.group.get('id')}
  get code(){return this.group.get('code')}
  get state(){return this.group.get('estado')}
  // get alumnoDTO(){return this.group.get('alumnoDTO')}
  // get claseDTO(){return this.group.get('claseDTO')}
  // get periodoDTO(){return this.group.get('periodoDTO')}
  // get aulaDTO(){return this.group.get('aulaDTO')}
  // get cursoDTO(){return this.group.get('cursoDTO')}
  // get aulaId(){return this.group.get('aulaId')}
  // get aulaCode(){return this.group.get('aulaCode')}
  // get gradoDTO(){return this.group.get('gradoDTO')}
  // get seccionDTO(){return this.group.get('seccionDTO')}
  
  form(item?: IAsistencia): void {
    if(item){
      this.item = item;
    }
    this.group = this.formBuilder.group({
      id: [item ? item.id : null],
      code: [item ? item.code : ''],
      state: [item ? item.state : ''],
      alumnoDTO: [item ? item.alumnoDTO : ''],
      claseDTO: [item ? item.claseDTO : ''],
      periodoDTO: [item? item.claseDTO.periodoDTO:''],
      aulaDTO:[item? item.claseDTO.docentexcursoDTO.aulaDTO:''],
      cursoDTO: [item? item.claseDTO.docentexcursoDTO.cursoDTO:'']
    });
  }


//FILTRAR
filtrar(periodo: string, aula: string, curso: string): void {
    this.filtrarAsistencias.emit({ periodo, aula, curso });
}


//BUSCAR
search(name:string){
  this.asistenciaSearch.emit(name);
  
}
// AGREGAR - ACTUALIZAR
save(){
  if(this.group.valid){
  this.asistenciaSave.emit(this.group.value)
  }
  this.modalAdd.hiddenModal();
}

// ELIMINAR 
delete(id:string){
  this.asistenciaDelete.emit(id)
  this.modalDelete.hiddenModal();
}
}
