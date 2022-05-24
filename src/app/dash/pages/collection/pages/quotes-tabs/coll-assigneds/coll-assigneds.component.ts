import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { QuotationPopulated } from 'src/app/dash/pages/quotes/interfaces/quotation.interface';
import { QuotesService } from 'src/app/dash/pages/quotes/services/quotes.service';

@Component({
  selector: 'app-coll-assigneds',
  templateUrl: './coll-assigneds.component.html',
  styleUrls: ['./coll-assigneds.component.scss'],
})
export class CollAssignedsComponent implements OnInit {
  quotations: QuotationPopulated[] = [];

  quotationView: QuotationPopulated[] = [];

  constructor(private quotesService: QuotesService) {}

  ngOnInit(): void {
    this.quotesService
      .getQuotationsByAssigned('62183b223775c4c69cd75728')
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
