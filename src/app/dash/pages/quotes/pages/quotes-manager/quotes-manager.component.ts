import { StepperOrientation } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map, Observable } from 'rxjs';
import { Quotation } from '../../interfaces/quotation.interface';
import {
  QuotationItem,
  TotalItems,
} from '../../interfaces/quotation_item.interfaces';
import { Note } from 'src/app/dash/interfaces/note.interface';
import { Company } from '../../../companys/interfaces/company.interface';
import { Contact } from '../../../contacts/interfaces/contact.interface';
import { ServicePopulated } from '../../../services/interfaces/service.interface';
import { User } from '../../../users/interfaces/user.interface';

export interface PreviewData {
  company?: Company;
  contact?: Contact;
  user?: User;
  service?: ServicePopulated;
}

@Component({
  selector: 'app-quotes-manager',
  templateUrl: './quotes-manager.component.html',
  styleUrls: ['./quotes-manager.component.scss'],
})
export class QuotesManagerComponent implements OnInit {
  quotation: Quotation = {
    company: '',
    contact: '',
    description: '',
    status: 'Pendiente',
    priority: 0,
    notes: [],
    status_tracker: [
      {
        status: 'Cotizacion Creada',
        user: '620afd6e9d4b8b4308838aac',
      },
    ],
  };

  // ============================================
  // VARIABLES USADAS EN LA PESTAÑA PREVIEW
  // READONLY - SU DATA NO SE GUARDA EN NINGUN SITIO.

  preview_data: PreviewData = {};

  // ====================== END VARIABLES PREVIEW ======================

  readyToSave: boolean = false;

  profit_client: number = 0.8;

  stepperOrientation: Observable<StepperOrientation>;

  constructor(breakpointObserver: BreakpointObserver) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }

  ngOnInit(): void {}

  updateGeneralInfo(payload: Quotation) {
    // DATA REQUIRED
    this.quotation.company = payload.company;
    this.quotation.contact = payload.contact;
    this.quotation.status = payload.status;
    this.quotation.description = payload.description;
    this.quotation.priority = payload.priority;
    this.quotation.date_request = payload.date_request;

    // TOGGLES
    this.quotation.enabled = payload.enabled;
    this.quotation.invoice_required = payload.invoice_required;
    this.quotation.supervisor_approved = payload.supervisor_approved;
    this.quotation.customer_approved = payload.customer_approved;
    this.quotation.in_collection = payload.in_collection;

    // DATA OPTIONAL
    payload.date_end ? (this.quotation.date_end = payload.date_end) : null;
    payload.service ? (this.quotation.service = payload.service) : null;
    payload.assign_to ? (this.quotation.assign_to = payload.assign_to) : null;

    // UPDATE STATUS TRACKER
    if (this.quotation.status_tracker) {
      this.quotation.status_tracker[1] = {
        status: payload.status,
        user: '620afd6e9d4b8b4308838aac',
      };
    } else {
      this.quotation.status_tracker = [
        {
          status: 'Cotizacion Creada',
          user: '620afd6e9d4b8b4308838aac',
        },
        {
          status: payload.status,
          user: '620afd6e9d4b8b4308838aac',
        },
      ];
    }

    this.readyToSave = true;
  }

  updateItemsQt(payload: QuotationItem[]) {
    this.quotation.quotation_items = payload;
    console.log('items uploaded');
    console.log('items payload', payload);
  }

  updateNotesQt(payload: Note[]) {
    payload ? (this.quotation.notes = payload) : null;
  }

  setProfitClient(profit_percent: number) {
    this.profit_client = profit_percent;
  }

  // SET PARA VARIABLES USADAS EN LA PESTAÑA PREVIEW
  // READONLY - SU DATA NO SE GUARDA EN NINGUN SITIO.

  setPreviewData(data: PreviewData) {
    data.company ? (this.preview_data.company = data.company) : null;
    data.contact ? (this.preview_data.contact = data.contact) : null;
    data.user ? (this.preview_data.user = data.user) : null;
    data.service ? (this.preview_data.service = data.service) : null;
  }

  setTotalItmes(data: TotalItems) {
    this.quotation.total = data.total;
    this.quotation.subtotal = data.subtotal;
    this.quotation.iva = data.iva;
  }

  setReadyToSave(status: boolean) {
    this.readyToSave = status;
  }
}
