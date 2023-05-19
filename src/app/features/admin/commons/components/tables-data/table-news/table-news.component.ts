import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { INews } from 'src/app/features/admin/interfaces/news';
import { IUser } from 'src/app/features/admin/interfaces/user';
import { ModalComponent } from 'src/app/shared/components/modals/modal/modal.component';

@Component({
  selector: 'app-table-news',
  templateUrl: './table-news.component.html',
  styleUrls: ['./table-news.component.scss']
})
export class TableNewsComponent implements OnInit {

  group!: FormGroup;
  nomSearch:string='';
  head=["TITULO","SUMILLA","DESCRIPCIÓN","FECHA","IMAGEN","ACCIONES"]
  @Input() news:INews[]=[]
  @Input() tableName!: string;

  imagenBase64: string = '';

  usuarioDTO: IUser = {
    id:'1eb4f5b8-d9a4-4774-b1e8-0f09a599b6d9',
    code: '',
    nombreUsuario: '',
    name: '',
    pa_surname: '',
    ma_surname: '',
    birthdate: new Date,
    type_doc: '',
    numdoc: '',
    tel: '',
    gra_inst: '',
    email: '',
    password: '',
    rol:'ADMINISTRADOR'
  };

  @Output() newSave:EventEmitter<INews> = new EventEmitter;
  @Output() newDelete:EventEmitter<string> = new EventEmitter;
  @Output() newSearch:EventEmitter<string> = new EventEmitter;
  @Output() imgFile:EventEmitter<any> = new EventEmitter;
  
  @ViewChild('modalAdd') modalAdd!:ModalComponent
  @ViewChild('modalDelete') modalDelete!:ModalComponent

  constructor(private formBuilder:FormBuilder) { }

  ngOnInit(): void {
  this.form();
  }
  
  get titulo(){return this.group.get('titulo')}
  get sumilla(){return this.group.get('sumilla')}
  get descripcion(){return this.group.get('descripcion')}
  get fecha(){return this.group.get('fecha')}
  get imagen(){return this.group.get('imagen')}
  
  form(item?:INews):void{
    this.group = this.formBuilder.group({
      id:[item?item.code:null],
      code:[item?item.code:''],
      titulo:[item?item.title:'',[Validators.required,Validators.minLength(3),Validators.maxLength(50)]],
      sumilla:[item?item.sommelier:'',[Validators.required]],
      descripcion:[item?item.descrip:'',[Validators.required]],
      fecha:[item?item.date:''],
      imagen:[item?item.image:'',[Validators.required]],
      usuarioDTO: this.usuarioDTO
  });
}
  //BUSCAR
  search(nom:string){
    this.newSearch.emit(nom);
  }
// AGREGAR - ACTUALIZAR
  save(){
    if(this.group.valid){
     this.newSave.emit(this.group.value)
    }
    this.modalAdd.hiddenModal();
  }

  // ELIMINAR 
  delete(id:string){
    this.newDelete.emit(id)
    this.modalDelete.hiddenModal();
  }

  captureFile(imgFile:any){
    this.imgFile.emit(imgFile)
  }

  refresh(): void { window.location.reload(); }

  convertImageToBase64(imageFile: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
  
      // Cuando la lectura del archivo esté completa
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result);
        } else {
          reject(new Error('No se pudo convertir la imagen a base64.'));
        }
      };
  
      // Leer el archivo como una URL de datos (base64)
      reader.readAsDataURL(imageFile);
    });
  }
  

  
  
  

}
