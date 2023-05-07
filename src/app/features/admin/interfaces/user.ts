import { ITeacher } from "./teacher";

export interface IUser{
    id:string;
    code: string;
    nombreUsuario: string;
    name: string;
    pa_surname: string;
    ma_surname: string;
    birthdate: Date;
    type_doc: string;
    numdoc: string;
    tel: string;
    gra_inst: string;
    email: string;
    password:string;
    rol:string;
}