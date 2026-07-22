export interface Brand {
  id: string;
  code: string;
  name: string;
  default_admin_rate: number;
  default_processing_fee: number;
  default_shipping_rate: number;
  default_affiliate_rate: number;
  default_hpp_rate: number;
  is_active: boolean;
}

export interface Product {
  id: string;
  sku: string;
  brand_id: string;
  name: string;
  product_code?: string | null;
  size: string;
  selling_price: number;
  hpp_price: number;
  is_active: boolean;
}

export interface DailySale {
  id: string;
  brand_id: string;
  date: string; // YYYY-MM-DD atau Hari Ke-X
  day_number: number; // 1 - 31
  omset_marketing: number;
  omset_finance: number;
  valid_orders: number;
  admin_fee: number;
  processing_fee: number;
  promotion_cost: number;
  ads_spend: number;
  shipping_cost: number;
  affiliate_cost: number;
  hpp_cost: number;
  total_expense: number;
  gross_margin: number;
  gross_margin_percentage: number;
  roi: string;
  notes?: string;
}

export interface CashFlowItem {
  id: string;
  date: string; // YYYY-MM-DD
  description: string;
  channel?: string | null;
  account?: string | null;
  cash_in: number;
  cash_out: number;
  running_balance: number;
  receipt_url?: string | null;
}

export interface RevenueWithdrawal {
  id: string;
  brand_id: string;
  date: string;
  amount: number;
  notes?: string | null;
}

export interface InventoryExpenditure {
  id: string;
  brand_id: string;
  date: string;
  amount: number;
  notes?: string | null;
}

export interface ExpenseBudget {
  id: string;
  brand_id: string;
  category: string;
  period: string;
  estimated_amount: number;
  realized_amount: number;
}

export interface AccountReceivable {
  id: string;
  brand_id: string;
  date: string;
  debtor_source: string;
  amount: number;
  status: 'Pending' | 'Lunas' | 'Dicicil';
  notes?: string | null;
}

export interface ProfitLossSummary {
  period: string;
  omset_marketing_target: number;
  omset_marketing_realization: number;
  omset_finance_target: number;
  omset_finance_realization: number;
  fixed_costs: {
    name: string;
    target: number;
    realization: number;
  }[];
  variable_costs: {
    name: string;
    target: number;
    realization: number;
  }[];
  subsidi_ads: number;
  total_cost_target: number;
  total_cost_realization: number;
  npm_target: number;
  npm_realization: number;
}
