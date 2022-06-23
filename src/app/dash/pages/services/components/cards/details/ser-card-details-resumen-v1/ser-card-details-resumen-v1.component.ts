import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ServicePopulated } from '../../../../interfaces/service.interface';
import { QuotationPopulated } from '../../../../../quotes/interfaces/quotation.interface';
import { ServicesService } from '../../../../services/services.service';
import { CompanysService } from '../../../../../companys/services/companys.service';
import { ContactsService } from '../../../../../contacts/services/contacts.service';
import { QuotesService } from '../../../../../quotes/services/quotes.service';
import { Company } from '../../../../../companys/interfaces/company.interface';
import { ContactPopulated } from '../../../../../contacts/interfaces/contact.interface';

@Component({
  selector: 'app-ser-card-details-resumen-v1',
  templateUrl: './ser-card-details-resumen-v1.component.html',
  styleUrls: ['./ser-card-details-resumen-v1.component.scss'],
})
export class SerCardDetailsResumenV1Component implements OnInit {
  @Input() service: ServicePopulated = {
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
    authorized: false,
    enabled: false,
    general_description: '',
    status: '',
  };

  @Output() emitServiceId: EventEmitter<string> = new EventEmitter();

  quotations: QuotationPopulated[] = [];

  constructor(
    private servicesService: ServicesService,
    private companysService: CompanysService,
    private contactsService: ContactsService,
    private quotesService: QuotesService
  ) {}

  ngOnInit(): void {
    if (this.service && this.service._id) {
      this.quotesService
        .getQuotationsByCustomFieldsWithCustomRes({
          sch: {
            service: this.service._id,
          },
          res: '_id quotation_no status_tracker',
        })
        .subscribe((res) => {
          if (res && res.length > 0) {
            // LOAD QUOTATIONS
            this.quotations = res;

            // VALIDADOR DE IN QUOTATION FIELD
            if (!this.service.in_quotation) {
              this.servicesService
                .updateService({
                  _id: this.service._id,
                  in_quotation: true,
                })
                .subscribe((ser) =>
                  ser && ser._id ? (this.service = ser) : null
                );
            }
          } else {
            this.quotations = [];
          }
        });
    }
  }

  getColorByStatus(status: string): string {
    return this.servicesService.getColorByStatus(status);
  }

  // ==================== MODALS / DIALOGS ====================
  openCompanyPreview(company: Company): void {
    this.companysService.openCompanyPreview(company);
  }

  openContactPreview(contact: ContactPopulated): void {
    this.contactsService.openContactPreview(contact);
  }

  openUpdateStatus() {
    const result = this.servicesService.openUpdateStatus({
      company: this.service?.company.nickname,
      contact: this.service?.contact.name,
      description: this.service?.general_description,
      service_id: this.service?._id,
      status_tracker: this.service?.status_tracker || [],
    });

    result.afterClosed().subscribe((res) => {
      res ? (this.service = res) : null;
    });
  }

  openOrdsAdd() {
    this.servicesService.openOrdsAdd(this.service);
  }

  emitId() {
    console.log('emitId', this.service._id);
    this.emitServiceId.emit(this.service._id);
  }
}
