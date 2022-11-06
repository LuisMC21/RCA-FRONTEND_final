import { IAsignacion } from "./asignacion";
import { ILibro } from "./libro";

export interface ILlamada {
    id:number;
    libro:ILibro;
    asignacion: IAsignacion;
    llamadaRealizada:string;
    numLlamada:number;
    tipo:string;
    medio:string;
    fechaLectura:any;
    horaInicio:Date;
    horaFin:Date;
    finLectura:string;
    tiempoLeido:number;
    observaciones:string;
    fechaCreacion:Date;
}