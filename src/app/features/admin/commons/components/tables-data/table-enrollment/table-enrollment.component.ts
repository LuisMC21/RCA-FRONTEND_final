import { Component, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IEnrollment } from 'src/app/features/admin/interfaces/enrollment';
import { IGradePeriod } from 'src/app/features/admin/interfaces/grade-period';
import { IParent } from 'src/app/features/admin/interfaces/parent';
import { IReportMatGrade } from 'src/app/features/admin/interfaces/reportMatGrade';
import { IStudent } from 'src/app/features/admin/interfaces/student';
import { ModalComponent } from 'src/app/shared/components/modals/modal/modal.component';
import { SearchComponent } from 'src/app/shared/components/search/search.component';
import { GradePeriodService } from '../../../services/grade-period.service';
import { ParentService } from '../../../services/parent.service';
import { AnioLectivoService } from '../../../services/anio-lectivo.service';
import { AulaService } from '../../../services/aula.service';
import { IAula } from 'src/app/features/admin/interfaces/aula';
import { IAnioLectivo } from 'src/app/features/admin/interfaces/anio-lectivo';
import { StudentService } from '../../../services/student.service';
@Component({
  selector: 'app-table-enrollment',
  templateUrl: './table-enrollment.component.html',
  styleUrls: ['./table-enrollment.component.scss']
})
export class TableEnrollmentComponent implements OnInit {
  close_modal!: boolean;

  group!:FormGroup;
  saving: boolean = false;
  filterStudent:string='';
  nomParent:string='';
  existsStudent:boolean=false;
  selectedStudent:string='';
  alumno: IStudent[] = [];
  estudiante: IStudent = {
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
    // Agrega más propiedades según la interfaz IStudent
  };
  anios:IAnioLectivo[]=[];
  sizeOption:boolean=false;
  gradoPeriodoLS:string=localStorage.getItem('gradoPeriodo')||''
  gradePeriodNom:string='';
  nomSearch:string='';
  identiParent:string='';
  identiGradoPeriodo:string='';
  identiStudent:string='';
  asignEnrrollment!:IEnrollment;

  asignStudent!: IStudent;
  head=["CÓDIGO","NOMBRE Y APELLIDOS","NÚMERO DE DOC","FECHA","AÑO LECTIVO","AULA","ACCIONES"]

  @ViewChild('searchParentModal') searchParentModal!:SearchComponent;

  @ViewChild('modalStudents') modalStudents!:ModalComponent;
  @ViewChild('modalAdd') modalAdd!: ModalComponent;
  @ViewChild('modalDelete') modalDelete!: ModalComponent;
  @ViewChild('studentSelect') studentSelect!: ElementRef;
  selectedStudentId:string='';
  @Input() aulas:IAula[]=[]
  @Input() anioL:IAnioLectivo[]=[]
  @Input() listStudents:IStudent[]=[]
  // @Input() matGrado:IReportMatGrade[]=[]
  @Input() matStudent:IEnrollment[]=[]
  @Input() title!: string;
  @Input() successful!: boolean;

  item: IEnrollment={
    id:'',
    code:'',
    date: new Date(),
    anioLectivoDTO:{
      id: '',
      code: '',
      name:''
    },
    aulaDTO:{
      id:'', code:'', gradoDTO:{
        id: '', code: '', name: ''
      }, seccionDTO:{id: '', code: '', name: ''}
    },
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
    }

  }

  titulo: string = "Agregar Matricula";
  @Output() enrollmentSave:EventEmitter<IEnrollment> = new EventEmitter();
  @Output() enrollmentDelete:EventEmitter<string> = new EventEmitter();
  @Output() studentSearch:EventEmitter<string> = new EventEmitter();

  // Reportes
  @Output() identiGradePeriodReport:EventEmitter<string> = new EventEmitter();
  @Output() identiGradePeriodReportXLS:EventEmitter<string> = new EventEmitter();


  constructor(

    private studentService:StudentService,
    private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.form();

  }



  // Matricula
  get id(){return this.group.get('id')}
  get code(){return this.group.get('codeM')}
  get date(){return this.group.get('date')}
  // Aula
  get codeAu(){return this.group.get('codeAu')}
  get grado(){return this.group.get('grado')}
  get seccion(){return this.group.get('seccion')}
  // Año lectivo
  get codeAL(){return this.group.get('codeAL')}
  get nameAL(){return this.group.get('nameAL')}

  // Alumno
  get codeStudent(){return this.group.get('codeStudent')}
  get diseases(){return this.group.get('diseases')}
  get namecon_pri(){return this.group.get('namecon_pri')}
  get telcon_pri(){return this.group.get('telcon_pri')}
  get namecon_sec(){return this.group.get('namecon_sec')}
  get telcon_sec(){return this.group.get('telcon_sec')}
  get vaccine(){return this.group.get('vaccine')}
  get type_insurance(){return this.group.get('type_insurance')}


  // USUARIO
  get idUsuario(){return this.group.get('usuarioDTO.id')}
  get codeUsuario(){return this.group.get('usuarioDTO.code')}
  get nombreUsuario(){return this.group.get('usuarioDTO.nombreUsuario')}
  get name(){return this.group.get('usuarioDTO.name')}
  get pa_surname(){return this.group.get('usuarioDTO.pa_surname')}
  get ma_surname(){return this.group.get('usuarioDTO.ma_surname')}
  get birthdate(){return this.group.get('usuarioDTO.birthdate')}
  get type_doc(){return this.group.get('usuarioDTO.type_doc')}
  get numdoc() { return this.group.get('usuarioDTO.numdoc') }
  get tel(){return this.group.get('usuarioDTO.tel')}
  get gra_inst(){return this.group.get('usuarioDTO.gra_inst')}
  get email(){return this.group.get('usuarioDTO.email')}
  get password(){return this.group.get('usuarioDTO.password')}
  get rol(){return this.group.get('usuarioDTO.rol')}
  get apoderado(){return this.group.get('apoderado')}
  get isVacunado(){return this.group.get('isVacunado')}

  isEditing: boolean = false;
  form(item?: IEnrollment) {

    if(item){
      this.item = item;
    }
    // Configurar el formulario con controles y validaciones
    this.group = this.formBuilder.group({
      // Controles del formulario para la matricula
      id: [item ? item.id : null],
      code: [item ? item.code : ''],
      date: [item ? item.date : '', [Validators.required]],

      // Controles del formulario para el alumno
      aulaDTO: [item ? item.aulaDTO : '', [Validators.required]],
      anioLectivoDTO: [item ? item.anioLectivoDTO : '', [Validators.required]],
      alumnoDTO: this.formBuilder.group({
        id: [item ? item.id : null],
        name: [item ? item.alumnoDTO.usuarioDTO.name + ' ' + item.alumnoDTO.usuarioDTO.pa_surname + ' ' + item.alumnoDTO.usuarioDTO.ma_surname : '', [Validators.required]]
      }),
      // Control oculto para almacenar el código del alumno
      });
  }

  search(name:string){
    this.studentSearch.emit(name);
    console.log(this.search)
  }


  searchStudents(value: string | undefined) {
    if (value !== undefined) {
      this.filterStudent = value;
      this.studentService.getAll(this.filterStudent, 0, 5).subscribe(response => {
        if (response.successful && response.data.list) {
          this.alumno = response.data.list;
        } else {
          this.existsStudent = true;
          this.alumno = [];
        }
      });
    }
  }


  selectStudent(student: IStudent) {
    this.selectedStudent = `${student.usuarioDTO.pa_surname} ${student.usuarioDTO.ma_surname} ${student.usuarioDTO.name}`;
    this.existsStudent = false;
    this.selectedStudentId = student.id;
    this.alumno = [];
    const alumnoDTOFormGroup = this.group.get('alumnoDTO') as FormGroup;
    alumnoDTOFormGroup.get('name')?.setValue(this.selectedStudent);
    alumnoDTOFormGroup.get('id')?.setValue(this.selectedStudentId);
    console.log(this.selectedStudentId);
  }



  assignStudent(alumnoDTO: IStudent) {
    this.nomSearch = ' ' + alumnoDTO.usuarioDTO.name + ' ' + alumnoDTO.usuarioDTO.pa_surname + ' ' + alumnoDTO.usuarioDTO.ma_surname;
    this.selectedStudentId = alumnoDTO.id; // Almacena el ID del estudiante seleccionado
    console.log(this.selectedStudentId);
  }


  save() {
    if (this.group.valid) {
     this.enrollmentSave.emit(this.group.value)
    }
    if (this.titulo == "Actualizar Alumno") {
      this.titulo = "Agregar Alumno";
    }
  }


   // ELIMINAR
  delete(id:string){
    this.enrollmentDelete.emit(id)
  }


  getSizeOption(){
    if(this.sizeOption==false){
      this.sizeOption = true;
    }else{
      this.sizeOption = false;
    }
  }
  onUpdateButtonClick(item: any) {
    this.titulo = "Actualizar Matricula";
    this.modalAdd.showModal()
    this.form(item); // Call the form() function if needed for your logic

  }

  // Function to handle when the "Add" button is clicked
  onAddButtonClick() {
    this.group.reset();
    this.titulo = "Agregar Matricula";
    // Any other logic related to the "Add" button can be added here
    this.modalAdd.showModal();
  }

  reset(){
    this.item={
      id:'',
      code:'',
      date: new Date(),
      anioLectivoDTO:{
        id: '',
        code: '',
        name:''
      },
      aulaDTO:{
        id:'', code:'', gradoDTO:{
          id: '', code: '', name: ''
        }, seccionDTO:{id: '', code: '', name: ''}
      },
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
      }

    }
    this.group.reset();
  }

  getCloseModal(){
    this.reset();
  }

   // para poder cerrar y abrirel app-modal automáticamente dependiendo de la rpt de la transacción
   ngOnChanges(changes: SimpleChanges) {
    if(this.successful){
      this.modalAdd.hiddenModal();
    }
  }

}

