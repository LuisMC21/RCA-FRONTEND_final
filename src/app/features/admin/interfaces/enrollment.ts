import { IAnioLectivo } from "./anio-lectivo";
import { IStudent } from "./student";

export interface IEnrollment {
    code: string;
    date: Date;
    idGradoPeriodo:string,
    idAlumno: string;
    alumnoDTO: IStudent
    anioLectivoDTO:IAnioLectivo
}