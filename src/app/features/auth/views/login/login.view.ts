import { AuthService } from '../../commons/services/auth.service';
import { ISignInRequest } from '../../interfaces/sign-in-request';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.view.html',
  styleUrls: ['./login.view.scss']
})
export class LoginView implements OnInit {

  hide = true;
  formLogin!:FormGroup;
  siteKey:string ="";
  mensajeAuthError:string =''
  responseCode:boolean=false
  

  @Output() formData: EventEmitter<ISignInRequest> = new EventEmitter;
  constructor(private authService:AuthService, private formBuilder:FormBuilder, private router:Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  signInRequest(data:ISignInRequest){
      
  }
  
  initForm(){
    this.formLogin = this.formBuilder.group({
        userName:["",[Validators.required, Validators.minLength(3)]],
        password:["", [Validators.required]],
        recaptcha:[]
      })
  }

  get userName(){return this.formLogin.get('userName')}
  get password(){return this.formLogin.get('password')}

  //INICIAR SESION
  send(){
    this.authService.signInRequest(this.formLogin.value).subscribe(response => {
      if(response.code=='error'){
        this.mensajeAuthError = "Credenciales incorrectas";
        this.responseCode = true
      }else{
        this.authService.setUserLocalStorage(response.data);
        this.authService.currentUser.next(response.data);
        this.router.navigateByUrl('home')
      }
    })
  }

}
