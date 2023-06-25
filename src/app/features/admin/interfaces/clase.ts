import { ICourseTeacher } from "./course-teacher";
import { IPeriod } from "./period";

export interface IClase{
id:string,
code:string,
date: Date,
name: string,
periodoDTO: IPeriod,
docentexcursoDTO: ICourseTeacher
}