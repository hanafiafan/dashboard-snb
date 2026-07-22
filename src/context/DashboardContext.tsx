"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
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
  Invoice,
} from "@/types";
import {
  INITIAL_BRANDS,
  INITIAL_PRODUCTS,
  INITIAL_DAILY_SALES,
  INITIAL_CASH_FLOW,
  INITIAL_REVENUE_WITHDRAWALS,
  INITIAL_INVENTORY_EXPENDITURES,
  INITIAL_EXPENSE_BUDGETS,
  INITIAL_ACCOUNTS_RECEIVABLE,
  INITIAL_PROFIT_LOSS,
  INITIAL_ACCOUNTS,
  INITIAL_JOURNAL_ENTRIES,
  INITIAL_INVOICES,
} from "@/lib/mock-data";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

interface DashboardContextType {
  brands: Brand[];
  selectedBrandId: string; // 'all' | 'brand-antrasida' | 'brand-agrodelta'
  setSelectedBrandId: (id: string) => void;
  selectedPeriod: string; // mis. 'Juli 2026'
  setSelectedPeriod: (period: string) => void;
  customStartDate: string;
  setCustomStartDate: (date: string) => void;
  customEndDate: string;
  setCustomEndDate: (date: string) => void;
  isCustomPeriod: boolean;
  setIsCustomPeriod: (isCustom: boolean) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  
  // Data State & CRUD
  dailySales: DailySale[];
  addDailySale: (sale: Omit<DailySale, "id" | "gross_margin" | "gross_margin_percentage" | "total_expense" | "roi">) => void;
  updateDailySale: (id: string, sale: Partial<DailySale>) => void;
  deleteDailySale: (id: string) => void;
  
  products: Product[];
  addProduct: (product: Omit<Product, "id">) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  
  cashFlow: CashFlowItem[];
  addCashFlow: (item: Omit<CashFlowItem, "id" | "running_balance">) => void;
  deleteCashFlow: (id: string) => void;
  
  revenueWithdrawals: RevenueWithdrawal[];
  addRevenueWithdrawal: (item: Omit<RevenueWithdrawal, "id">) => void;
  deleteRevenueWithdrawal: (id: string) => void;
  
  inventoryExpenditures: InventoryExpenditure[];
  addInventoryExpenditure: (item: Omit<InventoryExpenditure, "id">) => void;
  deleteInventoryExpenditure: (id: string) => void;
  
  expenseBudgets: ExpenseBudget[];
  updateExpenseBudget: (id: string, realized: number) => void;
  
  accountsReceivable: AccountReceivable[];
  addAccountReceivable: (item: Omit<AccountReceivable, "id">) => void;
  updateAccountReceivableStatus: (id: string, status: "Pending" | "Lunas" | "Dicicil") => void;
  
  profitLossSummary: ProfitLossSummary;
  
  // Accurate Online Accounting State & CRUD
  accounts: ChartOfAccount[];
  journalEntries: JournalEntry[];
  addJournalEntry: (entry: Omit<JournalEntry, "id" | "transaction_code">) => void;
  invoices: Invoice[];
  addInvoice: (inv: Omit<Invoice, "id" | "invoice_number">) => void;
  updateInvoiceStatus: (id: string, status: 'Draft' | 'Unpaid' | 'Paid' | 'Overdue') => void;
  
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [brands] = useState<Brand[]>(INITIAL_BRANDS);
  const [selectedBrandId, setSelectedBrandId] = useState<string>("brand-antrasida");
  const [selectedPeriod, setSelectedPeriod] = useState<string>("Juli 2026");
  const [customStartDate, setCustomStartDate] = useState<string>("2026-07-01");
  const [customEndDate, setCustomEndDate] = useState<string>("2026-07-31");
  const [isCustomPeriod, setIsCustomPeriod] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  
  const [dailySales, setDailySales] = useState<DailySale[]>(INITIAL_DAILY_SALES);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cashFlow, setCashFlow] = useState<CashFlowItem[]>(INITIAL_CASH_FLOW);
  const [revenueWithdrawals, setRevenueWithdrawals] = useState<RevenueWithdrawal[]>(INITIAL_REVENUE_WITHDRAWALS);
  const [inventoryExpenditures, setInventoryExpenditures] = useState<InventoryExpenditure[]>(INITIAL_INVENTORY_EXPENDITURES);
  const [expenseBudgets, setExpenseBudgets] = useState<ExpenseBudget[]>(INITIAL_EXPENSE_BUDGETS);
  const [accountsReceivable, setAccountsReceivable] = useState<AccountReceivable[]>(INITIAL_ACCOUNTS_RECEIVABLE);
  const [profitLossSummary] = useState<ProfitLossSummary>(INITIAL_PROFIT_LOSS);
  
  const [accounts, setAccounts] = useState<ChartOfAccount[]>(INITIAL_ACCOUNTS);
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>(INITIAL_JOURNAL_ENTRIES);
  const [invoices, setInvoices] = useState<Invoice[]>(INITIAL_INVOICES);
  
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  useEffect(() => {
    // Tema difokuskan ke mode gelap (Dark Mode Only)
    if (typeof window !== "undefined") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }

    // Jika Supabase terkoneksi live, coba ambil data dari database
    async function fetchLiveSupabaseData() {
      if (!isSupabaseConfigured || !supabase) return;
      try {
        const { data: salesData } = await supabase.from("daily_sales").select("*").order("date", { ascending: true });
        if (salesData && salesData.length > 0) setDailySales(salesData);

        const { data: prodData } = await supabase.from("products").select("*").order("sku", { ascending: true });
        if (prodData && prodData.length > 0) setProducts(prodData);

        const { data: cfData } = await supabase.from("cash_flow_ledger").select("*").order("date", { ascending: true });
        if (cfData && cfData.length > 0) setCashFlow(cfData);
      } catch (err) {
        console.error("Gagal mengambil data dari Supabase live, menggunakan mock seed aktual:", err);
      }
    }
    fetchLiveSupabaseData();
  }, []);

  const toggleDarkMode = () => {
    // Fokus tema ke mode gelap
    setIsDarkMode(true);
    if (typeof window !== "undefined") {
      document.documentElement.classList.add("dark");
    }
  };

  // ==========================
  // CRUD DAILY SALES
  // ==========================
  const addDailySale = async (raw: Omit<DailySale, "id" | "gross_margin" | "gross_margin_percentage" | "total_expense" | "roi">) => {
    const total_expense =
      raw.admin_fee +
      raw.processing_fee +
      raw.promotion_cost +
      raw.ads_spend +
      raw.shipping_cost +
      raw.affiliate_cost +
      raw.hpp_cost;

    const gross_margin = raw.omset_finance - total_expense;
    const gross_margin_percentage = raw.omset_finance > 0 ? gross_margin / raw.omset_finance : 0;
    const roiVal = raw.ads_spend > 0 ? (raw.omset_finance / raw.ads_spend).toFixed(2) : "0.00";

    const newSale: DailySale = {
      ...raw,
      id: `ds-${Date.now()}`,
      total_expense,
      gross_margin,
      gross_margin_percentage,
      roi: roiVal,
    };

    setDailySales((prev) => [...prev, newSale]);

    // Otomatis cetak jurnal akuntansi berpasangan (Double-Entry ERP)
    const revAccountCode = raw.brand_id === "brand-agrodelta" ? "4102" : "4101";
    const revAccountName = raw.brand_id === "brand-agrodelta" ? "Pendapatan Penjualan Agrodelta" : "Pendapatan Penjualan Antrasida";
    const autoJournal: JournalEntry = {
      id: `jrn-auto-${Date.now()}`,
      transaction_code: `JRN/AUTO/${raw.date.replace(/-/g, "")}/${Math.floor(1000 + Math.random() * 9000)}`,
      date: raw.date,
      description: `Pencatatan Jurnal Otomatis Penjualan & Beban Harian (${raw.date})`,
      brand_id: raw.brand_id,
      is_automated: true,
      items: [
        { account_code: "1103", account_name: "Piutang Marketplace (Saldo Tertahan)", debit: raw.omset_finance, credit: 0 },
        { account_code: "6101", account_name: "Biaya Admin & Pemprosesan Marketplace", debit: raw.admin_fee + raw.processing_fee, credit: 0 },
        { account_code: "6102", account_name: "Beban Ongkir & Affiliasi", debit: raw.shipping_cost + raw.affiliate_cost, credit: 0 },
        { account_code: "6103", account_name: "Beban Iklan (Ads Spend)", debit: raw.ads_spend, credit: 0 },
        { account_code: "5101", account_name: "HPP Produk / Bahan Baku", debit: raw.hpp_cost, credit: 0 },
        { account_code: revAccountCode, account_name: revAccountName, debit: 0, credit: raw.omset_finance + raw.admin_fee + raw.processing_fee + raw.shipping_cost + raw.affiliate_cost + raw.ads_spend },
        { account_code: "1301", account_name: "Persediaan Bahan Baku & Kemasan", debit: 0, credit: raw.hpp_cost },
      ],
    };
    setJournalEntries((prev) => [autoJournal, ...prev]);

    showToast(`Data penjualan tanggal ${raw.date} & Jurnal Otomatis berhasil dicatat`);

    if (isSupabaseConfigured && supabase) {
      await supabase.from("daily_sales").insert([newSale]);
    }
  };

  const updateDailySale = async (id: string, updated: Partial<DailySale>) => {
    setDailySales((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const merged = { ...item, ...updated };
        const total_expense =
          merged.admin_fee +
          merged.processing_fee +
          merged.promotion_cost +
          merged.ads_spend +
          merged.shipping_cost +
          merged.affiliate_cost +
          merged.hpp_cost;
        const gross_margin = merged.omset_finance - total_expense;
        const gross_margin_percentage = merged.omset_finance > 0 ? gross_margin / merged.omset_finance : 0;
        const roiVal = merged.ads_spend > 0 ? (merged.omset_finance / merged.ads_spend).toFixed(2) : "0.00";

        return {
          ...merged,
          total_expense,
          gross_margin,
          gross_margin_percentage,
          roi: roiVal,
        };
      })
    );
    showToast(`Data transaksi penjualan berhasil diperbarui`);
    if (isSupabaseConfigured && supabase) {
      await supabase.from("daily_sales").update(updated).eq("id", id);
    }
  };

  const deleteDailySale = async (id: string) => {
    setDailySales((prev) => prev.filter((item) => item.id !== id));
    showToast(`Data transaksi penjualan berhasil dihapus`);
    if (isSupabaseConfigured && supabase) {
      await supabase.from("daily_sales").delete().eq("id", id);
    }
  };

  // ==========================
  // CRUD PRODUCTS
  // ==========================
  const addProduct = async (product: Omit<Product, "id">) => {
    const newProd: Product = { ...product, id: `prod-${Date.now()}` };
    setProducts((prev) => [...prev, newProd]);
    showToast(`Produk baru ${product.sku} berhasil ditambahkan ke katalog HPP`);
    if (isSupabaseConfigured && supabase) {
      await supabase.from("products").insert([newProd]);
    }
  };

  const updateProduct = async (id: string, updated: Partial<Product>) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...updated } : p)));
    showToast(`Harga & HPP Produk berhasil diperbarui`);
    if (isSupabaseConfigured && supabase) {
      await supabase.from("products").update(updated).eq("id", id);
    }
  };

  const deleteProduct = async (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast(`Produk dihapus dari daftar katalog HPP`);
    if (isSupabaseConfigured && supabase) {
      await supabase.from("products").delete().eq("id", id);
    }
  };

  // ==========================
  // CRUD CASH FLOW
  // ==========================
  const addCashFlow = async (item: Omit<CashFlowItem, "id" | "running_balance">) => {
    const lastBalance = cashFlow.length > 0 ? cashFlow[cashFlow.length - 1].running_balance : 0;
    const running_balance = lastBalance + Number(item.cash_in || 0) - Number(item.cash_out || 0);
    const newCf: CashFlowItem = {
      ...item,
      id: `cf-${Date.now()}`,
      running_balance,
    };
    setCashFlow((prev) => [...prev, newCf]);
    showToast(`Transaksi kas '${item.description}' berhasil dicatat. Saldo kini Rp ${running_balance.toLocaleString("id-ID")}`);
    if (isSupabaseConfigured && supabase) {
      await supabase.from("cash_flow_ledger").insert([newCf]);
    }
  };

  const deleteCashFlow = async (id: string) => {
    setCashFlow((prev) => {
      const filtered = prev.filter((c) => c.id !== id);
      // Recalculate running balance
      let currentBal = 0;
      return filtered.map((c) => {
        currentBal = currentBal + c.cash_in - c.cash_out;
        return { ...c, running_balance: currentBal };
      });
    });
    showToast(`Transaksi kas berhasil dihapus dari buku besar`);
    if (isSupabaseConfigured && supabase) {
      await supabase.from("cash_flow_ledger").delete().eq("id", id);
    }
  };

  // ==========================
  // CRUD REVENUE WITHDRAWALS & EXPENDITURES
  // ==========================
  const addRevenueWithdrawal = (item: Omit<RevenueWithdrawal, "id">) => {
    const newRw = { ...item, id: `rw-${Date.now()}` };
    setRevenueWithdrawals((prev) => [newRw, ...prev]);
    showToast(`Penarikan pendapatan Rp ${item.amount.toLocaleString("id-ID")} berhasil dicatat`);
  };

  const deleteRevenueWithdrawal = (id: string) => {
    setRevenueWithdrawals((prev) => prev.filter((item) => item.id !== id));
    showToast(`Data penarikan berhasil dihapus`);
  };

  const addInventoryExpenditure = (item: Omit<InventoryExpenditure, "id">) => {
    const newIe = { ...item, id: `ie-${Date.now()}` };
    setInventoryExpenditures((prev) => [newIe, ...prev]);
    showToast(`Pengeluaran barang Rp ${item.amount.toLocaleString("id-ID")} berhasil dicatat`);
  };

  const deleteInventoryExpenditure = (id: string) => {
    setInventoryExpenditures((prev) => prev.filter((item) => item.id !== id));
    showToast(`Data pengeluaran barang dihapus`);
  };

  const updateExpenseBudget = (id: string, realized: number) => {
    setExpenseBudgets((prev) => prev.map((b) => (b.id === id ? { ...b, realized_amount: realized } : b)));
    showToast(`Realisasi anggaran berhasil diperbarui`);
  };

  const addAccountReceivable = (item: Omit<AccountReceivable, "id">) => {
    const newAr = { ...item, id: `ar-${Date.now()}` };
    setAccountsReceivable((prev) => [newAr, ...prev]);
    showToast(`Piutang baru kepada '${item.debtor_source}' berhasil dicatat`);
  };

  const updateAccountReceivableStatus = (id: string, status: "Pending" | "Lunas" | "Dicicil") => {
    setAccountsReceivable((prev) => prev.map((ar) => (ar.id === id ? { ...ar, status } : ar)));
    showToast(`Status piutang diubah menjadi '${status}'`);
  };

  // ==========================
  // CRUD ACCURATE ERP ACCOUNTING
  // ==========================
  const addJournalEntry = (raw: Omit<JournalEntry, "id" | "transaction_code">) => {
    const newId = `jrn-${Date.now()}`;
    const codeNumber = (journalEntries.length + 1).toString().padStart(4, "0");
    const newEntry: JournalEntry = {
      ...raw,
      id: newId,
      transaction_code: `JRN/SMB/2026/${codeNumber}`,
      is_automated: raw.is_automated || false,
    };
    
    // Update balance on accounts
    const updatedAccounts = accounts.map((acc) => {
      let debitDelta = 0;
      let creditDelta = 0;
      newEntry.items.forEach((item) => {
        if (item.account_code === acc.code) {
          debitDelta += item.debit;
          creditDelta += item.credit;
        }
      });
      if (debitDelta === 0 && creditDelta === 0) return acc;
      
      const nextBalance = acc.normal_balance === "Debit"
        ? acc.balance + debitDelta - creditDelta
        : acc.balance + creditDelta - debitDelta;
      return { ...acc, balance: nextBalance };
    });

    setAccounts(updatedAccounts);
    setJournalEntries((prev) => [newEntry, ...prev]);
    showToast("Jurnal akuntansi berhasil dicatat & mutasi saldo COA diperbarui");
  };

  const addInvoice = (raw: Omit<Invoice, "id" | "invoice_number">) => {
    const newId = `inv-${Date.now()}`;
    const codeNumber = (invoices.length + 1).toString().padStart(3, "0");
    const newInv: Invoice = {
      ...raw,
      id: newId,
      invoice_number: `INV/SMB/2026/${codeNumber}`,
    };
    setInvoices((prev) => [newInv, ...prev]);
    showToast(`Faktur ${newInv.invoice_number} berhasil dibuat`);
  };

  const updateInvoiceStatus = (id: string, status: 'Draft' | 'Unpaid' | 'Paid' | 'Overdue') => {
    setInvoices((prev) =>
      prev.map((inv) => (inv.id === id ? { ...inv, status } : inv))
    );
    showToast(`Status faktur diperbarui menjadi ${status}`);
  };

  return (
    <DashboardContext.Provider
      value={{
        brands,
        selectedBrandId,
        setSelectedBrandId,
        selectedPeriod,
        setSelectedPeriod,
        customStartDate,
        setCustomStartDate,
        customEndDate,
        setCustomEndDate,
        isCustomPeriod,
        setIsCustomPeriod,
        isDarkMode,
        toggleDarkMode,
        dailySales,
        addDailySale,
        updateDailySale,
        deleteDailySale,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        cashFlow,
        addCashFlow,
        deleteCashFlow,
        revenueWithdrawals,
        addRevenueWithdrawal,
        deleteRevenueWithdrawal,
        inventoryExpenditures,
        addInventoryExpenditure,
        deleteInventoryExpenditure,
        expenseBudgets,
        updateExpenseBudget,
        accountsReceivable,
        addAccountReceivable,
        updateAccountReceivableStatus,
        profitLossSummary,
        accounts,
        journalEntries,
        addJournalEntry,
        invoices,
        addInvoice,
        updateInvoiceStatus,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
}
