import { IParent } from "./parent";
import { IUser } from "./user";

export interface IStudent {
    id:string;
    code:string;
    diseases:string;
    namecon_pri:  string;
    telcon_pri:  string;
    namecon_sec:  string;
    telcon_sec:  string;
    vaccine: string;
    type_insurance: string;
    apoderadoDTO:  IParent;
    usuarioDTO: IUser;
}