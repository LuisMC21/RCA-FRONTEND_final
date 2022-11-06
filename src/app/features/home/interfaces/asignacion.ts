import { IAsegurado } from "./asegurado";
import { IVoluntario } from "./voluntario";

export interface IAsignacion {
    id:number;
    voluntario:IVoluntario;
    asegurado:IAsegurado;
    numLlamadas:number;
}