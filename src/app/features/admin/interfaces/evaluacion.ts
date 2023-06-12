import { ICourseTeacher } from "./course-teacher";
import { IPeriod } from "./period";
import { IStudent } from "./student";

export interface IEvaluacion{
    id: string;
    code:string;
    date: Date | null;
    note:string;
    periodoDTO: IPeriod;
    docentexCursoDTO: ICourseTeacher;
    alumnoDTO: IStudent;

}