import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { catchError, of } from 'rxjs';
import { StatusMessage } from 'src/app/core/interfaces/dialogs.interface';
import { DialogsService } from 'src/app/core/services/dialogs.service';
import { Note } from 'src/app/dash/interfaces/note.interface';
import { StatusTracker } from 'src/app/dash/interfaces/status_tracker.interface';
import { QtAddItemComponent } from '../../components/cards/add/qt-add-item/qt-add-item.component';
import { CardItemDetailsV1ModeEdit } from '../../components/cards/details/qt-card-item-details-v1/qt-card-item-details-v1.component';
import { UpdateStatusQuotationV1 } from '../../components/modals/qt-update-status-v1/qt-update-status-v1.component';
import { QuotationPopulated } from '../../interfaces/quotation.interface';
import { QuotationItem } from '../../interfaces/quotation_item.interfaces';
import { QuotesService } from '../../services/quotes.service';
import { StatusTrackerPopulated } from '../../../../interfaces/status_tracker.interface';

@Component({
  selector: 'app-quote-desglose',
  templateUrl: './quote-desglose.component.html',
  styleUrls: ['./quote-desglose.component.scss'],
})
export class QuoteDesgloseComponent implements OnInit {
  param: string | null = '';

  loading: boolean = true;

  quoteLoaded: boolean = false;

  displayedColumns: string[] = ['date_created', 'status', 'user'];

  dataSource: StatusTrackerPopulated[] = [];

  @ViewChild(MatTable) table?: MatTable<StatusTracker>;

  quotation: QuotationPopulated = {
    _id: '',
    company: {
      nickname: '',
      profit_percent: 0.8,
    },
    contact: {
      name: '',
      company: {
        nickname: '',
        profit_percent: 0.8,
      },
    },
    date_request: new Date(),
    description: '',
    subtotal: 0,
    iva: 0,
    total: 0,
    priority: 0,
    status: '',
  };

  constructor(
    private quotesService: QuotesService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private dialogsService: DialogsService
  ) {
    this.param = this.route.snapshot.paramMap.get('quote');

    if (this.param !== '' || this.param) {
      const num: number = Number(this.param);

      if (!isNaN(num)) {
        // console.log('number');
        let sub = this.quotesService
          .getQuotationsByCustomFields({
            quotation_no: this.param ? this.param : '',
          })
          .subscribe((result) => {
            console.log('result 123', result);

            if (result && result.length > 0 && result[0]._id) {
              this.quotation = result[0];
              this.dataSource = this.quotation.status_tracker || [];
              console.log(
                'this.quotation.status_tracker',
                this.quotation.status_tracker
              );
              this.table ? this.table.renderRows() : null;
              this.quoteLoaded = true;
            } else {
              this.quoteLoaded = false;
            }

            this.loading = false;
            sub.unsubscribe();
          });
      } else if (typeof this.param === 'string') {
        // console.log('string');
        let sub = this.quotesService
          .getQuotationById(this.param)
          .pipe(catchError((err) => of(false)))
          .subscribe((result) => {
            console.log('result abc', result);
            if (result && typeof result !== 'boolean') {
              this.quotation = result;
              this.dataSource = this.quotation.status_tracker || [];
              this.table ? this.table.renderRows() : null;
              this.quoteLoaded = true;
            } else {
              this.quoteLoaded = false;
            }

            this.loading = false;
            sub.unsubscribe();
          });
      }
    }
  }

  ngOnInit(): void {
    this.calculateTotal();
  }

  setItemQuotation(index: number, item: QuotationItem) {
    if (this.quotation.quotation_items) {
      this.quotation.quotation_items[index] = item;
      this.calculateTotal();
    }
  }

  deleteItem(index: number, confirmation: boolean) {
    if (confirmation) {
      this.quotation.quotation_items?.splice(index, 1);
      this.quotesService
        .updateQuotation({
          _id: this.quotation._id,
          quotation_items: this.quotation.quotation_items,
        })
        .subscribe((res) => {
          res ? this.setQuotation(res) : null;
        });
    }
  }

  calculateTotal() {
    if (
      this.quotation.quotation_items &&
      this.quotation.quotation_items.length > 0
    ) {
      this.quotation.total = 0;
      this.quotation.subtotal = 0;
      this.quotation.iva = 0;

      for (let item of this.quotation.quotation_items) {
        for (let option of item.purcharse_options || []) {
          if (option.best_option) {
            this.quotation.subtotal += option.subtotal * (item.quantity || 0);
            this.quotation.iva += option.iva * (item.quantity || 0);
            this.quotation.total += option.total * (item.quantity || 0);
          }
        }
      }

      // SAVE
      this.quotesService
        .updateQuotation({
          _id: this.quotation._id || '',
          quotation_items: this.quotation.quotation_items,
          subtotal: this.quotation.subtotal,
          iva: this.quotation.iva,
          total: this.quotation.total,
          notes: this.quotation.notes,
        })
        .subscribe();
    }
  }

  getPriority(priority: number): string {
    return this.quotesService.getPriorityByNumber(priority);
  }

  getPriorityClass(priority: number): string {
    return 'text-' + this.quotesService.getPriorityColor(priority) + ' fw-bold';
  }

  getEditModeData(index: number) {
    const data: CardItemDetailsV1ModeEdit = {
      quotation_id: this.quotation._id || '',
      item_index: index,
      quotation_items: this.quotation.quotation_items || [],
    };
    return data;
  }

  setNote(index: number, note: Note) {}

  deleteNote(index: number, confirmation: boolean) {}

  openAddItem(): void {
    const dialogRef = this.dialog.open(QtAddItemComponent, {
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((item: QuotationItem) => {
      item && item.description ? this.addItem(item) : null;
    });
  }

  addItem(item: QuotationItem) {
    this.quotation.quotation_items?.push(item);
    this.quotesService
      .updateQuotation({
        _id: this.quotation._id,
        quotation_items: this.quotation.quotation_items,
      })
      .subscribe((quotation) => {
        if (quotation && quotation._id) {
          this.quotation = quotation;
          this.dialogsService.openNotificationV1({
            message: 'Articulo agregado correctamente',
            status: StatusMessage.success,
          });
        } else {
          this.dialogsService.openNotificationV1({
            message: 'No se pudo agregar el articulo',
            status: StatusMessage.danger,
          });
        }
      });
  }

  setQuotation(quotation: QuotationPopulated) {
    this.quotation = quotation;
  }

  getDataStatusQuotation(): UpdateStatusQuotationV1 {
    return {
      company: this.quotation.company.nickname,
      contact: this.quotation.contact.name,
      description: this.quotation.description,
      quotation_id: this.quotation._id,
      status_tracker: this.quotesService.convertStatusTrackerArray(
        this.quotation.status_tracker || []
      ),
      folio: this.quotation.quotation_no || '',
    };
  }

  countItemsAuthorized(): number {
    let count = 0;

    for (let item of this.quotation.quotation_items || []) {
      item.authorized ? count++ : null;
    }

    return count;
  }
}
