export interface IAsegurado{
    id:number;
    tipoDocumento:number;
    numDocumento:string;
    nombre:string;
    apellidoPat:string;
    apellidoMat:string;
    nombreCompleto:string;
    direccionAct:string;
    cam:string;
    celular:string;
    correo:string;
    preferenciaLit:string;
    diaLectura:string;
    horaLectura:string;
    estado:string;
    fechaCreacion:Date;
}