import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ISignInRequest } from '../../../interfaces/sign-in-request.interface';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  roles:string = "Docente";
  btnValue:string = "Ingresar";
  @Input() rol:string=''; 
  @Output() formData: EventEmitter<ISignInRequest>= new EventEmitter();
  group!: FormGroup;
  fields=[
    { icon :"bi bi-person-fill", placeholder:"Correo", type:"text", formControlName :"email" },
    { icon :"bi bi-key-fill", placeholder:"Contraseña", type:"password", formControlName :"password" }
  ]
  get emailFormControl(): FormControl{
    return this.group.get('email') as FormControl;
  }

  get passwordFormControl(): FormControl{
    return this.group.get('password') as FormControl;
  }

  constructor(private formBuider: FormBuilder) {
    this.group = this.formBuider.group({email: '',password: ''});
   }

  ngOnInit(): void {
  }

  send():void{
    if(this.group.valid){
      this.formData.emit(this.group.value);
    }
  }

  asingRol(rol:string){
    this.roles = rol;
  } 
}
