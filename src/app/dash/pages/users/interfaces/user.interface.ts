import { ContactDocument } from 'src/app/dash/interfaces/contact-document.interface';

export interface User {
  _id?: string;
  username: string;
  realname: string;
  mail: string;
  password?: string;
  contact?: ContactDocument;
  access?: string;
  enabled?: boolean;
  date_created?: Date;
}
