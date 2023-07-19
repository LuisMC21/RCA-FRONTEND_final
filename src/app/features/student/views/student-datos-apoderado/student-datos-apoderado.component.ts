import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ParentService } from 'src/app/features/admin/commons/services/parent.service';
import { StudentService } from 'src/app/features/admin/commons/services/student.service';
import { IParent } from 'src/app/features/admin/interfaces/parent';
import { TokenService } from 'src/app/features/auth/commons/services/token.service';
import { ModalComponent } from 'src/app/shared/components/modals/modal/modal.component';

@Component({
  selector: 'app-student-datos-apoderado',
  templateUrl: './student-datos-apoderado.component.html',
  styleUrls: ['./student-datos-apoderado.component.scss']
})
export class StudentDatosApoderadoComponent implements OnInit {

  group!: FormGroup;
  item!: IParent;
  codeT: string = '';

  route = 'Datos / Apoderado';

  msjResponse: string = '';
  successful: boolean = false;

  @ViewChild('modalOk') modalOk!: ModalComponent;


  optionsDocumentType = [{ title: "DNI", value: '01' }, { title: "Pasaporte", value: '02' }, { title: "RUC", value: '03' }]
  optionsVac = [{ title: 'SI', value: 'S' }, { title: 'NO', value: 'N' }]

  constructor(private formBuilder: FormBuilder, private apoderadoService: ParentService,
    private tokenService: TokenService, private studentService: StudentService) { }

  get id() { return this.group.get('id') }
  get code() { return this.group.get('code') }
  get email() { return this.group.get('email') }
  get name() { return this.group.get('name') }
  get pa_surname() { return this.group.get('pa_surname') }
  get ma_surname() { return this.group.get('ma_surname') }
  get birthdate() { return this.group.get('birthdate') }
  get type_doc() { return this.group.get('type_doc') }
  get numdoc() { return this.group.get('numdoc') }
  get tel() { return this.group.get('tel') }

  ngOnInit(): void {
    this.codeT = this.tokenService.getUserId();
    this.form();
    this.obtenerDatos();
  }



  form(item?: IParent): void {
    this.group = this.formBuilder.group({
      id: [item ? item.id : null],
      code: [item ? item.code : ''],
      pa_surname: [item ? item.pa_surname : '', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      ma_surname: [item ? item.ma_surname : '', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      birthdate: [item ? item.birthdate : ''],
      name: [item ? item.name : '', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      type_doc: [item ? item.type_doc : ''],
      numdoc: [item ? item.numdoc : '', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      tel: [item ? item.tel : '', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
      email: [item ? item.email : '', [Validators.required, Validators.email]],
    });
  }

  async obtenerDatos(){
    try {
      const response = await this.studentService.getOne(this.codeT).toPromise();
      if (response && response.data) {
        this.item = response.data.apoderadoDTO;
      }
      this.form(this.item);
    } catch (error) {
      console.log(error);
    }
  }

  save() {
    if (this.group.valid) {
      this.apoderadoService.update(this.group.value).subscribe(data => {
        console.log(data)
        if (data.message === 'ok') {
          this.msjResponse = 'Cambios actualizados con éxito';
          this.successful = true;
        } else {
          this.msjResponse = 'Ha ocurrido un error :(';
          this.successful = false;
        }
      })
      this.modalOk.showModal();
    }
  }

  refresh(){
    window.location.reload();
  }

}
