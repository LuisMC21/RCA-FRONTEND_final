import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TeacherService } from 'src/app/features/admin/commons/services/teacher.service';
import { ITeacher } from 'src/app/features/admin/interfaces/teacher';
import { TokenService } from 'src/app/features/auth/commons/services/token.service';
import { ModalComponent } from 'src/app/shared/components/modals/modal/modal.component';

@Component({
  selector: 'app-teacher-datos',
  templateUrl: './teacher-datos.component.html',
  styleUrls: ['./teacher-datos.component.scss']
})
export class TeacherDatosComponent implements OnInit {

  group!: FormGroup;
  isFieldDisabled: boolean = true;
  item!: ITeacher;
  code: string = '';

  route = 'Datos';

  msjResponse:string='';
  successful: boolean=false;

  @ViewChild('modalOk') modalOk!:ModalComponent;

  optionsVac = [
    { title: 'SI', value: 'S' },
    { title: 'NO', value: 'N' }
  ]
  optionsGrade = [
    { title: 'Superior Técnica', value: 'T' },
    { title: 'Superior Universitaria', value: 'U' }];

  constructor(private formBuilder: FormBuilder, private teacherService: TeacherService,
    private tokenService: TokenService) { }

  get pa_surname() { return this.group.get('usuarioDTO.pa_surname') }
  get ma_surname() { return this.group.get('usuarioDTO.ma_surname') }
  get name() { return this.group.get('usuarioDTO.name') }
  get type_doc() { return this.group.get('usuarioDTO.type_doc') }
  get numdoc() { return this.group.get('usuarioDTO.numdoc') }
  get gra_inst() { return this.group.get('usuarioDTO.gra_inst') }
  get experience(){return this.group.get('experience')}
  get dose(){return this.group.get('dose')}
  get specialty(){return this.group.get('specialty')}
  get nombreUsuario(){return this.group.get('nombreUsuario')}
  get birthdate(){return this.group.get('usuarioDTO.birthdate')}
  get tel(){return this.group.get('usuarioDTO.tel')}
  get email(){return this.group.get('usuarioDTO.email')}

  ngOnInit(): void {
    this.code = this.tokenService.getUserId();
    this.form(); // Move the form() call here
    this.obtenerDatos();
    
  }

  form(item?: ITeacher): void {
    this.group = this.formBuilder.group({
      id: [item ? item.id : null],
      code:[item?item.code: ''],
      experience: [item ? item.experience : '', [Validators.required]],
      dose: [item ? item.dose : '', [Validators.required]],
      specialty: [item ? item.specialty : '', [Validators.required]],
      usuarioDTO: this.formBuilder.group({
        id: [item && item.usuarioDTO ? item.usuarioDTO.id : null],
        code: [item && item.usuarioDTO ? item.usuarioDTO.code : ''],
        nombreUsuario: [item && item.usuarioDTO ? item.usuarioDTO.nombreUsuario : '', [Validators.required]],
        name: [item && item.usuarioDTO ? item.usuarioDTO.name : '', [Validators.required]],
        pa_surname: [item && item.usuarioDTO ? item.usuarioDTO.pa_surname : '', [Validators.required]],
        ma_surname: [item && item.usuarioDTO ? item.usuarioDTO.ma_surname : '', [Validators.required]],
        birthdate: [item && item.usuarioDTO ? item.usuarioDTO.birthdate : null, [Validators.required]],
        type_doc: [item && item.usuarioDTO ? item.usuarioDTO.type_doc : '', [Validators.required]],
        numdoc: [item && item.usuarioDTO ? item.usuarioDTO.numdoc : '', [Validators.required]],
        tel: [item && item.usuarioDTO ? item.usuarioDTO.tel : '', [Validators.required]],
        gra_inst: [item && item.usuarioDTO ? item.usuarioDTO.gra_inst : '', [Validators.required]],
        email: [item && item.usuarioDTO ? item.usuarioDTO.email : '', [Validators.required, Validators.email]],
        password: [item && item.usuarioDTO ? item.usuarioDTO.password : ''],
        rol: ['TEACHER']
      })
    });
  }

  async obtenerDatos(){
    try {
      const response = await this.teacherService.getAll(this.code,0,5).toPromise();
      console.log(response);
      if (response && response.data && response.data.list) {
        
        this.item = response.data.list[0];
      }

      this.form(this.item);
    } catch (error) {
      console.log(error);
    }
  }

  save() {
    if (this.group.valid) {
      this.teacherService.update(this.group.value).subscribe(data =>{
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

}
