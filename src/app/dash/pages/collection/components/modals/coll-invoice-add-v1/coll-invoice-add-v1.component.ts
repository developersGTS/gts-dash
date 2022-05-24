import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { QuotationPopulated } from 'src/app/dash/pages/quotes/interfaces/quotation.interface';
import { QuotesService } from 'src/app/dash/pages/quotes/services/quotes.service';

@Component({
  selector: 'app-coll-invoice-add-v1',
  templateUrl: './coll-invoice-add-v1.component.html',
  styleUrls: ['./coll-invoice-add-v1.component.scss'],
})
export class CollInvoiceAddV1Component implements OnInit {
  @Input() quotation: QuotationPopulated | undefined = undefined;

  template_confirmation: boolean = false;

  secondFormGroup: FormGroup;
  isEditable = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: QuotationPopulated | undefined,
    private _formBuilder: FormBuilder,
    private quotesService: QuotesService,
    private dialogRef: MatDialogRef<CollInvoiceAddV1Component>
  ) {
    this.data ? (this.quotation = this.data) : null;

    this.secondFormGroup = this._formBuilder.group({
      invoice_no: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  processInvoice() {
    if (this.quotation && this.quotation._id) {
      this.quotesService
        .updateQuotation({
          _id: this.quotation._id,
          status: 'Facturada',
          collection_data: {
            invoice_no: this.secondFormGroup.controls['invoice_no'].value,
            receipt: this.quotation.collection_data
              ? this.quotation.collection_data.receipt
              : undefined,
            expenses:
              this.quotation.collection_data &&
              this.quotation.collection_data.expenses
                ? this.quotation.collection_data.expenses
                : 0,
            profits:
              this.quotation.collection_data &&
              this.quotation.collection_data.profits
                ? this.quotation.collection_data.profits
                : 0,
            subtotal:
              this.quotation.collection_data &&
              this.quotation.collection_data.subtotal
                ? this.quotation.collection_data.subtotal
                : 0,
            iva:
              this.quotation.collection_data &&
              this.quotation.collection_data.iva
                ? this.quotation.collection_data.iva
                : 0,
            total:
              this.quotation.collection_data &&
              this.quotation.collection_data.total
                ? this.quotation.collection_data.total
                : 0,
            payment_date:
              this.quotation.collection_data &&
              this.quotation.collection_data.payment_date
                ? this.quotation.collection_data.payment_date
                : undefined,
            payment_method:
              this.quotation.collection_data &&
              this.quotation.collection_data.payment_method
                ? this.quotation.collection_data.payment_method
                : undefined,
            programmed_payment:
              this.quotation.collection_data &&
              this.quotation.collection_data.programmed_payment
                ? this.quotation.collection_data.programmed_payment
                : undefined,
            purchase_order:
              this.quotation.collection_data &&
              this.quotation.collection_data.purchase_order
                ? this.quotation.collection_data.purchase_order
                : '',
          },
        })
        .subscribe((res) => {
          if (res && res._id) {
            this.dialogRef.close(res);
          } else {
            this.dialogRef.close(undefined);
          }
        });
    }
  }
}
