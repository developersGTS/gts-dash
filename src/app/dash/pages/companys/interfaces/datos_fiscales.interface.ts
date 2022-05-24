import { Banco } from './banco.interface';

export interface DatosFiscales {
  _id?: string;
  razon_social: string;
  rfc?: string;
  correo?: string;
  banco?: Banco[];
  domicilio_fiscal?: string;
}
