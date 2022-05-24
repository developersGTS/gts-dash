export interface CollectionData {
  payment_date?: Date;
  programmed_payment?: Date;
  receipt?: String;
  payment_method?: string;
  invoice_no?: string;
  purchase_order?: string;
  expenses: number;
  profits: number;
  subtotal: number;
  iva: number;
  total: number;
}