import { Component, Input, OnInit } from '@angular/core';

// A. MATERIAL
import { MatDialog } from '@angular/material/dialog';

// COMPONENTS
import { DgConfirmationV1 } from 'src/app/core/components/dialogs/dg-confirmation-v1/dg-confirmation-v1.component';

// SERVICES
import { DialogsService } from 'src/app/core/services/dialogs.service';
import { CompanysService } from 'src/app/dash/pages/companys/services/companys.service';
import { ContactsService } from 'src/app/dash/pages/contacts/services/contacts.service';
import { ServicesService } from 'src/app/dash/pages/services/services/services.service';
import { QuotesService } from '../../../../services/quotes.service';

// INTERFACES
import { StatusTracker } from 'src/app/dash/interfaces/status_tracker.interface';
import { Company } from 'src/app/dash/pages/companys/interfaces/company.interface';
import { ContactPopulated } from 'src/app/dash/pages/contacts/interfaces/contact.interface';
import { ServicePopulated } from 'src/app/dash/pages/services/interfaces/service.interface';
import { QuotationPopulated } from '../../../../interfaces/quotation.interface';
import { StatusMessage } from 'src/app/core/interfaces/dialogs.interface';
import {
  QtUpdateStatusV1Component,
  UpdateStatusQuotationV1,
} from '../../../modals/qt-update-status-v1/qt-update-status-v1.component';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { CollectionService } from '../../../../../collection/services/collection.service';

@Component({
  selector: 'app-qt-card-details-v1',
  templateUrl: './qt-card-details-v1.component.html',
  styleUrls: ['./qt-card-details-v1.component.scss'],
})
export class QtCardDetailsV1Component implements OnInit {
  // DATE NOW
  date = new Date();
  obsTest?: Observable<boolean>;

  @Input() quotation: QuotationPopulated = {
    _id: '',
    company: {
      nickname: '',
      profit_percent: 0.8,
    },
    contact: {
      company: {
        nickname: '',
        profit_percent: 0.8,
      },
      name: '',
    },
    description: '',
    priority: 0,
    status: 'Pendiente',
    date_request: this.date,
    subtotal: 0,
    iva: 0,
    total: 0,
  };
  constructor(
    public dialog: MatDialog,
    private servicesService: ServicesService,
    private contactsService: ContactsService,
    private quotesService: QuotesService,
    private companysService: CompanysService,
    private collectionService: CollectionService,
    private dialogsService: DialogsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.quotation;
  }

  convertStatusTrackerArray() {
    return this.quotesService.convertStatusTrackerArray(
      this.quotation.status_tracker || []
    );
  }

  getPriority(priority: number): string {
    return this.quotesService.getPriorityByNumber(priority);
  }

  getPriorityClass(priority: number): string {
    return 'text-' + this.quotesService.getPriorityColor(priority) + ' fw-bold';
  }

  // ==================== MODALS / DIALOGS ====================
  openCompanyPreview(company: Company): void {
    this.companysService.openCompanyPreview(company);
  }

  openContactPreview(contact: ContactPopulated): void {
    this.contactsService.openContactPreview(contact);
  }

  openServicePreview(service: ServicePopulated): void {
    this.servicesService.openServicePreview(service);
  }

  updateStatus(status: string, message: string) {
    const afterUpdate = this.quotesService.setUpdateStatusWithDialogs(
      this.quotation._id ? this.quotation._id : '',
      status,
      this.quotation.status_tracker
        ? this.quotesService.convertStatusTrackerArray(
            this.quotation.status_tracker
          )
        : [],
      message
    );

    const sus = afterUpdate.subscribe(
      (result: QuotationPopulated | undefined) => {
        result ? (this.quotation = result) : null;
        sus.unsubscribe();
      }
    );
  }

  markAsFinished() {
    this.updateStatus(
      'Finalizada',
      '¿Desea marcar la cotizacion ' +
        this.quotation.quotation_no +
        ' como finalizada?'
    );
  }

  openFastView() {
    this.quotesService.openFastView(this.quotation);
  }

  openUpdateStatusDialog(
    quotation_no: string,
    id: string,
    status_tracker: StatusTracker[],
    company: string,
    contact: string,
    description: string
  ) {
    let data: UpdateStatusQuotationV1 = {
      company,
      contact,
      description,
      quotation_id: id,
      status_tracker,
      folio: quotation_no,
    };

    const dialogRef = this.dialog.open(QtUpdateStatusV1Component, {
      data,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('ªªªªresult', result);
      result ? (this.quotation = result) : null;
    });
  }

  getColorClassByStatus(status: string) {
    let color = this.quotesService.getColorByStatus(status);

    color === 'warning' || color === 'info' || color === 'light'
      ? (color = color + ' text-dark')
      : null;

    return color;
  }

  openQuotationDesglose(quotation: string) {
    this.router.navigateByUrl('dash/quotes/resumen/' + quotation);
  }

  openAddPO() {
    this.quotesService.openAddPO(this.quotation);
  }

  openAddService() {
    const ref = this.servicesService.openSelectService();

    ref.afterClosed().subscribe((res) => {
      if (res) {
        this.quotesService
          .updateQuotation({
            _id: this.quotation._id,
            service: res,
          })
          .subscribe((quotationRes) => {
            if (quotationRes && quotationRes._id) {
              this.quotation = quotationRes;
              this.dialogsService.openNotificationV1({
                message: 'Servicio agregado correctamente a la cotizacion',
                status: StatusMessage.success,
              });
            } else {
              this.dialogsService.openNotificationV1({
                message: 'Error al asignar el servicio a la cotizacion',
                status: StatusMessage.danger,
              });
            }
          });
      }
    });
  }
}
