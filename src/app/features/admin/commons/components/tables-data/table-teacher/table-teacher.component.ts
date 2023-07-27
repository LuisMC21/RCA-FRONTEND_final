import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ITeacher } from 'src/app/features/admin/interfaces/teacher';
import { ModalComponent } from 'src/app/shared/components/modals/modal/modal.component';

@Component({
  selector: 'app-table-teacher',
  templateUrl: './table-teacher.component.html',
  styleUrls: ['./table-teacher.component.scss']
})
export class TableTeacherComponent implements OnInit {

  @Input() teachers!: ITeacher[];
  @Input() tableName!: string;
  @Input() title!: string;
  @Input() successful!: boolean;

  showPassword: boolean = false;
  titulo: string = 'Agregar Docente';
  nomSearch: string = '';

  @Output() teacherSave: EventEmitter<ITeacher> = new EventEmitter();
  @Output() teacherDelete: EventEmitter<string> = new EventEmitter();
  @Output() teacherSearch: EventEmitter<string> = new EventEmitter();

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

  head = ["Codigo", "Docente", "Documento","n° documento", "Teléfono","Correo", "Especialidad", "Grado", "Acciones"]
  msjResponse: string = '';

  constructor(private formBuilder: FormBuilder) { }

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
  get password(){return this.group.get('usuarioDTO.password')}

  ngOnInit(): void {
    this.form();
  }

  form(item?: ITeacher): void {

    this.group = this.formBuilder.group({
      id: [item ? item.id : null],
      code: [item ? item.code : ''],
      experience: [item ? item.experience : '', [Validators.required]],
      dose: [item ? item.dose : '', [Validators.required]],
      specialty: [item ? item.specialty : '', [Validators.required]],
      usuarioDTO: this.formBuilder.group({
        id: [item && item.usuarioDTO ? item.usuarioDTO.id : null],
        code: [item && item.usuarioDTO ? item.usuarioDTO.code : ''],
        nombreUsuario: [item && item.usuarioDTO ? item.usuarioDTO.nombreUsuario : '', [Validators.required]],
        name: [item ? item.usuarioDTO.name : '', [Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
        pa_surname: [item ? item.usuarioDTO.pa_surname : '', [Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
        ma_surname: [item ? item.usuarioDTO.ma_surname : '', [Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
        birthdate: [item && item.usuarioDTO ? item.usuarioDTO.birthdate : null, [Validators.required]],
        type_doc: [item && item.usuarioDTO ? item.usuarioDTO.type_doc : '', [Validators.required]],
        numdoc: [item ? item.usuarioDTO.numdoc : '', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
        tel: [item ? item.usuarioDTO.tel : '', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
        gra_inst: [item && item.usuarioDTO ? item.usuarioDTO.gra_inst : '', [Validators.required]],
        email: [item && item.usuarioDTO ? item.usuarioDTO.email : '', [Validators.required, Validators.email]],
        password: [item && item.usuarioDTO ? item.usuarioDTO.password : ''],
        rol: ['TEACHER']
      })
    });

    // Subscribe to the valueChanges of numdoc control in usuarioDTO
    this.group.get('usuarioDTO.numdoc')?.valueChanges.subscribe((numdocValue) => {
      // Update the value of nombreUsuario based on numdocValue
      this.group.get('usuarioDTO.nombreUsuario')?.setValue(numdocValue);
    });
  }

  // BUSCAR
  search(nom: string) {
    this.teacherSearch.emit(nom);
  }

  // AGREGAR - ACTUALIZAR
  save() {
    if (this.group.valid) {
      this.teacherSave.emit(this.group.value)
    }
    this.modalAdd.hiddenModal();


  }

  // ELIMINAR
  delete(id: string) {
    this.teacherDelete.emit(id)
    this.modalDelete.hiddenModal();
  }

  reset(){

    console.log(this.group.value);
    this.group.reset();

  }
  onUpdateButtonClick(item: any) {
    this.titulo = "Actualizar Docente";
    this.form(item); // Call the form() function if needed for your logic
    this.modalAdd.showModal();
  }

  // Function to handle when the "Add" button is clicked
  onAddButtonClick() {
    this.titulo = "Agregar Docente";
    // Any other logic related to the "Add" button can be added here
    this.modalAdd.showModal();
  }
  getCloseModal(){
    this.group.reset();
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }


}
