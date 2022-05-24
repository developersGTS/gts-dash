import { Note } from 'src/app/dash/interfaces/note.interface';

export interface Equipment {
  _id?: string;
  company: string;
  contact: string;
  category_code?: string;
  equipment: string;
  brand?: string;
  model?: string;
  product_no?: string;
  serial_no: string;
  notes?: Note[];
}
