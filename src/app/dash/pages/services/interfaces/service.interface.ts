import { Note } from 'src/app/dash/interfaces/note.interface';
import { Company } from 'src/app/dash/pages/companys/interfaces/company.interface';
import { StatusTracker } from 'src/app/dash/interfaces/status_tracker.interface';
import { Contact } from '../../contacts/interfaces/contact.interface';
import { Equipment } from '../../equipments/interfaces/equipment.interface';
import { User } from '../../users/interfaces/user.interface';

export interface Service {
  _id?: string;
  company: string;
  contact: string;
  equipment?: string;
  date_created?: Date;
  general_description: string;
  service_order?: string;
  problem_description?: string;
  diagnostic?: string;
  repair_description?: string;
  repair_history?: any[];
  status: string;
  status_tracker?: StatusTracker[];
  performed?: string;
  date_program?: Date;
  date_delivery?: Date;
  notes?: Note[];
  assign_to?: string;
}

export interface ServicePopulated {
  _id: string;
  company: Company;
  contact: Contact;
  equipment?: Equipment;
  date_created?: Date;
  general_description: string;
  service_order?: string;
  problem_description?: string;
  diagnostic?: string;
  repair_description?: string;
  repair_history?: any[];
  status: string;
  status_tracker?: StatusTracker[];
  performed?: string;
  date_program?: Date;
  date_delivery?: Date;
  notes?: Note[];
  assign_to?: User;
}
