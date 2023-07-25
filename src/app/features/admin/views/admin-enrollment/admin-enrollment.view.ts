import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalComponent } from 'src/app/shared/components/modals/modal/modal.component';
import { SearchComponent } from 'src/app/shared/components/search/search.component';
import { EnrollmentService } from '../../commons/services/enrollment.service';
import { GradePeriodService } from '../../commons/services/grade-period.service';
import { ParentService } from '../../commons/services/parent.service';
import { ReportsService } from '../../commons/services/reports.service';
import { StudentService } from '../../commons/services/student.service';
import { IEnrollment } from '../../interfaces/enrollment';
import { IGradePeriod } from '../../interfaces/grade-period';
import { IParent } from '../../interfaces/parent';
import { IReportMatGrade } from '../../interfaces/reportMatGrade';
import { IStudent } from '../../interfaces/student';
import {IAula} from '../../interfaces/aula';
import { AulaService } from '../../commons/services/aula.service';
import { IAnioLectivo } from '../../interfaces/anio-lectivo';
import { AnioLectivoService } from '../../commons/services/anio-lectivo.service';
import { PaginationService } from '../../commons/services/pagination.service';
@Component({
  selector: 'app-admin-enrollment',
  templateUrl: './admin-enrollment.view.html',
  styleUrls: ['./admin-enrollment.view.scss']
})
export class AdminEnrollmentView implements OnInit {

  tableName:string='Matricula'
  msjResponse:string='';
  successful!: boolean;
  paginationData = 'enrollment'
  page = this.pagination.getPage(this.paginationData);
  size = this.pagination.getSize(this.paginationData);

  identiStudent:string='';
  studentSave!: IStudent;
  enrollmentSave!:IEnrollment;
  aniosL:IAnioLectivo[]=[]
  aulas:IAula[]=[];
  students:IStudent[]=[];


  enrollmentList:IEnrollment[]=[]
  @ViewChild('modalOk') modalOk!:ModalComponent;

  constructor(
    private parentService: ParentService,
    private studentService:StudentService,
    private enrollmentService:EnrollmentService,
    private aulaService:AulaService,
    private anioService:AnioLectivoService,
    private reportService:ReportsService,
    private pagination:PaginationService

    ){ }

  ngOnInit(): void {
    this.enrollmentService.getAll("",0,5).subscribe(response =>{
      this.enrollmentList= response.data.list;
      console.log(response.data.list)
    })
    this.searchStudent();
    this.aulaService.getAll("",0,5).subscribe(response =>{
      this.aulas= response.data.list;
      console.log(response.data.list)
    })

    this.anioService.getAll("",0,5).subscribe(response =>{
      this.aniosL= response.data.list;
      console.log(response.data.list)
    })

  }
  searchStudent(nom?:string){
    this.studentService.getAll(nom?nom:'',0,6).subscribe(response =>{
      this.students = response.data.list;
    })
  }
  searchAula(nom?:string){
    this.studentService.getAll(nom?nom:'',0,6).subscribe(response =>{
      this.students = response.data.list;
    })
  }
  //Reporte matriculados por grado
  // matGradoReport(iden:string){
  //   this.reportService.matGrado(iden,0,5,false).subscribe(data =>{
  //     this.matGrado = data.content
  //   })
  // }
  matGradoResponseXSL(iden:string){
    const fileName = 'Reporte-alumnos-matriculados.xlsx'
    this.reportService.matGradoExcel(iden,0,5,true).subscribe(data =>{
      this.managerExcelFile(data,fileName);
    })
  }
  // AGREGAR - ACTUALIZAR
  save(enrollment:IEnrollment){
    console.log("AQUI")
    if(enrollment.id==null){
      this.enrollmentService.add(enrollment).subscribe(data =>{
          if(data.successful===true){
            this.msjResponse = 'Matricula registrada correctamente'
            this.successful = true;
          }else{
            this.msjResponse = data.message;
            this.successful = false;
          }
      });
    }else{
      this.enrollmentService.update(enrollment).subscribe(data =>{
        if(data.successful===true){
          this.msjResponse = 'Matricula actualizada con éxito';
          this.successful = true;
        }else{
          this.msjResponse = 'Ha ocurrido un error :(';
          this.successful = false;
        }
      })
    }
    this.modalOk.showModal();
  }
  // getIdentiParent(identiParent:string){
  //   this.identiParent = identiParent;
  // }
  getStudentSave(student:IStudent){
    this.studentSave = student;
  }
  
 //ELIMINAR
 delete(id:string){
  this.enrollmentService.delete(id).subscribe(data =>{
    if(data.successful===true){
      this.msjResponse = 'Eliminado correctamente';
      this.successful = true;
    }
    this.successful = true;
  });
  this.modalOk.showModal();
}
getEnrollment(){
  this.enrollmentService.getAll('',this.page,this.size)
  .subscribe(response=>{
    if(response.successful){
      this.enrollmentList=response.data.list;

    }else{
      this.enrollmentList=[]
    }
  })
}
//Reportes
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

getPage(event:any){
this.page=event;
this.getEnrollment();
}

getSize(event:any){
  this.size=event;
  this.getEnrollment();
}
}
