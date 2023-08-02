import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { INews } from 'src/app/features/admin/interfaces/news';
import { INewsGet } from 'src/app/features/admin/interfaces/newsGet';
import { IUser } from 'src/app/features/admin/interfaces/user';
import { TokenService } from 'src/app/features/auth/commons/services/token.service';
import { ModalComponent } from 'src/app/shared/components/modals/modal/modal.component';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-table-news',
  templateUrl: './table-news.component.html',
  styleUrls: ['./table-news.component.scss']
})
export class TableNewsComponent implements OnInit {

  group!: FormGroup;
  nomSearch: string = '';
  head = ["TITULO", "SUMILLA", "DESCRIPCIÓN", "FECHA", "IMAGEN", "ACCIONES"]
  @Input() news: INewsGet[] = []
  @Input() tableName!: string;
  @Input() successful!: boolean;

  titulo:string = 'Agregar Noticia';
  imagenBase64: string = '';
  editar:Boolean = false;
  imagenSelected:Boolean = false;

  item!: INewsGet;

  usuario: string = '';
  usuarioDTO!: IUser;


  @Output() newSave: EventEmitter<INews> = new EventEmitter;
  @Output() newDelete: EventEmitter<string> = new EventEmitter;
  @Output() newSearch: EventEmitter<string> = new EventEmitter;
  @Output() imgFile: EventEmitter<any> = new EventEmitter;

  @ViewChild('modalAdd') modalAdd!: ModalComponent
  @ViewChild('modalDelete') modalDelete!: ModalComponent

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private tokenService: TokenService, private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.usuario = this.tokenService.getUserId();
    console.log(this.usuario);
    this.usuarioAdmin();
    this.form();
  }

  async usuarioAdmin(){
    try {
      const response = await this.usuarioService.getAll(this.usuario, 0, 5).toPromise();
      if(response && response.data){
        this.usuarioDTO = response.data
      }
    } catch (error) {
      
    }
  }

  get title() { return this.group.get('title') }
  get sommelier() { return this.group.get('sommelier') }
  get descrip() { return this.group.get('descrip') }
  get date() { return this.group.get('date') }
  get imagen() { return this.group.get('imagen') }

  form(item?: any): void {

    if(item){
      this.editar = true;
      this.imagenSelected = true;
      this.item = item;
    }

    this.group = this.formBuilder.group({
      id: [item ? item.id : null],
      code: [item ? item.code : ''],
      title: [item ? item.title : '', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      sommelier: [item ? item.sommelier : '', [Validators.required]],
      descrip: [item ? item.descrip : '', [Validators.required]],
      date: [item ? item.date : ''],
      usuarioDTO: this.usuarioDTO
    });
  }
  //BUSCAR
  search(nom: string) {
    this.newSearch.emit(nom);
  }
  // AGREGAR - ACTUALIZAR
  save() {
    console.log(this.group.value);
    if (this.group.valid) {
      this.group.addControl('imagenBase64', new FormControl(this.imagenBase64, [Validators.required]));
      this.newSave.emit(this.group.value)
    }
  }

  // ELIMINAR
  delete(id: string) {
    this.newDelete.emit(id)
  }

  captureFile(imgFile: any) {
    this.imagenSelected = true;
    this.imgFile.emit(imgFile)
    const archivo: File = imgFile.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string; // Aquí tendrás la imagen en formato base64
      this.imagenBase64 = base64.split(",")[1];
    };
    reader.readAsDataURL(archivo);
  }

  eliminar(){
    this.editar = false;
    this.imagenSelected = false;
  }

  refresh(): void { window.location.reload(); }


  onUpdateButtonClick(item: any) {
    this.titulo = "Actualizar Noticia";
    this.form(item); // Call the form() function if needed for your logic
    this.modalAdd.showModal();
  }

  // Function to handle when the "Add" button is clicked
  onAddButtonClick() {
    this.group.reset();
    this.titulo = "Agregar Noticia";
    // Any other logic related to the "Add" button can be added here
    this.modalAdd.showModal();
  }

  getCloseModal(){
    this.group.reset();
  }

 // para poder cerrar y abrirel app-modal automáticamente dependiendo de la rpt de la transacción
 ngOnChanges(changes: SimpleChanges) {
  if(this.successful){
    this.modalAdd.hiddenModal();
  }
}
}


