import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { QuotationPopulated } from 'src/app/dash/pages/quotes/interfaces/quotation.interface';
import { QuotesService } from 'src/app/dash/pages/quotes/services/quotes.service';

@Component({
  selector: 'app-coll-receipt',
  templateUrl: './coll-receipt.component.html',
  styleUrls: ['./coll-receipt.component.scss'],
})
export class CollReceiptComponent implements OnInit {
  quotations: QuotationPopulated[] = [];

  quotationView: QuotationPopulated[] = [];

  constructor(private quotesService: QuotesService) {}

  ngOnInit(): void {
    this.quotesService
      .getQuotationsByCustomFields({
        $or: [
          {
            status: 'Contrarecibo programado',
            enabled: true,
            in_collection: true,
          },
        ],
      })
      .pipe(
        tap((quotes) => {
          this.quotations = this.orderQuotesByPriority(quotes);
          this.quotationView = this.quotations;
        })
      )
      .subscribe();
  }

  orderQuotesByPriority(quotes: QuotationPopulated[]) {
    return this.quotesService.orderQuotesByPriority(quotes);
  }

  applyFilter(quotes: QuotationPopulated[]) {
    this.quotationView = quotes;
  }
}
