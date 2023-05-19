import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ISignInRequest } from '../../../interfaces/sign-in-request.interface';
import { TokenService } from '../../services/token.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { LoginUsuario } from '../../../interfaces/login-usuario';
import { IApiResponse } from 'src/app/core/interfaces/apiResonse.interface';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  roles:string[] = [];
  btnValue:string = "Ingresar";

  isLogged = false;
  isLoginFail = false;
  loginUsuario!: LoginUsuario;
  nombreUsuario!: string;
  password!: string
  errMsj!: string;

  @Input() rol:string='';
  @Output() formData: EventEmitter<ISignInRequest>= new EventEmitter();
  @Output() login: EventEmitter<IApiResponse> = new EventEmitter();

  group: FormGroup;
  fields=[
    { icon :"bi bi-person-fill", placeholder:"Correo", type:"text", formControlName :"nombreUsuario" },
    { icon :"bi bi-key-fill", placeholder:"Contraseña", type:"password", formControlName :"password" }
  ]
  get emailFormControl(){ return this.group.get('nombreUsuario'); }

  get passwordFormControl(){
    return this.group.get('password');
  }

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router, private formBuider: FormBuilder) {
    this.group = this.formBuider.group({nombreUsuario: '',password: ''});
   }

  ngOnInit(): void {
    if(this.tokenService.getToken()){
      this.isLogged= true;
      this.isLoginFail = false;
      this.roles = this.tokenService.getAuthorities();
    }
  }

  onLogin(): void{
     this.authService.login(this.group.value).subscribe(
      data => {
        if(data.successful){
        this.isLogged = true;
        this.isLoginFail = false;

        this.tokenService.setToken(data.data.token);
        this.tokenService.setUsername(data.data.emailorUser);
        this.tokenService.setAuthorities(data.data.authorities);
        this.roles = data.data.authorities;
      }
      },
      err =>{
        this.isLogged = false;
        this.isLoginFail = true;
        this.errMsj = err.data.mensaje;
        console.log(err.data.mensaje)
      }
    )
  }

  send():void{
    if(this.group.valid){
      this.formData.emit(this.group.value);
    }
  }

}
