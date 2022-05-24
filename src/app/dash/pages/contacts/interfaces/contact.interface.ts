import { ContactDocument } from 'src/app/dash/interfaces/contact-document.interface';
import { Company } from '../../companys/interfaces/company.interface';

export interface Contact {
  _id?: string;
  company: string;
  name: string;
  contact?: ContactDocument[];
  active?: boolean;
  mails_quotes_copy_to?: string[];
}

export interface ContactPopulated {
  _id?: string;
  company: Company;
  name: string;
  contact?: ContactDocument[];
  active?: boolean;
  mails_quotes_copy_to?: string[];
}
