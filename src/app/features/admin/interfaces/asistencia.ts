import { IClase } from "./clase";
import { IStudent } from "./student";

export interface IAsistencia{
code: string,
state: string,
alumnoDTO: IStudent,
claseDTO: IClase

}