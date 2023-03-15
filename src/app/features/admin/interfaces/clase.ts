import { IAsignatura } from "./asignatura";
import { IPeriod } from "./period";

export interface IClase{
code:string,
date: string,
periodoDTO: IPeriod,
asignaturaDTO: IAsignatura
}