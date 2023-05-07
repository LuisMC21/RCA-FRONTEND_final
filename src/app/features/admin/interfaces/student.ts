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
    // fecCrear:Date;  
    // estado:string;
    // ma_surname:    string;
    // pa_surname:    string;
   
    // direcc:     string;
 
    fecNaci:    Date;
    // id:         null;
    
   
    
    // name:    string;
    // numDoc:     string;
  
    
    // tipDoc:     string;
    
    
}