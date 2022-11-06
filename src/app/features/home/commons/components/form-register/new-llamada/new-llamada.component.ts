
import { Component,ViewChild, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ILibro } from 'src/app/features/home/interfaces/libro';
import { ILlamada } from 'src/app/features/home/interfaces/llamada';
import { IOptionSelect } from 'src/app/features/home/interfaces/option-select';
import Swal from 'sweetalert2';
import { EmitterService } from '../../../services/emitter.service';
import { LlamadaService } from '../../../services/llamada.service';

@Component({
  selector: 'app-new-llamada',
  templateUrl: './new-llamada.component.html',
  styleUrls: ['./new-llamada.component.scss']
})
export class NewLlamadaComponent implements OnInit {

  formControlHoraIni:FormControl = new FormControl("");
  formControlHoraFin:FormControl = new FormControl("");
  required:boolean = !1;
  @ViewChild("pickerIni") pickerIni:any;

  checked = false;
  indeterminate = false;
  disabled = false;
  // Opciones tipo de lectura
  tipoLectura: IOptionSelect[] = [
    {value: '01', descripcion: 'Lectura digital'}
  ];
  // Opciones Medio de comunicación
  medioComunicacion: IOptionSelect[] = [
    {value: '01', descripcion: 'Meet'}
  ];
  formLlamada!:FormGroup;

  @Input() libros:ILibro[]=[];
  @Output() formLlamadaSave: EventEmitter<ILlamada> = new EventEmitter;
  
  constructor(
    private formBuider:FormBuilder,
    private llamadaService:LlamadaService,
    private llamadaEmitterService:EmitterService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.initForm();
    
  }
  

  //FORMULARIO
  initForm(){
    this.formLlamada = this.formBuider.group({
      id:[],
      libro: [],
      asignacion:[this.llamadaService.currentAsignacion.value.id],
      fechaLectura:[new Date(),[Validators.required]],
      llamadaRealizada:[''],
      numLlamada:[''],
      tipo:[''],
      medio:[''],
      horaInicio:[''],
      horaFin:[''],
      finLectura:[''],
      tiempoLeido:[''],
      observaciones:['']
    })
  }

  // GUARDAR
  save(){
    this.llamadaService.save(this.formLlamada.value).subscribe(response =>{
      let idLlamada  = response.data.id;
      this.llamadaEmitterService.changeIdLlamada(idLlamada);
      Swal.fire({
        position: 'center',
        icon: response.code=='ok'?'success':'error',
        title: response.message,
        showConfirmButton: false,
        timer: 1500
      })
      this.router.navigate(['/home/mis-asegurados']);
    });
   }
  
   openFormIconIni(timepPicker: {open:()=>void}){
    if(!this.formControlHoraIni.disabled){
      timepPicker.open()
    }
   }

   openFormIconFin(timepPicker: {open:()=>void}){
    if(!this.formControlHoraIni.disabled){
      timepPicker.open()
    }
   }

   myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };

  cancel(){
    this.router.navigate(['/home/mis-asegurados']);
  }

  get horaInicio(){return this.formLlamada.get('horaInicio')}
  get horaFin(){return this.formLlamada.get('horaFin')}
}
