import { Component, OnInit } from '@angular/core';
import { FormControl, FormArray,FormGroup, FormBuilder,Validators } from '@angular/forms';
import { AuthService } from 'src/app/features/auth/commons/services/auth.service';
import Swal from 'sweetalert2';
import { IAsignacion } from '../../../interfaces/asignacion';
import { IParametro } from '../../../interfaces/parametro';
import { IUser } from '../../../interfaces/user';
import { EmitterService } from '../../services/emitter.service';
import { ParametroService } from '../../services/parametro.service';
import { TestService } from '../../services/test.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  preguntas!:IParametro[]
  respuestas:any[]=[]
  testForm!:FormGroup;
  currentUser!:IUser;
  asignacion!:IAsignacion;
  constructor(private parametroService:ParametroService,
    private testService: TestService,
    private emmiterService:EmitterService,
    private authService:AuthService,
    private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.asignacion= JSON.parse(localStorage.getItem('asignacion')||JSON.stringify(''));
    this.currentUser = this.authService.currentUser.value;
    this.getPreguntasTest()
  }

  initFormTest(){
    this.testForm = this.formBuilder.group({
      preguntas: this.formBuilder.array([
        this.formBuilder.group({
          id: [''],
          aseguradoId:[this.asignacion.asegurado.id],
          llamadaId:[1],
          numPregunta:[],
          rptaPregunta:['SI'],
          valorPuntos:[''],
          userCreacion:[this.currentUser.userName],
          maxlengthDocument: ['12']
        })
      ]),
    })
  }

  onCLickListenin(event:any,item:IParametro){
    let llamadaId;
    this.emmiterService.idLlamada.subscribe(response =>{
      llamadaId = response
    })
    let value = event.value
    let answer = {
      numPregunta:item.id,
      rptaPregunta: value,
      aseguradoId:this.asignacion.asegurado.id,
      valorPuntos:this.valorPuntos(value),
      userCreacion:this.currentUser.userName,
      llamadaId:llamadaId
    }
    this.respuestas.push(answer)
  }

  valorPuntos(rpta:string){
    let puntos;
    if(rpta=='SI') puntos=2
    else puntos=1
    return puntos
  }

  getPreguntasTest(){
    this.parametroService.getPreguntasTest('PREGUNTA_TEST').subscribe(response =>{
      this.preguntas = response.data.list;
    })
  }

  // GUARDAR TEST
  saveTest(){
    this.testService.save(this.respuestas).subscribe(response =>{
      Swal.fire({
        position: 'center',
        icon: response.code=='ok'?'success':'error',
        title: response.message,
        showConfirmButton: false,
        timer: 1500
      })
    })
  }

}
