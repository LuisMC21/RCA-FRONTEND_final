import { IGrade } from "./grade";
import { ISeccion } from "./seccion";

export interface IAula {
   id:string;
   code:string;
   gradoDTO:IGrade;
   seccionDTO:ISeccion;
}