import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/features/auth/commons/services/token.service';

@Component({
  selector: 'app-header-student',
  templateUrl: './header-student.component.html',
  styleUrls: ['./header-student.component.scss']
})
export class HeaderStudentComponent implements OnInit {

  username!: string;
  rol = 'Tutor: ';

  constructor(private tokenService: TokenService, private router: Router) { }

  ngOnInit(): void {

    this.username = this.tokenService.getUserName();

    if (this.tokenService.isAdmin()) {
      this.rol = 'Admin: ';
    } else if (this.tokenService.isTeacher()) {
      this.rol = 'Docente: ';
    }

  }

  onLogOut(): void {
    this.tokenService.logOut();
  }

}
