import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentService } from 'src/app/features/admin/commons/services/student.service';
import { IStudent } from 'src/app/features/admin/interfaces/student';
import { TokenService } from 'src/app/features/auth/commons/services/token.service';
import { ModalComponent } from 'src/app/shared/components/modals/modal/modal.component';

@Component({
  selector: 'app-student-datos-alumno',
  templateUrl: './student-datos-alumno.component.html',
  styleUrls: ['./student-datos-alumno.component.scss']
})
export class StudentDatosAlumnoComponent implements OnInit {

  group!: FormGroup;
  item!: IStudent;
  codeT: string = '';

  msjResponse:string='';
  successful: boolean=false;

  @ViewChild('modalOk') modalOk!:ModalComponent;

  optionsDocumentType = [
    { title: "DNI", value: 'DNI' },
    { title: "CE", value: 'CE' },
    { title: "Pasaporte", value: 'Pasaporte' },
    { title: "Partida de Nacimiento", value: 'Partida' },
  ]
  optionsVac = [
    { title: 'SI', value: 'S' },
    { title: 'NO', value: 'N' }
  ]
  optionsGrade = [
    { title: 'Superior Técnica', value: 'T' },
    { title: 'Superior Universitaria', value: 'U' }];

  constructor(private formBuilder: FormBuilder, private studentService: StudentService,
    private tokenService: TokenService) { }

  // ALUMNO
  get id() { return this.group.get('id') }
  get code() { return this.group.get('code') }
  get diseases() { return this.group.get('diseases') }
  get namecon_pri() { return this.group.get('namecon_pri') }
  get telcon_pri() { return this.group.get('telcon_pri') }
  get namecon_sec() { return this.group.get('namecon_sec') }
  get telcon_sec() { return this.group.get('telcon_sec') }
  get vaccine() { return this.group.get('vaccine') }
  get type_insurance() { return this.group.get('type_insurance') }
  // USUARIO
  get idUsuario() { return this.group.get('usuarioDTO.id') }
  get codeUsuario() { return this.group.get('usuarioDTO.code') }
  get nombreUsuario() { return this.group.get('usuarioDTO.nombreUsuario') }
  get name() { return this.group.get('usuarioDTO.name') }
  get pa_surname() { return this.group.get('usuarioDTO.pa_surname') }
  get ma_surname() { return this.group.get('usuarioDTO.ma_surname') }
  get birthdate() { return this.group.get('usuarioDTO.birthdate') }
  get type_doc() { return this.group.get('usuarioDTO.type_doc') }
  get numdoc() { return this.group.get('usuarioDTO.numdoc') }
  get tel() { return this.group.get('usuarioDTO.tel') }
  get gra_inst() { return this.group.get('usuarioDTO.gra_inst') }
  get email() { return this.group.get('usuarioDTO.email') }
  get password() { return this.group.get('usuarioDTO.password') }
  get rol() { return this.group.get('usuarioDTO.rol') }
  get apoderado() { return this.group.get('apoderado') }
  get isVacunado() { return this.group.get('isVacunado') }

  ngOnInit(): void {
    this.codeT = this.tokenService.getUserId();
    this.form();
    this.obtenerDatos();

  }

  form(item?: any): void {
    console.log(item?.usuarioDTO.pa_surname);
    this.group = this.formBuilder.group({
      // ALUMNO
      id: [item ? item.id : null],
      code: [item ? item.code : ''],
      diseases: [item ? item.diseases : ''],
      namecon_pri: [item ? item.namecon_pri : ''],
      telcon_pri: [item ? item.telcon_pri : ''],
      namecon_sec: [item ? item.namecon_sec : ''],
      telcon_sec: [item ? item.telcon_sec : ''],
      vaccine: [item ? item.vaccine : ''],
      type_insurance: [item ? item.type_insurance : ''],
      apoderadoDTO: this.formBuilder.group({
        id: [item ? item.apoderadoDTO.id : null],
        code: [item ? item.apoderadoDTO.code : ''],
        name: [item ? item.apoderadoDTO.name + ' ' + item.apoderadoDTO.pa_surname + ' ' + item.apoderadoDTO.ma_surname : ''],

      }),
      usuarioDTO: this.formBuilder.group({
        id: [item ? item.usuarioDTO.id : null],
        code: [item ? item.usuarioDTO.code : ''],
        nombreUsuario: [item ? item.usuarioDTO.nombreUsuario : '', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
        name: [item ? item.usuarioDTO.name : '', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
        pa_surname: [item ? item.usuarioDTO.pa_surname : '', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
        ma_surname: [item ? item.usuarioDTO.ma_surname : '', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
        birthdate: [item ? item.usuarioDTO.birthdate : ''],
        type_doc: [item ? item.usuarioDTO.type_doc : '', [Validators.required]],
        numdoc: [item ? item.usuarioDTO.numdoc : '', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
        tel: [item ? item.usuarioDTO.tel : ''],
        gra_inst: [item ? item.usuarioDTO.gra_inst : '', [Validators.required,]],
        email: [item ? item.usuarioDTO.email : '', [Validators.required,]],
        password: [item ? item.usuarioDTO.password : '', [Validators.required,]],
        rol: ['STUDENT']
      }),

    });
  }

  save() {
    if (this.group.valid) {
      this.studentService.update(this.group.value).subscribe(data =>{
        console.log(data)
        if(data.message === 'ok'){
          this.msjResponse = 'Cambios actualizados con éxito';
          this.successful=true;
        }else{
          this.msjResponse = 'Ha ocurrido un error :(';
          this.successful=false;
        }
      })
      this.modalOk.showModal();
    }
  }
  async obtenerDatos(){
    try {
      const response = await this.studentService.getOne(this.codeT).toPromise();
      if (response && response.data) {
        this.item = response.data;
      }
      this.form(this.item);
    } catch (error) {
      console.log(error);
    }
  }
}
