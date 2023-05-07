import { IUser } from "./user";

export interface IParent {
    id: string;
    code:string;
    email:string;
    usuarioDTO: IUser;
}