import { IClase } from "./clase";
import { IStudent } from "./student";

export interface IAsistencia{
id:string;
code: string;
state: string,
alumnoDTO: IStudent;
claseDTO: IClase  

}