import { Component, Input, OnInit } from '@angular/core';
import { ServicePopulated } from '../../../../interfaces/service.interface';
import { ServicesService } from '../../../../services/services.service';
import { Company } from '../../../../../companys/interfaces/company.interface';
import { ContactPopulated } from 'src/app/dash/pages/contacts/interfaces/contact.interface';
import { CompanysService } from 'src/app/dash/pages/companys/services/companys.service';
import { ContactsService } from 'src/app/dash/pages/contacts/services/contacts.service';
import {
  Quotation,
  QuotationPopulated,
} from '../../../../../quotes/interfaces/quotation.interface';
import { QuotesService } from 'src/app/dash/pages/quotes/services/quotes.service';
import { I } from '@angular/cdk/keycodes';
import { ServiceStatus } from '../../../../interfaces/service-status.interface';

@Component({
  selector: 'app-ser-card-details-v1',
  templateUrl: './ser-card-details-v1.component.html',
  styleUrls: ['./ser-card-details-v1.component.scss'],
})
export class SerCardDetailsV1Component implements OnInit {
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

  openSendToQuotation() {
    this.quotesService
      .createQuotationByService(this.service)
      .subscribe((res: any) => {
        if (res) {
          this.quotations.push(res);
          this.servicesService
            .updateStatus(
              this.service._id,
              ServiceStatus.cotizacion,
              this.service.status_tracker || []
            )
            .subscribe((resSer) =>
              resSer && resSer._id ? (this.service = resSer) : null
            );
        }
      });
  }

  registerPart(installed: boolean) {
    this.servicesService.registerPart(this.service, installed);
  }

  openRegisterPartsList(installed: boolean) {
    this.servicesService.openRegisteredPartsList(this.service, installed);
  }

  openRegisterRepairProgress() {
    this.servicesService.registerRepairProgress(this.service);
  }
}
