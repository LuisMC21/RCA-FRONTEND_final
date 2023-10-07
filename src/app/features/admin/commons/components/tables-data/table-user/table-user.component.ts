import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IChanguePassword } from 'src/app/features/admin/interfaces/changuePassword';
import { IUser } from 'src/app/features/admin/interfaces/user';
import { ModalComponent } from 'src/app/shared/components/modals/modal/modal.component';

@Component({
  selector: 'app-table-user',
  templateUrl: './table-user.component.html',
  styleUrls: ['./table-user.component.scss']
})
export class TableUserComponent implements OnInit {

  @Input() users!: IUser[];
  @Input() tableName!: string;
  @Input() title!: string;
  @Input() successful!: boolean;

  showPassword: boolean = false;
  titulo: string = 'Registrar Admin';
  nomSearch: string = '';
  mensaje = '';

  password2: string = '';
  coinciden = false;
  texto: string = ''
  group2!: FormGroup;
  user= '';

  @Output() userSave: EventEmitter<IUser> = new EventEmitter();
  @Output() userDelete: EventEmitter<string> = new EventEmitter();
  @Output() userSearch: EventEmitter<string> = new EventEmitter();
  @Output() userSavePassword: EventEmitter<IChanguePassword> = new EventEmitter();

  @ViewChild('modalAdd') modalAdd!: ModalComponent;
  @ViewChild('modalDelete') modalDelete!: ModalComponent;
  @ViewChild('modalChangue') modalChangue!: ModalComponent;

  group!: FormGroup;

  optionsDocumentType = ['DNI', 'CARNÉ DE EXTRANJERÍA'];
  optionsVac = [
    { title: 'SI', value: 'S' },
    { title: 'NO', value: 'N' }
  ]
  optionsGrade = [
    { title: 'Superior Técnica', value: 'T' },
    { title: 'Superior Universitaria', value: 'U' }];

  head = ["Codigo", "Administrador", "Documento", "n° documento", "Teléfono", "Correo", "Grado", "Acciones"]
  msjResponse: string = '';

  constructor(private formBuilder: FormBuilder) { }


  get pa_surname() { return this.group.get('pa_surname') }
  get ma_surname() { return this.group.get('ma_surname') }
  get name() { return this.group.get('name') }
  get type_doc() { return this.group.get('type_doc') }
  get numdoc() { return this.group.get('numdoc') }
  get gra_inst() { return this.group.get('gra_inst') }
  get nombreUsuario() { return this.group.get('nombreUsuario') }
  get birthdate() { return this.group.get('birthdate') }
  get tel() { return this.group.get('tel') }
  get email() { return this.group.get('email') }
  get password() { return this.group.get('password') }

  get passwordC() { return this.group2.get('newPassword') }

  ngOnInit(): void {
    this.form();

    this.form2()
  }

  form(item?: IUser): void {
    
    this.group = this.formBuilder.group({
      id: [item && item ? item.id : null],
      code: [item && item ? item.code : ''],
      nombreUsuario: [item && item ? item.nombreUsuario : '', [Validators.required]],
      name: [item ? item.name : '', [Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
      pa_surname: [item ? item.pa_surname : '', [Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
      ma_surname: [item ? item.ma_surname : '', [Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
      birthdate: [item && item ? item.birthdate : null],
      type_doc: [item && item ? item.type_doc : '', [Validators.required]],
      numdoc: [item ? item.numdoc : '',[Validators.required]],
      tel: [item ? item.tel : '', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
      gra_inst: [item && item ? item.gra_inst : '', [Validators.required]],
      email: [item && item ? item.email : '', [Validators.required, Validators.email]],
      password: [item && item ? item.password : '', [Validators.required]]
    });

    // Subscribe to the valueChanges of numdoc control in usuarioDTO
    this.group.get('numdoc')?.valueChanges.subscribe((numdocValue) => {
      // Update the value of nombreUsuario based on numdocValue
      this.group.get('nombreUsuario')?.setValue(numdocValue);
    });
  }

  onChangeSelect(event: any) {
    const selectedValue = event.target.value;;
    // Aquí puedes definir las reglas de validación en función de la opción seleccionada
    if (selectedValue === this.optionsDocumentType[0]) {
      this.group.get('numdoc')?.setValidators([Validators.required, Validators.minLength(8), Validators.maxLength(8)]);
      this.mensaje = '*El campo requiere 8 caracteres numéricos';
    } else if (selectedValue === this.optionsDocumentType[1]) {
      this.group.get('numdoc')?.setValidators([Validators.required, Validators.minLength(20), Validators.maxLength(20)]);
      this.mensaje = '*El campo requiere 20 caracteres numéricos';
    }
  }

  form2(item?: IUser) {
    if(item){
      this.user= item.name + ' ' + item.pa_surname + ' ' + item.ma_surname;
    }
    this.group2 = this.formBuilder.group({
      
      idUser: [item ? item.id : null],
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

  // BUSCAR
  search(nom: string) {
    this.userSearch.emit(nom);
  }

  // AGREGAR - ACTUALIZAR
  save() {
    if (this.group.valid) {
      this.group.addControl('rol', this.formBuilder.control('ADMINISTRADOR'));

      this.userSave.emit(this.group.value)
      console.log(this.group.value)
    }
  }

  save2() {
    if(this.group2.valid){
      this.userSavePassword.emit(this.group2.value)
    }
  }

  // ELIMINAR
  delete(id: string) {
    this.userDelete.emit(id)
  }

  reset() {
    this.group.reset();
  }
  onUpdateButtonClick(item: any) {
    this.titulo = "Actualizar Administrador";
    this.form(item); // Call the form() function if needed for your logic
    this.modalAdd.showModal();
  }

  // Function to handle when the "Add" button is clicked
  onAddButtonClick() {
    this.group.reset();
    this.titulo = "Registrar Administrador";
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
  // para poder cerrar y abrirel app-modal automáticamente dependiendo de la rpt de la transacción
  ngOnChanges(changes: SimpleChanges) {
    if (this.successful) {
      console.log('Changes in successful:', changes['successful']);
      this.modalAdd.hiddenModal();
      this.modalChangue.hiddenModal();
    }
  }

}
