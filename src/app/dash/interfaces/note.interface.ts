export interface Note {
  _id?: string;
  title: string;
  description: string;
  tag?: string;
  date_created?: Date;
  date_lasted_update?: Date;
  enabled?: boolean;
}
