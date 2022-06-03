import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { catchError, map, of } from 'rxjs';
import { Company } from 'src/app/dash/pages/companys/interfaces/company.interface';
import { CompanyAddComponent } from 'src/app/dash/pages/companys/pages/company-add/company-add.component';
import { CompanysService } from 'src/app/dash/pages/companys/services/companys.service';
import { Contact } from 'src/app/dash/pages/contacts/interfaces/contact.interface';
import { ContactAddComponent } from 'src/app/dash/pages/contacts/pages/contact-add/contact-add.component';
import { ContactsService } from 'src/app/dash/pages/contacts/services/contacts.service';
import { QuotesService } from 'src/app/dash/pages/quotes/services/quotes.service';
import { ServicesService } from 'src/app/dash/pages/services/services/services.service';
import { UsersService } from 'src/app/dash/pages/users/services/users.service';
import { EquipmentsService } from '../../../services/equipments.service';
import { EquipmentBySerial } from '../../../interfaces/equipment.interface';
import { ContactPopulated } from '../../../../contacts/interfaces/contact.interface';
import {
  Equipment,
  EquipmentPopulated,
} from '../../../interfaces/equipment.interface';

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
  contacts: ContactPopulated[] = [];
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
    equipment: ['', [Validators.required]],
    brand: ['', [Validators.required]],
    model: ['', []],
    no_part: ['', []],
    no_serial: ['', [Validators.required], this.validateSerial.bind(this)],
  });

  constructor(
    private _formBuilder: FormBuilder,
    private companysService: CompanysService,
    private contactsService: ContactsService,
    private usersService: UsersService,
    private servicesService: ServicesService,
    private quotesService: QuotesService,
    private equipmentsService: EquipmentsService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<EquipAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EquipmentBySerial
  ) {
    console.log('data', data);
    if (data) {
      data.serial_no
        ? this.formNewEquipment.controls['no_serial'].setValue(data.serial_no)
        : null;
    }
  }

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
        map((res: ContactPopulated[]) => {
          this.contacts = res;
          this.contacts_loader = false;
          this.formNewEquipment.controls['contact'].enable();
        })
      )
      .subscribe();
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

  validateSerial(control: AbstractControl) {
    console.log('validateSerial');
    const value = control.value;
    console.log('value', value);
    return this.equipmentsService.getEquipmentBySerial(value).pipe(
      map((res) => {
        console.log('res', res);
        return res && res.length > 0 ? { serialRegistered: true } : null;
      }),
      catchError(() => of(null))
    );
  }

  get serialIsInvalid() {
    return (
      this.formNewEquipment.controls['no_serial'].touched &&
      this.formNewEquipment.controls['no_serial'].invalid &&
      this.formNewEquipment.controls['no_serial'].getError('serialRegistered')
    );
  }

  saveEquipment() {
    this.formNewEquipment.markAsTouched();

    if (this.formNewEquipment.valid) {
      this.equipmentsService
        .createEquipment({
          company: this.formNewEquipment.controls['company'].value + '',
          contact: this.formNewEquipment.controls['contact'].value + '',
          equipment: this.formNewEquipment.controls['equipment'].value + '',
          brand: this.formNewEquipment.controls['brand'].value + '',
          model: this.formNewEquipment.controls['model'].value + '',
          product_no: this.formNewEquipment.controls['no_part'].value + '',
          serial_no: this.formNewEquipment.controls['no_serial'].value + '',
        })
        .subscribe((eq) => {
          console.log('eq', eq);
          if (eq) {
            this.dialogRef.close(eq);
          } else {
            this.dialogRef.close(false);
          }
        });
    } else {
      // TODO: CREAR AVISOS DE ERROR
    }
  }
}
