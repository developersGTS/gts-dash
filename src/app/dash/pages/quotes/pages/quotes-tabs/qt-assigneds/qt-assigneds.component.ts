import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { QuotationPopulated } from '../../../interfaces/quotation.interface';
import { QuotesService } from '../../../services/quotes.service';

@Component({
  selector: 'app-qt-assigneds',
  templateUrl: './qt-assigneds.component.html',
  styleUrls: ['./qt-assigneds.component.scss'],
})
export class QtAssignedsComponent implements OnInit {
  quotations: QuotationPopulated[] = [];

  quotationView: QuotationPopulated[] = [];

  constructor(private quotesService: QuotesService) {}

  ngOnInit(): void {
    this.quotesService
      .getQuotationsByAssigned('62183b223775c4c69cd75728')
      .pipe(
        tap((quotes) => {
          this.quotations = this.orderQuotesByStatus(quotes);
          this.quotationView = this.quotations;
        })
      )
      .subscribe();
  }

  orderQuotesByPriority(quotes: QuotationPopulated[]) {
    return this.quotesService.orderQuotesByPriority(quotes);
  }

  orderQuotesByStatus(quotes: QuotationPopulated[]) {
    return this.quotesService.orderQuotesByStatus(quotes);
  }

  applyFilter(quotes: QuotationPopulated[]) {
    this.quotationView = quotes;
  }
}
