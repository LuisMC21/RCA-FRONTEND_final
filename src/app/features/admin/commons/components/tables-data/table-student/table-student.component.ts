import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IParent } from 'src/app/features/admin/interfaces/parent';
import { IStudent } from 'src/app/features/admin/interfaces/student';
import { ModalComponent } from 'src/app/shared/components/modals/modal/modal.component';
import { SearchComponent } from 'src/app/shared/components/search/search.component';
import { ParentService } from '../../../services/parent.service';
import { IUser } from 'src/app/features/admin/interfaces/user';
import { Router } from '@angular/router';
import { StudentService } from '../../../services/student.service';

@Component({
  selector: 'app-table-student',
  templateUrl: './table-student.component.html',
  styleUrls: ['./table-student.component.scss']
})
export class TableStudentComponent implements OnInit {
  apoderados: IParent[] = [];
  filterApoderado: string = '';
  @Input() students!: IStudent[];
  parents: IParent[] = [];
  usuario: IUser[] = []
  identiParent: string = '';
  nomParent: string = '';
  existsApoderado: boolean = false;
  selectedApoderado: string = '';

  tiposdocumentos = ['DNI', 'CARNÉ DE EXTRANJERÍA'];
  tiposseguro = ['SIS', 'ESSALUD', 'PRIVADO'];

  @Input() tableName!: string;
  @Input() title!: string;
  close_modal!: boolean;

  showPassword: boolean = false;
  titulo: string = 'Agregar Alumno';

  @Output() studentSave: EventEmitter<IStudent> = new EventEmitter();
  @Output() identiParentSave: EventEmitter<string> = new EventEmitter();
  @Output() studentDelete: EventEmitter<string> = new EventEmitter();
  @Output() studentSearch: EventEmitter<string> = new EventEmitter();

  @ViewChild('modalAdd') modalAdd!: ModalComponent;
  @ViewChild('modalDelete') modalDelete!: ModalComponent;
  @ViewChild('searchParentModal') searchParentModal!: SearchComponent;
  @ViewChild('apoderadoSelect') studentSelect!: ElementRef;
  selectedApoderadoId: string = '';

  group!: FormGroup;
  optionsDocumentType = [
    { title: "DNI", value: '01' },
    { title: "Pasaporte", value: '02' },
    { title: "RUC", value: '03' },
  ]
  optionsVac = [
    { title: 'SI', value: 'S' },
    { title: 'NO', value: 'N' }
  ]
  optionsInsuraceType = [
    { title: 'ESSALUD', value: 'E' },
    { title: 'SIS', value: 'S' },
    { title: 'Privado', value: 'P' },
    { title: 'Fuerza Armada', value: 'F' }
  ];
  head = ["CODIGO", "APELLIDOS", "NOMBRE", "DOC. de IDENTIDAD", "CORREO", "TELÉFONO", "VACUNA", "SEGURO", "CONTACTO", "ACCIONES"]
  msjDeleteok: string = '';

  constructor(private renderer2: Renderer2,
    private formBuilder: FormBuilder,
    private parentService: ParentService,
    private studentService: StudentService,
    private apoderadoService:ParentService,
    private router: Router) {
  }
  ngOnInit(): void {
    this.form()
    //  console.log(this.students)
  }
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
  // APODERADO
  get idApoderado() { return this.group.get('apoderadoDTO.id') }
  get codeA() { return this.group.get('apoderadoDTO.code') }
  get nameApoderado() { return this.group.get('nameApoderado') }
  get pa_surnameA() { return this.group.get('pa_surnameA') }
  get ma_surnameA() { return this.group.get('ma_surnameA') }

  // Modal
  isEditing: boolean = false;
  form(item?: IStudent) {

    if (item) {
      this.titulo = "Actualizar Alumno";
    }

    // this.nomParent = item?item.apoderado:'';
    this.group = this.formBuilder.group({
      // ALUMNO

      id: [item ? item.id : null],
      code: [item ? item.code : ''],
      diseases: [item ? item.diseases : '',[Validators.required]],
      namecon_pri: [item ? item.namecon_pri : 'Contacto 1',[Validators.required]],
      telcon_pri: [item ? item.telcon_pri : '', [Validators.required, Validators.minLength(9),Validators.maxLength(9)] ],
      namecon_sec: [item ? item.namecon_sec : 'Contacto 2', [Validators.required]],
      telcon_sec: [item ? item.telcon_sec : '', [Validators.required, Validators.minLength(9),Validators.maxLength(9)]],
      vaccine: [item ? item.vaccine : '', [Validators.required]],
      type_insurance: [item ? item.type_insurance : '', [Validators.required]],
      apoderadoDTO: this.formBuilder.group({
        id: [item ? item.apoderadoDTO.id : null],
        code: [item ? item.apoderadoDTO.code : ''],
        name: [item ? item.apoderadoDTO.name + ' ' + item.apoderadoDTO.pa_surname + ' ' + item.apoderadoDTO.ma_surname : '', [Validators.required, Validators.minLength(9)]],

      }),
      // USUARIO

      usuarioDTO: this.formBuilder.group({
        id: [item ? item.usuarioDTO.id : null],
        code: [item ? item.usuarioDTO.code : ''],
        nombreUsuario: [item ? item.usuarioDTO.nombreUsuario : '', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
        name: [item ? item.usuarioDTO.name : '', [Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
        pa_surname: [item ? item.usuarioDTO.pa_surname : '', [Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
        ma_surname: [item ? item.usuarioDTO.ma_surname : '', [Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
        birthdate: [item ? item.usuarioDTO.birthdate : '',[Validators.required]],
        type_doc: [item ? item.usuarioDTO.type_doc : '', [Validators.required]],
        numdoc: [item ? item.usuarioDTO.numdoc : '', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
        tel: [item ? item.usuarioDTO.tel : '', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
        email: [item ? item.usuarioDTO.email : '', [Validators.required, Validators.email]],
        password: [item ? item.usuarioDTO.password : '', [Validators.required,]],
      }),

    });

    // Subscribe to the valueChanges of numdoc control in usuarioDTO
    this.group.get('usuarioDTO.numdoc')?.valueChanges.subscribe((numdocValue) => {
      // Update the value of nombreUsuario based on numdocValue
      this.group.get('usuarioDTO.nombreUsuario')?.setValue(numdocValue);
    });
  }

  searchParent(nom: string) {
    this.nomParent = nom;
    this.parentService.getAll(nom, 0, 5).subscribe(data => {
      this.parents = data.content;
    })
  }
  // BUSCAR
  search(nom: string) {
    this.studentSearch.emit(nom);
  }

  // AGREGAR - ACTUALIZAR
  save() {
    if (this.group.valid) {
      const usuarioDTOFormGroup = this.group.get('usuarioDTO') as FormGroup;
      usuarioDTOFormGroup.addControl('rol', this.formBuilder.control('STUDENT'));
      usuarioDTOFormGroup.addControl('gra_inst', this.formBuilder.control('ESTUDIANTE'));

      this.studentSave.emit(this.group.value)
    }

    if (this.titulo == "Actualizar Alumno") {
      this.titulo = "Agregar Alumno";
    }
  }

  // ELIMINAR
  delete(id: string) {
    this.studentDelete.emit(id)
    this.modalDelete.hiddenModal();
  }

  keyUp(string: string) {
    if (string === '') {
      this.searchParentModal.hidden()
    }
  }
  //ASIGNA APODERADO
  asingParent(parent: IParent) {
    this.nomParent = parent.pa_surname + ' ' + parent.ma_surname + ' ' + parent.name;
    this.identiParent = parent.id;
    this.searchParentModal.hidden();
  }
  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  reset() {
    if (this.titulo == "Actualizar Alumno") {
      this.titulo = "Agregar Alumno";
    }

    this.group.reset()
  }

  redirectToDatosPersonales(uniqueIdentifier: string) {+
    this.studentService.getReporteDatosPersonales(uniqueIdentifier);
  }

  getCloseModal(){
    this.group.reset();
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }


  searchApoderados(value: string | undefined) {
    if (value !== undefined) {
      this.filterApoderado = value;
      this.apoderadoService.getAll(this.filterApoderado,  0, 5).subscribe(response => {
        if(response.successful && response.data.list){
          this.apoderados = response.data.list;
        } else {
          this.existsApoderado = true
          this.apoderados= [];
        }
      });
    }
  }

  selectApoderado(apoderado: IParent) {
    this.selectedApoderado = `${apoderado.pa_surname} ${apoderado.ma_surname} ${apoderado.name}`;
    this.existsApoderado = false;
    this.selectedApoderadoId = apoderado.id;
    this.apoderados = [];
    const usuarioDTOFormGroup = this.group.get('apoderadoDTO') as FormGroup;
    usuarioDTOFormGroup.get('name')?.setValue(this.selectedApoderado);
    usuarioDTOFormGroup.get('id')?.setValue(this.selectedApoderadoId);
  }
}
