import { Note } from 'src/app/dash/interfaces/note.interface';
import { InvoiceReceived } from './invoice_received.interface';
import { PurcharseOption } from './purcharse_option.interface';

export interface QuotationItem {
  _id?: string;
  description: string;
  part_no?: string;
  quantity?: number;
  purcharse_options?: PurcharseOption[];
  authorized?: boolean;
  bought?: boolean;
  notes?: Note[];
  invoices_received?: InvoiceReceived[];
}

export interface TotalItems {
  total: number;
  subtotal: number;
  iva: number;
}
