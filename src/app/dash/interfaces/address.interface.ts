export interface Address {
  _id?: string;
  zip_code?: string;
  street: string;
  city?: string;
  country?: string;
  default: boolean;
}
