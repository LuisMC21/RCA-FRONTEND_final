import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from './logo/logo.component';
import { ButtonComponent } from './button/button.component';
import { FieldComponent } from './field/field.component';
import { ModalComponent } from './modals/modal/modal.component';
import { BtnUpdateComponent } from './buttons/btn-update/btn-update.component';
import { BtnAddComponent } from './buttons/btn-add/btn-add.component';
import { BtnDeleteComponent } from './buttons/btn-delete/btn-delete.component';
import { BtnCancelComponent } from './buttons/btn-cancel/btn-cancel.component';
import { SelectComponent } from './select/select.component';
import { BtnConfirmDeleteComponent } from './buttons/btn-confirm-delete/btn-confirm-delete.component';
import { RequiredFieldComponent } from './alerts/required-field/required-field.component';
import { LabelFieldComponent } from './label/label-field/label-field.component';
import { SearchComponent } from './search/search.component';
import { PaginationComponent } from './pagination/pagination.component';
import { FormsModule } from '@angular/forms';
import { ModalResponseComponent } from './modals/modal-response/modal-response.component';
import { BtnOkComponent } from './buttons/btn-ok/btn-ok.component';
import { BtnSearchComponent } from './buttons/btn-search/btn-search.component';
import { BtnReportComponent } from './buttons/btn-report/btn-report.component';
import { LoaderOperationComponent } from './loaders/loader-operation/loader-operation.component';
import { BtnViewComponent } from './buttons/btn-view/btn-view.component';


@NgModule({
  declarations: [
    LogoComponent,
    ButtonComponent,
    FieldComponent,
    ModalComponent,
    BtnAddComponent,
    BtnUpdateComponent,
    BtnDeleteComponent,
    BtnViewComponent,
    BtnCancelComponent,
    SelectComponent,
    BtnConfirmDeleteComponent,
    RequiredFieldComponent,
    LabelFieldComponent,
    SearchComponent,
    PaginationComponent,
    ModalResponseComponent,
    BtnOkComponent,
    BtnSearchComponent,
    BtnReportComponent,
    LoaderOperationComponent
  ],
  exports:[
    LogoComponent,
    FieldComponent,
    ModalComponent,
    ButtonComponent,
    BtnAddComponent,
    BtnViewComponent,
    BtnUpdateComponent,
    BtnDeleteComponent,
    BtnCancelComponent,
    SelectComponent,
    BtnConfirmDeleteComponent,
    RequiredFieldComponent,
    LabelFieldComponent,
    SearchComponent,
    PaginationComponent,
    ModalResponseComponent,
    BtnOkComponent,
    BtnSearchComponent,
    BtnReportComponent,
    LoaderOperationComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class SharedComponentsModule { }
