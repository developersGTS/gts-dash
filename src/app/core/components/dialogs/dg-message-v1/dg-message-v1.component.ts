import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StatusMessage } from 'src/app/core/interfaces/dialogs.interface';
import { DialogsService } from 'src/app/core/services/dialogs.service';

export interface DgMessageV1 {
  message: string;
  status?: StatusMessage;
}

@Component({
  selector: 'app-dg-message-v1',
  templateUrl: './dg-message-v1.component.html',
  styleUrls: ['./dg-message-v1.component.scss'],
})
export class DgMessageV1Component implements OnInit {
  dataDialog: DgMessageV1 = {
    message: '',
  };

  constructor(
    private dialogsService: DialogsService,
    @Inject(MAT_DIALOG_DATA) public data: DgMessageV1
  ) {
    this.data ? (this.dataDialog = this.data) : null;
  }

  ngOnInit(): void {}

  getStatusIcon(status: StatusMessage) {
    return this.dialogsService.getStatusIcon(status);
  }
}
