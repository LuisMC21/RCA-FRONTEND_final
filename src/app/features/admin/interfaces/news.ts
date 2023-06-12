import { IUser } from "./user";

export interface INews {
    id:string;
    code:string;
    title:string;
    sommelier:string;
    descrip:string;
    image:string;
    imageBase64:string;
    date:Date;
    usuarioDTO:IUser;
}