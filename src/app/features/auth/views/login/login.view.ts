import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/core/services/storage.service';
import { AuthService } from '../../commons/services/auth.service';
import { ISignInRequest } from '../../interfaces/sign-in-request.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.view.html',
  styleUrls: ['./login.view.scss']
})
export class LoginView implements OnInit {

  roles:string[]=["Alumno","Docente","Administrativo"];
  rol:string="Alumno";
  constructor(
    private authService: AuthService, 
    private storage: StorageService,
    private route: Router) { }

  ngOnInit(): void {

  }

  signIn(data: ISignInRequest):void{
    this.authService.signInRequest(data).subscribe(response => {
      if(response){
        this.storage.setToken(response.token);
        this.route.navigateByUrl("admin/docente")
      }
    })
  }
}
