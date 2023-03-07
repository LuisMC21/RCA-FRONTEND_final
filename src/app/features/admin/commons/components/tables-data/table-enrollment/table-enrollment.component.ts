import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IEnrollment } from 'src/app/features/admin/interfaces/enrollment';
import { IGradePeriod } from 'src/app/features/admin/interfaces/grade-period';
import { IParent } from 'src/app/features/admin/interfaces/parent';
import { IReportMatGrade } from 'src/app/features/admin/interfaces/reportMatGrade';
import { IStudent } from 'src/app/features/admin/interfaces/student';
import { ModalComponent } from 'src/app/shared/components/modals/modal/modal.component';
import { SearchComponent } from 'src/app/shared/components/search/search.component';
import { GradePeriodService } from '../../../services/grade-period.service';
import { ParentService } from '../../../services/parent.service';

@Component({
  selector: 'app-table-enrollment',
  templateUrl: './table-enrollment.component.html',
  styleUrls: ['./table-enrollment.component.scss']
})
export class TableEnrollmentComponent implements OnInit {
  
  group!:FormGroup;
  groupEnrollment!:FormGroup
  nomParent:string='';
  parents:IParent[]=[];
  parent!:IParent;
  sizeOption:boolean=false;
  gradoPeriodoLS:string=localStorage.getItem('gradoPeriodo')||''
  gradePeriodNom:string='';
  nomSearch:string='';
  
  identiParent:string='';
  identiGradoPeriodo:string='';
  identiStudent:string='';
  asignStudent!: IStudent;
  head=["CODIGO","NOMBRE","NÚMERO DE DOC","CORREO APODERADO","TELEFONO APODERADO"]

  @ViewChild('searchParentModal') searchParentModal!:SearchComponent;
  @ViewChild('matricula') matricula!:ModalComponent;
  @ViewChild('modalStudents') modalStudents!:ModalComponent

  @Input() gradePeriods:IGradePeriod[]=[]
  @Input() listStudents:IStudent[]=[]
  @Input() matGrado:IReportMatGrade[]=[]
  @Input() matStudent:IEnrollment[]=[]

  @Output() studentSave:EventEmitter<IStudent> = new EventEmitter();
  @Output() enrollmentSave:EventEmitter<IEnrollment> = new EventEmitter();
  @Output() identiParentSave:EventEmitter<string> = new EventEmitter();
  @Output() idGradoPeriodoSave:EventEmitter<string> = new EventEmitter();
  @Output() studentDelete:EventEmitter<string> = new EventEmitter();
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
    private parentService:ParentService, 
    private gradePeriod:GradePeriodService,
    private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.getGradePeriodNom(this.gradoPeriodoLS)
    this.gradoPeriodoLS = localStorage.getItem('gradoPeriodo')||'identi'
    this.form();
  }
  
  getGradePeriodNom(iden:string){
    this.gradePeriod.getByIden(iden).subscribe(data =>{
      this.gradePeriodNom = data.gradeDTO.name;
    })
  }

  get apelPat(){return this.group.get('apelPat')}
  get apelMat(){return this.group.get('apelMat')}
  get nombre(){return this.group.get('nombre')}
  get tipDoc(){return this.group.get('tipDoc')}
  get numDoc(){return this.group.get('numDoc')}
  get direcc(){return this.group.get('direcc')}
  get fecNaci(){return this.group.get('fecNaci')}
  get apoderado(){return this.group.get('apoderado')}
  get isVacunado(){return this.group.get('isVacunado')}
  get enferm(){return this.group.get('enferm')}
  get nomConPri(){return this.group.get('nomConPri')}
  get nomConSec(){return this.group.get('nomConSec')}
  get telConSec(){return this.group.get('telConSec')}
  get telConPri(){return this.group.get('telConPri')}
  get tipSeg(){return this.group.get('tipSeg')}

  get fecMatri(){return this.groupEnrollment.get('fecMatri')}
  get idGradoPeriodo(){return this.groupEnrollment.get('idGradoPeriodo')}

  form(item?:IStudent){
    this.groupEnrollment = this.formBuilder.group({
      fecMatri:[''],
      idGradoPeriodo:[''],
      idAlumno:[''],
      identi:[null],
    })

    // this.nomParent = item?item.apoderado:'';
    this.group = this.formBuilder.group({
      identi:[item?item.code:null],
      apelPat:[item?item.usuarioDTO.pa_surname:'',[Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      apelMat:[item?item.usuarioDTO.ma_surname:'',[Validators.required, Validators.minLength(3),Validators.maxLength(30)]],
      nombre:[item?item.usuarioDTO.name:'',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
      //tipDoc:[item?item.tipDoc:''],
      numDoc:[item?item.usuarioDTO.numdoc:'',[Validators.required,Validators.minLength(8),Validators.maxLength(8)]],
      direcc:[item?item.usuarioDTO.email:'',[Validators.required,Validators.minLength(3),Validators.maxLength(50)]],
      // fecNaci:[item?item.fecNaci:'',[Validators.required]],
      //apoderado:[''],
      enferm:[item?item.diseases:''],
      // isVacunado: [''],
      nomConPri:  [''],
      nomConSec:  [''],
      telConSec:  [''],
      telConPri:[item?item.telcon_pri:'',[Validators.required,Validators.minLength(9),Validators.maxLength(9)]],
      //tipSeg: [item?item.tipSeg:'']
    });
  }
  searchParent(nom:string){
    this.nomParent = nom;
    this.parentService.getAll(nom,0,5).subscribe(data =>{
      this.parents = data.content;
    })
  }
  //BUSCAR Estudiante
  search(nom:string){
    this.studentSearch.emit(nom);
  }
  //Asignar estudiante
  asingStudent(student:IStudent){
    this.nomSearch= ' '+student.usuarioDTO.name + ' ' +student.usuarioDTO.pa_surname +' '+student.usuarioDTO.ma_surname;
    this.asignStudent = student
  }
  asignStudentForm(){
    this.form(this.asignStudent);
    this.modalStudents.hiddenModal();
  }
  //ASIGNA APODERADO
  asingParent(parent:IParent){
    this.nomParent = parent.apelPaterno + ' ' + parent.apelMaterno + ' '+parent.nombre;
    this.identiParent = parent.identi;
    this.searchParentModal.hidden();
  }
  save(){
    if(this.group.valid && this.groupEnrollment.valid){
    this.identiParentSave.emit(this.identiParent)
    this.studentSave.emit(this.group.value)
    this.enrollmentSave.emit(this.groupEnrollment.value)
    }
    this.matricula.hiddenModal()
  }
   // ELIMINAR 
   delete(id:string){
  }

  //Reporte matriculados por curso
  matGradoResponse(identi:string){
    localStorage.setItem('gradoPeriodo',identi)
    this.getGradePeriodNom(identi)
    this.identiGradePeriodReport.emit(identi)
  }
  matGradoResponseXSL(){
    let iden = localStorage.getItem('gradoPeriodo')||''
    this.identiGradePeriodReportXLS.emit(iden)
  }
  
  getSizeOption(){
    if(this.sizeOption==false){
      this.sizeOption = true;
    }else{
      this.sizeOption = false;
    }
  }
}

