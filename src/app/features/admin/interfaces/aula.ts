import { IGrade } from "./grade";
import { ISeccion } from "./seccion";

export interface IAula {
   code:string;
   grade: IGrade;
   seccionDTO:ISeccion
}