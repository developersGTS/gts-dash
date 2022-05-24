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

@Component({
  selector: 'app-qt-purcharse-details-v1',
  templateUrl: './qt-purcharse-details-v1.component.html',
  styleUrls: ['./qt-purcharse-details-v1.component.scss'],
})
export class QtPurcharseDetailsV1Component implements OnInit {
  @Input() purcharseOptions: PurcharseOption[] = [];

  profit_percent: number = 0.8;

  constructor(
    public dialogRef: MatDialogRef<QtPurcharseDetailsV1Component>,
    @Inject(MAT_DIALOG_DATA)
    public data: PurcharseOptionWithClientProfit,
    public dialog: MatDialog
  ) {}

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

  ngOnInit(): void {
    if (this.data) {
      this.purcharseOptions = this.data.data;
      this.profit_percent = this.data.profit_percent;
    }
  }
}
