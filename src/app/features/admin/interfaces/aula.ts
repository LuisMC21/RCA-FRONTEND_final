import { IGrade } from "./grade";
import { ISeccion } from "./seccion";

export interface IAula {
   code:string;
   gradoDTO: IGrade;
   seccionDTO:ISeccion
}