import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs';
import { Company } from 'src/app/dash/pages/companys/interfaces/company.interface';
import { CompanyAddComponent } from 'src/app/dash/pages/companys/pages/company-add/company-add.component';
import { CompanysService } from 'src/app/dash/pages/companys/services/companys.service';
import { Contact } from 'src/app/dash/pages/contacts/interfaces/contact.interface';
import { ContactAddComponent } from 'src/app/dash/pages/contacts/pages/contact-add/contact-add.component';
import { ContactsService } from 'src/app/dash/pages/contacts/services/contacts.service';
import { QuotesService } from 'src/app/dash/pages/quotes/services/quotes.service';
import { ServicesService } from 'src/app/dash/pages/services/services/services.service';
import { UsersService } from 'src/app/dash/pages/users/services/users.service';

@Component({
  selector: 'app-equip-add',
  templateUrl: './equip-add.component.html',
  styleUrls: ['./equip-add.component.scss'],
})
export class EquipAddComponent implements OnInit {
  // COMPANIES
  companys: Company[] = [];
  companys_loader: boolean = true;

  // CONTACTS
  contacts: Contact[] = [];
  contacts_loader: boolean = true;

  // FORM
  formNewEquipment = this._formBuilder.group({
    company: [
      { value: '', disabled: this.companys_loader },
      [Validators.required],
    ],
    contact: [
      { value: '', disabled: this.contacts_loader },
      [Validators.required],
    ],
  });

  constructor(
    private _formBuilder: FormBuilder,
    private companysService: CompanysService,
    private contactsService: ContactsService,
    private usersService: UsersService,
    private servicesService: ServicesService,
    private quotesService: QuotesService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // LOAD COMPANYS
    this.companysService
      .getCompanys()
      .pipe(
        map((res: Company[]) => {
          this.companys = res;
          this.companys_loader = false;
          this.formNewEquipment.controls['company'].enable();
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
          this.formNewEquipment.controls['contact'].enable();
        })
      )
      .subscribe();
  }

  companyEvent(company: Company) {
    // this.emitPreviewData.emit({ company });
    // this.emitProfitFn(company.profit_percent);
    // this.emitQuotationInfo();
  }

  contactEvent(contact: Contact) {
    // this.emitPreviewData.emit({ contact });
    // this.emitQuotationInfo();
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
}
