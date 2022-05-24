import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { QtAddItemComponent } from '../../../components/cards/add/qt-add-item/qt-add-item.component';
import {
  QuotationItem,
  TotalItems,
} from '../../../interfaces/quotation_item.interfaces';

@Component({
  selector: 'app-qt-items',
  templateUrl: './qt-items.component.html',
  styleUrls: ['./qt-items.component.scss'],
})
export class QtItemsComponent implements OnInit {
  @Input() profit_client: number = 0.8;
  @Output() emitItems: EventEmitter<QuotationItem[]> = new EventEmitter();
  @Output() emitTotal: EventEmitter<TotalItems> = new EventEmitter();

  items: QuotationItem[] = [];

  subtotal: number = 0;
  iva: number = 0;
  total: number = 0;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  openAddItem(): void {
    const dialogRef = this.dialog.open(QtAddItemComponent, {
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((item: QuotationItem) => {
      item && item.description ? this.addItem(item) : null;
    });
  }

  addItem(payload: QuotationItem) {
    this.items.push(payload);
    this.emitItemsQt();
  }

  deleteItem(index_item: number, confirmacion: boolean) {
    confirmacion ? this.items.splice(index_item, 1) : null;
    this.calculateTotal();
  }

  deleteAllItems() {
    this.items = [];
  }

  emitItemsQt() {
    this.emitItems.emit(this.items);
  }

  recibeItem(index_card: number, item: QuotationItem) {
    this.items[index_card] = item;
    this.calculateTotal();
    this.emitItemsQt();
  }

  calculateTotal() {
    this.subtotal = 0;

    for (let item of this.items) {
      let qty = item.quantity ? item.quantity : 0;

      if (item.purcharse_options) {
        for (let option of item.purcharse_options) {
          option.best_option ? (this.subtotal += option.subtotal * qty) : null;
        }
      }
    }

    this.iva = this.subtotal * 0.16;
    this.total = this.subtotal + this.iva;

    this.emitTotalFn({
      total: this.total,
      subtotal: this.subtotal,
      iva: this.iva,
    });
  }

  emitTotalFn(data: TotalItems) {
    this.emitTotal.emit(data);
  }
}
