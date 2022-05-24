import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DgConfirmationV1 {
  title: string;
  message?: string;
  buttons: ButtonConfirmation[];
}

interface ButtonConfirmation {
  title: string;
  color?: string;
  class?: string;
  value: boolean;
}

@Component({
  selector: 'app-dg-confirmation-v1',
  templateUrl: './dg-confirmation-v1.component.html',
  styleUrls: ['./dg-confirmation-v1.component.scss'],
})
export class DgConfirmationV1Component implements OnInit {
  // USE ONLY BY DIALOG

  dialog: DgConfirmationV1 = {
    title: 'Title Confirmation?',
    buttons: [
      {
        title: 'Ok!',
        value: true,
      },
    ],
  };

  constructor(
    public dialogRef: MatDialogRef<DgConfirmationV1Component>,
    @Inject(MAT_DIALOG_DATA) public data: DgConfirmationV1
  ) {
    this.data ? (this.dialog = this.data) : null;
  }

  ngOnInit(): void {}
}
