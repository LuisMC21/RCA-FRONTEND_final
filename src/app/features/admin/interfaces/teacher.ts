import { IUser } from "./user";

export interface ITeacher{
    id:string;
    code:string;
    experience:string;
    dose:string;
    specialty:string;
    usuarioDTO: IUser;
}



