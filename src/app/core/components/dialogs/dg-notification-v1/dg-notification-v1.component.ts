import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { StatusMessage } from 'src/app/core/interfaces/dialogs.interface';
import { DialogsService } from 'src/app/core/services/dialogs.service';

export interface DgNotificationV1 {
  title?: string;
  message: string;
  status?: StatusMessage;
  time?: number;
  loader?: DgLoaderNotification;
}

interface DgLoaderNotification {
  emitterLoader: Observable<boolean>;
  success_message: string;
  error_message: string;
  time?: number;
  show_progress?: boolean;
}

@Component({
  selector: 'app-dg-notification-v1',
  templateUrl: './dg-notification-v1.component.html',
  styleUrls: ['./dg-notification-v1.component.scss'],
})
export class DgNotificationV1Component implements OnInit {
  dataDialog: DgNotificationV1 = {
    message: '',
  };

  constructor(
    private dialogsService: DialogsService,
    private dialogRef: MatDialogRef<DgNotificationV1Component>,
    @Inject(MAT_DIALOG_DATA) public data: DgNotificationV1
  ) {
    this.data ? (this.dataDialog = this.data) : null;

    if (this.data && this.data.loader) {
      // VALIDACION PARA QUE TS NO MARQUE CONFLICTO
      this.dataDialog.loader
        ? (this.dataDialog.loader.show_progress = true)
        : null;

      this.dataDialog.status = StatusMessage.info;
      this.data.loader.emitterLoader.subscribe((result) => {
        this.setNotificationByEmitterResult(result);
      });
    }
  }

  setNotificationByEmitterResult(result: boolean) {
    if (result) {
      this.dataDialog.message = this.dataDialog.loader?.success_message || '';
      this.dataDialog.status = StatusMessage.success;
      this.dataDialog.loader?.time
        ? this.setTimerToClose(this.dataDialog.loader?.time)
        : this.setTimerToClose();
      this.dataDialog.loader
        ? (this.dataDialog.loader.show_progress = false)
        : null;
    } else {
      this.dataDialog.message = this.dataDialog.loader?.error_message || '';
      this.dataDialog.status = StatusMessage.danger;
      this.dataDialog.loader?.time
        ? this.setTimerToClose(this.dataDialog.loader?.time)
        : this.setTimerToClose();
      this.dataDialog.loader
        ? (this.dataDialog.loader.show_progress = false)
        : null;
    }
  }

  setTimerToClose(time?: number) {
    setTimeout(
      () => {
        this.closeDialog();
      },
      time ? time : 4000
    );
  }

  getStatusIcon(status: StatusMessage) {
    return this.dialogsService.getStatusIcon(status);
  }

  ngOnInit(): void {
    if (!this.dataDialog.loader) {
      this.dataDialog.time
      ? this.setTimerToClose(this.dataDialog.time)
      : this.setTimerToClose();
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
