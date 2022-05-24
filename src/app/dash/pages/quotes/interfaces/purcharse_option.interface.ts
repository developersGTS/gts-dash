import { Import } from './import.interface';

export interface PurcharseOption {
  country: string;
  supplier: string;
  description?: string;
  condition: string;
  link?: string;
  tel?: string;
  cant_available?: number;
  delivery_time: number;
  delivery_cost: number;
  acquisition_price: number;
  profit_percent: number;
  profit: number;
  import: boolean;
  import_data?: Import;
  invoice?: boolean;
  iva_percent: number;
  iva: number;
  subtotal: number;
  total: number;
  best_option?: boolean;
  available?: boolean;
}

export interface PurcharseOptionWithClientProfit {
  data: PurcharseOption[];
  profit_percent: number;
}
