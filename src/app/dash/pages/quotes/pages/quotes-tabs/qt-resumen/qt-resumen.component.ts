import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { QuotationPopulated } from '../../../interfaces/quotation.interface';
import { QuotesService } from '../../../services/quotes.service';

@Component({
  selector: 'app-qt-resumen',
  templateUrl: './qt-resumen.component.html',
  styleUrls: ['./qt-resumen.component.scss'],
})
export class QtResumenComponent implements OnInit {
  quotations: QuotationPopulated[] = [];

  quotationView: QuotationPopulated[] = [];

  constructor(private quotesService: QuotesService) {}

  ngOnInit(): void {
    this.quotesService
      .getQuotationsByCustomFields({ enabled: true })
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
