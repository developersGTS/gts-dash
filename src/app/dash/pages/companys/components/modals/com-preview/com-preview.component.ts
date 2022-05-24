import { Component, Inject, Input, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Company } from '../../../interfaces/company.interface';
import { CompanyAddComponent } from '../../../pages/company-add/company-add.component';

@Component({
  selector: 'app-com-preview',
  templateUrl: './com-preview.component.html',
  styleUrls: ['./com-preview.component.scss'],
})
export class ComPreviewComponent implements OnInit {
  @Input() company: Company = {
    nickname: '',
    profit_percent: 0.8,
  };

  // CONTACT DATA DEFAULT
  mail_default: string = '';
  tel_default: string = '';

  // ADDRESS DATA DEFAULT
  country: string = '';
  city: string = '';
  street: string = '';
  zip_code: string = '';

  constructor(
    public dialogRef: MatDialogRef<ComPreviewComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: Company
  ) {}

  ngOnInit(): void {
    this.data ? (this.company = this.data) : null;
    this.getContactDefault();
    this.getAddressDefault();
  }

  getContactDefault() {
    if (this.company.contact) {
      for (let contact of this.company.contact) {
        if (contact.default) {
          contact.mail ? (this.mail_default = contact.mail) : null;
          contact.phone ? (this.tel_default = contact.phone) : null;
          return;
        }
      }
    }
  }

  getAddressDefault() {
    if (this.company.address) {
      for (let address of this.company.address) {
        if (address.default) {
          address.country ? (this.country = address.country) : null;
          address.city ? (this.city = address.city) : null;
          address.street ? (this.street = address.street) : null;
          address.zip_code ? (this.zip_code = address.zip_code) : null;
          return;
        }
      }
    }
  }

  openCompanyAdd(company?: Company) {
    console.log('company', company);
    const dialogRef = this.dialog.open(CompanyAddComponent, {
      disableClose: true,
      width: '75vw',
      data: company ? company : undefined,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.company = result;
      }
    });
  }
}
