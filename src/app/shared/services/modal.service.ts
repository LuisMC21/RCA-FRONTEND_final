import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from '../components/alert/alert.component';
import { ModalAlert } from '../interfaces/modal-alert';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(
    public dialog: MatDialog
  ) { }

  openAlertModalFunction(title: string, message: string, closeButtonLabel: string, callBackFunction: Function) {
    const dialogRef = this.dialog.open(AlertComponent, {
      disableClose: true,
      backdropClass: ['light-backdrop', 'modal_alert_background'],
      width: '300px',
      data: new ModalAlert({
        title: title,
        content: message,
        closeButtonLabel: closeButtonLabel,
      })
    });

    dialogRef.afterClosed().subscribe(result => callBackFunction(result));
  }
}
