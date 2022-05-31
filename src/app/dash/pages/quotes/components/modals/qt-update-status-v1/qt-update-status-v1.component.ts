import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { switchMap } from 'rxjs';
import { StatusMessage } from 'src/app/core/interfaces/dialogs.interface';
import { DialogsService } from 'src/app/core/services/dialogs.service';
import { StatusTracker } from 'src/app/dash/interfaces/status_tracker.interface';
import { CollectionService } from 'src/app/dash/pages/collection/services/collection.service';
import { QuotationPopulated } from '../../../interfaces/quotation.interface';
import { QuotesService } from '../../../services/quotes.service';
import { StatusTrackerPopulated } from '../../../../../interfaces/status_tracker.interface';

export interface UpdateStatusQuotationV1 {
  company: string;
  contact: string;
  description: string;
  quotation_id: string;
  status_tracker: StatusTracker[];
  folio: string;
  mode_collection?: boolean;
}

@Component({
  selector: 'app-qt-update-status-v1',
  templateUrl: './qt-update-status-v1.component.html',
  styleUrls: ['./qt-update-status-v1.component.scss'],
})
export class QtUpdateStatusV1Component implements OnInit {
  loading: boolean = false;

  statusControl = new FormControl('', [Validators.required]);

  status_list: string[];

  dataDialog: UpdateStatusQuotationV1 = {
    company: '',
    contact: '',
    description: '',
    quotation_id: '',
    status_tracker: [],
    folio: '',
  };

  constructor(
    private quotesService: QuotesService,
    private collectionService: CollectionService,
    private dialogsService: DialogsService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<QtUpdateStatusV1Component>,
    @Inject(MAT_DIALOG_DATA) public data: UpdateStatusQuotationV1
  ) {
    // INIT STATUS LIST
    this.status_list = [];

    if (this.data) {
      this.dataDialog = this.data;

      if (this.data.mode_collection) {
        this.status_list = this.collectionService.getStatusList();
      } else {
        this.status_list = this.quotesService.getStatusList();
      }
    }
  }

  ngOnInit(): void {}

  updateStatus() {
    this.loading = true;
    let status = this.statusControl.value;

    this.quotesService
      .updateStatus(
        this.dataDialog.quotation_id,
        status,
        this.dataDialog.status_tracker
      )
      .pipe(
        switchMap((result: QuotationPopulated) =>
          this.quotesService.updateQuotation({
            _id: result._id || '',
            in_collection:
              result.in_collection || status === 'Enviada a cobro'
                ? true
                : false,
            customer_approved:
              result.customer_approved || status === 'Autorizada por cliente'
                ? true
                : false,
            in_review:
              result.in_review || status === 'En revision interna'
                ? true
                : false,
            supervisor_approved:
              result.supervisor_approved || status === 'Lista para enviar'
                ? true
                : false,
            billed: result.billed || status === 'Pagada' ? true : false,
            enabled: !result.enabled || status === 'Finalizada' ? false : true,
          })
        )
      )
      .subscribe((result) => {
        this.loading = false;
        if (result._id && result.status) {
          this.dialogsService.openNotificationV1({
            title: 'estatus cotizacion ' + this.dataDialog.folio,
            message: 'Estatus actualizado',
            status: StatusMessage.success,
          });
          this.closeDialog(result);
        } else {
          this.dialogsService.openNotificationV1({
            title: 'estatus cotizacion ' + this.dataDialog.folio,
            message: 'El estatus no pudo actualizarse, intente mas tarde.',
            status: StatusMessage.danger,
          });
        }
      });
  }

  closeDialog(data?: QuotationPopulated) {
    console.log('data', data);
    this.dialogRef.close(data ? data : null);
  }
}
