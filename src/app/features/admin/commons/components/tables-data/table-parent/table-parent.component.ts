import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IParent } from 'src/app/features/admin/interfaces/parent';
import { ModalComponent } from 'src/app/shared/components/modals/modal/modal.component';

@Component({
  selector: 'app-table-parent',
  templateUrl: './table-parent.component.html',
  styleUrls: ['./table-parent.component.scss']
})
export class TableParentComponent implements OnInit {
  @Input() successful!: boolean;
  @Input() parents: IParent[] = [];
  @Input() tableName!: string;
  @Input() title!: string;
  titulo: string = "Registrar Apoderado";
  @Output() parentSave: EventEmitter<IParent> = new EventEmitter();
  @Output() parentDelete: EventEmitter<string> = new EventEmitter();
  @Output() parentSearch: EventEmitter<string> = new EventEmitter();

  @ViewChild('modalAdd') modalAdd!: ModalComponent;
  @ViewChild('modalDelete') modalDelete!: ModalComponent;

  group!: FormGroup;
  groupUpdate!: FormGroup;
  head = ["Codigo", "Apoderado", "Fecha de nacimiento", "Doc. de identidad", "Telefono", "Correo", "Acciones"]
  optionsDocumentType = [{ title: "DNI", value: '01' }, { title: "Pasaporte", value: '02' }, { title: "RUC", value: '03' }]
  optionsVac = [{ title: 'SI', value: 'S' }, { title: 'NO', value: 'N' }]
  nom: string = '';
  showPassword: boolean = false;
  mensaje = '';

  tiposdocumentos = ['DNI', 'CARNÉ DE EXTRANJERÍA'];
  tiposseguro = ['SIS', 'ESSALUD', 'PRIVADO'];

  constructor(private formBuilder: FormBuilder) {

  }


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
    this.form();

  }

  form(item?: IParent): void {
    this.group = this.formBuilder.group({
      id: [item ? item.id : null],
      code: [item ? item.code : ''],
      name: [item ? item.name : '', [Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
        pa_surname: [item ? item.pa_surname : '', [Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
        ma_surname: [item ? item.ma_surname : '', [Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
      birthdate: [item ? item.birthdate : ''],
      type_doc: [item ? item.type_doc : '', [Validators.required]],
      numdoc: [item ? item.numdoc : '', [Validators.required]],
      tel: [item ? item.tel : '', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
      email: [item ? item.email : '', [Validators.required, Validators.email]],
    });
  }

  onChangeSelect(event: any) {
    const selectedValue = event.target.value;;
    // Aquí puedes definir las reglas de validación en función de la opción seleccionada
    if (selectedValue === this.tiposdocumentos[0]) {
      this.group.get('numdoc')?.setValidators([Validators.required, Validators.minLength(8), Validators.maxLength(8)]);
      this.mensaje = '*El campo requiere 8 caracteres numéricos';
    } else if (selectedValue === this.tiposdocumentos[1]) {
      this.group.get('numdoc')?.setValidators([Validators.required, Validators.minLength(20), Validators.maxLength(20)]);
      this.mensaje = '*El campo requiere 20 caracteres numéricos';
    }

    // Actualiza los valores de validación
    this.group.get('usuarioDTO.numdoc')?.updateValueAndValidity();
  }

  // BUSCAR
  search(nom: string) {
    this.parentSearch.emit(nom);
  }

  // AGREGAR - ACTUALIZAR
  save() {
    if (this.group.valid) {
      this.parentSave.emit(this.group.value)
    }
  }

  // ELIMINAR
  delete(id: string) {
    this.parentDelete.emit(id)
  }
  onUpdateButtonClick(item: any) {
    this.titulo = "Actualizar Apoderado";
    this.form(item); // Call the form() function if needed for your logic
    this.modalAdd.showModal();
  }

  // Function to handle when the "Add" button is clicked
  onAddButtonClick() {
    this.group.reset();
    this.titulo = "Registrar Apoderado";
    // Any other logic related to the "Add" button can be added here
    this.modalAdd.showModal();
  }
  getCloseModal() {
    this.group.reset();
    this.form();
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  // para poder cerrar y abrirel app-modal automáticamente dependiendo de la rpt de la transacción
  ngOnChanges(changes: SimpleChanges) {
    if (this.successful) {
      this.modalAdd.hiddenModal();
    }
  }

}
