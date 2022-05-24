import { Note } from 'src/app/dash/interfaces/note.interface';
import { StatusTracker } from 'src/app/dash/interfaces/status_tracker.interface';
import { Company } from '../../companys/interfaces/company.interface';
import {
  Contact,
  ContactPopulated,
} from '../../contacts/interfaces/contact.interface';
import {
  Service,
  ServicePopulated,
} from '../../services/interfaces/service.interface';
import { User } from '../../users/interfaces/user.interface';
import { CollectionData } from './collection_data.interface';
import { QuotationItem } from './quotation_item.interfaces';

export interface Quotation {
  _id?: string;
  company: string;
  contact: string;
  date_request?: Date;
  description: string;
  status: string;
  status_tracker?: StatusTracker[];
  service?: string;
  date_end?: Date;
  quotation_no?: string;
  notes?: Note[];
  enabled?: boolean;
  invoice_required?: boolean;
  assign_to?: string;
  quotation_items?: QuotationItem[];
  priority: number;
  date_reminder?: Date;
  reminder?: boolean;
  in_review?: boolean;
  supervisor_approved?: boolean;
  customer_approved?: boolean;
  in_collection?: boolean;
  collection_data?: CollectionData;
  billed?: boolean;
  subtotal?: number;
  iva?: number;
  total?: number;
}

export interface QuotationPopulated {
  _id: string;
  company: Company;
  contact: ContactPopulated;
  date_request: Date;
  description: string;
  status: string;
  status_tracker?: StatusTracker[];
  service?: ServicePopulated;
  date_end?: Date;
  quotation_no?: string;
  notes?: Note[];
  enabled?: boolean;
  invoice_required?: boolean;
  assign_to?: User;
  quotation_items?: QuotationItem[];
  priority: number;
  date_reminder?: Date;
  reminder?: boolean;
  in_review?: boolean;
  supervisor_approved?: boolean;
  customer_approved?: boolean;
  in_collection?: boolean;
  collection_data?: CollectionData;
  billed?: boolean;
  subtotal: number;
  iva: number;
  total: number;
}

export interface QuotationSch {
  _id?: string;
  company?: string;
  contact?: string;
  date_request?: Date;
  description?: string;
  status?: string;
  status_tracker?: StatusTracker[];
  service?: string;
  date_end?: Date;
  quotation_no?: string;
  notes?: Note[];
  enabled?: boolean;
  invoice_required?: boolean;
  assign_to?: string;
  quotation_items?: QuotationItem[];
  priority?: number;
  date_reminder?: Date;
  reminder?: boolean;
  in_review?: boolean;
  supervisor_approved?: boolean;
  customer_approved?: boolean;
  in_collection?: boolean;
  collection_data?: CollectionData;
  billed?: boolean;
  subtotal?: number;
  iva?: number;
  total?: number;
}

export interface QuotationUpdate {
  _id: string;
  company?: string;
  contact?: string;
  date_request?: Date;
  description?: string;
  status?: string;
  status_tracker?: StatusTracker[];
  service?: string;
  date_end?: Date;
  quotation_no?: string;
  notes?: Note[];
  enabled?: boolean;
  invoice_required?: boolean;
  assign_to?: string;
  quotation_items?: QuotationItem[];
  priority?: number;
  date_reminder?: Date;
  reminder?: boolean;
  in_review?: boolean;
  supervisor_approved?: boolean;
  customer_approved?: boolean;
  in_collection?: boolean;
  collection_data?: CollectionData;
  billed?: boolean;
  subtotal?: number;
  iva?: number;
  total?: number;
}
