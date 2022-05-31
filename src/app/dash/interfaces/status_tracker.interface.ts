import { User } from '../pages/users/interfaces/user.interface';

export interface StatusTracker {
  _id?: string;
  date_created?: Date;
  status: string;
  user: string;
}

export interface StatusTrackerPopulated {
  _id?: string;
  date_created?: Date;
  status: string;
  user: User;
}
