import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { QuotationPopulated } from '../../../interfaces/quotation.interface';
import { QuotesService } from '../../../services/quotes.service';

@Component({
  selector: 'app-qt-archive',
  templateUrl: './qt-archive.component.html',
  styleUrls: ['./qt-archive.component.scss'],
})
export class QtArchiveComponent implements OnInit {
  quotations: QuotationPopulated[] = [];

  quotationView: QuotationPopulated[] = [];

  constructor(private quotesService: QuotesService) {}

  ngOnInit(): void {
    this.quotesService
      .getQuotationsByCustomFields({ enabled: false })
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
