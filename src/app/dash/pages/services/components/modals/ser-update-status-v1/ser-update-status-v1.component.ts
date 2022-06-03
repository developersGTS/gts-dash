import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { DialogsService } from 'src/app/core/services/dialogs.service';
import { StatusTracker } from 'src/app/dash/interfaces/status_tracker.interface';
import { ServicesService } from '../../../services/services.service';
import { ServicePopulated } from '../../../interfaces/service.interface';
import { StatusMessage } from 'src/app/core/interfaces/dialogs.interface';

export interface UpdateStatusServiceV1 {
  company: string;
  contact: string;
  description: string;
  service_id: string;
  status_tracker: StatusTracker[];
}

@Component({
  selector: 'app-ser-update-status-v1',
  templateUrl: './ser-update-status-v1.component.html',
  styleUrls: ['./ser-update-status-v1.component.scss'],
})
export class SerUpdateStatusV1Component implements OnInit {
  loading: boolean = false;

  statusControl = new FormControl('', [Validators.required]);

  status_list: string[];

  dataDialog: UpdateStatusServiceV1 | undefined = undefined;

  constructor(
    private servicesService: ServicesService,
    private dialogsService: DialogsService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<SerUpdateStatusV1Component>,
    @Inject(MAT_DIALOG_DATA) public data: UpdateStatusServiceV1
  ) {
    // INIT STATUS LIST
    this.status_list = [];

    if (this.data) {
      this.dataDialog = this.data;

      this.status_list = this.servicesService.getStatusList();
    }
  }

  ngOnInit(): void {}

  updateStatus() {
    this.loading = true;
    let status = this.statusControl.value;

    this.servicesService
      .updateStatus(
        this.dataDialog ? this.dataDialog.service_id : '',
        status,
        this.dataDialog ? this.dataDialog.status_tracker : []
      )
      .subscribe((result) => {
        this.loading = false;
        if (result._id && result.status) {
          this.dialogsService.openNotificationV1({
            title: 'Estatus de servicio',
            message: 'Estatus actualizado',
            status: StatusMessage.success,
          });
          this.closeDialog(result);
        } else {
          this.dialogsService.openNotificationV1({
            title: 'Estatus de servicio',
            message: 'El estatus no pudo actualizarse, intente mas tarde.',
            status: StatusMessage.danger,
          });
        }
      });
  }

  closeDialog(data?: ServicePopulated) {
    console.log('data', data);
    this.dialogRef.close(data ? data : null);
  }
}
