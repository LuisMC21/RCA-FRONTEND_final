import { IPersona } from "./persona";

export interface IUser{
    id:number;
    userName:string;
    persona:IPersona;
}