import { IUser } from "./user";

export interface IStudent {
    identi:string;
    fecCrear:Date;  
    estado:string;
    ma_surname:    string;
    pa_surname:    string;
    apoderado:  string;
    code:     null;
    direcc:     string;
    diseases:     string;
    fecNaci:    Date;
    id:         null;
    vaccine: string;
    namecon_pri:  string;
    namecon_sec:  string;
    name:    string;
    numDoc:     string;
    telcon_pri:  string;
    telcon_sec:  string;
    tipDoc:     string;
    tipSeg: string;
    usuarioDTO: IUser;
}