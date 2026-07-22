import {
  Brand,
  Product,
  DailySale,
  CashFlowItem,
  RevenueWithdrawal,
  InventoryExpenditure,
  ExpenseBudget,
  AccountReceivable,
  ProfitLossSummary,
  ChartOfAccount,
  JournalEntry,
  Invoice
} from '@/types';

export const INITIAL_BRANDS: Brand[] = [
  {
    id: 'brand-antrasida',
    code: 'ANTRASIDA',
    name: 'Antrasida (Fungisida & Insektisida)',
    default_admin_rate: 0.16,
    default_processing_fee: 1250,
    default_shipping_rate: 0.0899,
    default_affiliate_rate: 0.09,
    default_hpp_rate: 0.1682,
    is_active: true
  },
  {
    id: 'brand-agrodelta',
    code: 'AGRODELTA',
    name: 'Agrodelta (Solusi Agro Nusantara)',
    default_admin_rate: 0.16,
    default_processing_fee: 1250,
    default_shipping_rate: 0.0899,
    default_affiliate_rate: 0.09,
    default_hpp_rate: 0.1682,
    is_active: true
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  { id: 'p1', sku: 'ATR-FNG-BAK1', brand_id: 'brand-antrasida', name: 'Busuk Akar', size: '1 liter', selling_price: 109800, hpp_price: 26200, is_active: true },
  { id: 'p2', sku: 'ATR-FNG-BBH1', brand_id: 'brand-antrasida', name: 'Busuk Buah', size: '1 liter', selling_price: 109800, hpp_price: 26200, is_active: true },
  { id: 'p3', sku: 'ATR-INS-PYM500', brand_id: 'brand-antrasida', name: 'Pembasmi Nyamuk Tanam', size: '500 ml', selling_price: 65700, hpp_price: 14500, is_active: true },
  { id: 'p4', sku: 'ATR-INS-ASM500', brand_id: 'brand-antrasida', name: 'Anti Semut', size: '500 ml', selling_price: 65700, hpp_price: 14500, is_active: true },
  { id: 'p5', sku: 'ATR-INS-AUL500', brand_id: 'brand-antrasida', name: 'Anti Ulat', size: '500 ml', selling_price: 65700, hpp_price: 14500, is_active: true },
  { id: 'p6', sku: 'ATR-INS-AKT500', brand_id: 'brand-antrasida', name: 'Anti Kutu', size: '500 ml', selling_price: 65700, hpp_price: 14500, is_active: true },
  { id: 'p7', sku: 'ATR-INS-AWR500', brand_id: 'brand-antrasida', name: 'Anti Wereng', size: '500 ml', selling_price: 65700, hpp_price: 14500, is_active: true },
  { id: 'p8', sku: 'ATR-INS-PBL500', brand_id: 'brand-antrasida', name: 'Pembasmi Belalang', size: '500 ml', selling_price: 65700, hpp_price: 14500, is_active: true },
  { id: 'p9', sku: 'ATR-FNG-ETP500', brand_id: 'brand-antrasida', name: 'Embun Tepung', size: '500 ml', selling_price: 71900, hpp_price: 16500, is_active: true },
  { id: 'p10', sku: 'ATR-FNG-BAK500', brand_id: 'brand-antrasida', name: 'Busuk Akar', size: '500 ml', selling_price: 71900, hpp_price: 16500, is_active: true },
  { id: 'p11', sku: 'ATR-FNG-BBH500', brand_id: 'brand-antrasida', name: 'Busuk Buah', size: '500 ml', selling_price: 71900, hpp_price: 16500, is_active: true },
  { id: 'p12', sku: 'ATR-FNG-JPT500', brand_id: 'brand-antrasida', name: 'Jamur Pantogen', size: '500 ml', selling_price: 71900, hpp_price: 16500, is_active: true },
  { id: 'p13', sku: 'ATR-FNG-JSP500', brand_id: 'brand-antrasida', name: 'Jamur Spora', size: '500 ml', selling_price: 71900, hpp_price: 16500, is_active: true },
  { id: 'p14', sku: 'ATR-INS-CCG500', brand_id: 'brand-antrasida', name: 'Cacing', size: '500 ml', selling_price: 65700, hpp_price: 14500, is_active: true },
  { id: 'p15', sku: 'ATR-INS-ULT500', brand_id: 'brand-antrasida', name: 'Ulat Tanah / Uret', size: '500 ml', selling_price: 65700, hpp_price: 14500, is_active: true },
  { id: 'p16', sku: 'ATR-INS-PRS500', brand_id: 'brand-antrasida', name: 'Parasit', size: '500 ml', selling_price: 65700, hpp_price: 14500, is_active: true },
  { id: 'p17', sku: 'ATR-INS-PTK500', brand_id: 'brand-antrasida', name: 'Patek', size: '500 ml', selling_price: 71900, hpp_price: 16500, is_active: true },
  { id: 'p18', sku: 'ATR-INS-SP500', brand_id: 'brand-antrasida', name: 'Siput', size: '500 ml', selling_price: 65700, hpp_price: 14500, is_active: true }
];

export const INITIAL_DAILY_SALES: DailySale[] = [
  // ANTRASIDA (Juli 2026)
  {
    id: 'ds-ant-1',
    brand_id: 'brand-antrasida',
    date: '2026-07-01',
    day_number: 1,
    omset_marketing: 5180985,
    omset_finance: 4572841,
    valid_orders: 67,
    admin_fee: 731654.56,
    processing_fee: 83750,
    promotion_cost: 0,
    ads_spend: 1981343,
    shipping_cost: 411098.41,
    affiliate_cost: 411555.69,
    hpp_cost: 769151.86,
    total_expense: 4388553.51,
    gross_margin: 184287.49,
    gross_margin_percentage: 0.04199,
    roi: '2.58'
  },
  {
    id: 'ds-ant-2',
    brand_id: 'brand-antrasida',
    date: '2026-07-02',
    day_number: 2,
    omset_marketing: 9595393,
    omset_finance: 7687731,
    valid_orders: 106,
    admin_fee: 1230036.96,
    processing_fee: 132500,
    promotion_cost: 0,
    ads_spend: 3193374,
    shipping_cost: 691127.02,
    affiliate_cost: 691895.79,
    hpp_cost: 1293076.35,
    total_expense: 7232010.12,
    gross_margin: 455720.88,
    gross_margin_percentage: 0.06301,
    roi: '3.07'
  },
  {
    id: 'ds-ant-3',
    brand_id: 'brand-antrasida',
    date: '2026-07-03',
    day_number: 3,
    omset_marketing: 7609031,
    omset_finance: 6405684,
    valid_orders: 90,
    admin_fee: 1024909.44,
    processing_fee: 112500,
    promotion_cost: 0,
    ads_spend: 2576595,
    shipping_cost: 575870.99,
    affiliate_cost: 576511.56,
    hpp_cost: 1077436.05,
    total_expense: 5943823.04,
    gross_margin: 461860.96,
    gross_margin_percentage: 0.0777,
    roi: '2.98'
  },
  {
    id: 'ds-ant-4',
    brand_id: 'brand-antrasida',
    date: '2026-07-04',
    day_number: 4,
    omset_marketing: 8890778,
    omset_finance: 6918698,
    valid_orders: 90,
    admin_fee: 1106991.68,
    processing_fee: 112500,
    promotion_cost: 0,
    ads_spend: 3431902,
    shipping_cost: 621990.95,
    affiliate_cost: 622682.82,
    hpp_cost: 1163725.00,
    total_expense: 7059792.45,
    gross_margin: -141094.45,
    gross_margin_percentage: -0.01999,
    roi: '2.63'
  },
  {
    id: 'ds-ant-5',
    brand_id: 'brand-antrasida',
    date: '2026-07-05',
    day_number: 5,
    omset_marketing: 10917802,
    omset_finance: 9176851,
    valid_orders: 129,
    admin_fee: 1468296.16,
    processing_fee: 161250,
    promotion_cost: 0,
    ads_spend: 3598777,
    shipping_cost: 824998.90,
    affiliate_cost: 825916.59,
    hpp_cost: 1543546.34,
    total_expense: 8422784.99,
    gross_margin: 754066.01,
    gross_margin_percentage: 0.08953,
    roi: '3.14'
  },
  {
    id: 'ds-ant-6',
    brand_id: 'brand-antrasida',
    date: '2026-07-06',
    day_number: 6,
    omset_marketing: 10315345,
    omset_finance: 8976139,
    valid_orders: 122,
    admin_fee: 1436182.24,
    processing_fee: 152500,
    promotion_cost: 0,
    ads_spend: 3133519,
    shipping_cost: 806954.90,
    affiliate_cost: 807852.51,
    hpp_cost: 1509786.58,
    total_expense: 7846795.23,
    gross_margin: 1129343.77,
    gross_margin_percentage: 0.14392,
    roi: '3.34'
  },
  {
    id: 'ds-ant-7',
    brand_id: 'brand-antrasida',
    date: '2026-07-07',
    day_number: 7,
    omset_marketing: 8446601,
    omset_finance: 7446611,
    valid_orders: 106,
    admin_fee: 1191457.76,
    processing_fee: 132500,
    promotion_cost: 0,
    ads_spend: 2970175,
    shipping_cost: 669450.33,
    affiliate_cost: 670194.99,
    hpp_cost: 1252519.97,
    total_expense: 6886298.05,
    gross_margin: 560312.95,
    gross_margin_percentage: 0.08137,
    roi: '3.08'
  },
  {
    id: 'ds-ant-8',
    brand_id: 'brand-antrasida',
    date: '2026-07-08',
    day_number: 8,
    omset_marketing: 5538870,
    omset_finance: 4660841,
    valid_orders: 70,
    admin_fee: 745734.56,
    processing_fee: 87500,
    promotion_cost: 0,
    ads_spend: 1889601,
    shipping_cost: 419009.61,
    affiliate_cost: 419475.69,
    hpp_cost: 783953.46,
    total_expense: 4345274.31,
    gross_margin: 315566.69,
    gross_margin_percentage: 0.07262,
    roi: '2.89'
  },
  {
    id: 'ds-ant-9',
    brand_id: 'brand-antrasida',
    date: '2026-07-09',
    day_number: 9,
    omset_marketing: 7540847,
    omset_finance: 5923916,
    valid_orders: 79,
    admin_fee: 947826.56,
    processing_fee: 98750,
    promotion_cost: 0,
    ads_spend: 2219539,
    shipping_cost: 532560.05,
    affiliate_cost: 533152.44,
    hpp_cost: 996402.67,
    total_expense: 5328230.72,
    gross_margin: 595685.28,
    gross_margin_percentage: 0.1118,
    roi: '3.38'
  },
  {
    id: 'ds-ant-10',
    brand_id: 'brand-antrasida',
    date: '2026-07-10',
    day_number: 10,
    omset_marketing: 10522683,
    omset_finance: 9358192,
    valid_orders: 121,
    admin_fee: 1497310.72,
    processing_fee: 151250,
    promotion_cost: 0,
    ads_spend: 2857851,
    shipping_cost: 841301.46,
    affiliate_cost: 842237.28,
    hpp_cost: 1574047.89,
    total_expense: 7763998.36,
    gross_margin: 1594193.65,
    gross_margin_percentage: 0.20533,
    roi: '3.68'
  },
  {
    id: 'ds-ant-11',
    brand_id: 'brand-antrasida',
    date: '2026-07-11',
    day_number: 11,
    omset_marketing: 9297652,
    omset_finance: 7600189,
    valid_orders: 98,
    admin_fee: 1216030.24,
    processing_fee: 122500,
    promotion_cost: 0,
    ads_spend: 2649669,
    shipping_cost: 683256.99,
    affiliate_cost: 684017.01,
    hpp_cost: 1278351.79,
    total_expense: 6633825.03,
    gross_margin: 966363.97,
    gross_margin_percentage: 0.14567,
    roi: '3.54'
  },
  {
    id: 'ds-ant-12',
    brand_id: 'brand-antrasida',
    date: '2026-07-12',
    day_number: 12,
    omset_marketing: 4946694,
    omset_finance: 4214579,
    valid_orders: 60,
    admin_fee: 674332.64,
    processing_fee: 75000,
    promotion_cost: 0,
    ads_spend: 1146572,
    shipping_cost: 378890.65,
    affiliate_cost: 379312.11,
    hpp_cost: 708892.19,
    total_expense: 3362999.59,
    gross_margin: 851579.41,
    gross_margin_percentage: 0.25322,
    roi: '4.36'
  },
  {
    id: 'ds-ant-13',
    brand_id: 'brand-antrasida',
    date: '2026-07-13',
    day_number: 13,
    omset_marketing: 6683151,
    omset_finance: 5767914,
    valid_orders: 82,
    admin_fee: 922866.24,
    processing_fee: 102500,
    promotion_cost: 0,
    ads_spend: 1509695,
    shipping_cost: 518535.47,
    affiliate_cost: 519112.26,
    hpp_cost: 970163.13,
    total_expense: 4542872.10,
    gross_margin: 1225041.90,
    gross_margin_percentage: 0.26966,
    roi: '4.53'
  },

  // AGRODELTA (Juli 2026 Sample)
  {
    id: 'ds-agr-1',
    brand_id: 'brand-agrodelta',
    date: '2026-07-01',
    day_number: 1,
    omset_marketing: 4200000,
    omset_finance: 3800000,
    valid_orders: 55,
    admin_fee: 608000,
    processing_fee: 68750,
    promotion_cost: 0,
    ads_spend: 1500000,
    shipping_cost: 341620,
    affiliate_cost: 342000,
    hpp_cost: 639160,
    total_expense: 3499530,
    gross_margin: 300470,
    gross_margin_percentage: 0.07907,
    roi: '2.80'
  },
  {
    id: 'ds-agr-2',
    brand_id: 'brand-agrodelta',
    date: '2026-07-02',
    day_number: 2,
    omset_marketing: 6100000,
    omset_finance: 5400000,
    valid_orders: 80,
    admin_fee: 864000,
    processing_fee: 100000,
    promotion_cost: 0,
    ads_spend: 2100000,
    shipping_cost: 485460,
    affiliate_cost: 486000,
    hpp_cost: 908280,
    total_expense: 4943740,
    gross_margin: 456260,
    gross_margin_percentage: 0.08449,
    roi: '2.90'
  }
];

export const INITIAL_CASH_FLOW: CashFlowItem[] = [
  { id: 'cf-1', date: '2026-07-02', description: 'Tarik dana antrasida', channel: 'Marketplace', account: 'Kas BCA', cash_in: 5900000, cash_out: 0, running_balance: 5900000 },
  { id: 'cf-2', date: '2026-07-02', description: 'Top up antrasida', channel: 'Hutang dari Agro', account: 'Akun Iklan', cash_in: 0, cash_out: 4440000, running_balance: 1460000 },
  { id: 'cf-3', date: '2026-07-02', description: 'Top up antrasida', channel: 'Dana Antrasida', account: 'Akun Iklan', cash_in: 0, cash_out: 1443000, running_balance: 17000 },
  { id: 'cf-4', date: '2026-07-03', description: 'Tarik dana antrasida', channel: 'Marketplace', account: 'Kas BCA', cash_in: 1753959, cash_out: 0, running_balance: 1770959 },
  { id: 'cf-5', date: '2026-07-03', description: 'Top up antrasida', channel: 'Hutang dari Agro', account: 'Akun Iklan', cash_in: 0, cash_out: 2775000, running_balance: -1004041 },
  { id: 'cf-6', date: '2026-07-04', description: 'Tarik dana antrasida', channel: 'Marketplace', account: 'Kas BCA', cash_in: 7215000, cash_out: 0, running_balance: 6210959 },
  { id: 'cf-7', date: '2026-07-04', description: 'Bayar hutang agrodelta', channel: 'Dana dari Antrasida', account: 'Kas BCA', cash_in: 0, cash_out: 2775000, running_balance: 3435959 },
  { id: 'cf-8', date: '2026-07-04', description: 'Bayar ongkir manual JNT', channel: 'Dana dari Antrasida', account: 'Kas BCA', cash_in: 0, cash_out: 61000, running_balance: 3374959 },
  { id: 'cf-9', date: '2026-07-05', description: 'Tarik dana antrasida', channel: 'Marketplace', account: 'Kas BCA', cash_in: 6000000, cash_out: 0, running_balance: 9374959 },
  { id: 'cf-10', date: '2026-07-06', description: 'Bayar servis laptop', channel: 'Dana dari Antrasida', account: 'Kas BCA', cash_in: 0, cash_out: 450000, running_balance: 8924959 },
  { id: 'cf-11', date: '2026-07-06', description: 'Jasa affiliate KOL', channel: 'Dana dari Antrasida', account: 'Kas BCA', cash_in: 0, cash_out: 300000, running_balance: 8624959 },
  { id: 'cf-12', date: '2026-07-10', description: 'Tarik dana antrasida', channel: 'Marketplace', account: 'Kas BCA', cash_in: 10506457, cash_out: 0, running_balance: 19131416 },
  { id: 'cf-13', date: '2026-07-11', description: 'Tarik dana antrasida', channel: 'Marketplace', account: 'Kas BCA', cash_in: 6131646, cash_out: 0, running_balance: 25263062 },
  { id: 'cf-14', date: '2026-07-14', description: 'Tarik dana antrasida', channel: 'Marketplace', account: 'Kas BCA', cash_in: 14397398, cash_out: 0, running_balance: 39660460 },
  { id: 'cf-15', date: '2026-07-15', description: 'Tarik dana antrasida', channel: 'Marketplace', account: 'Kas BCA', cash_in: 4749367, cash_out: 0, running_balance: 44409827 }
];

export const INITIAL_REVENUE_WITHDRAWALS: RevenueWithdrawal[] = [
  { id: 'rw-1', brand_id: 'brand-antrasida', date: '2026-07-02', amount: 5900000, notes: 'Penarikan dari saldo Shopee/Tokopedia' },
  { id: 'rw-2', brand_id: 'brand-antrasida', date: '2026-07-03', amount: 1753959, notes: 'Pencairan COD JNT' },
  { id: 'rw-3', brand_id: 'brand-antrasida', date: '2026-07-04', amount: 7215000, notes: 'Penarikan saldo Tokopedia' },
  { id: 'rw-4', brand_id: 'brand-antrasida', date: '2026-07-05', amount: 6000000, notes: 'Pencairan COD JNT' },
  { id: 'rw-5', brand_id: 'brand-antrasida', date: '2026-07-06', amount: 4740000, notes: 'Penarikan saldo TikTok Shop' },
  { id: 'rw-6', brand_id: 'brand-antrasida', date: '2026-07-07', amount: 3885000, notes: 'Penarikan saldo Shopee' },
  { id: 'rw-7', brand_id: 'brand-antrasida', date: '2026-07-08', amount: 4440000, notes: 'Penarikan saldo TikTok Shop' },
  { id: 'rw-8', brand_id: 'brand-antrasida', date: '2026-07-10', amount: 10506457, notes: 'Pencairan COD JNT' },
  { id: 'rw-9', brand_id: 'brand-antrasida', date: '2026-07-11', amount: 6131646, notes: 'Penarikan saldo Shopee/Tokopedia' },
  { id: 'rw-10', brand_id: 'brand-antrasida', date: '2026-07-14', amount: 14397398, notes: 'Pencairan COD mingguan' },
  { id: 'rw-11', brand_id: 'brand-antrasida', date: '2026-07-15', amount: 4749367, notes: 'Penarikan saldo TikTok Shop' }
];

export const INITIAL_INVENTORY_EXPENDITURES: InventoryExpenditure[] = [
  { id: 'ie-1', brand_id: 'brand-antrasida', date: '2026-07-01', amount: 2027500, notes: 'Pengadaan botol kemasan & stiker' },
  { id: 'ie-2', brand_id: 'brand-antrasida', date: '2026-07-02', amount: 1435500, notes: 'Bahan baku kimia fungisida' },
  { id: 'ie-3', brand_id: 'brand-antrasida', date: '2026-07-03', amount: 1720500, notes: 'Bahan baku insektisida 500ml' },
  { id: 'ie-4', brand_id: 'brand-antrasida', date: '2026-07-04', amount: 1611000, notes: 'Kardus packing & lakban' },
  { id: 'ie-5', brand_id: 'brand-antrasida', date: '2026-07-06', amount: 3766500, notes: 'Stok opname & pengadaan bahan baku utama' },
  { id: 'ie-6', brand_id: 'brand-antrasida', date: '2026-07-07', amount: 2324000, notes: 'Kemasan botol 1 liter' },
  { id: 'ie-7', brand_id: 'brand-antrasida', date: '2026-07-08', amount: 1965000, notes: 'Bahan tambahan pembasmi hama' }
];

export const INITIAL_EXPENSE_BUDGETS: ExpenseBudget[] = [
  { id: 'eb-1', brand_id: 'brand-antrasida', category: 'Pembelian Bahan Baku', period: 'Bulan ini', estimated_amount: 25245000, realized_amount: 14850000 },
  { id: 'eb-2', brand_id: 'brand-antrasida', category: 'Gaji & Upah', period: 'Bulan ini', estimated_amount: 3000000, realized_amount: 3000000 },
  { id: 'eb-3', brand_id: 'brand-antrasida', category: 'Operasional Gudang', period: 'Bulan ini', estimated_amount: 4500000, realized_amount: 3200000 },
  { id: 'eb-4', brand_id: 'brand-antrasida', category: 'Packaging & AMP', period: 'Bulan ini', estimated_amount: 22176000, realized_amount: 8557928.68 }
];

export const INITIAL_ACCOUNTS_RECEIVABLE: AccountReceivable[] = [
  { id: 'ar-1', brand_id: 'brand-antrasida', date: '2026-07-03', debtor_source: 'Agrodelta (Pinjaman Top Up Ads)', amount: 2775000, status: 'Lunas', notes: 'Dibayar kembali pada tanggal 4 Juli' },
  { id: 'ar-2', brand_id: 'brand-antrasida', date: '2026-07-06', debtor_source: 'Nuexagro (Pinjaman Top Up)', amount: 1110000, status: 'Pending', notes: 'Belum dikembalikan' },
  { id: 'ar-3', brand_id: 'brand-antrasida', date: '2026-07-06', debtor_source: 'Nusatani (Pinjaman Top Up)', amount: 555000, status: 'Pending', notes: 'Belum dikembalikan' },
  { id: 'ar-4', brand_id: 'brand-antrasida', date: '2026-07-14', debtor_source: 'Sakatani (Pinjaman Top Up)', amount: 555000, status: 'Pending', notes: 'Top up iklan Sakatani dari dana Antrasida' }
];

export const INITIAL_PROFIT_LOSS: ProfitLossSummary = {
  period: '25 MEI - 25 JUN / JULI 2026 (FORECAST VS REALISASI)',
  omset_marketing_target: 110000000,
  omset_marketing_realization: 70616240,
  omset_finance_target: 110000000,
  omset_finance_realization: 57667983,
  fixed_costs: [
    { name: 'Gaji & Upah', target: 3000000, realization: 3000000 }
  ],
  variable_costs: [
    { name: 'HPP (Bahan Baku)', target: 25245000, realization: 9701546 },
    { name: 'Biaya AMP (Packaging)', target: 22176000, realization: 8557928.68 },
    { name: 'Beban Ongkir', target: 900000, realization: 6695252.83 },
    { name: 'Biaya Pemprosesan', target: 1963750, realization: 968750 },
    { name: 'Biaya Ads Spend', target: 36666666.67, realization: 22137302 },
    { name: 'Biaya Sample Produk', target: 1650000, realization: 639000 },
    { name: 'Biaya Affiliasi', target: 11000000, realization: 5751280 }
  ],
  subsidi_ads: 708150,
  total_cost_target: 102601416.67,
  total_cost_realization: 53103909.51,
  npm_target: 7398583.33,
  npm_realization: 4564073.49
};

// ==========================================
// SEED ACCURATE ONLINE ERP DATA
// ==========================================

export const INITIAL_ACCOUNTS: ChartOfAccount[] = [
  // Aset Lancar
  { id: 'acc-1101', code: '1101', name: 'Kas Bank BCA', category: 'Aset Lancar', normal_balance: 'Debit', balance: 34409827 },
  { id: 'acc-1102', code: '1102', name: 'Kas Bank Mandiri', category: 'Aset Lancar', normal_balance: 'Debit', balance: 10000000 },
  { id: 'acc-1103', code: '1103', name: 'Piutang Marketplace (Saldo Tertahan)', category: 'Aset Lancar', normal_balance: 'Debit', balance: 12948257 },
  { id: 'acc-1104', code: '1104', name: 'Piutang Top Up Iklan (Agrodelta)', category: 'Aset Lancar', normal_balance: 'Debit', balance: 1110000 },
  { id: 'acc-1301', code: '1301', name: 'Persediaan Bahan Baku & Kemasan', category: 'Aset Lancar', normal_balance: 'Debit', balance: 18259474 },
  
  // Aset Tetap
  { id: 'acc-1501', code: '1501', name: 'Peralatan Operasional & Gudang', category: 'Aset Tetap', normal_balance: 'Debit', balance: 15000000 },
  
  // Kewajiban
  { id: 'acc-2101', code: '2101', name: 'Hutang Usaha / Supplier', category: 'Kewajiban', normal_balance: 'Kredit', balance: 8500000 },
  
  // Ekuitas
  { id: 'acc-3101', code: '3101', name: 'Ekuitas Modal SMB', category: 'Ekuitas', normal_balance: 'Kredit', balance: 78663484.51 },
  { id: 'acc-3102', code: '3102', name: 'Laba Periode Berjalan', category: 'Ekuitas', normal_balance: 'Kredit', balance: 4564073.49 },
  
  // Pendapatan
  { id: 'acc-4101', code: '4101', name: 'Pendapatan Penjualan Antrasida', category: 'Pendapatan', normal_balance: 'Kredit', balance: 70616240 },
  { id: 'acc-4102', code: '4102', name: 'Pendapatan Penjualan Agrodelta', category: 'Pendapatan', normal_balance: 'Kredit', balance: 20950000 },
  
  // HPP
  { id: 'acc-5101', code: '5101', name: 'HPP Produk / Bahan Baku', category: 'HPP', normal_balance: 'Debit', balance: 9701546 },
  
  // Beban Operasional
  { id: 'acc-6101', code: '6101', name: 'Biaya Admin & Pemprosesan Marketplace', category: 'Beban Operasional', normal_balance: 'Debit', balance: 10656678.68 },
  { id: 'acc-6102', code: '6102', name: 'Beban Ongkir & Affiliasi', category: 'Beban Operasional', normal_balance: 'Debit', balance: 12446532.83 },
  { id: 'acc-6103', code: '6103', name: 'Beban Iklan (Ads Spend)', category: 'Beban Operasional', normal_balance: 'Debit', balance: 22137302 },
  { id: 'acc-6104', code: '6104', name: 'Gaji, Servis & Operasional Lainnya', category: 'Beban Operasional', normal_balance: 'Debit', balance: 3639000 }
];

export const INITIAL_JOURNAL_ENTRIES: JournalEntry[] = [
  {
    id: 'jrn-1',
    transaction_code: 'JRN/SMB/2026/0001',
    date: '2026-07-01',
    description: 'Setoran Saldo Awal Pembukuan Operasional SMB (Antrasida)',
    brand_id: 'brand-antrasida',
    is_automated: false,
    items: [
      { account_code: '1101', account_name: 'Kas Bank BCA', debit: 34409827, credit: 0 },
      { account_code: '1102', account_name: 'Kas Bank Mandiri', debit: 10000000, credit: 0 },
      { account_code: '1301', account_name: 'Persediaan Bahan Baku & Kemasan', debit: 18259474, credit: 0 },
      { account_code: '1501', account_name: 'Peralatan Operasional & Gudang', debit: 15000000, credit: 0 },
      { account_code: '3101', account_name: 'Ekuitas Modal SMB', debit: 0, credit: 77669301 }
    ]
  },
  {
    id: 'jrn-2',
    transaction_code: 'JRN/SMB/2026/0002',
    date: '2026-07-16',
    description: 'Pencatatan Jurnal Otomatis Penjualan Harian & HPP Antrasida (Juli 2026)',
    brand_id: 'brand-antrasida',
    is_automated: true,
    items: [
      { account_code: '1103', account_name: 'Piutang Marketplace (Saldo Tertahan)', debit: 57667983, credit: 0 },
      { account_code: '6101', account_name: 'Biaya Admin & Pemprosesan Marketplace', debit: 10656678.68, credit: 0 },
      { account_code: '6102', account_name: 'Beban Ongkir & Affiliasi', debit: 12446532.83, credit: 0 },
      { account_code: '5101', account_name: 'HPP Produk / Bahan Baku', debit: 9701546, credit: 0 },
      { account_code: '4101', account_name: 'Pendapatan Penjualan Antrasida', debit: 0, credit: 70616240 },
      { account_code: '1301', account_name: 'Persediaan Bahan Baku & Kemasan', debit: 0, credit: 9701546 }
    ]
  },
  {
    id: 'jrn-3',
    transaction_code: 'JRN/AGRO/2026/0001',
    date: '2026-07-02',
    description: 'Setoran Modal & Alokasi Anggaran Operasional Unit Agrodelta',
    brand_id: 'brand-agrodelta',
    is_automated: false,
    items: [
      { account_code: '1102', account_name: 'Kas Bank Mandiri', debit: 15000000, credit: 0 },
      { account_code: '1104', account_name: 'Piutang Top Up Iklan (Agrodelta)', debit: 1110000, credit: 0 },
      { account_code: '1301', account_name: 'Persediaan Bahan Baku & Kemasan', debit: 8500000, credit: 0 },
      { account_code: '3101', account_name: 'Ekuitas Modal SMB', debit: 0, credit: 24610000 }
    ]
  },
  {
    id: 'jrn-4',
    transaction_code: 'JRN/AGRO/2026/0002',
    date: '2026-07-15',
    description: 'Jurnal Otomatis Realisasi Penjualan & Beban Distribusi Agrodelta',
    brand_id: 'brand-agrodelta',
    is_automated: true,
    items: [
      { account_code: '1103', account_name: 'Piutang Marketplace (Saldo Tertahan)', debit: 14850000, credit: 0 },
      { account_code: '6101', account_name: 'Biaya Admin & Pemprosesan Marketplace', debit: 2980000, credit: 0 },
      { account_code: '6102', account_name: 'Beban Ongkir & Affiliasi', debit: 3120000, credit: 0 },
      { account_code: '5101', account_name: 'HPP Produk / Bahan Baku', debit: 4250000, credit: 0 },
      { account_code: '4102', account_name: 'Pendapatan Penjualan Agrodelta', debit: 0, credit: 20950000 },
      { account_code: '1301', account_name: 'Persediaan Bahan Baku & Kemasan', debit: 0, credit: 4250000 }
    ]
  }
];

export const INITIAL_INVOICES: Invoice[] = [
  {
    id: 'inv-1',
    invoice_number: 'INV/SMB/2026/001',
    type: 'PENJUALAN',
    date: '2026-07-16',
    due_date: '2026-07-30',
    customer_vendor: 'CV Mitra Distributor Utama (Distributor Antrasida)',
    brand_id: 'brand-antrasida',
    items: [
      { sku: 'ATR-FNG-BAK1', name: 'Antrasida - Fungisida Busuk Akar (1 Liter)', quantity: 50, unit_price: 139000, total: 6950000 },
      { sku: 'ATR-INS-ASM1', name: 'Antrasida - Insektisida Anti Semut & Kutu (500 ml)', quantity: 40, unit_price: 71900, total: 2876000 }
    ],
    subtotal: 9826000,
    tax: 1080860, // PPN 11%
    discount: 500000,
    total: 10406860,
    status: 'Paid',
    notes: 'Pembayaran diterima penuh ke Kas Bank BCA'
  },
  {
    id: 'inv-2',
    invoice_number: 'INV/SMB/2026/002',
    type: 'PEMBELIAN',
    date: '2026-07-18',
    due_date: '2026-08-01',
    customer_vendor: 'PT Kemasan Nusantara Makmur (Supplier Botol & Kardus)',
    brand_id: 'brand-antrasida',
    items: [
      { sku: 'PKG-BTL-1L', name: 'Botol HDPE 1 Liter Tutup Segel (Bahan Baku Packaging)', quantity: 2000, unit_price: 3200, total: 6400000 },
      { sku: 'PKG-BOX-500', name: 'Kardus Master Box Kraft (Kemasan 24 Botol)', quantity: 200, unit_price: 8500, total: 1700000 }
    ],
    subtotal: 8100000,
    tax: 891000,
    discount: 0,
    total: 8991000,
    status: 'Unpaid',
    notes: 'Jatuh tempo 14 hari kerja'
  },
  {
    id: 'inv-3',
    invoice_number: 'INV/AGRO/2026/001',
    type: 'PENJUALAN',
    date: '2026-07-14',
    due_date: '2026-07-28',
    customer_vendor: 'Koperasi Tani Nusantara Agro (Mitra Agrodelta)',
    brand_id: 'brand-agrodelta',
    items: [
      { sku: 'AGR-NUT-PUP1', name: 'Agrodelta - Pupuk Nutrisi Daun & Buah Organik (5 L)', quantity: 30, unit_price: 245000, total: 7350000 },
      { sku: 'AGR-BIO-STI1', name: 'Agrodelta - Biostimulan Akar Organik Plus (1 L)', quantity: 25, unit_price: 115000, total: 2875000 }
    ],
    subtotal: 10225000,
    tax: 1124750, // PPN 11%
    discount: 225000,
    total: 11124750,
    status: 'Paid',
    notes: 'Lunas ditransfer ke Kas Bank Mandiri Agrodelta'
  },
  {
    id: 'inv-4',
    invoice_number: 'INV/AGRO/2026/002',
    type: 'PEMBELIAN',
    date: '2026-07-19',
    due_date: '2026-08-02',
    customer_vendor: 'PT Agro Industri Bahan Baku Abadi (Supplier Pupuk Dasar)',
    brand_id: 'brand-agrodelta',
    items: [
      { sku: 'RAW-ORG-NIT', name: 'Bahan Baku Nitrogen Organik Cair (Jerigen 20 L)', quantity: 50, unit_price: 180000, total: 9000000 },
      { sku: 'RAW-BIO-ENZ', name: 'Enzim Fermentasi Hayati Super (Pack 5 kg)', quantity: 20, unit_price: 350000, total: 7000000 }
    ],
    subtotal: 16000000,
    tax: 1760000,
    discount: 500000,
    total: 17260000,
    status: 'Unpaid',
    notes: 'Pembayaran termin 1 atas pengiriman bahan baku pupuk'
  }
];

