import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/commons/services/auth.service';
import { IUser } from './interfaces/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  currentUser!:IUser;
  constructor(private router:Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUser.value;
  }

  redirectTo(route:string){
    this.router.navigateByUrl('home/'+route);
  }

  logout(){
    this.authService.logout();
    this.router.navigateByUrl('auth');
  }

}
