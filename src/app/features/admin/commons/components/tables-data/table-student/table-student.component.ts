import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IParent } from 'src/app/features/admin/interfaces/parent';
import { IStudent } from 'src/app/features/admin/interfaces/student';
import { ModalComponent } from 'src/app/shared/components/modals/modal/modal.component';
import { SearchComponent } from 'src/app/shared/components/search/search.component';
import { ParentService } from '../../../services/parent.service';
import { IUser } from 'src/app/features/admin/interfaces/user';
import { Router } from '@angular/router';
import { StudentService } from '../../../services/student.service';
import { IChanguePassword } from 'src/app/features/admin/interfaces/changuePassword';

@Component({
  selector: 'app-table-student',
  templateUrl: './table-student.component.html',
  styleUrls: ['./table-student.component.scss']
})
export class TableStudentComponent implements OnInit {
  apoderados: IParent[] = [];
  filterApoderado: string = '';
  @Input() students!: IStudent[];
  @Input() successful!: boolean;
  parents: IParent[] = [];
  usuario: IUser[] = []
  identiParent: string = '';
  nomParent: string = '';
  existsApoderado: boolean = false;
  selectedApoderado: string = '';
  mensaje = '';

  tiposdocumentos = ['DNI', 'CARNÉ DE EXTRANJERÍA'];
  tiposseguro = ['SIS', 'ESSALUD', 'PRIVADO'];

  @Input() tableName!: string;
  @Input() title!: string;
  close_modal!: boolean;

  showPassword: boolean = false;
  titulo: string = 'Registrar Alumno';

  password2: string = '';
  coinciden = false;
  texto: string = ''
  group2!: FormGroup;
  alumno = '';

  @Output() studentSave: EventEmitter<IStudent> = new EventEmitter();
  @Output() identiParentSave: EventEmitter<string> = new EventEmitter();
  @Output() studentDelete: EventEmitter<string> = new EventEmitter();
  @Output() studentSearch: EventEmitter<string> = new EventEmitter();
  @Output() studentSavePassword: EventEmitter<IChanguePassword> = new EventEmitter();

  @ViewChild('modalAdd') modalAdd!: ModalComponent;
  @ViewChild('modalDelete') modalDelete!: ModalComponent;
  @ViewChild('searchParentModal') searchParentModal!: SearchComponent;
  @ViewChild('apoderadoSelect') studentSelect!: ElementRef;
  @ViewChild('modalChangue') modalChangue!: ModalComponent;
  selectedApoderadoId: string = '';
  nomSearch: string = '';

  group!: FormGroup;
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
    private apoderadoService: ParentService,
    private router: Router) {
  }
  ngOnInit(): void {
    this.form()
    //  console.log(this.students)
    this.form2()

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
  get name() { return this.group.get('usuarioDTO.name') }
  get pa_surname() { return this.group.get('usuarioDTO.pa_surname') }
  get ma_surname() { return this.group.get('usuarioDTO.ma_surname') }
  get birthdate() { return this.group.get('usuarioDTO.birthdate') }
  get type_doc() { return this.group.get('usuarioDTO.type_doc') }
  get numdoc() { return this.group.get('usuarioDTO.numdoc') }
  get tel() { return this.group.get('usuarioDTO.tel') }
  get gra_inst() { return this.group.get('usuarioDTO.gra_inst') }
  get email() { return this.group.get('usuarioDTO.email') }
  get rol() { return this.group.get('usuarioDTO.rol') }
  get apoderado() { return this.group.get('apoderado') }
  get isVacunado() { return this.group.get('isVacunado') }
  get nombreUsuario() { return this.group.get('nombreUsuario') }
  get password() { return this.group.get('password') }
  // APODERADO
  get idApoderado() { return this.group.get('apoderadoDTO.id') }
  get codeA() { return this.group.get('apoderadoDTO.code') }
  get nameApoderado() { return this.group.get('nameApoderado') }
  get pa_surnameA() { return this.group.get('pa_surnameA') }
  get ma_surnameA() { return this.group.get('ma_surnameA') }

  get passwordC() { return this.group2.get('newPassword') }

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
      diseases: [item ? item.diseases : '', [Validators.required]],
      namecon_pri: [item ? item.namecon_pri : '', [Validators.required]],
      telcon_pri: [item ? item.telcon_pri : '', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
      namecon_sec: [item ? item.namecon_sec : ''],
      telcon_sec: [item ? item.telcon_sec : ''],
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
        name: [item ? item.usuarioDTO.name : '', [Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
        pa_surname: [item ? item.usuarioDTO.pa_surname : '', [Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
        ma_surname: [item ? item.usuarioDTO.ma_surname : '', [Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
        birthdate: [item ? item.usuarioDTO.birthdate : '', [Validators.required]],
        type_doc: [item ? item.usuarioDTO.type_doc : '', [Validators.required]],
        numdoc: [item ? item.usuarioDTO.numdoc : '', [Validators.required]],
        tel: [item ? item.usuarioDTO.tel : '', [Validators.minLength(9), Validators.maxLength(9)]],
        email: [item ? item.usuarioDTO.email : '', [Validators.required, Validators.email]],
        password: [item && item ? item.usuarioDTO.password : '', [Validators.required]],
        nombreUsuario: [item && item ? item.usuarioDTO.nombreUsuario : '', [Validators.required]],
      }),

    });

    // Subscribe to the valueChanges of numdoc control in usuarioDTO
    this.group.get('usuarioDTO.numdoc')?.valueChanges.subscribe((numdocValue) => {
      // Update the value of nombreUsuario based on numdocValue
      this.group.get('usuarioDTO.nombreUsuario')?.setValue(numdocValue);
    });

  }

  form2(item?: IStudent) {
    if(item){
      this.alumno = item.usuarioDTO.name + ' ' + item.usuarioDTO.pa_surname + ' ' + item.usuarioDTO.ma_surname;
    }
    this.group2 = this.formBuilder.group({
      
      idUser: [item ? item.usuarioDTO.id : null],
      newPassword: ['', [Validators.required]]
    })
  }

  verificarPassword() {

    const password1: string = this.group2.get('newPassword')?.value;

    if (this.password2 != '' && password1 != '') {
      if (password1 === this.password2) {
        this.coinciden = true;
      } else if (password1 !== this.password2) {
        this.coinciden = false;
        this.texto = 'Las contraseñas no coinciden'
      }
    }
  }

  cancelar() {
    this.password2 = '';
    this.coinciden = false;
  }

  onChangeSelect(event: any) {
    const selectedValue = event.target.value;;
    // Aquí puedes definir las reglas de validación en función de la opción seleccionada
    if (selectedValue === this.tiposdocumentos[0]) {
      this.group.get('usuarioDTO.numdoc')?.setValidators([Validators.required, Validators.minLength(8), Validators.maxLength(8)]);
      this.mensaje = '*El campo requiere 8 caracteres numéricos';
    } else if (selectedValue === this.tiposdocumentos[1]) {
      this.group.get('usuarioDTO.numdoc')?.setValidators([Validators.required, Validators.minLength(20), Validators.maxLength(20)]);
      this.mensaje = '*El campo requiere 20 caracteres numéricos';
    }

    // Actualiza los valores de validación
    this.group.get('usuarioDTO.numdoc')?.updateValueAndValidity();
  }


  searchParent(nom: string) {
    this.nomParent = nom;
    this.parentService.getAll(nom, 0, 5).subscribe(data => {
      this.parents = data.content;
    })
  }
  // BUSCAR
  search(nomSearch: string) {
    console.log(nomSearch)
    this.studentSearch.emit(nomSearch);
  }

  // AGREGAR - ACTUALIZAR
  save() {
    if (this.group.valid) {
      const usuarioDTOFormGroup = this.group.get('usuarioDTO') as FormGroup;
      usuarioDTOFormGroup.addControl('rol', this.formBuilder.control('STUDENT'));
      usuarioDTOFormGroup.addControl('gra_inst', this.formBuilder.control('ESTUDIANTE'));

      this.studentSave.emit(this.group.value)
    }
  }

  save2() {
    if(this.group2.valid){
      this.studentSavePassword.emit(this.group2.value)
    }
  }

  // ELIMINAR
  delete(id: string) {
    this.studentDelete.emit(id)
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


  redirectToDatosPersonales(uniqueIdentifier: string) {
    +
    this.studentService.getReporteDatosPersonales(uniqueIdentifier);
  }
  onUpdateButtonClick(item: any) {
    this.titulo = "Actualizar Alumno";
    this.form(item); // Call the form() function if needed for your logic
    this.modalAdd.showModal();
  }


  // Function to handle when the "Add" button is clicked
  onAddButtonClick() {
    this.group.reset();
    this.titulo = "Registrar Alumno";
    // Any other logic related to the "Add" button can be added here
    this.modalAdd.showModal();
  }
  getCloseModal() {
    this.group.reset();
    this.group2.reset();
    this.form();
    this.form2();
    this.password2= '';
    this.coinciden=false;
    this.texto='';
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }


  searchApoderados(value: string | undefined) {
    if (value !== undefined) {
      this.filterApoderado = value;
      this.apoderadoService.getAll(this.filterApoderado, 0, 5).subscribe(response => {
        if (response.successful && response.data.list) {
          this.apoderados = response.data.list;
        } else {
          this.existsApoderado = true
          this.apoderados = [];
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

  // para poder cerrar y abrirel app-modal automáticamente dependiendo de la rpt de la transacción
  ngOnChanges(changes: SimpleChanges) {
    if (this.successful) {
      this.modalAdd.hiddenModal();
      this.modalChangue.hiddenModal();
    }
  }
}
