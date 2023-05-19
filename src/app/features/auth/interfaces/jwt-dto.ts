export class JwtDTO {
  token: string;
  type!: string;
  nombreUsuario!: string;
  authorities!: string[];

  constructor(token: string){
    this.token = token;
  }
}
