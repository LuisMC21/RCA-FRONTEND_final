import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalAlert } from '../../interfaces/modal-alert';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  constructor(
    // @Inject(MAT_DIALOG_DATA)
    // public data: ModalAlert
  ) { }

  ngOnInit(): void {
  }

}
