import { IUser } from "./user";

export interface IParent {
    fecCrear:Date;
    estado:string;
    identi:string;
    code:string;
    apelPaterno:string;
    apelMaterno:string;
    nombre: string;
    email:string
    tipDocumento:string;
    numDocumento:string;
    telefono:string;
    vacunas: string;
    usuarioDTO: IUser;
}