import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  @Output() userSave: EventEmitter<IUser> = new EventEmitter();
  @Output() userDelete: EventEmitter<string> = new EventEmitter();
  @Output() userSearch: EventEmitter<string> = new EventEmitter();

  @ViewChild('modalAdd') modalAdd!: ModalComponent;
  @ViewChild('modalDelete') modalDelete!: ModalComponent;

  group!: FormGroup;

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

  ngOnInit(): void {
    this.form();
  }

  form(item?: IUser): void {

    this.group = this.formBuilder.group({
      id: [item && item ? item.id : null],
      code: [item && item ? item.code : ''],
      nombreUsuario: [item && item ? item.nombreUsuario : '', [Validators.required]],
      name: [item ? item.name : '', [Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
      pa_surname: [item ? item.pa_surname : '', [Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
      ma_surname: [item ? item.ma_surname : '', [Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
      birthdate: [item && item ? item.birthdate : null, [Validators.required]],
      type_doc: [item && item ? item.type_doc : '', [Validators.required]],
      numdoc: [item ? item.numdoc : '', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
      tel: [item ? item.tel : '', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
      gra_inst: [item && item ? item.gra_inst : '', [Validators.required]],
      email: [item && item ? item.email : '', [Validators.required, Validators.email]],
      password: [item && item ? item.password : '', [Validators.required]],
      rol: ['ADMINISTRADOR']

    });

    // Subscribe to the valueChanges of numdoc control in usuarioDTO
    this.group.get('usuarioDTO.numdoc')?.valueChanges.subscribe((numdocValue) => {
      // Update the value of nombreUsuario based on numdocValue
      this.group.get('usuarioDTO.nombreUsuario')?.setValue(numdocValue);
    });
  }

  // BUSCAR
  search(nom: string) {
    this.userSearch.emit(nom);
  }

  // AGREGAR - ACTUALIZAR
  save() {
    if (this.group.valid) {
      this.userSave.emit(this.group.value)
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
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  // para poder cerrar y abrirel app-modal automáticamente dependiendo de la rpt de la transacción
  ngOnChanges(changes: SimpleChanges) {
    if (this.successful) {
      console.log('Changes in successful:', changes['successful']);
      this.modalAdd.hiddenModal();
    }
  }

}
