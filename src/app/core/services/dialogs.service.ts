import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  DgConfirmationV1,
  DgConfirmationV1Component,
} from '../components/dialogs/dg-confirmation-v1/dg-confirmation-v1.component';
import {
  DgMessageV1,
  DgMessageV1Component,
} from '../components/dialogs/dg-message-v1/dg-message-v1.component';
import {
  DgNotificationV1,
  DgNotificationV1Component,
} from '../components/dialogs/dg-notification-v1/dg-notification-v1.component';
import { DgSubmitV1, DgSubmitV1Component } from '../components/dialogs/dg-submit-v1/dg-submit-v1.component';
import { StatusMessage } from '../interfaces/dialogs.interface';

@Injectable({
  providedIn: 'root',
})
export class DialogsService {
  constructor(private dialog: MatDialog) {}

  openMessageBasicV1(data: DgMessageV1) {
    const dialogRef = this.dialog.open(DgMessageV1Component, {
      data,
    });
  }

  openConfirmationV1(data: DgConfirmationV1) {
    const dialogRef = this.dialog.open(DgConfirmationV1Component, {
      data,
    });
    return dialogRef;
  }

  openNotificationV1(data: DgNotificationV1) {
    const dialogRef = this.dialog.open(DgNotificationV1Component, {
      data,
      position: {
        top: '5px',
        right: '0',
      },
      disableClose: true,
      hasBackdrop: false,
      width: '40vw',
      panelClass: 'opacity-75',
    });
  }

  openSubmitV1(data: DgSubmitV1) {
    const dialogRef = this.dialog.open(DgSubmitV1Component, {
      data
    });
    return dialogRef;
  }

  getStatusIcon(status: StatusMessage): string {
    switch (status) {
      case StatusMessage.danger:
        return '../../../../../assets/img/icons/Cancel-48-480px/icons8-cancel-480.png';
      case StatusMessage.info:
        return '../../../../../assets/img/icons/icons8-info.gif';
      case StatusMessage.secondary:
        return '../../../../../assets/img/icons/icons8-info-secondary.gif';
      case StatusMessage.success:
        return '../../../../../assets/img/icons/icons8-ok.gif';
      case StatusMessage.warning:
        return '../../../../../assets/img/icons/icons8-error.gif';
      default:
        return '';
    }
  }
}
