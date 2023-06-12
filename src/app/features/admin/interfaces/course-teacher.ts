import { IAnioLectivo } from "./anio-lectivo";
import { IAula } from "./aula";
import { ICourse } from "./course";
import { ITeacher } from "./teacher";

export interface ICourseTeacher {
    id: string;
    code: string;
    docenteDTO: ITeacher;
    aulaDTO: IAula;
    cursoDTO: ICourse;
    anioLectivoDTO: IAnioLectivo
}