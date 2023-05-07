import { IAsignatura } from "./asignatura";
import { IPeriod } from "./period";

export interface IClase{
id:string;
code:string,
date: string,
periodoDTO: IPeriod,
asignaturaDTO: IAsignatura
}