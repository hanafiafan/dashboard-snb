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

// ==========================================
// ACCURATE ONLINE ERP & ACCOUNTING TYPES
// ==========================================

export interface ChartOfAccount {
  id: string;
  code: string; // mis: "1101", "4101"
  name: string; // mis: "Kas Bank BCA", "Pendapatan Penjualan"
  category: 'Aset Lancar' | 'Aset Tetap' | 'Kewajiban' | 'Ekuitas' | 'Pendapatan' | 'HPP' | 'Beban Operasional';
  normal_balance: 'Debit' | 'Kredit';
  balance: number;
}

export interface JournalItem {
  account_code: string;
  account_name: string;
  debit: number;
  credit: number;
}

export interface JournalEntry {
  id: string;
  transaction_code: string; // mis: "JRN/SMB/2026/0001"
  date: string;
  description: string;
  brand_id?: string | null;
  items: JournalItem[];
  is_automated?: boolean;
}

export interface InvoiceItem {
  sku: string;
  name: string;
  quantity: number;
  unit_price: number;
  total: number;
}

export interface Invoice {
  id: string;
  invoice_number: string; // mis: "INV/SMB/2026/001"
  type: 'PENJUALAN' | 'PEMBELIAN';
  date: string;
  due_date: string;
  customer_vendor: string;
  brand_id: string;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  status: 'Draft' | 'Unpaid' | 'Paid' | 'Overdue';
  notes?: string | null;
}

