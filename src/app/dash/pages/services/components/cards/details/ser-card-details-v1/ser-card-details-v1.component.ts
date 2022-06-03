import { Component, Input, OnInit } from '@angular/core';
import { ServicePopulated } from '../../../../interfaces/service.interface';
import { ServicesService } from '../../../../services/services.service';
import { Company } from '../../../../../companys/interfaces/company.interface';
import { ContactPopulated } from 'src/app/dash/pages/contacts/interfaces/contact.interface';
import { CompanysService } from 'src/app/dash/pages/companys/services/companys.service';
import { ContactsService } from 'src/app/dash/pages/contacts/services/contacts.service';

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

  constructor(
    private servicesService: ServicesService,
    private companysService: CompanysService,
    private contactsService: ContactsService
  ) {}

  ngOnInit(): void {}

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
}
