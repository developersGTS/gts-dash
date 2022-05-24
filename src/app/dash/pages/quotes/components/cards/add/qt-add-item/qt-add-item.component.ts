import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { QuotationItem } from '../../../../interfaces/quotation_item.interfaces';

@Component({
  selector: 'app-qt-add-item',
  templateUrl: './qt-add-item.component.html',
  styleUrls: ['./qt-add-item.component.scss'],
})
export class QtAddItemComponent implements OnInit {
  @Output() emitItem: EventEmitter<QuotationItem> = new EventEmitter();

  dialogMode: boolean = true;

  formAddItem: FormGroup = this._formBuilder.group({
    description: ['', Validators.required],
    part_no: [''],
    quantity: [
      '1',
      [
        Validators.required,
        Validators.min(0),
        Validators.required,
      ],
    ],
  });

  constructor(
    public dialogRef: MatDialogRef<QtAddItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: QuotationItem,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {

    if(this.data){
      this.formAddItem.controls['description'].setValue(this.data.description);
      this.formAddItem.controls['part_no'].setValue(this.data.part_no);
      this.formAddItem.controls['quantity'].setValue(this.data.quantity);
    }

  }

  emitItemQt() {
    this.formAddItem.markAllAsTouched();

    if (this.formAddItem.valid) {
      if (this.dialogMode) {
        // USE CLOSE DIALOG METHOD
        this.dialogRef.close({
          description: this.formAddItem.controls['description'].value,
          part_no:
            this.formAddItem.controls['part_no'].value == ''
              ? null
              : this.formAddItem.controls['part_no'].value,
          quantity: this.formAddItem.controls['quantity'].value,
          authorized: false,
          bought: false,
          purcharse_options: [],
        });

        console.log('Dialog Item Close with data');
      } else {
        // EMIT DATA - USE OUTPUT
        this.emitItem.emit({
          description: this.formAddItem.controls['description'].value,
          part_no:
            this.formAddItem.controls['part_no'].value == ''
              ? null
              : this.formAddItem.controls['part_no'].value,
          quantity: this.formAddItem.controls['quantity'].value,
          authorized: false,
          bought: false,
          purcharse_options: [],
        });

        console.log('Item Emited');
      }
    }
  }
}
