import { IPais } from "./pais";
import { IPersona } from "./persona";

export interface IVoluntario {
    id:number;
    persona:IPersona;
    pais:IPais;
    ubigeoDepResidencia:string;
    estado:string;
}