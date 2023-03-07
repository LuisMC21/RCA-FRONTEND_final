import { IAnioLectivo } from "./anio-lectivo";
import { ICourse } from "./course";
import { ICourseGrade } from "./course-grade";
import { IGrade } from "./grade";
import { IPeriod } from "./period";
import { ITeacher } from "./teacher";

export interface IGradePeriod {
    code:string;
    teacherDTO:ITeacher;
    courseDTO:ICourse
    gradeDTO:IGrade
    anioDTO:IAnioLectivo
    periodoDTO:IPeriod
    coursegradeDTO:ICourseGrade
}