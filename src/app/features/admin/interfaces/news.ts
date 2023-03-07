import { IUser } from "./user";

export interface INews {
    code:string;
    title:string;
    sommelier:string;
    descrip:string;
    image:string;
    date:Date;
    usuarioDTO:IUser;
    // identi:string;
    // titulo:string;
    // sumilla:string;
    // descripcion:string;
    // fecha:Date;
    // imagen:string;
    // imagenName:string;
    // imagenLow:string;
    // administrativoId:string;
}