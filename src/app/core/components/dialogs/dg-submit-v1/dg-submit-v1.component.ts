import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DgSubmitV1 {
  title: string;
  message?: string;
  buttons: ButtonSubmit[];
  input: {
    label: string;
    placeholder?: string;
    value?: string;
  };
  config?: {
    type: TypeInputs;
  }
}

export enum TypeInputs {
  text = "text",
  date = "date"
}

interface ButtonSubmit {
  title: string;
  color?: string;
  class?: string;
  value: boolean;
}

@Component({
  selector: 'app-dg-submit-v1',
  templateUrl: './dg-submit-v1.component.html',
  styleUrls: ['./dg-submit-v1.component.scss'],
})
export class DgSubmitV1Component implements OnInit {
  dialog: DgSubmitV1 = {
    title: 'Title Confirmation?',
    buttons: [
      {
        title: 'Ok!',
        value: true,
      },
    ],
    input: {
      label: 'label',
    },
    config: {
      type: TypeInputs.text
    }
  };

  submitForm = this._fb.group({
    input: [this.dialog.input.value ? this.dialog.input.value : ''],
  });

  constructor(
    public dialogRef: MatDialogRef<DgSubmitV1Component>,
    @Inject(MAT_DIALOG_DATA) public data: DgSubmitV1,
    private _fb: FormBuilder
  ) {
    data ? (this.dialog = data) : null;
  }

  ngOnInit(): void {}

  closeSubmit(confirmation: boolean) {
    if (confirmation) {
      this.dialogRef.close(this.submitForm.controls['input'].value);
    } else {
      this.dialogRef.close();
    }
  }
}
