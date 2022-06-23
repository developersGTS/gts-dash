import { Component, Inject, Input, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import {
  PurcharseOption,
  PurcharseOptionWithClientProfit,
} from '../../../interfaces/purcharse_option.interface';
import { QtAddPurcharseOptionComponent } from '../../cards/add/qt-add-purcharse-option/qt-add-purcharse-option.component';
import { QuotesService } from '../../../services/quotes.service';
import { QuotationItem } from '../../../interfaces/quotation_item.interfaces';
import { DialogsService } from '../../../../../../core/services/dialogs.service';
import { StatusMessage } from 'src/app/core/interfaces/dialogs.interface';

export interface modeEditPurcharseOptionsV1 {
  quotation_id: string;
  item_index: number;
  quotation_items: QuotationItem[];
}

@Component({
  selector: 'app-qt-purcharse-details-v1',
  templateUrl: './qt-purcharse-details-v1.component.html',
  styleUrls: ['./qt-purcharse-details-v1.component.scss'],
})
export class QtPurcharseDetailsV1Component implements OnInit {
  @Input() purcharseOptions: PurcharseOption[] = [];

  @Input() mode_edit: modeEditPurcharseOptionsV1 | undefined = undefined;

  profit_percent: number = 0.8;

  constructor(
    public dialogRef: MatDialogRef<QtPurcharseDetailsV1Component>,
    @Inject(MAT_DIALOG_DATA)
    public data: PurcharseOptionWithClientProfit,
    public dialog: MatDialog,
    private quotesService: QuotesService,
    private dialogsService: DialogsService
  ) {}

  ngOnInit(): void {
    if (this.data) {
      console.log('this.data ---****---', this.data);
      this.purcharseOptions = this.data.data;
      this.profit_percent = this.data.profit_percent;
      this.data.mode_edit ? (this.mode_edit = this.data.mode_edit) : null;
    }
  }

  openAddNewPurcharseOption(): void {
    const dialogRef = this.dialog.open(QtAddPurcharseOptionComponent, {
      data: this.profit_percent,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((option: PurcharseOption) => {
      option ? this.addOption(option) : null;
    });
  }

  addOption(payload: PurcharseOption) {
    this.purcharseOptions.push(payload);
    if (payload.best_option) {
      this.markAsBestOption(this.purcharseOptions.length - 1);
    }

    // APPLY ONLY IF MODE EDIT IS AVAILABLE
    this.saveItems();
  }

  recibeOption(index_option: number, payload: PurcharseOption) {
    this.purcharseOptions[index_option] = payload;
    if (payload.best_option) {
      this.markAsBestOption(index_option);
    }
  }

  markAsBestOption(index: number) {
    if (this.purcharseOptions && this.purcharseOptions.length > 0) {
      for (let option of this.purcharseOptions) {
        option.best_option = false;
      }
      this.purcharseOptions[index].best_option = true;
    }
  }

  deleteOption(index: number, confirmation: boolean) {
    this.purcharseOptions.splice(index, 1);
  }

  saveItems() {
    if (this.mode_edit) {
      this.mode_edit.quotation_items[
        this.mode_edit.item_index
      ].purcharse_options = this.purcharseOptions;

      this.quotesService
        .updateQuotation({
          _id: this.mode_edit.quotation_id,
          quotation_items: this.mode_edit.quotation_items,
        })
        .subscribe((res) => {
          if (res && res._id) {
            this.dialogsService.openNotificationV1({
              message: 'Opcion de compra agregada correctamente',
              status: StatusMessage.success,
            });
          } else {
            this.dialogsService.openNotificationV1({
              message: 'Error al agregar opcion de compra',
              status: StatusMessage.danger,
            });
          }
        });
    }
  }
}
