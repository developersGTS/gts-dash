import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { QuotationPopulated } from '../../../interfaces/quotation.interface';
import { QuotesService } from '../../../services/quotes.service';

@Component({
  selector: 'app-qt-followup',
  templateUrl: './qt-followup.component.html',
  styleUrls: ['./qt-followup.component.scss'],
})
export class QtFollowupComponent implements OnInit {
  quotations: QuotationPopulated[] = [];

  quotationView: QuotationPopulated[] = [];

  constructor(private quotesService: QuotesService) {}

  ngOnInit(): void {
    this.quotesService
      .getQuotationsByCustomFields({
        $or: [
          {
            status: 'Requiere correcciones',
          },
          {
            status: 'Lista para enviar',
          },
          {
            status: 'Autorizada por cliente',
          },
          {
            status: 'Pendiente comprar material',
          },
          {
            status: 'Material listo para entrega',
          },
          {
            status: 'En espera de material',
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
