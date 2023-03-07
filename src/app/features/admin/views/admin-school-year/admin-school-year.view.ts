import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from 'src/app/shared/components/modals/modal/modal.component';
import { CourseGradeService } from '../../commons/services/course-grade.service';
import { GradePeriodService } from '../../commons/services/grade-period.service';
import { GradeService } from '../../commons/services/grade.service';
import { PeriodService } from '../../commons/services/period.service';
import { ReportsService } from '../../commons/services/reports.service';
import { ICourseGrade } from '../../interfaces/course-grade';
import { IGrade } from '../../interfaces/grade';
import { IGradePeriod } from '../../interfaces/grade-period';
import { IPeriod } from '../../interfaces/period';
import { IReportCurGrado } from '../../interfaces/reportCurGrado';

@Component({
  selector: 'app-admin-school-year',
  templateUrl: './admin-school-year.view.html',
  styleUrls: ['./admin-school-year.view.scss']
})
export class AdminSchoolYearView implements OnInit {

  tableName = "Año lectivo"
  gradePeriods:IGradePeriod[]=[];
  courseGrade:ICourseGrade[]=[];
  listGrades:IGrade[]=[];
  listPeriods:IPeriod[]=[]
  msjResponse:string='';
  successful:boolean=false;
  identiGrade:string='';
  identiPeriod:string='';
  curGrado:IReportCurGrado[]=[]
  paginationData = 'grade';

  @ViewChild('modalOk') modalOk!:ModalComponent;

  constructor(
    private gradoPeriodoService:GradePeriodService,
    private courseGradeService:CourseGradeService,
    private gradeService:PeriodService,
    private periodService:GradeService,
    private reportService:ReportsService

    ) { }

  ngOnInit(): void {
    this.gradoPeriodoService.getAll("",0,5).subscribe(data =>{
      this.gradePeriods = data.content;
    })
    this.courseGradeService.getAll("",0,5).subscribe(data =>{
      this.courseGrade = data.content;
    })
    this.gradeService.getAll("",0,5).subscribe(data =>{
      this.listGrades = data.content;
    })
    this.periodService.getAll("",0,5).subscribe(data =>{
      this.listPeriods = data.content;
    })
  }
//Reporte matriculados por grado
curGradoReport(iden:string){
  this.reportService.curGradoXLSX(iden,0,5,false).subscribe(data =>{
    this.curGrado = data.content
  })
}
curGradoResponseXSL(iden:string){
  const fileName = 'reportCurGrado.xlsx';
  this.reportService.curGradoXLSXExcel(iden,0,5,true).subscribe(data =>{
    this.managerExcelFile(data,fileName);
  })
}
  // AGREGAR - ACTUALIZAR
  //grado-periodo
  save(gradePeriod:IGradePeriod){
    if(gradePeriod.code==null){
      this.gradoPeriodoService.add(gradePeriod).subscribe(data =>{
        if(data.msj==='OK'){
          this.msjResponse = 'Registrado correctamente'
          this.successful = true;
        }else{
          this.msjResponse = 'Error, el Grado-periodo ya existe';
          this.successful = false;
        }
      });
    }else{
      this.gradoPeriodoService.update(gradePeriod).subscribe(data =>{
        if(data.msj === 'OK'){
          this.msjResponse = 'Cambios actualizados con éxito';
        }else{
          this.msjResponse = 'Ha ocurrido un error :(';
        }
      })
    }
    this.modalOk.showModal();
  }

  //grado-periodo
  saveCG(cursoGrado:ICourseGrade){
    if(cursoGrado.code==null){
      this.courseGradeService.add(cursoGrado).subscribe(data =>{
        if(data.msj==='OK'){
          this.msjResponse = 'Registrado correctamente'
          this.successful = true;
        }else{
          this.msjResponse = 'Error, el Grado-periodo ya existe';
          this.successful = false;
        }
      });
    }else{
      this.courseGradeService.update(cursoGrado).subscribe(data =>{
        if(data.msj === 'OK'){
          this.msjResponse = 'Cambios actualizados con éxito';
        }else{
          this.msjResponse = 'Ha ocurrido un error :(';
        }
      })
    }
    this.modalOk.showModal();
  }
  
  getIdentiGrade(identiGrade:string){
    this.identiGrade = identiGrade;
  }

  getIdentiPeriod(identiPeriod:string){
    this.identiPeriod = identiPeriod
  }

  //reportes
  managerExcelFile(response:any, fileName:string):void{
    const dataType = response.type;
    const binaryData = [];
    binaryData.push(response);

    const fPath = window.URL.createObjectURL(new Blob(binaryData, {type:dataType}));
    const downloadLink = document.createElement('a');
    downloadLink.href = fPath;
    downloadLink.setAttribute('download',fileName);
    document.body.appendChild(downloadLink);
    downloadLink.click();
  }
}

