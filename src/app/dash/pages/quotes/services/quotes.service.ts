import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { map, Observable, switchMap, tap } from 'rxjs';
import { DgConfirmationV1 } from 'src/app/core/components/dialogs/dg-confirmation-v1/dg-confirmation-v1.component';
import { StatusMessage } from 'src/app/core/interfaces/dialogs.interface';
import { DialogsService } from 'src/app/core/services/dialogs.service';
import { StatusTracker } from 'src/app/dash/interfaces/status_tracker.interface';
import { environment } from 'src/environments/environment';
import { CollectionService } from '../../collection/services/collection.service';
import { QtFastviewComponent } from '../components/modals/qt-fastview/qt-fastview.component';
import {
  Quotation,
  QuotationPopulated,
  QuotationSch,
  QuotationUpdate,
} from '../interfaces/quotation.interface';
import { PriorityList } from '../interfaces/quotations_service_data.interface';

@Injectable({
  providedIn: 'root',
})
export class QuotesService {
  private api_base = `${environment.api_gts}quotes`;

  private status: string[] = [
    'Pendiente',
    'En revision interna',
    'Requiere correcciones',
    'Lista para enviar',
    'Enviada al cliente',
    'Rechazada',
    'Autorizada por cliente',
    'Pendiente comprar material',
    'En espera de material',
    'Material listo para entrega',
    'Enviada a cobro',
    'Finalizada',
  ];

  private priority: PriorityList[] = [
    { name: 'Regular', value: 0 },
    { name: 'Baja', value: -1 },
    { name: 'Alta', value: 1 },
    { name: 'Urgente', value: 2 },
  ];

  constructor(
    private http: HttpClient,
    private dialogsService: DialogsService,
    private dialog: MatDialog,
    private collectionService: CollectionService
  ) {}

  // =========================== GET QUOTATIONS ===========================

  getQuotes() {
    return this.http.get<QuotationPopulated[]>(`${this.api_base}`);
  }

  getQuotationById(id: string) {
    return this.http.get<QuotationPopulated>(`${this.api_base}/byid/${id}`);
  }

  getQuotationsByAssigned(user_id: string) {
    return this.http.get<QuotationPopulated[]>(
      `${this.api_base}/byassigned/${user_id}`
    );
  }

  getQuotationsByCustomFields(customFields: QuotationSch | any) {
    return this.http.post<QuotationPopulated[]>(
      `${this.api_base}/sch`,
      customFields
    );
  }

  // =========================== CREATE QUOTATIONS ===========================
  newQuotation(payload: Quotation) {
    return this.http.post(`${this.api_base}`, payload);
  }

  // TODO: =========================== UPDATE QUOTATIONS ===========================

  updateQuotation(payload: QuotationUpdate) {
    console.log('quotesService->updateQuotation', payload);

    return this.http.put<QuotationPopulated>(`${this.api_base}`, payload);
  }

  // =========================== PRIORITY ===========================

  getPriorityList(): PriorityList[] {
    return [...this.priority];
  }

  getPriorityByNumber(priority: number): string {
    let result = this.priority.filter((item) => item.value == priority);
    if (result) {
      return result[0].name;
    } else {
      return 'Sin prioridad';
    }
  }

  getPriorityByName(priority: string): number {
    let result = this.priority.filter((item) => item.name == priority);
    if (result) {
      return result[0].value;
    } else {
      return 0;
    }
  }

  getPriorityColor(priority: number): string {
    switch (priority) {
      case -1:
        return 'success';
      case 0:
        return 'success';
      case 1:
        return 'warning';
      case 2:
        return 'danger';
      default:
        return '';
    }
  }

  orderQuotesByPriority(quotes: QuotationPopulated[]) {
    let newOrder = [...quotes];
    return newOrder.sort((a, b) => {
      return b.priority - a.priority;
    });
  }

  orderQuotesByStatus(quotes: QuotationPopulated[]) {
    quotes = this.orderQuotesByPriority(quotes);

    let pendientes: QuotationPopulated[] = [];
    let enCobro: QuotationPopulated[] = [];
    let enviadas: QuotationPopulated[] = [];
    let others: QuotationPopulated[] = [];

    let newQuotesOrder: QuotationPopulated[] = [];

    for (let quotation of quotes) {
      if (quotation.status === 'Pendiente') {
        pendientes.push(quotation);
      } else if (quotation.status === 'Enviada a cobro') {
        enCobro.push(quotation);
      } else if (quotation.status === 'Enviada al cliente') {
        enviadas.push(quotation);
      } else {
        others.push(quotation);
      }
    }

    for (let i of pendientes) {
      newQuotesOrder.push(i);
    }

    for (let i of others) {
      newQuotesOrder.push(i);
    }

    for (let i of enviadas) {
      newQuotesOrder.push(i);
    }

    for (let i of enCobro) {
      newQuotesOrder.push(i);
    }

    return newQuotesOrder;
  }

  // =========================== STATUS ===========================

  getStatusList(): string[] {
    return [...this.status];
  }

  updateStatus(_id: string, status: string, status_tracker: StatusTracker[]) {
    status_tracker.push({
      user: '620afd6e9d4b8b4308838aac',
      status,
    });

    return this.http
      .put<QuotationPopulated>(`${this.api_base}`, {
        _id,
        status,
        status_tracker,
      })
      .pipe(
        map((result) => {
          return this.sendToCollection(result);
        }),
        tap((result) => {
          console.log('tap result', result);
        }),
        switchMap((result: QuotationPopulated) =>
          this.updateQuotation({
            _id: result._id || '',
            in_collection:
              result.in_collection || status === 'Enviada a cobro'
                ? true
                : false,
            customer_approved:
              result.customer_approved || status === 'Autorizada por cliente'
                ? true
                : false,
            in_review:
              result.in_review || status === 'En revision interna'
                ? true
                : false,
            supervisor_approved:
              result.supervisor_approved || status === 'Lista para enviar'
                ? true
                : false,
            billed: result.billed || status === 'Pagada' ? true : false,
            enabled: !result.enabled || status === 'Finalizada' ? false : true,
            collection_data: result.collection_data
              ? {
                  payment_date:
                    result.collection_data.payment_date || status === 'Pagada'
                      ? result.collection_data.payment_date || new Date()
                      : undefined,
                  programmed_payment: result.collection_data.programmed_payment
                    ? result.collection_data.programmed_payment
                    : undefined,
                  payment_method: result.collection_data.payment_method
                    ? result.collection_data.payment_method
                    : '',
                  invoice_no: result.collection_data.invoice_no
                    ? result.collection_data.invoice_no
                    : '',
                  purchase_order: result.collection_data.purchase_order
                    ? result.collection_data.purchase_order
                    : '',
                  receipt: result.collection_data.receipt
                    ? result.collection_data.receipt
                    : '',
                  expenses: result.collection_data.expenses,
                  profits: result.collection_data.profits,
                  subtotal: result.collection_data.subtotal,
                  iva: result.collection_data.iva,
                  total: result.collection_data.total,
                }
              : {
                  expenses: 0,
                  profits: 0,
                  subtotal: 0,
                  iva: 0,
                  total: 0,
                },
          })
        )
      );
  }

  getColorByStatus(status: string): string {
    status = status.toLowerCase();

    switch (status) {
      case 'pendiente':
        return 'primary';
      case 'lista para enviar':
        return 'primary';
      case 'rechazada':
        return 'danger';
      case 'autorizada por cliente':
        return 'success';
      case 'pendiente comprar material':
        return 'warning';
      case 'en espera de material':
        return 'primary';
      case 'material listo para entrega':
        return 'primary';
      case 'enviada a cobro':
        return 'secondary';
      case 'finalizada':
        return 'dark';
      default:
        return this.collectionService.getColorByStatus(status);
    }
  }

  // TODO: ENVIAR QUOTATION ACTUALIZADA PARA MODIFICAR EL FRONT
  setUpdateStatusWithDialogs(
    _id: string,
    status: string,
    status_tracker: StatusTracker[],
    confirmation_message: string
  ): Observable<QuotationPopulated | undefined> {
    // TODO: PENDIENTE HACER QUE RECIBA COMO PARAMETRO EL USUARIO. ACTUALMENTE ASIGAN A TODOS EL ID DE FLOR NAVA
    // DATA FOR DIALOG
    const data: DgConfirmationV1 = {
      title: confirmation_message,
      buttons: [
        {
          title: 'CANCELAR',
          value: false,
        },
        {
          title: 'CONFIRMAR',
          color: 'success',
          value: true,
        },
      ],
    };

    const dialogRef = this.dialogsService.openConfirmationV1(data);

    let obsQuotation: Observable<QuotationPopulated | undefined> =
      new Observable((suscriber) => {
        dialogRef.afterClosed().subscribe((result) => {
          // TODO: CREAR VALIDADORES PARA ID Y STATUS TRACKER - QUE NO ESTEN EN UNDEFINED
          if (result && _id && status_tracker) {
            this.updateStatus(_id, status, status_tracker)
              .pipe(
                tap((result) => {
                  if (result._id && result.status == status) {
                    suscriber.next(result);
                    this.dialogsService.openNotificationV1({
                      title: 'estatus cotizacion',
                      message: 'Se cambio el estatus correctamente',
                      status: StatusMessage.success,
                    });
                  } else {
                    suscriber.next(undefined);
                    this.dialogsService.openNotificationV1({
                      title: 'estatus cotizacion',
                      message: 'No se cambio el estatus, intente mas tarde',
                      status: StatusMessage.danger,
                    });
                  }
                })
              )
              .subscribe();
          }
        });
      });

    return obsQuotation;
  }

  // =========================== SEARCHER ===========================

  searchQuotationByKey(key: string) {
    return this.http.get<QuotationPopulated[]>(`${this.api_base}/sch/${key}`);
  }

  searchByCustom(payload: QuotationSch) {
    return this.http.post<QuotationPopulated[]>(
      `${this.api_base}/sch`,
      payload
    );
  }

  

  // =========================== DIALOGS / MODALS ===========================
  openFastView(quotation: QuotationPopulated) {
    const dialogRef = this.dialog.open(QtFastviewComponent, {
      width: '85vw',
      height: '95vh',
      data: quotation,
    });
  }

  // =========================== COLLECTION ===========================
  sendToCollection(quotation: QuotationPopulated): QuotationPopulated {
    return this.collectionService.processQuotationToCollection(quotation);
  }
}
