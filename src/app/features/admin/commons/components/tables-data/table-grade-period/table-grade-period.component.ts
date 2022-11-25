import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ICourse } from 'src/app/features/admin/interfaces/course';
import { ICourseGrade } from 'src/app/features/admin/interfaces/course-grade';
import { IGrade } from 'src/app/features/admin/interfaces/grade';
import { IGradePeriod } from 'src/app/features/admin/interfaces/grade-period';
import { IPeriod } from 'src/app/features/admin/interfaces/period';
import { IReportCurGrado } from 'src/app/features/admin/interfaces/reportCurGrado';
import { ITeacher } from 'src/app/features/admin/interfaces/teacher';
import { ModalComponent } from 'src/app/shared/components/modals/modal/modal.component';
import { CourseGradeService } from '../../../services/course-grade.service';
import { CourseService } from '../../../services/course.service';
import { GradePeriodService } from '../../../services/grade-period.service';
import { GradeService } from '../../../services/grade.service';
import { PeriodService } from '../../../services/period.service';
import { TeacherService } from '../../../services/teacher.service';

@Component({
  selector: 'app-table-grade-period',
  templateUrl: './table-grade-period.component.html',
  styleUrls: ['./table-grade-period.component.scss']
})
export class TableGradePeriodComponent implements OnInit {

  @Input() title!:string;
  @Input() listGrades:IGrade[]=[];
  @Input() listPeriods:IPeriod[]=[]
  @Input() gradePeriods:IGradePeriod[]=[]
  @Input() curGrado:IReportCurGrado[]=[]

  group!:FormGroup;
  group2!:FormGroup;
  identiGrade:string='';
  identiPeriod:string='';
  courses:ICourse[]=[]
  grades:IGrade[]=[]
  periods:IPeriod[]=[]
  teachers:ITeacher[]=[]
  @Input() courseGrades:ICourseGrade[]=[]
  gradoPeriodoLS:string=localStorage.getItem('gradoPeriodo')||''
  gradePeriodNom:string='';
  sizeOption:boolean=false;
  navItem:string='matGrado'
  
  @Output() gradePeriodSave:EventEmitter<IGradePeriod> = new EventEmitter();
  @Output() courseGradeSave:EventEmitter<ICourseGrade> = new EventEmitter();
  @Output() gradePeriodDelete:EventEmitter<string> = new EventEmitter();
  @Output() gradePeriodSearch:EventEmitter<string> = new EventEmitter();

  // Reportes
  @Output() identiCurGradeReport:EventEmitter<string> = new EventEmitter();
  @Output() identiCurGradeReportXLS:EventEmitter<string> = new EventEmitter();

  
  @ViewChild('modalAdd') modalAdd!: ModalComponent;
  
  //menu
  @ViewChild('matGrado') matGrado!:ElementRef;
  @ViewChild('confGrado') confGrado!:ElementRef;
  @ViewChild('confCurso') confCurso!:ElementRef;

  head=["GRADO","AÑO LECTIVO"]
  constructor(private formBuilder:FormBuilder, 
    private courseService:CourseService,
    private gradeService:GradeService,
    private periodService:PeriodService,
    private gradePeriod:GradePeriodService,
    private courseGradeService:CourseGradeService,
    private teacherService:TeacherService,
    private renderer2:Renderer2
    ) { }

  ngOnInit(): void {
    
    this.gradePeriod.getAll('',0,5).subscribe(data=>{
      this.gradePeriods = data.content
     })
    // this.courseGradeService.getAll('',0,5).subscribe(data=>{
    //   this.courseGrades = data.content
    // })
    this.courseService.getAll('',0,5).subscribe(data=>{
      this.courses = data.content
    })
    this.gradeService.getAll('',0,5).subscribe(data=>{
      this.grades = data.content
    })
    this.periodService.getAll('',0,5).subscribe(data=>{
      this.periods = data.content
    })
    
    this.teacherService.getAll('',0,5).subscribe(data=>{
      this.teachers = data.content
    })
    
    this.getGradePeriodNom(this.gradoPeriodoLS)
    this.gradoPeriodoLS = localStorage.getItem('gradoPeriodo')||'identi'
    this.form();

    this.form()
    this.form2();
  }
  getGradePeriodNom(iden:string){
    this.gradePeriod.getByIden(iden).subscribe(data =>{
      this.gradePeriodNom = data.nomGrado;
    })
  }

  form(item?:IGradePeriod):void{
    this.group = this.formBuilder.group({
      identi:[item?item.identi:null],
      gradoId:[],
      periodoId:[]
    });
  }

  form2( item2?:ICourseGrade){
    this.group2 = this.formBuilder.group({
      identi:[item2?item2.identi:null],
      cursoId:[],
      gradoPeriodo:[],
      docenteId:[]
});
  }
  
   // grado-periodo
   save(){
    if(this.group.valid){
     this.gradePeriodSave.emit(this.group.value)
    }
    this.modalAdd.hiddenModal();
  }
  //curso-grado
  saveCG(){
    console.log(this.group2.value)
    if(this.group2.valid){
      this.courseGradeSave.emit(this.group2.value)
     }
     this.modalAdd.hiddenModal();
  }

  // ELIMINAR 
  delete(id:string){
    this.gradePeriodDelete.emit(id)
  }

  refresh(): void { window.location.reload(); }

  //Reporte grados por curso
  curGradoReport(identi:string){
    localStorage.setItem('gradoPeriodo',identi)
    this.getGradePeriodNom(identi)
    this.identiCurGradeReport.emit(identi)
  }
  curGradoReportXSL(){
    let iden = localStorage.getItem('gradoPeriodo')||''
    this.identiCurGradeReportXLS.emit(iden)
  }
  
  getSizeOption(){
    if(this.sizeOption==false){
      this.sizeOption = true;
    }else{
      this.sizeOption = false;
    }
  }

  //menu
  nav(item:string){
    if(item=='matGrado'){
      this.renderer2.setStyle( this.matGrado.nativeElement, 'background-color', ' rgb(236, 238, 240)');
      this.renderer2.setStyle( this.confGrado.nativeElement, 'background-color', 'rgb(224, 222, 222)');
      this.renderer2.setStyle( this.confCurso.nativeElement, 'background-color', 'rgb(224, 222, 222)');
    } else if(item=='confGrado'){
      this.renderer2.setStyle( this.matGrado.nativeElement, 'background-color', 'rgb(224, 222, 222)');
      this.renderer2.setStyle( this.confGrado.nativeElement, 'background-color', ' rgb(236, 238, 240)');
      this.renderer2.setStyle( this.confCurso.nativeElement, 'background-color', 'rgb(224, 222, 222)');
    } else if(item=='confCurso'){
      this.renderer2.setStyle( this.matGrado.nativeElement, 'background-color', 'rgb(224, 222, 222)');
      this.renderer2.setStyle( this.confGrado.nativeElement, 'background-color', 'rgb(224, 222, 222)');
      this.renderer2.setStyle( this.confCurso.nativeElement, 'background-color', ' rgb(236, 238, 240)');
    }
    this.navItem = item;
  }
}
