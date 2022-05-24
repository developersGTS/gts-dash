import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { QuotationPopulated } from 'src/app/dash/pages/quotes/interfaces/quotation.interface';
import { QuotesService } from 'src/app/dash/pages/quotes/services/quotes.service';

@Component({
  selector: 'app-coll-archive',
  templateUrl: './coll-archive.component.html',
  styleUrls: ['./coll-archive.component.scss'],
})
export class CollArchiveComponent implements OnInit {
  quotations: QuotationPopulated[] = [];

  quotationView: QuotationPopulated[] = [];

  constructor(private quotesService: QuotesService) {}

  ngOnInit(): void {
    this.quotesService
      .getQuotationsByCustomFields({
        $or: [
          {
            in_collection: true,
            enabled: false,
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
