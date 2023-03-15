import { IAula } from "./aula";
import { ICourse } from "./course";
import { ITeacher } from "./teacher";

export interface IAsignatura{
    code: string,
    docenteDTO:ITeacher,
    cursoDTO:ICourse,
    aulaDTO:IAula
}