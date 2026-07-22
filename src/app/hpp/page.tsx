"use client";

import React, { useState, useMemo } from "react";
import {
  Package,
  Plus,
  Edit2,
  Trash2,
  Search,
  CheckCircle2,
  AlertCircle,
  X,
  Sliders,
  DollarSign,
  Tag,
} from "lucide-react";
import { useDashboard } from "@/context/DashboardContext";
import { Product } from "@/types";

export default function HppKatalogPage() {
  const {
    brands,
    products,
    addProduct,
    updateProduct,
    deleteProduct,
  } = useDashboard();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrandFilter, setSelectedBrandFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form state
  const [formSku, setFormSku] = useState("ATR-FNG-NEW1");
  const [formName, setFormName] = useState("");
  const [formBrandId, setFormBrandId] = useState("brand-antrasida");
  const [formSize, setFormSize] = useState("500 ml");
  const [formSellingPrice, setFormSellingPrice] = useState<number>(75000);
  const [formHppPrice, setFormHppPrice] = useState<number>(18500);

  // Simulation Tool State
  const [simProductId, setSimProductId] = useState<string>(products[0]?.id || "");
  const [simDiscountPct, setSimDiscountPct] = useState<number>(10); // 10% diskon

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (selectedBrandFilter !== "all" && p.brand_id !== selectedBrandFilter) return false;
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          p.sku.toLowerCase().includes(query) ||
          p.name.toLowerCase().includes(query) ||
          p.size.toLowerCase().includes(query)
        );
      }
      return true;
    });
  }, [products, selectedBrandFilter, searchQuery]);

  // Catalog summary stats
  const catalogSummary = useMemo(() => {
    const count = filteredProducts.length;
    const avgSell = count > 0 ? filteredProducts.reduce((a, c) => a + c.selling_price, 0) / count : 0;
    const avgHpp = count > 0 ? filteredProducts.reduce((a, c) => a + c.hpp_price, 0) / count : 0;
    const avgMargin = avgSell > 0 ? ((avgSell - avgHpp) / avgSell) * 100 : 0;
    return { count, avgSell, avgHpp, avgMargin };
  }, [filteredProducts]);

  // Simulation calculations
  const simProduct = products.find((p) => p.id === simProductId) || products[0];
  const simDiscountedPrice = simProduct ? simProduct.selling_price * (1 - simDiscountPct / 100) : 0;
  const simProfit = simProduct ? simDiscountedPrice - simProduct.hpp_price : 0;
  const simMarginPct = simDiscountedPrice > 0 ? (simProfit / simDiscountedPrice) * 100 : 0;

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormSku(`ATR-NEW-${Date.now().toString().slice(-4)}`);
    setFormName("");
    setFormBrandId(selectedBrandFilter === "all" ? "brand-antrasida" : selectedBrandFilter);
    setFormSize("500 ml");
    setFormSellingPrice(71900);
    setFormHppPrice(16500);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (p: Product) => {
    setEditingProduct(p);
    setFormSku(p.sku);
    setFormName(p.name);
    setFormBrandId(p.brand_id);
    setFormSize(p.size);
    setFormSellingPrice(p.selling_price);
    setFormHppPrice(p.hpp_price);
    setIsModalOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      updateProduct(editingProduct.id, {
        sku: formSku,
        name: formName,
        brand_id: formBrandId,
        size: formSize,
        selling_price: Number(formSellingPrice),
        hpp_price: Number(formHppPrice),
      });
    } else {
      addProduct({
        sku: formSku,
        name: formName,
        brand_id: formBrandId,
        size: formSize,
        selling_price: Number(formSellingPrice),
        hpp_price: Number(formHppPrice),
        is_active: true,
      });
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title & Add Button */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-500 uppercase tracking-widest">
            <Package className="w-4 h-4" />
            <span>Modul Master Katalog & HPP</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-1">
            Daftar SKU & HPP Bahan Baku
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Mengelola 18 SKU aktual dari sheet <code className="font-mono bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 rounded text-xs">HPP-ANTRASIDA</code> beserta simulasi margin produk.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-indigo-600 hover:from-emerald-600 hover:to-indigo-700 text-white font-bold text-sm shadow-lg shadow-emerald-500/25 flex items-center gap-2 transition-all transform hover:-translate-y-0.5"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah SKU Produk Baru</span>
        </button>
      </div>

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-5 rounded-2xl border-l-4 border-l-emerald-500">
          <span className="text-xs font-bold text-slate-400 uppercase">Total Produk Aktif</span>
          <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">
            {catalogSummary.count} SKU
          </div>
          <span className="text-xs text-emerald-500 font-semibold mt-1 block">
            Katalog Antrasida & Agrodelta
          </span>
        </div>

        <div className="glass-card p-5 rounded-2xl border-l-4 border-l-indigo-500">
          <span className="text-xs font-bold text-slate-400 uppercase">Rata-rata Harga Baru</span>
          <div className="text-xl font-black text-slate-900 dark:text-white mt-1">
            Rp {catalogSummary.avgSell.toLocaleString("id-ID", { maximumFractionDigits: 0 })}
          </div>
          <span className="text-xs text-indigo-400 font-semibold mt-1 block">
            Harga jual ritel standar
          </span>
        </div>

        <div className="glass-card p-5 rounded-2xl border-l-4 border-l-amber-500">
          <span className="text-xs font-bold text-slate-400 uppercase">Rata-rata HPP Bahan Baku</span>
          <div className="text-xl font-black text-slate-900 dark:text-white mt-1">
            Rp {catalogSummary.avgHpp.toLocaleString("id-ID", { maximumFractionDigits: 0 })}
          </div>
          <span className="text-xs text-amber-500 font-semibold mt-1 block">
            Biaya produksi rata-rata
          </span>
        </div>

        <div className="glass-card p-5 rounded-2xl border-l-4 border-l-sky-500">
          <span className="text-xs font-bold text-slate-400 uppercase">Margin Kotor Rata-rata</span>
          <div className="text-2xl font-black text-emerald-500 mt-1">
            {catalogSummary.avgMargin.toFixed(1)}%
          </div>
          <span className="text-xs text-sky-400 font-semibold mt-1 block">
            Selisih harga jual vs HPP
          </span>
        </div>
      </div>

      {/* PRODUCT MARGIN SIMULATOR TOOL */}
      <div className="glass-card rounded-2xl p-6 border-2 border-emerald-500/20">
        <div className="flex items-center gap-2 mb-4">
          <Sliders className="w-5 h-5 text-emerald-500" />
          <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
            Simulasi Diskon & Margin Profit Produk
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Pilih SKU Produk:</label>
            <select
              value={simProductId}
              onChange={(e) => setSimProductId(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs font-bold"
            >
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.sku} — {p.name} ({p.size})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Simulasi Diskon Promosi:</label>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min={0}
                max={50}
                step={5}
                value={simDiscountPct}
                onChange={(e) => setSimDiscountPct(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <span className="font-extrabold text-sm text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-lg shrink-0">
                {simDiscountPct}%
              </span>
            </div>
          </div>

          <div className="bg-slate-100/80 dark:bg-slate-800/60 p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-700/60">
            <span className="text-[10px] text-slate-400 font-bold uppercase">Harga Setelah Diskon ({simDiscountPct}%)</span>
            <div className="text-base font-black text-slate-900 dark:text-white mt-0.5">
              Rp {simDiscountedPrice.toLocaleString("id-ID", { maximumFractionDigits: 0 })}
            </div>
            <span className="text-[10px] text-slate-400">HPP: Rp {simProduct?.hpp_price.toLocaleString("id-ID")}</span>
          </div>

          <div className="bg-emerald-500/10 p-3.5 rounded-xl border border-emerald-500/30">
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold uppercase">Laba Bersih Produk</span>
            <div className="text-base font-black text-emerald-600 dark:text-emerald-400 mt-0.5">
              Rp {simProfit.toLocaleString("id-ID", { maximumFractionDigits: 0 })} ({simMarginPct.toFixed(1)}%)
            </div>
            <span className="text-[10px] text-emerald-600/80 dark:text-emerald-400/80">Per satuan kemasan</span>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="glass-card rounded-2xl overflow-hidden border border-slate-200/60 dark:border-slate-800/80">
        <div className="p-5 border-b border-slate-200/60 dark:border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Tag className="w-5 h-5 text-indigo-500" />
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
              Katalog SKU HPP Antrasida & Agrodelta
            </h3>
            <div className="flex gap-1.5">
              <button
                onClick={() => setSelectedBrandFilter("all")}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${selectedBrandFilter === "all" ? "bg-indigo-500 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-500"}`}
              >
                Semua
              </button>
              {brands.map((b) => (
                <button
                  key={b.id}
                  onClick={() => setSelectedBrandFilter(b.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${selectedBrandFilter === b.id ? "bg-indigo-500 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-500"}`}
                >
                  {b.code}
                </button>
              ))}
            </div>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari SKU / Nama Barang..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100/80 dark:bg-slate-800/70 border-b border-slate-200 dark:border-slate-700/60 text-[11px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <th className="py-3.5 px-6">SKU Kode</th>
                <th className="py-3.5 px-4">Nama Barang</th>
                <th className="py-3.5 px-4">Brand</th>
                <th className="py-3.5 px-4">Ukuran</th>
                <th className="py-3.5 px-4">Harga Baru (Jual)</th>
                <th className="py-3.5 px-4">HPP Bahan Baku</th>
                <th className="py-3.5 px-4">Margin Produk</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-6 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/50 dark:divide-slate-800/60 text-xs font-semibold">
              {filteredProducts.map((prod) => {
                const marginRp = prod.selling_price - prod.hpp_price;
                const marginPct = prod.selling_price > 0 ? (marginRp / prod.selling_price) * 100 : 0;
                const brand = brands.find((b) => b.id === prod.brand_id);

                return (
                  <tr
                    key={prod.id}
                    className="hover:bg-slate-100/60 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="py-3 px-6 font-mono font-bold text-indigo-500">{prod.sku}</td>
                    <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">{prod.name}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        {brand?.code || "ANTRASIDA"}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-500 dark:text-slate-400">{prod.size}</td>
                    <td className="py-3 px-4 font-black text-slate-900 dark:text-white">
                      Rp {prod.selling_price.toLocaleString("id-ID")}
                    </td>
                    <td className="py-3 px-4 font-black text-rose-500">
                      Rp {prod.hpp_price.toLocaleString("id-ID")}
                    </td>
                    <td className="py-3 px-4 font-black text-emerald-500">
                      Rp {marginRp.toLocaleString("id-ID")} <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">({marginPct.toFixed(1)}%)</span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-500">
                        <CheckCircle2 className="w-3 h-3" /> Aktif
                      </span>
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => handleOpenEdit(prod)}
                          className="p-1.5 rounded-lg bg-slate-200/60 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-indigo-500 hover:text-white transition-colors"
                          title="Edit Harga & HPP"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteProduct(prod.id)}
                          className="p-1.5 rounded-lg bg-slate-200/60 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-rose-500 hover:text-white transition-colors"
                          title="Hapus Produk"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-slate-400">
                    Belum ada produk yang sesuai dengan pencarian Anda.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL ADD / EDIT FORM */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="glass-panel w-full max-w-xl rounded-3xl p-6 md:p-8 shadow-2xl border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/15 flex items-center justify-center text-indigo-500 font-bold">
                  <Package className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-xl text-slate-900 dark:text-white">
                    {editingProduct ? "Edit Harga & HPP Produk" : "Tambah SKU Produk Baru"}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Data master akan digunakan untuk estimasi margin di seluruh modul.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">SKU Kode</label>
                  <input
                    type="text"
                    value={formSku}
                    onChange={(e) => setFormSku(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Brand / Unit</label>
                  <select
                    value={formBrandId}
                    onChange={(e) => setFormBrandId(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs font-bold"
                  >
                    {brands.map((b) => (
                      <option key={b.id} value={b.id}>{b.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Nama Barang</label>
                  <input
                    type="text"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    required
                    placeholder="mis: Busuk Akar / Anti Semut..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Ukuran / Kemasan</label>
                  <input
                    type="text"
                    value={formSize}
                    onChange={(e) => setFormSize(e.target.value)}
                    required
                    placeholder="mis: 1 liter / 500 ml"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Harga Baru (Selling Price)</label>
                  <input
                    type="number"
                    value={formSellingPrice}
                    onChange={(e) => setFormSellingPrice(Number(e.target.value))}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm font-bold text-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">HPP Bahan Baku</label>
                  <input
                    type="number"
                    value={formHppPrice}
                    onChange={(e) => setFormHppPrice(Number(e.target.value))}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm font-bold text-rose-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-300 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-indigo-600 hover:from-emerald-600 hover:to-indigo-700 text-white font-bold text-xs shadow-lg shadow-emerald-500/25 transition-all"
                >
                  {editingProduct ? "Simpan Perubahan" : "Simpan Produk"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
