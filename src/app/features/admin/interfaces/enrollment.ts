import { IAnioLectivo } from "./anio-lectivo";
import { IAula } from "./aula";
import { IStudent } from "./student";

export interface IEnrollment {
    id:string;
    code: string;
    date: Date;
    aulaDTO:IAula;
    alumnoDTO: IStudent;
    anioLectivoDTO:IAnioLectivo;
}
