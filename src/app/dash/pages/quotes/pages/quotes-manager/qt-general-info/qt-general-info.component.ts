import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { map, Subscription } from 'rxjs';

// INTERFACES
import { Company } from 'src/app/dash/pages/companys/interfaces/company.interface';
import { Contact } from 'src/app/dash/pages/contacts/interfaces/contact.interface';

// SERVICES
import { CompanysService } from 'src/app/dash/pages/companys/services/companys.service';
import { ContactsService } from 'src/app/dash/pages/contacts/services/contacts.service';
import { UsersService } from 'src/app/dash/pages/users/services/users.service';
import { ServicePopulated } from 'src/app/dash/pages/services/interfaces/service.interface';
import { ServicesService } from 'src/app/dash/pages/services/services/services.service';

// COMPONENTS
import { CompanyAddComponent } from 'src/app/dash/pages/companys/pages/company-add/company-add.component';
import { ContactAddComponent } from 'src/app/dash/pages/contacts/pages/contact-add/contact-add.component';

// INTERFACES
import { User } from 'src/app/dash/pages/users/interfaces/user.interface';
import { Quotation } from 'src/app/dash/pages/quotes/interfaces/quotation.interface';
import { PreviewData } from '../quotes-manager.component';
import { QuotesService } from '../../../services/quotes.service';
import { PriorityList } from '../../../interfaces/quotations_service_data.interface';

// INTERFACE PARA AUTOCOMPLETE
export interface StateGroup {
  letter: string;
  names: string[];
}

// FILTRO PARA AUTOCOMPLETE
export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();

  return opt.filter((item) => item.toLowerCase().includes(filterValue));
};

@Component({
  selector: 'app-qt-general-info',
  templateUrl: './qt-general-info.component.html',
  styleUrls: ['./qt-general-info.component.scss'],
})
export class QtGeneralInfoComponent implements OnInit {
  // READY TO SAVE
  @Output() emitReadyToSave: EventEmitter<boolean> = new EventEmitter();

  // DATA FOR QUOTATION
  @Output() emitQuotation: EventEmitter<Quotation> = new EventEmitter();
  @Output() emitProfit: EventEmitter<number> = new EventEmitter();

  // DATA FOR PREVIEW
  @Output() emitPreviewData: EventEmitter<PreviewData> = new EventEmitter();

  // COMPANIES
  companys: Company[] = [];
  companys_loader: boolean = true;

  // CONTACTS
  contacts: Contact[] = [];
  contacts_loader: boolean = true;

  status: string[];

  priority: PriorityList[];

  employees: User[] = [];
  employees_loader: boolean = true;

  services: ServicePopulated[] = [];
  services_loader: boolean = true;

  // DATE FOR SET DATE REQUEST; DEFAULT TODAY;
  date: Date = new Date();

  formGeneralInfo = this._formBuilder.group({
    company: [
      { value: '', disabled: this.companys_loader },
      [Validators.required],
    ],
    contact: [
      { value: '', disabled: this.contacts_loader },
      [Validators.required],
    ],
    date_request: [
      this.date.getFullYear() +
        '-' +
        (this.date.getMonth() + 1).toString().padStart(2, '0') +
        '-' +
        this.date.getDate().toString().padStart(2, '0'),
      [Validators.required],
    ],
    description: ['', [Validators.required]],
    status: ['', [Validators.required]],
    service: [{ value: '', disabled: this.services_loader }],
    date_end: [''],
    enabled: [true],
    invoice_required: [true],
    assign_to: [{ value: '', disabled: this.employees_loader }],
    priority: ['', [Validators.required]],
    supervisor_approved: [false],
    customer_approved: [false],
    in_collection: [false],
  });

  constructor(
    private _formBuilder: FormBuilder,
    private companysService: CompanysService,
    private contactsService: ContactsService,
    private usersService: UsersService,
    private servicesService: ServicesService,
    private quotesService: QuotesService,
    public dialog: MatDialog
  ) {
    this.status = this.quotesService.getStatusList();
    this.priority = this.quotesService.getPriorityList();
  }

  ngOnInit(): void {
    // LOAD COMPANYS
    this.companysService
      .getCompanys()
      .pipe(
        map((res: Company[]) => {
          this.companys = res;
          this.companys_loader = false;
          this.formGeneralInfo.controls['company'].enable();
        })
      )
      .subscribe();

    // LOAD CONTACTS
    this.contactsService
      .getContacts()
      .pipe(
        map((res: Contact[]) => {
          this.contacts = res;
          this.contacts_loader = false;
          this.formGeneralInfo.controls['contact'].enable();
        })
      )
      .subscribe();

    // LOAD USERS
    this.usersService
      .getUsers()
      .pipe(
        map((res: User[]) => {
          this.employees = res;
          this.employees_loader = false;
          this.formGeneralInfo.controls['assign_to'].enable();
        })
      )
      .subscribe();

    // LOAD SERVICES
    this.servicesService
      .getServices()
      .pipe(
        map((res: ServicePopulated[]) => {
          this.services = res;
          this.services_loader = false;
          this.formGeneralInfo.controls['service'].enable();
        })
      )
      .subscribe();

    // FORM CHANGES
    this.formGeneralInfo.statusChanges.subscribe((status) => {
      status == 'VALID'
        ? this.emitQuotationInfo()
        : this.emitReadyToSaveFn(false);
    });
  }

  openAddCompany(): void {
    const dialogRef = this.dialog.open(CompanyAddComponent, {
      disableClose: true,
      width: '75vw',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.companys.push(result);
      }
    });
  }

  openAddContact(): void {
    const dialogRef = this.dialog.open(ContactAddComponent, {
      disableClose: true,
      width: '75vw',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.contacts.push(result);
      }
    });
  }

  emitProfitFn(profit_percent: number) {
    this.emitProfit.emit(profit_percent);
  }

  emitQuotationInfo() {
    this.formGeneralInfo.markAllAsTouched();

    if (this.formGeneralInfo.valid) {
      this.emitQuotation.emit({
        // DATA REQUIRED
        company: this.formGeneralInfo.controls['company'].value,
        contact: this.formGeneralInfo.controls['contact'].value,
        description: this.formGeneralInfo.controls['description'].value,
        status: this.formGeneralInfo.controls['status'].value,
        priority: this.formGeneralInfo.controls['priority'].value,
        date_request: this.formGeneralInfo.controls['date_request'].value,

        // TOGGLES
        enabled: this.formGeneralInfo.controls['enabled'].value,
        invoice_required:
          this.formGeneralInfo.controls['invoice_required'].value,
        supervisor_approved:
          this.formGeneralInfo.controls['supervisor_approved'].value,
        customer_approved:
          this.formGeneralInfo.controls['customer_approved'].value,
        in_collection: this.formGeneralInfo.controls['in_collection'].value,

        // DATA OPTIONAL
        date_end:
          this.formGeneralInfo.controls['date_end'].value == ''
            ? null
            : this.formGeneralInfo.controls['date_end'].value,
        assign_to:
          this.formGeneralInfo.controls['assign_to'].value == ''
            ? null
            : this.formGeneralInfo.controls['assign_to'].value,
        service:
          this.formGeneralInfo.controls['service'].value == ''
            ? null
            : this.formGeneralInfo.controls['service'].value,
      });
      console.log('QuotationInfo Emited');
    }
  }

  companyEvent(company: Company) {
    this.emitPreviewData.emit({ company });
    this.emitProfitFn(company.profit_percent);
    this.emitQuotationInfo();
  }

  contactEvent(contact: Contact) {
    this.emitPreviewData.emit({ contact });
    this.emitQuotationInfo();
  }

  serviceEvent(service: ServicePopulated) {
    this.emitPreviewData.emit({ service });
    this.emitQuotationInfo();
  }

  userEvent(user: User) {
    this.emitPreviewData.emit({ user });
    this.emitQuotationInfo();
  }

  emitReadyToSaveFn(status: boolean) {
    this.emitReadyToSave.emit(status);
  }
}
