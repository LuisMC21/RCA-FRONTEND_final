import { Inject,Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { IAsignacion } from 'src/app/features/home/interfaces/asignacion';
import { ILlamada } from 'src/app/features/home/interfaces/llamada';
import { LlamadaService } from '../../../services/llamada.service';

@Component({
  selector: 'app-dialog-llamadas',
  templateUrl: './dialog-llamadas.component.html',
  styleUrls: ['./dialog-llamadas.component.scss']
})
export class DialogLlamadasComponent implements OnInit {

   // MatPaginator Inputs
   length = 100;
   pageSize = 10;
   pageSizeOptions: number[] = [5, 10, 25, 100];
   // MatPaginator Output
   pageEvent!: PageEvent;
   llamadas:ILlamada[]=[]
   asignacion!:IAsignacion;
   
   

  constructor(
    private llamadaService:LlamadaService,
    public dialogRef: MatDialogRef<DialogLlamadasComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.llamadaService.getAseguradoLlamada(0,20,this.data.asignacion.id).subscribe(response =>{
      this.llamadas = response.data.list;
    })
  }

}
