import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormsModule, FormGroup } from '@angular/forms';
import { ISignInRequest } from '../../../interfaces/sign-in-request.interface';
import { TokenService } from '../../services/token.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { LoginUsuario } from '../../../interfaces/login-usuario';
import { ModalComponent } from 'src/app/shared/components/modals/modal/modal.component';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  btnValue: string = 'Ingresar';

  loginUsuario!: LoginUsuario;
  nombreUsuario!: string;
  password!: string;
  errMsj!: string;

  msjResponse: string = '';
  successful: boolean = false;

  @Input() rol: string = '';
  @Output() formData: EventEmitter<ISignInRequest> = new EventEmitter();

  group!: FormGroup;
  fields = [
    {
      icon: 'bi bi-person-fill',
      placeholder: 'Correo',
      type: 'text',
      formControlName: 'nombreUsuario',
    },
    {
      icon: 'bi bi-key-fill',
      placeholder: 'Contraseña',
      type: 'password',
      formControlName: 'password',
    },
  ];

  get emailFormControl() {
    return this.group.get('nombreUsuario');
  }

  get passwordFormControl() {
    return this.group.get('password');
  }

  get recordarCredenciales() {
    return this.group.get('recordarCredenciales');
  }

  @ViewChild('modalOk') modalOk!: ModalComponent;

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
      this.form();
  }

  form(item?: LoginUsuario): void {
    this.group = this.formBuilder.group({
      nombreUsuario: [item ? item.nombreUsuario : null],
      password: [item ? item.password : null],
      recordarCredenciales: [item ? item.recordarCredenciales : false]
    });
  }

  ngOnInit(): void {
    const savedUsername = localStorage.getItem('username');
    const savedPassword = localStorage.getItem('password');

    if (savedUsername && savedPassword) {
      this.group.patchValue({
        nombreUsuario: savedUsername,
        password:  this.decryptPassword(savedPassword),
        recordarCredenciales: true
      });
    }
  }

  onLogin(): void {
    if (this.group.valid) {
      this.authService.login(this.group.value).subscribe((data) => {
        if (data.successful) {
          this.tokenService.setToken(data.data.token);
          if (this.tokenService.isAdmin()) {
            this.router.navigate(['/admin']);
            console.log('Bienvenido Admin');
          } else if (this.tokenService.isTeacher()) {
            this.router.navigate(['/teacher']);
            console.log('Bienvenido Docente');
          } else {
            this.router.navigate(['/tutor']);
            console.log('Bienvenido Estudiante');
          }
        } else {
          this.msjResponse = data.message;
          this.successful = false;
          this.modalOk.showModal();
        }
      });
    }
  }

  // Función para cifrar la contraseña
encryptPassword(password: string): string {
  const encryptedPassword = btoa(password);
  return encryptedPassword;
}

// Función para descifrar la contraseña
decryptPassword(encryptedPassword: string): string {
  const decryptedPassword = atob(encryptedPassword);
  return decryptedPassword;
}


}
