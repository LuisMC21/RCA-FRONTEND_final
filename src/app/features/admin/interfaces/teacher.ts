import { IUser } from "./user";

export interface ITeacher{
    identi:string;
    fecCrear:Date;//
    estado:string;//
    code:string;//
    apelPaterno:string;//
    apelMaterno:string;//
    name:string;//
    tipDocumento:string;//
    numDocumento:string;//
    gradDoc:string;//
    specialty:string;//
    tipSeguro: string;//
    usuarioDTO: IUser;
}



