import { IUser } from "./user";

export interface INewsGet {
    id:string;
    code:string;
    title:string;
    sommelier:string;
    descrip:string;
    route:string
    date:Date;
    usuarioDTO:IUser;
}