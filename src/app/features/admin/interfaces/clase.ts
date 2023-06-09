import { IAsignatura } from "./asignatura";
import { ICourseTeacher } from "./course-teacher";
import { IPeriod } from "./period";

export interface IClase{
    id:string;
    code:string,
    date: string,
    name:string,
    periodoDTO: IPeriod,
    docentexCursoDTO: ICourseTeacher
}