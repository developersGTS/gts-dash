import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

// INTERFACES
import { QuotationItem } from '../../../../interfaces/quotation_item.interfaces';
import {
  PurcharseOption,
  PurcharseOptionWithClientProfit,
} from '../../../../interfaces/purcharse_option.interface';

// COMPONENTS
import { QtAddPurcharseOptionComponent } from '../../add/qt-add-purcharse-option/qt-add-purcharse-option.component';
import { QtCardNotesItemComponent } from '../../notes/qt-card-notes-item/qt-card-notes-item.component';
import { QtPurcharseDetailsV1Component } from '../../../modals/qt-purcharse-details-v1/qt-purcharse-details-v1.component';
import { QtAddItemComponent } from '../../add/qt-add-item/qt-add-item.component';
import { Note } from 'src/app/dash/interfaces/note.interface';
import { QuotesService } from '../../../../services/quotes.service';
import { DialogsService } from 'src/app/core/services/dialogs.service';
import { StatusMessage } from 'src/app/core/interfaces/dialogs.interface';
import { CollectionService } from 'src/app/dash/pages/collection/services/collection.service';
import { switchMap, tap, map } from 'rxjs';
import { QuotationPopulated } from '../../../../interfaces/quotation.interface';

export interface CardItemDetailsV1ModeEdit {
  quotation_id: string;
  item_index: number;
  quotation_items: QuotationItem[];
}

@Component({
  selector: 'app-qt-card-item-details-v1',
  templateUrl: './qt-card-item-details-v1.component.html',
  styleUrls: ['./qt-card-item-details-v1.component.scss'],
})
export class QtCardItemDetailsV1Component implements OnInit {
  @Input() mode_edit: CardItemDetailsV1ModeEdit | undefined = undefined;

  // ITEM DATA
  @Input() item: QuotationItem = {
    description: '',
    part_no: '',
    quantity: 0,
    authorized: false,
    bought: false,
    purcharse_options: [],
  };

  // PROFIT CLIENT
  @Input() profit_client: number = 0.8;

  // EMIT ITEM
  @Output() emitItem: EventEmitter<QuotationItem> = new EventEmitter();
  // EMIT DELETE ITEM
  @Output() emitDeleteItem: EventEmitter<boolean> = new EventEmitter();

  best_option_link: string = '';
  best_option_tel: string = '';
  best_option_price: number = 0;
  subtotal: number = 0;
  iva: number = 0;
  total: number = 0;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private quotesService: QuotesService,
    private dialogsService: DialogsService,
    private collectionService: CollectionService
  ) {}

  ngOnInit(): void {
    this.calculateTotal();
  }

  openPurcharseOptions(): void {
    let data: PurcharseOptionWithClientProfit = {
      data: this.item.purcharse_options || [],
      profit_percent: this.profit_client,
    };

    if (this.mode_edit) {
      data.mode_edit = {
        quotation_id: this.mode_edit.quotation_id,
        item_index: this.mode_edit.item_index,
        quotation_items: this.mode_edit.quotation_items,
      };
    }

    console.log('data -> PurcharseOptionWithClientProfit', data);

    const dialogRef = this.dialog.open(QtPurcharseDetailsV1Component, {
      width: '75vw',
      disableClose: true,
      data,
    });

    let sus = dialogRef.afterClosed().subscribe((result: PurcharseOption[]) => {
      result ? (this.item.purcharse_options = result) : null;
      console.log('result', result);
      this.calculateTotal();
      this.emitItemFn();

      sus.unsubscribe();
    });
  }

  openNotes(): void {
    const dialogRef = this.dialog.open(QtCardNotesItemComponent, {
      disableClose: true,
      data: this.item.notes ? this.item.notes : [],
    });

    dialogRef.afterClosed().subscribe((result: Note[]) => {
      result ? (this.item.notes = result) : null;
    });
  }

  openAddPurcharseOption(): void {
    const dialogRef = this.dialog.open(QtAddPurcharseOptionComponent, {
      disableClose: true,
      data: {
        profit_percent: this.profit_client,
      },
    });

    let sus = dialogRef.afterClosed().subscribe((result: PurcharseOption) => {
      if (result) {
        this.item.purcharse_options
          ? this.item.purcharse_options.push(result)
          : null;
        if (this.item.purcharse_options?.length == 1) {
          this.calculate_best_options();
        } else {
        }
        this.calculateTotal();
        this.emitItemFn();
        sus.unsubscribe();
      }
    });
  }

  emitItemFn() {
    if (this.mode_edit) {
      this.mode_edit.quotation_items[this.mode_edit.item_index] = this.item;

      this.quotesService
        .updateQuotation({
          _id: this.mode_edit.quotation_id,
          quotation_items: this.mode_edit.quotation_items,
        })
        .subscribe((result) => {
          result && result._id ? this.emitItem.emit(this.item) : null;
        });
    } else {
      this.emitItem.emit(this.item);
    }
  }

  emitDeleteItemFn() {
    this.emitDeleteItem.emit(true);
  }

  editItem() {
    const dialogRef = this.dialog.open(QtAddItemComponent, {
      disableClose: true,
      data: this.item,
    });

    let sus = dialogRef.afterClosed().subscribe((result: QuotationItem) => {
      if (result) {
        // SET CHANGES
        this.item.description = result.description;
        this.item.part_no = result.part_no;
        this.item.quantity = result.quantity;

        // RECALCULATE TOTAL
        this.calculateTotal();

        // RECALCULATE COLLECTION DATA
        this.updateCollectionData();

        // EMIT ITEM
        this.emitItemFn();

        sus.unsubscribe();
      }
    });
  }

  markAsBought() {
    this.item.bought = !this.item.bought;
    this.emitItemFn();
  }

  markAsAuthorized() {
    this.item.authorized = !this.item.authorized;

    this.updateCollectionData();
    this.emitItemFn();
  }

  updateCollectionData() {
    if (this.mode_edit) {
      this.quotesService
        .getQuotationById(this.mode_edit.quotation_id)
        .pipe(
          map((res: QuotationPopulated) => {
            if (res && res.quotation_items) {
              if (
                this.mode_edit?.item_index ||
                this.mode_edit?.item_index === 0
              ) {
                // SET AUTHORIZED
                res.quotation_items[this.mode_edit.item_index].authorized =
                  this.item.authorized;

                // SET QUANTITY ITEM
                res.quotation_items[this.mode_edit.item_index].quantity =
                  this.item.quantity;
              }
            }

            res = this.collectionService.processQuotationToCollection(res);
            return res;
          }),
          switchMap((res) =>
            this.quotesService.updateQuotation({
              _id: this.mode_edit?.quotation_id || '',
              collection_data: res.collection_data,
            })
          )
        )
        .subscribe((res) => {
          if (res) {
            this.dialogsService.openNotificationV1({
              title: 'Actualizacion de cobro',
              message: 'Monto a cobrar actualizado',
              status: StatusMessage.success,
            });
          }
        });
    }
  }

  buy_best_option() {
    if (this.best_option_link) {
      console.log('this.best_option_link', this.best_option_link);
      window.open(this.best_option_link);
    } else {
      this.calculate_best_options();
      console.log('calculate_best_options');
      window.open(this.best_option_link);
      console.log('this.best_option_link', this.best_option_link);
    }
  }

  calculate_best_options() {
    if (this.item.purcharse_options) {
      if (this.item.purcharse_options.length === 1) {
        this.item.purcharse_options[0].best_option = true;

        // SET LINK BEST OPTION
        this.best_option_link = this.item.purcharse_options[0].link || '';
        console.log(
          'this.item.purcharse_options[0].link',
          this.item.purcharse_options[0].link
        );

        // CALCULATE TOTAL
        this.best_option_price = this.item.purcharse_options[0].subtotal;
        this.calculateTotal();
      } else {
        let index = -1;
        let price = 0;

        // TODO:
        for (let option of this.item.purcharse_options) {
        }
      }
    }
  }

  calculateTotal() {
    console.log('calculateTotal');

    // VALIDAR QUE SOLO HAYA UN BEST OPTION
    if (
      this.item.purcharse_options &&
      this.item.purcharse_options?.length !== 0
    ) {
      let validation_best_option = 0;
      for (let option of this.item.purcharse_options) {
        if (option.best_option) {
          validation_best_option++;
        }
      }

      if (validation_best_option > 1) {
        this.dialogsService.openMessageBasicV1({
          message: 'No puede haber 2 items marcadas como mejor opcion',
          status: StatusMessage.warning,
        });
        return;
      }

      // ============

      // ASIGNAR BEST OPTION

      for (let option of this.item.purcharse_options) {
        if (option.best_option) {
          // BEST OPTION PRICE
          this.best_option_price = option.subtotal;

          // BEST OPTION - SUBTOTAL
          this.subtotal =
            this.best_option_price *
            (this.item.quantity ? this.item.quantity : 0);

          // BEST OPTION - IVA
          this.iva = this.subtotal * 0.16;

          // BEST OPTION - TOTAL
          this.total = this.subtotal + this.iva;

          // SET LINK/TEL TO BUY BEST OPTION
          this.best_option_link = option.link || '';
          this.best_option_tel = option.tel || '';
        }
      }
    } else {
      return;
    }

    // EMIT CHANGES
    this.emitItemFn();
  }
}
