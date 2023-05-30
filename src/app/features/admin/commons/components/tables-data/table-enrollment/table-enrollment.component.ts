import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
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
  
  group!:FormGroup;
  saving: boolean = false;
  // studentForm!:FormGroup
  nomParent:string='';
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
  head=["NOMBRE Y APELLIDOS","NÚMERO DE DOC","FECHA","AÑO LECTIVO","AULA","ACCIONES"]

  @ViewChild('searchParentModal') searchParentModal!:SearchComponent;
  
  @ViewChild('modalStudents') modalStudents!:ModalComponent;
  @ViewChild('modalAdd') modalAdd!: ModalComponent;
  @ViewChild('modalDelete') modalDelete!: ModalComponent;

  @Input() aulas:IAula[]=[]
  @Input() anioL:IAnioLectivo[]=[]
  @Input() listStudents:IStudent[]=[]
  // @Input() matGrado:IReportMatGrade[]=[]
  @Input() matStudent:IEnrollment[]=[]
  @Input() title!: string;
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
  // classroom: IAula = {
  //   id: '',
  //   code: '',
  //   gradoDTO: { id: '', code: '', name: '' },
  //   seccionDTO: { id: '', code: '', name: '' }
  // }
  // aniosL: IAnioLectivo = {
  //   id: '',
  //   code: '',
  //   name:''
  // }


  
  titulo:string = 'Matricular';
 
  @Output() enrollmentSave:EventEmitter<IEnrollment> = new EventEmitter();
  @Output() enrollmentDelete:EventEmitter<string> = new EventEmitter();
  @Output() studentSearch:EventEmitter<string> = new EventEmitter();

  // Reportes
  @Output() identiGradePeriodReport:EventEmitter<string> = new EventEmitter();
  @Output() identiGradePeriodReportXLS:EventEmitter<string> = new EventEmitter();

  optionsDocumentType = [
    {title:"DNI",value:'01'},
    {title:"Pasaporte",value:'02'},
    {title:"RUC",value:'03'},
  ]
  optionsVac =[
    {title:'SI',value:'S'},
    {title:'NO',value:'N'}
  ]
  optionsInsuraceType= [
    {title:'ESSALUD',value:'E'},
    {title:'SIS',value:'S'},
    {title:'Privado',value:'P'},
    {title:'Fuerza Armada',value:'F'}
  ];

  constructor(

    private studentService:StudentService,
    private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.form();
    // this.gradoPeriodoLS = localStorage.getItem('gradoPeriodo')||'identi'
    
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
// APODERADO 
  // get idApoderado(){return this.group.get('apoderadoDTO.id')}
  // get codeA(){return this.group.get('apoderadoDTO.code')}
  // get nameApoderado(){return this.group.get('nameApoderado')}
  // get pa_surnameA(){return this.group.get('pa_surnameA')}
  // get ma_surnameA(){return this.group.get('ma_surnameA')}
  // get telA(){return this.group.get('telA')}

  // get fecMatri(){return this.groupEnrollment.get('fecMatri')}
  // get idGradoPeriodo(){return this.groupEnrollment.get('idGradoPeriodo')}
  // Modal
  isEditing: boolean = false;
  form(item?:IEnrollment){
    if(item){
      this.item = item;
    }
    if(item){
      this.titulo = 'Actualizar Matricula';
    }
    // if(item){
    //   this.item.aulaDTO = item?.aulaDTO
    // }
    // if(item){
    //   this.item.anioLectivoDTO = item?.anioLectivoDTO
    // }
    // this.nomParent = item?item.apoderado:'';
    
    
   
    this.group = this.formBuilder.group({
      
      id:[item?item.id:null],
      code:[item?item.code:''],
      date:[item?item.date:''],
      //  AULA
      aulaDTO:[item ? item.aulaDTO : '', [Validators.required]],
      // AÑO LECTIVO
      anioLectivoDTO:[item ? item.anioLectivoDTO : '', [Validators.required]],

      codeA:[item?item.alumnoDTO.code:'']

      // anioLectivoDTO:this.formBuilder.group({
      // id:[item?item.anioLectivoDTO.id:null],
      // code:[item?item.anioLectivoDTO.code:''],
      // name:[item?item.anioLectivoDTO.name:'']
      // }),
      // ALUMNO
      
    
      //tipDoc:[item?item.tipDoc:''],
      // fecNaci:[item?item.:'',[Validators.required]],
      // aulaGrade:[item?item.aulaDTO.gradeDTO.name:'',[Validators.required]],
      //apoderado:[''],
  
      // isVacunado: [''],
      //tipSeg: [item?item.tipSeg:'']
    });
  }

  // searchParent(name:string){
  //   this.nomParent = name;
  //   this.parentService.getAll(name,0,5).subscribe(data =>{
  
  //   })
  // }
  //BUSCAR Estudiante
  search(name:string){
    this.studentSearch.emit(name);
    console.log(this.search)
  }
  //Asignar estudiante
  asingStudent(alumnoDTO:IStudent){
    this.nomSearch= ' '+alumnoDTO.usuarioDTO.name + ' ' +alumnoDTO.usuarioDTO.pa_surname +' '+alumnoDTO.usuarioDTO.ma_surname;
    this.asignStudent = alumnoDTO;
    console.log(this.asignStudent)
  }
  obtenerAlumno(filter: string) {
    return new Promise<void>((resolve, reject) => {
      this.studentService.getOne(filter).subscribe(response => {
        this.alumno = response.data.list;
        this.estudiante = this.alumno[0];
        console.log(this.estudiante);
        resolve();
      }, error => {
        reject(error);
      });
    });
  }
  

  // obtenerAlumno(filter: string){
  // this.studentService.getOne(filter).subscribe(response =>{
  //   this.alumno=response.data.list;
  //   this.estudiante=this.alumno[0];
  //   console.log(this.estudiante)
  // });
  // }


  asignStudentForm(){
    this.form(this.asignEnrrollment);
    this.modalStudents.hiddenModal();
    console.log(this.asignStudentForm)
     // Obtén los valores ingresados en el formulario
  // const studentData = this.studentForm.value;
  
  // Utiliza los datos ingresados según sea necesario (por ejemplo, puedes imprimirlos en la consola)
  // console.log(studentData);
  
  // Resto de tu lógica o acciones necesarias
  
  // Limpia el formulario después de su uso (opcional)
  // this.studentForm.reset();
  }

  // asingParent(parent:IParent){
  //   this.nomParent = parent.pa_surname + ' ' + parent.ma_surname + ' '+parent.name;
  //   this.identiParent = parent.id;
  //   this.searchParentModal.hidden();
  // }



  async save() {
    if (this.group.valid && !this.saving) {
      try {
        this.saving = true; // Deshabilitar el guardado adicional
  
        await this.obtenerAlumno(this.group.get('codeA')?.value);
        console.log(this.alumno);
        this.group.addControl('alumnoDTO', new FormControl(this.estudiante, [Validators.required]));
        this.enrollmentSave.emit(this.group.value);
        console.log(this.group.value);
      } catch (error) {
        console.error(error);
      } finally {
        this.saving = false; // Habilitar nuevamente el guardado
      }
    }
  
    this.modalAdd.hiddenModal();
  
    if (this.titulo == "Actualizar Alumno") {
      this.titulo = "Agregar Alumno";
    }
  }
  
  // save(){
  //   if(this.group.valid){
  //   this.obtenerAlumno(this.group.get('codeA')?.value)
  //   console.log(this.alumno)
  //   this.group.addControl('alumnoDTO', new FormControl(this.estudiante, [Validators.required]));
  //   this.enrollmentSave.emit(this.group.value)
  //   console.log(this.group.value)
  //   }
  //   this.modalAdd.hiddenModal();
  //   if(this.titulo=="Actualizar Alumno"){
  //     this.titulo = "Agregar Alumno"
  //   }
  // }
   // ELIMINAR 
  delete(id:string){
    this.enrollmentDelete.emit(id)
    this.modalDelete.hiddenModal();
  }

  //Reporte matriculados por curso
  // matGradoResponse(identi:string){
  //   localStorage.setItem('gradoPeriodo',identi)
  //   this.identiGradePeriodReport.emit(identi)
  // }
  // matGradoResponseXSL(){
  //   let iden = localStorage.getItem('gradoPeriodo')||''
  //   this.identiGradePeriodReportXLS.emit(iden)
  // }
  
  getSizeOption(){
    if(this.sizeOption==false){
      this.sizeOption = true;
    }else{
      this.sizeOption = false;
    }
  }

  reset(){
    if(this.titulo=="Actualizar Matricula"){
      this.titulo = "Agregar Matricula";
    }
    console.log(this.group.value);
    this.group.reset(); 
    
  }
}

