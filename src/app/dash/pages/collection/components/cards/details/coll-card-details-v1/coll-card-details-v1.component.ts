import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StatusMessage } from 'src/app/core/interfaces/dialogs.interface';
import { DialogsService } from 'src/app/core/services/dialogs.service';
import { StatusTracker } from 'src/app/dash/interfaces/status_tracker.interface';
import { Company } from 'src/app/dash/pages/companys/interfaces/company.interface';
import { CompanysService } from 'src/app/dash/pages/companys/services/companys.service';
import { ContactPopulated } from 'src/app/dash/pages/contacts/interfaces/contact.interface';
import { ContactsService } from 'src/app/dash/pages/contacts/services/contacts.service';
import {
  QtUpdateStatusV1Component,
  UpdateStatusQuotationV1,
} from 'src/app/dash/pages/quotes/components/modals/qt-update-status-v1/qt-update-status-v1.component';
import { QuotationPopulated } from 'src/app/dash/pages/quotes/interfaces/quotation.interface';
import { QuotesService } from 'src/app/dash/pages/quotes/services/quotes.service';
import { ServicePopulated } from 'src/app/dash/pages/services/interfaces/service.interface';
import { ServicesService } from 'src/app/dash/pages/services/services/services.service';
import { CollectionService } from '../../../../services/collection.service';
import { CollInvoiceAddV1Component } from '../../../modals/coll-invoice-add-v1/coll-invoice-add-v1.component';
import { StatusTrackerPopulated } from '../../../../../../interfaces/status_tracker.interface';

@Component({
  selector: 'app-coll-card-details-v1',
  templateUrl: './coll-card-details-v1.component.html',
  styleUrls: ['./coll-card-details-v1.component.scss'],
})
export class CollCardDetailsV1Component implements OnInit {
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
    status_tracker: StatusTrackerPopulated[],
    company: string,
    contact: string,
    description: string
  ) {
    let data: UpdateStatusQuotationV1 = {
      company,
      contact,
      description,
      quotation_id: id,
      status_tracker:
        this.quotesService.convertStatusTrackerArray(status_tracker),
      folio: quotation_no,
      mode_collection: true,
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

  markAsBilled() {
    if (this.quotation.billed) {
      this.dialogsService.openMessageBasicV1({
        message:
          'La CO ' +
          (this.quotation.quotation_no
            ? this.quotation.quotation_no
            : this.quotation._id) +
          ' ya ha sido marcada como pagada anteriormente.',
        status: StatusMessage.info,
      });
    } else {
      this.quotesService
        .setUpdateStatusWithDialogs(
          this.quotation._id,
          'Pagada',
          this.quotesService.convertStatusTrackerArray(
            this.quotation.status_tracker || []
          ) || [],
          '¿Desea marcar la CO ' + this.quotation.quotation_no + ' como pagada?'
        )
        .subscribe((res) => {
          res && res._id ? (this.quotation = res) : null;
        });
    }
  }

  markAsBillesd() {
    this.quotesService
      .setUpdateStatusWithDialogs(
        this.quotation._id,
        'Facturada',
        this.quotesService.convertStatusTrackerArray(
          this.quotation.status_tracker || []
        ),
        '¿Desea marcar la CO ' +
          this.quotation.quotation_no +
          ' como Facturada?'
      )
      .subscribe((res) => {
        res && res._id ? (this.quotation = res) : null;
      });
  }

  markAsInvoiced() {
    const dialogRef = this.dialog.open(CollInvoiceAddV1Component, {
      data: this.quotation,
    });

    dialogRef.afterClosed().subscribe((result) => {
      result && result._id ? (this.quotation = result) : null;
    });
  }

  openAddPO() {
    this.quotesService.openAddPO(this.quotation);
  }
}
