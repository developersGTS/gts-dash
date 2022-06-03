import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { StatusMessage } from 'src/app/core/interfaces/dialogs.interface';
import { DialogsService } from 'src/app/core/services/dialogs.service';
import { Company } from 'src/app/dash/pages/companys/interfaces/company.interface';
import { CompanysService } from 'src/app/dash/pages/companys/services/companys.service';
import { ContactsService } from 'src/app/dash/pages/contacts/services/contacts.service';
import { QuotationPopulated } from 'src/app/dash/pages/quotes/interfaces/quotation.interface';
import { PriorityList } from 'src/app/dash/pages/quotes/interfaces/quotations_service_data.interface';
import { QuotesService } from 'src/app/dash/pages/quotes/services/quotes.service';
import { ContactPopulated } from '../../../../contacts/interfaces/contact.interface';
import { ServicePopulated } from '../../../interfaces/service.interface';
import { ServicesService } from '../../../services/services.service';

@Component({
  selector: 'app-ser-filter-v1',
  templateUrl: './ser-filter-v1.component.html',
  styleUrls: ['./ser-filter-v1.component.scss'],
})
export class SerFilterV1Component implements OnInit {
  // TODO: priority: PriorityList[] = [];
  status: string[] = [];
  companys: Company[] = [];
  contacts: ContactPopulated[] = [];

  active: boolean = false;

  @Input() services: ServicePopulated[] | undefined = undefined;

  servicesFiltered: ServicePopulated[] | undefined = [];

  @Output() emitServicesFiltered: EventEmitter<ServicePopulated[]> =
    new EventEmitter();

  susChangesForm: Subscription;

  filterForm = this._fb.group({
    status: [''],
    company: [''],
    contact: [''],
    pendinQuotation: [false],
  });

  constructor(
    private dialogsService: DialogsService,
    private quotesService: QuotesService,
    private servicesService: ServicesService,
    private companysService: CompanysService,
    private contactsService: ContactsService,
    private _fb: FormBuilder
  ) {
    // TODO: this.priority = this.quotesService.getPriorityList();
    this.status = this.servicesService.getStatusList();

    // LOAD COMPANYS
    this.companysService.getCompanys().subscribe((result) => {
      result ? (this.companys = result) : (this.companys = []);
    });

    // LOAD CONTACTS
    this.contactsService.getContacts().subscribe((result) => {
      result ? (this.contacts = result) : (this.companys = []);
    });

    // SUSCRIPTION TO CHANGES IN FORM
    this.susChangesForm = this.filterForm.statusChanges.subscribe((result) => {
      this.active = true;
      this.applyFilter();
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.susChangesForm.unsubscribe();
  }

  emitServices() {
    this.emitServicesFiltered.emit(
      this.servicesFiltered && this.active
        ? this.servicesFiltered
        : this.services
    );
  }

  applyFilter() {
    this.servicesFiltered = [...(this.services || [])];

    // ======= PENDING FOR QUOTATION =======
    if (this.filterForm.controls['pendinQuotation'].value) {
      this.servicesFiltered = this.servicesFiltered.filter(
        (service) => service.in_quotation == false
      );
    }

    // ======= STATUS =======
    if (this.filterForm.controls['status'].value) {
      this.servicesFiltered = this.servicesFiltered.filter(
        (service) => service.status == this.filterForm.controls['status'].value
      );
    }

    // TODO:  ======= PRIORITY =======
    // if (
    //   this.filterForm.controls['priority'].value ||
    //   this.filterForm.controls['priority'].value === 0
    // ) {
    //   this.quotationsFiltered = this.quotationsFiltered.filter(
    //     (quotation) =>
    //       quotation.priority == this.filterForm.controls['priority'].value
    //   );
    // }

    // ======= COMPANY =======
    if (this.filterForm.controls['company'].value) {
      this.servicesFiltered = this.servicesFiltered.filter(
        (service) =>
          service.company._id == this.filterForm.controls['company'].value
      );
    }

    // ======= COMPANY =======
    if (this.filterForm.controls['contact'].value) {
      this.servicesFiltered = this.servicesFiltered.filter(
        (service) =>
          service.contact._id == this.filterForm.controls['contact'].value
      );
    }

    // RESULT

    // ORDER BY PRIORITY
    // this.servicesFiltered = this.quotesService.orderQuotesByPriority(
    //   this.servicesFiltered
    // );

    // ORDER BY STATUS
    this.servicesFiltered = this.servicesService.orderByStatus(
      this.servicesFiltered
    );

    this.dialogsService.openNotificationV1({
      message: 'Filtro de busqueda aplicado',
      status: StatusMessage.success,
    });

    this.emitServices();
  }

  clearFilter() {
    this.filterForm.reset();
    this.servicesFiltered = undefined;
    this.active = false;
    this.emitServices();
  }
}
