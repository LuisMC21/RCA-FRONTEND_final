import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalComponent } from 'src/app/shared/components/modals/modal/modal.component';
import { INews } from '../../../interfaces/news';
import { NewsService } from '../../services/news.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent implements OnInit {

  group!: FormGroup;
  @ViewChild('modalAdd') modalAdd!:ModalComponent
  @ViewChild('modalOk') modalOk!:ModalComponent;

  Imgfile:any;
  msjResponse:string='';
  nomImg:string ='';
  news:INews[]=[]
  successful: boolean=false;
  asideShow:boolean=true;

  constructor(private router:Router,private formBuilder:FormBuilder, private newsService:NewsService) { }

  ngOnInit(): void {
    this.form();
    this.newsService.getAll('',0,4).subscribe(response =>{
      this.news = response.content;
    })
  }
  get titulo(){return this.group.get('titulo')}
  get sumilla(){return this.group.get('sumilla')}
  get descripcion(){return this.group.get('descripcion')}
  get fecha(){return this.group.get('fecha')}
  get imagen(){return this.group.get('imagen')}

  form(item?:INews):void{
    this.group = this.formBuilder.group({
      administrativoId:['1'],
      identi:[item?item.code:null],
      titulo:[item?item.title:'',[Validators.required,Validators.minLength(3),Validators.maxLength(50)]],
      sumilla:[item?item.sommelier:'',[Validators.required]],
      descripcion:[item?item.descrip:'',[Validators.required]],
      fecha:[item?item.date:'',[Validators.required]],
      imagen:[item?item.image:'',[Validators.required]]
  });
}

// BUSCAR
search(nom:string){
  
}


// AGREGAR - ACTUALIZAR
save(noticia: INews) {
  if (noticia.id == null) {
      //Agregar noticia
      this.newsService.add(noticia).subscribe(data => {
        console.log(data.message)
        if (data.message === 'ok') {
          this.msjResponse = 'Agregado correctamente';
          this.successful = true;
        } else {
          this.msjResponse = 'Ha ocurrido un error :(';
          this.successful = false;
        }
    })
  } else {
    this.newsService.update(noticia).subscribe(data => {
      if (data.message === 'ok') {
        this.msjResponse = 'Cambios actualizados con éxito';
        this.successful = true;
      } else {
        this.msjResponse = 'Ha ocurrido un error :(';
        this.successful = false;
      }
    })
  }
  this.modalOk.showModal();
}

// ELIMINAR 
delete(id:string){
}

redirectTo(index:string):void{
  this.asideShow = false;
  this.router.navigateByUrl('admin/'+ index);
}

//IMAGEN
captureFile(event: any):string{
  this.Imgfile = event.target.files[0];
  return this.Imgfile;
}

refresh(){window.location.reload;}
}
