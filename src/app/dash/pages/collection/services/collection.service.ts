import { Injectable } from '@angular/core';
import { StatusTracker } from 'src/app/dash/interfaces/status_tracker.interface';
import { QuotationPopulated } from '../../quotes/interfaces/quotation.interface';
import { QuotesService } from '../../quotes/services/quotes.service';

@Injectable({
  providedIn: 'root',
})
export class CollectionService {
  private status: string[] = [
    'Enviada a cobro',
    'Facturada',
    'Pendiente contrarecibo',
    'Contrarecibo programado',
    'Pagada',
    'Pagandose en abonos',
    'Pago atrazado',
    'Finalizada',
  ];

  constructor() {}

  getColorByStatus(status: string): string {
    status = status.toLowerCase();

    switch (status) {
      case 'pagada':
        return 'success';
      default:
        return 'light';
    }
  }

  processQuotationToCollection(
    quotation: QuotationPopulated
  ): QuotationPopulated {
    if (quotation && quotation._id && quotation.quotation_items) {
      // COLLECTION DATA
      quotation.collection_data = {
        receipt: quotation.collection_data
          ? quotation.collection_data.receipt
          : undefined,
        expenses: 0,
        profits: 0,
        subtotal: 0,
        iva: 0,
        total: 0,
        invoice_no:
          quotation.collection_data && quotation.collection_data.invoice_no
            ? quotation.collection_data.invoice_no
            : undefined,
        payment_date:
          quotation.collection_data && quotation.collection_data.payment_date
            ? quotation.collection_data.payment_date
            : undefined,
        payment_method:
          quotation.collection_data && quotation.collection_data.payment_method
            ? quotation.collection_data.payment_method
            : undefined,
        programmed_payment:
          quotation.collection_data &&
          quotation.collection_data.programmed_payment
            ? quotation.collection_data.programmed_payment
            : undefined,
        purchase_order:
          quotation.collection_data && quotation.collection_data.purchase_order
            ? quotation.collection_data.purchase_order
            : undefined,
      };

      for (let item of quotation.quotation_items) {
        // VALIDACION - UNICAMENTE SE COBRARAN LOS ARTICULOS AUTORIZADOS.
        if (item.authorized) {
          // RECORRIENDO OPCIONES DE COMPRA
          for (let option of item.purcharse_options || []) {
            // EVALUANDO BEST OPTION TO BUY
            if (option.best_option) {
              // GUARDADO COSTO DEL ITEM EN GASTOS
              quotation.collection_data.expenses +=
                (option.acquisition_price + option.delivery_cost) *
                (item.quantity || 0);

              // GUARDANDO GANANCIAS DEL ITEM EN GANANCIAS
              quotation.collection_data.profits +=
                (option.subtotal -
                  (option.acquisition_price + option.delivery_cost)) *
                (item.quantity || 0);

              // GUARDANDO SUBTOTAL
              quotation.collection_data.subtotal +=
                option.subtotal * (item.quantity || 0);

              // GUARDANDO IVA
              quotation.collection_data.iva +=
                option.iva * (item.quantity || 0);

              // GUARDANDO TOTAL
              quotation.collection_data.total +=
                option.total * (item.quantity || 0);
            }
          }
        }
      }
    }

    console.log('quotation to collection', quotation);
    return quotation;
  }

  // =========================== STATUS ===========================

  getStatusList(): string[] {
    return [...this.status];
  }

  markAsBilled(quotation_id: string, status_tracker: StatusTracker[]) {}
}
