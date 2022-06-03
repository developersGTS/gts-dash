import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { catchError, map, of, tap } from 'rxjs';
import { Company } from 'src/app/dash/pages/companys/interfaces/company.interface';
import { CompanyAddComponent } from 'src/app/dash/pages/companys/pages/company-add/company-add.component';
import { CompanysService } from 'src/app/dash/pages/companys/services/companys.service';
import { Contact } from 'src/app/dash/pages/contacts/interfaces/contact.interface';
import { ContactAddComponent } from 'src/app/dash/pages/contacts/pages/contact-add/contact-add.component';
import { ContactsService } from 'src/app/dash/pages/contacts/services/contacts.service';
import { EquipmentsService } from 'src/app/dash/pages/equipments/services/equipments.service';
import { QuotesService } from 'src/app/dash/pages/quotes/services/quotes.service';
import { User } from 'src/app/dash/pages/users/interfaces/user.interface';
import { UsersService } from 'src/app/dash/pages/users/services/users.service';
import {
  ServicePopulated,
  Service,
} from '../../../interfaces/service.interface';
import { ServicesService } from '../../../services/services.service';
import { ContactPopulated } from '../../../../contacts/interfaces/contact.interface';
import {
  Equipment,
  EquipmentPopulated,
} from '../../../../equipments/interfaces/equipment.interface';

@Component({
  selector: 'app-ser-add',
  templateUrl: './ser-add.component.html',
  styleUrls: ['./ser-add.component.scss'],
})
export class SerAddComponent implements OnInit {
  // COMPANIES
  companys: Company[] = [];
  companys_loader: boolean = true;

  // CONTACTS
  contacts: ContactPopulated[] = [];
  contacts_loader: boolean = true;

  // EMPLOYEES
  employees: User[] = [];
  employees_loader: boolean = true;

  // EQUIPMENT SELECTED
  equipment_selected?: EquipmentPopulated;

  // ALERT EQUIPMENT YA REGISTRADO EN LABORATORIO O SERVICIO
  equipmentRegistered: boolean = false;

  status: string[];

  performed: string[] = ['En Sitio', 'En Laboratorio'];

  // FORM
  formNewService = this._formBuilder.group({
    company: [
      { value: '', disabled: this.companys_loader },
      [Validators.required],
    ],
    contact: [
      { value: '', disabled: this.contacts_loader },
      [Validators.required],
    ],
    date_created: [new Date(), [Validators.required]],
    date_delivery: ['', []],
    service_order: ['', []],
    general_description: ['', [Validators.required]],
    problem_description: ['', []],
    diagnostic: ['', []],
    repair_description: ['', []],
    equipment: ['', [Validators.required], this.validateSerial.bind(this)],
    assign_to: ['', []],
    performed: ['En Laboratorio', []],
    status: ['Pendiente', []],
    enabled: [true, [Validators.required]],
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
    public dialogRef: MatDialogRef<SerAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ServicePopulated
  ) {
    this.status = this.servicesService.getStatusList();
  }

  ngOnInit(): void {
    // LOAD COMPANYS
    this.companysService
      .getCompanys()
      .pipe(
        map((res: Company[]) => {
          this.companys = res;
          this.companys_loader = false;
          this.formNewService.controls['company'].enable();
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
          this.formNewService.controls['contact'].enable();
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
          this.formNewService.controls['assign_to'].enable();
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

  openSchEquipment() {}

  saveService() {
    this.formNewService.markAsTouched();

    console.log('this.formNewService.valid', this.formNewService.valid);

    if (this.formNewService.valid) {
      this.servicesService
        .createService(this.load_service_data())
        .subscribe((ser) => {
          console.log('eq', ser);
          if (ser) {
            this.dialogRef.close(ser);
          } else {
            this.dialogRef.close(false);
          }
        });
    } else {
      // TODO: CREAR AVISOS DE ERROR

      console.log('no valid');
      console.log('this.formNewEquipment.errors', this.formNewService.errors);
    }
  }

  validateSerial(control: AbstractControl) {
    const value = control.value;
    return this.equipmentsService.getEquipmentBySerial(value).pipe(
      tap((res) => this.validateEquipmentOnService(res)),
      map((res) => {
        if (res && res.length > 0) {
          this.equipment_selected = res[0];
          this.formNewService.controls['company'].setValue(
            this.equipment_selected.company._id
          );
          this.formNewService.controls['contact'].setValue(
            this.equipment_selected.contact._id
          );
          return null;
        } else {
          return { notAvailable: true };
        }
      }),
      catchError(() => of(null))
    );
  }

  get equipmentNoAvailable() {
    return (
      this.formNewService.controls['equipment'].touched &&
      this.formNewService.controls['equipment'].getError('notAvailable')
    );
  }

  validateEquipmentOnService(equipments: EquipmentPopulated[]) {
    if (equipments && equipments.length > 0) {
      this.servicesService
        .getServiceByCustom({
          equipment: equipments[0]._id,
          enabled: true,
        })
        .subscribe((res) => {
          res
            ? (this.equipmentRegistered = true)
            : (this.equipmentRegistered = false);
        });
    } else {
      this.equipmentRegistered = false;
    }
  }

  load_service_data(): Service {
    let service: Service = {
      company: this.formNewService.controls['company'].value + '',
      contact: this.formNewService.controls['contact'].value + '',
      equipment: this.equipment_selected?._id,
      general_description:
        this.formNewService.controls['general_description'].value + '',
      status: this.formNewService.controls['status'].value + '',
      date_created: new Date(
        this.formNewService.controls['date_created'].value + ''
      ),

      problem_description:
        this.formNewService.controls['problem_description'].value + '',
      diagnostic: this.formNewService.controls['diagnostic'].value + '',
      repair_description:
        this.formNewService.controls['repair_description'].value + '',
      performed: this.formNewService.controls['performed'].value + '',
      enabled: this.formNewService.controls['enabled'].value,
      authorized: this.formNewService.controls['enabled'].value,
      service_order: this.formNewService.controls['service_order'].value + '',
    };

    console.log('service 1', service);

    if (this.formNewService.controls['date_delivery'].value) {
      service.date_delivery = new Date(
        this.formNewService.controls['date_delivery'].value + ''
      );
    }

    if (this.formNewService.controls['assign_to'].value) {
      service.assign_to = this.formNewService.controls['assign_to'].value + '';
    }

    console.log('service 2', service);
    return service;
  }

  openAddEquipment() {
    const dialogRef = this.equipmentsService.openNewEquipment({
      serial_no: this.formNewService.controls['equipment'].value,
    });

    dialogRef.afterClosed().subscribe((result: EquipmentPopulated) => {
      if (result) {
        this.formNewService.controls['equipment'].setValue(result.serial_no);
      }
    });
  }
}
