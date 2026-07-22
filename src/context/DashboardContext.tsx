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
} from "@/lib/mock-data";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

interface DashboardContextType {
  brands: Brand[];
  selectedBrandId: string; // 'all' | 'brand-antrasida' | 'brand-agrodelta'
  setSelectedBrandId: (id: string) => void;
  selectedPeriod: string; // mis. 'Juli 2026'
  setSelectedPeriod: (period: string) => void;
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
  
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [brands] = useState<Brand[]>(INITIAL_BRANDS);
  const [selectedBrandId, setSelectedBrandId] = useState<string>("brand-antrasida");
  const [selectedPeriod, setSelectedPeriod] = useState<string>("Juli 2026");
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  
  const [dailySales, setDailySales] = useState<DailySale[]>(INITIAL_DAILY_SALES);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cashFlow, setCashFlow] = useState<CashFlowItem[]>(INITIAL_CASH_FLOW);
  const [revenueWithdrawals, setRevenueWithdrawals] = useState<RevenueWithdrawal[]>(INITIAL_REVENUE_WITHDRAWALS);
  const [inventoryExpenditures, setInventoryExpenditures] = useState<InventoryExpenditure[]>(INITIAL_INVENTORY_EXPENDITURES);
  const [expenseBudgets, setExpenseBudgets] = useState<ExpenseBudget[]>(INITIAL_EXPENSE_BUDGETS);
  const [accountsReceivable, setAccountsReceivable] = useState<AccountReceivable[]>(INITIAL_ACCOUNTS_RECEIVABLE);
  const [profitLossSummary] = useState<ProfitLossSummary>(INITIAL_PROFIT_LOSS);
  
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  useEffect(() => {
    // Cek preferensi tema lokal atau DOM
    if (typeof window !== "undefined") {
      const isDark = document.documentElement.classList.contains("dark") || true;
      setIsDarkMode(isDark);
      if (isDark) document.documentElement.classList.add("dark");
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
    const nextMode = !isDarkMode;
    setIsDarkMode(nextMode);
    if (nextMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
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
    showToast(`✅ Data penjualan tanggal ${raw.date} berhasil ditambahkan!`);

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
    showToast(`✏️ Data transaksi penjualan berhasil diperbarui!`);

    if (isSupabaseConfigured && supabase) {
      await supabase.from("daily_sales").update(updated).eq("id", id);
    }
  };

  const deleteDailySale = async (id: string) => {
    setDailySales((prev) => prev.filter((item) => item.id !== id));
    showToast(`🗑️ Data transaksi penjualan berhasil dihapus.`);
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
    showToast(`📦 Produk baru ${product.sku} berhasil ditambahkan ke katalog HPP!`);
    if (isSupabaseConfigured && supabase) {
      await supabase.from("products").insert([newProd]);
    }
  };

  const updateProduct = async (id: string, updated: Partial<Product>) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...updated } : p)));
    showToast(`✨ Harga & HPP Produk berhasil diperbarui!`);
    if (isSupabaseConfigured && supabase) {
      await supabase.from("products").update(updated).eq("id", id);
    }
  };

  const deleteProduct = async (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast(`🗑️ Produk dihapus dari daftar katalog HPP.`);
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
    showToast(`💰 Transaksi kas '${item.description}' berhasil dicatat! Saldo kini Rp ${running_balance.toLocaleString("id-ID")}`);
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
    showToast(`🗑️ Transaksi kas berhasil dihapus dari buku besar.`);
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
    showToast(`💸 Penarikan pendapatan Rp ${item.amount.toLocaleString("id-ID")} berhasil dicatat!`);
  };

  const deleteRevenueWithdrawal = (id: string) => {
    setRevenueWithdrawals((prev) => prev.filter((item) => item.id !== id));
    showToast(`🗑️ Data penarikan berhasil dihapus.`);
  };

  const addInventoryExpenditure = (item: Omit<InventoryExpenditure, "id">) => {
    const newIe = { ...item, id: `ie-${Date.now()}` };
    setInventoryExpenditures((prev) => [newIe, ...prev]);
    showToast(`📦 Pengeluaran barang Rp ${item.amount.toLocaleString("id-ID")} berhasil dicatat!`);
  };

  const deleteInventoryExpenditure = (id: string) => {
    setInventoryExpenditures((prev) => prev.filter((item) => item.id !== id));
    showToast(`🗑️ Data pengeluaran barang dihapus.`);
  };

  const updateExpenseBudget = (id: string, realized: number) => {
    setExpenseBudgets((prev) => prev.map((b) => (b.id === id ? { ...b, realized_amount: realized } : b)));
    showToast(`📊 Realisasi anggaran berhasil diperbarui!`);
  };

  const addAccountReceivable = (item: Omit<AccountReceivable, "id">) => {
    const newAr = { ...item, id: `ar-${Date.now()}` };
    setAccountsReceivable((prev) => [newAr, ...prev]);
    showToast(`📝 Piutang baru kepada '${item.debtor_source}' berhasil dicatat!`);
  };

  const updateAccountReceivableStatus = (id: string, status: "Pending" | "Lunas" | "Dicicil") => {
    setAccountsReceivable((prev) => prev.map((ar) => (ar.id === id ? { ...ar, status } : ar)));
    showToast(`🏷️ Status piutang diubah menjadi '${status}'.`);
  };

  return (
    <DashboardContext.Provider
      value={{
        brands,
        selectedBrandId,
        setSelectedBrandId,
        selectedPeriod,
        setSelectedPeriod,
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
