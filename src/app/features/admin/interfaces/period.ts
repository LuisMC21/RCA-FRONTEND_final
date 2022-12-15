import { IAnioLectivo } from "./anio-lectivo";

export interface IPeriod {
    code: string
    name:string
    date_start: Date;
    date_end: Date;
    anio_lectivoDTO: IAnioLectivo;
}