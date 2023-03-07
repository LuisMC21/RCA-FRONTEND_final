import { ICourse } from "./course";
import { IGrade } from "./grade";
import { IPeriod } from "./period";
import { IReportCurGrado } from "./reportCurGrado";
import { ITeacher } from "./teacher";

export interface ICourseGrade {
   code:string
   cursoDTO:ICourse
   gradeDTO:IGrade
   periodoDTO:IPeriod
   teacherDTO:ITeacher
   reportCurGrado:IReportCurGrado
}