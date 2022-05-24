import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PurcharseOption } from '../../../../interfaces/purcharse_option.interface';
import { QtAddPurcharseOptionComponent } from '../../add/qt-add-purcharse-option/qt-add-purcharse-option.component';

@Component({
  selector: 'app-qt-card-purchase-option-v1',
  templateUrl: './qt-card-purchase-option-v1.component.html',
  styleUrls: ['./qt-card-purchase-option-v1.component.scss'],
})
export class QtCardPurchaseOptionV1Component implements OnInit {
  @Input() option: PurcharseOption = {
    country: '',
    supplier: '',
    condition: '',
    acquisition_price: 0,
    delivery_cost: 0,
    delivery_time: 0,
    import: false,
    iva_percent: 0,
    iva: 0,
    profit_percent: 0,
    profit: 0,
    subtotal: 0,
    total: 0,
    // available: false,
    // best_option: false,
    // cant_available: 0,
    // description: "",
    // invoice: false,
    // link: "",
    // tel: ""
  };

  @Output() emitOption: EventEmitter<PurcharseOption> = new EventEmitter();
  @Output() emitUpdateBestOption: EventEmitter<boolean> = new EventEmitter();

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  emitOptionFn() {
    this.emitOption.emit(this.option);
  }

  emitUpdateBestOptionFn() {
    this.emitUpdateBestOption.emit(true);
  }

  openEditPurcharseOption(payload: PurcharseOption): void {
    const dialogRef = this.dialog.open(QtAddPurcharseOptionComponent, {
      disableClose: true,
      data: payload,
    });

    dialogRef.afterClosed().subscribe((option: PurcharseOption) => {
      if (option) {
        this.option = option;
        this.emitOptionFn();
      }
    });
  }

  markAsBestOption() {
    this.option.best_option = true;
    this.emitUpdateBestOptionFn();
    this.emitOptionFn();
  }
}
