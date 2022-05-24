import { Note } from 'src/app/dash/interfaces/note.interface';

export interface InvoiceReceived {
  supplier?: string;
  invoice_no?: string;
  date: Date;
  enabled: boolean;
  quantity_items: number;
  notes?: Note[];
}
