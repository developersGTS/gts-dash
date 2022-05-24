import { Address } from 'src/app/dash/interfaces/address.interface';
import { ContactDocument } from 'src/app/dash/interfaces/contact-document.interface';
import { DatosFiscales } from './datos_fiscales.interface';

export interface Company {
  _id?: string;
  nickname: string;
  datos_fiscales?: DatosFiscales;
  contact?: ContactDocument[];
  address?: Address[];
  profit_percent: number;
}

