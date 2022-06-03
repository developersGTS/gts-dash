import { Note } from 'src/app/dash/interfaces/note.interface';
import { Company } from '../../companys/interfaces/company.interface';
import {
  Contact,
  ContactPopulated,
} from '../../contacts/interfaces/contact.interface';

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

export interface EquipmentUpdate {
  _id: string;
  company?: string;
  contact?: string;
  category_code?: string;
  equipment?: string;
  brand?: string;
  model?: string;
  product_no?: string;
  serial_no?: string;
  notes?: Note[];
}

export interface EquipmentSch {
  _id?: string;
  company?: string;
  contact?: string;
  category_code?: string;
  equipment?: string;
  brand?: string;
  model?: string;
  product_no?: string;
  serial_no?: string;
  notes?: Note[];
}

export interface EquipmentPopulated {
  _id?: string;
  company: Company;
  contact: ContactPopulated;
  category_code?: string;
  equipment: string;
  brand?: string;
  model?: string;
  product_no?: string;
  serial_no: string;
  notes?: Note[];
}

export interface EquipmentBySerial {
  _id?: string;
  company?: string;
  contact?: string;
  category_code?: string;
  equipment?: string;
  brand?: string;
  model?: string;
  product_no?: string;
  serial_no: string;
  notes?: Note[];
}
