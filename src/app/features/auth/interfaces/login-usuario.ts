export class LoginUsuario {
  nombreUsuario: string;
  password: string;
  recordarCredenciales: boolean;

  constructor(nombreUsuario: string, password: string, recordarCredenciales: boolean){
    this.nombreUsuario=nombreUsuario;
    this.password = password;
    this.recordarCredenciales = recordarCredenciales;
  }
}
