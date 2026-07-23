"use client";

import React, { useState, useMemo } from "react";
import {
  FileText,
  Plus,
  Search,
  Filter,
  Printer,
  CheckCircle2,
  AlertCircle,
  Clock,
  Eye,
  Trash2,
  Sprout,
  Check,
  TrendingUp,
  Layers,
  X,
} from "lucide-react";
import { useDashboard } from "@/context/DashboardContext";
import { Invoice, InvoiceItem } from "@/types";

export default function FakturPage() {
  const { invoices, products, selectedBrandId, addInvoice, updateInvoiceStatus } = useDashboard();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedType, setSelectedType] = useState("all");

  // Modal states
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [previewInvoice, setPreviewInvoice] = useState<Invoice | null>(null);

  // Form states for New Invoice
  const [formType, setFormType] = useState<"PENJUALAN" | "PEMBELIAN">("PENJUALAN");
  const [formDate, setFormDate] = useState(new Date().toISOString().split("T")[0]);
  const [formDueDate, setFormDueDate] = useState(new Date(Date.now() + 14 * 86400000).toISOString().split("T")[0]);
  const [formCustomerVendor, setFormCustomerVendor] = useState("");
  const [formBrandId, setFormBrandId] = useState("brand-antrasida");
  const [formTaxPercentage, setFormTaxPercentage] = useState<number>(11);
  const [formDiscount, setFormDiscount] = useState<number>(0);
  const [formNotes, setFormNotes] = useState("");
  const [formItems, setFormItems] = useState<InvoiceItem[]>([
    { sku: "ATR-FNG-BAK1", name: "Antrasida - Fungisida Busuk Akar (1 Liter)", quantity: 1, unit_price: 139000, total: 139000 },
  ]);

  // Filter invoices
  const filteredInvoices = useMemo(() => {
    return invoices.filter((inv) => {
      if (selectedBrandId !== "all" && inv.brand_id && inv.brand_id !== selectedBrandId) return false;
      if (selectedStatus !== "all" && inv.status !== selectedStatus) return false;
      if (selectedType !== "all" && inv.type !== selectedType) return false;
      if (
        searchQuery &&
        !inv.invoice_number.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !inv.customer_vendor.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }
      return true;
    });
  }, [invoices, selectedBrandId, selectedStatus, selectedType, searchQuery]);

  // Form subtotal and total calculation
  const formCalculations = useMemo(() => {
    const subtotal = formItems.reduce((acc, curr) => acc + curr.total, 0);
    const tax = Math.round(subtotal * (formTaxPercentage / 100));
    const total = subtotal + tax - (Number(formDiscount) || 0);
    return { subtotal, tax, total };
  }, [formItems, formTaxPercentage, formDiscount]);

  const handleAddItem = () => {
    const defaultProd = products[0] || { sku: "SKU-001", name: "Produk Contoh", selling_price: 100000 };
    setFormItems([
      ...formItems,
      {
        sku: defaultProd.sku,
        name: defaultProd.name,
        quantity: 1,
        unit_price: defaultProd.selling_price || 100000,
        total: defaultProd.selling_price || 100000,
      },
    ]);
  };

  const handleRemoveItem = (index: number) => {
    if (formItems.length <= 1) return;
    setFormItems(formItems.filter((_, i) => i !== index));
  };

  const handleItemChange = (index: number, field: keyof InvoiceItem | "product_sku", value: string | number) => {
    const updated = [...formItems];
    if (field === "product_sku") {
      const prod = products.find((p) => p.sku === value);
      if (prod) {
        updated[index] = {
          sku: prod.sku,
          name: prod.name,
          quantity: updated[index].quantity,
          unit_price: prod.selling_price || 100000,
          total: updated[index].quantity * (prod.selling_price || 100000),
        };
      }
    } else if (field === "quantity" || field === "unit_price") {
      const qty = field === "quantity" ? Number(value) || 0 : updated[index].quantity;
      const price = field === "unit_price" ? Number(value) || 0 : updated[index].unit_price;
      updated[index] = {
        ...updated[index],
        quantity: qty,
        unit_price: price,
        total: qty * price,
      };
    }
    setFormItems(updated);
  };

  const handleSubmitNewInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formCustomerVendor) {
      alert("Nama Pelanggan / Supplier harus diisi!");
      return;
    }
    addInvoice({
      type: formType,
      date: formDate,
      due_date: formDueDate,
      customer_vendor: formCustomerVendor,
      brand_id: formBrandId,
      items: formItems,
      subtotal: formCalculations.subtotal,
      tax: formCalculations.tax,
      discount: Number(formDiscount) || 0,
      total: formCalculations.total,
      status: "Unpaid",
      notes: formNotes,
    });
    setIsNewModalOpen(false);
    setFormCustomerVendor("");
    setFormNotes("");
  };

  const handlePrint = () => {
    const originalTitle = document.title;
    if (previewInvoice) {
      document.title = `Faktur_${previewInvoice.type}_${previewInvoice.invoice_number.replace(/\//g, "-")}`;
    }
    window.print();
    document.title = originalTitle;
  };

  return (
    <div className="space-y-8 pb-12 animate-fadeIn">

      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-card p-6 rounded-3xl border border-indigo-500/20 bg-gradient-to-r from-indigo-500/10 via-slate-900/40 to-emerald-500/10 print:hidden">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-xl shadow-indigo-500/20">
            <FileText className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Faktur & Invoice Studio (Commercial Invoicing)
              </h1>
              <span className="px-2.5 py-0.5 text-xs font-extrabold rounded-full bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30">
                Accurate ERP Suite
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 font-medium mt-1">
              Pembuatan Faktur Penjualan / Pembelian resmi dengan perhitungan PPN & fitur Cetak PDF langsung.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsNewModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-emerald-600 text-white font-bold text-sm shadow-lg shadow-indigo-500/25 hover:from-indigo-500 hover:to-emerald-500 transition-all transform hover:-translate-y-0.5"
          >
            <Plus className="w-4 h-4" />
            Buat Faktur Baru
          </button>
        </div>
      </div>

      {/* Filter and Search Section */}
      <div className="glass-card p-5 rounded-2xl border border-slate-200/60 dark:border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4 print:hidden">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari no faktur / nama pelanggan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 dark:text-slate-100"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-3.5 py-2.5 rounded-xl bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 text-sm font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">Semua Jenis Faktur</option>
            <option value="PENJUALAN">Faktur Penjualan (Sales Invoice)</option>
            <option value="PEMBELIAN">Faktur Pembelian (Purchase Invoice)</option>
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3.5 py-2.5 rounded-xl bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 text-sm font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">Semua Status Pembayaran</option>
            <option value="Paid">Lunas (Paid)</option>
            <option value="Unpaid">Belum Bayar (Unpaid)</option>
            <option value="Overdue">Jatuh Tempo (Overdue)</option>
            <option value="Draft">Draft</option>
          </select>
        </div>
      </div>

      {/* Invoices List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 print:hidden">
        {filteredInvoices.length === 0 ? (
          <div className="col-span-full glass-card p-12 rounded-3xl text-center text-slate-500 dark:text-slate-400 font-medium">
            Tidak ada dokumen faktur yang cocok dengan filter Anda.
          </div>
        ) : (
          filteredInvoices.map((inv) => (
            <div
              key={inv.id}
              className="glass-card rounded-3xl p-6 border border-slate-200/60 dark:border-slate-800/80 hover:border-indigo-500/50 transition-all flex flex-col justify-between shadow-lg"
            >
              <div>
                {/* Header card */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-200/40 dark:border-slate-800/40 mb-4">
                  <div>
                    <span className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400 block">
                      {inv.invoice_number}
                    </span>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mt-1 flex items-center gap-1.5">
                      {inv.type === "PENJUALAN" ? (
                        <>
                          <TrendingUp className="w-3.5 h-3.5 text-emerald-500 inline" />
                          <span>Faktur Penjualan</span>
                        </>
                      ) : (
                        <>
                          <Layers className="w-3.5 h-3.5 text-amber-500 inline" />
                          <span>Faktur Pembelian</span>
                        </>
                      )}
                    </span>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-extrabold border flex items-center gap-1 ${
                      inv.status === "Paid"
                        ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                        : inv.status === "Overdue"
                        ? "bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30"
                        : "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30"
                    }`}
                  >
                    {inv.status === "Paid" && <CheckCircle2 className="w-3.5 h-3.5" />}
                    {inv.status === "Unpaid" && <Clock className="w-3.5 h-3.5" />}
                    {inv.status === "Overdue" && <AlertCircle className="w-3.5 h-3.5" />}
                    {inv.status.toUpperCase()}
                  </span>
                </div>

                {/* Customer Info */}
                <div className="space-y-2 mb-6">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                      {inv.type === "PENJUALAN" ? "Kepada Pelanggan:" : "Kepada Supplier:"}
                    </span>
                    <h4 className="font-extrabold text-sm text-slate-900 dark:text-white line-clamp-1">
                      {inv.customer_vendor}
                    </h4>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-1">
                    <span>Tgl Bukti: {inv.date}</span>
                    <span>Jatuh Tempo: {inv.due_date}</span>
                  </div>
                </div>

                {/* Items preview snippet */}
                <div className="bg-slate-50 dark:bg-slate-900/60 p-3 rounded-2xl border border-slate-200/40 dark:border-slate-800/40 text-xs mb-6">
                  <p className="font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {inv.items.length} Item Barang/SKU:
                  </p>
                  <ul className="space-y-1 text-slate-600 dark:text-slate-400">
                    {inv.items.slice(0, 2).map((it, idx) => (
                      <li key={idx} className="flex justify-between">
                        <span className="truncate pr-2">• {it.name}</span>
                        <span className="font-mono font-bold shrink-0">{it.quantity}x</span>
                      </li>
                    ))}
                    {inv.items.length > 2 && (
                      <li className="text-[11px] text-indigo-500 italic">+ {inv.items.length - 2} item lainnya...</li>
                    )}
                  </ul>
                </div>
              </div>

              {/* Card Footer & Total */}
              <div className="pt-4 border-t border-slate-200/60 dark:border-slate-800/80 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
                    Total Tagihan
                  </span>
                  <span className="text-lg font-mono font-black text-slate-900 dark:text-white">
                    Rp {inv.total.toLocaleString("id-ID")}
                  </span>
                </div>
                <button
                  onClick={() => setPreviewInvoice(inv)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-emerald-600 text-white font-bold text-xs shadow-md hover:from-indigo-500 hover:to-emerald-500 transition-all"
                >
                  <Eye className="w-3.5 h-3.5" />
                  Lihat & Cetak
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* PREVIEW INVOICE STUDIO MODAL (Supports window.print()) */}
      {previewInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in overflow-y-auto print:static print:block print:p-0 print:bg-white print:overflow-visible">
          <div className="glass-panel w-full max-w-4xl rounded-3xl p-6 md:p-10 border border-slate-200/60 dark:border-slate-800/80 shadow-2xl max-h-[92vh] overflow-y-auto print:max-w-none print:max-h-none print:border-none print:shadow-none print:p-0 print:bg-white print:text-black print:overflow-visible">
            {/* Top Action Buttons inside Modal - hidden when printing */}
            <div className="flex items-center justify-between pb-6 border-b border-slate-200/60 dark:border-slate-800/80 mb-8 print:hidden">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 font-extrabold text-xs border border-indigo-500/30">
                  INVOICE STUDIO PREVIEW
                </span>
                <span className="font-mono text-sm font-bold text-slate-500">{previewInvoice.invoice_number}</span>
              </div>
              <div className="flex items-center gap-3">
                {previewInvoice.status !== "Paid" && (
                  <button
                    onClick={() => {
                      updateInvoiceStatus(previewInvoice.id, "Paid");
                      setPreviewInvoice({ ...previewInvoice, status: "Paid" });
                    }}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 font-bold text-xs hover:bg-emerald-500/25 transition-all"
                  >
                    <Check className="w-4 h-4" />
                    Tandai Lunas (Paid)
                  </button>
                )}
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-emerald-600 text-white font-bold text-xs shadow-lg hover:from-indigo-500 hover:to-emerald-500 transition-all"
                >
                  <Printer className="w-4 h-4" />
                  Cetak Faktur / Save PDF
                </button>
                <button
                  onClick={() => setPreviewInvoice(null)}
                  className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* COMMERCIAL INVOICE PRINT DOCUMENT */}
            <div 
              className="space-y-8 bg-white dark:bg-slate-900/90 print:bg-white p-8 md:p-10 rounded-2xl border border-slate-200 dark:border-slate-800 print:border-none text-slate-900 dark:text-slate-100 print:text-black print:overflow-visible print:w-full print:p-0 print:shadow-none print:m-0"
              style={{ WebkitPrintColorAdjust: "exact", printColorAdjust: "exact" }}
            >
              {/* Document Header */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-8 border-b-2 border-slate-800 dark:border-slate-200 print:border-black">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-600 flex items-center justify-center text-white font-bold text-2xl shadow-md">
                    <Sprout className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black tracking-tight uppercase">CV SURYA MITRA BERKAH (SMB)</h2>
                    <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 print:text-gray-700 mt-1">
                      Unit Operasional Brand: Antrasida & Agrodelta
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 print:text-gray-600">
                      Jl. Raya Pertanian No. 88, Jawa Barat, Indonesia | Email: finance@smb.co.id
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <h3 className="text-3xl font-black text-indigo-600 dark:text-indigo-400 print:text-black uppercase tracking-wider">
                    {previewInvoice.type === "PENJUALAN" ? "FAKTUR PENJUALAN" : "FAKTUR PEMBELIAN"}
                  </h3>
                  <p className="font-mono text-base font-bold mt-1">{previewInvoice.invoice_number}</p>
                  <span
                    className={`inline-block px-3 py-1 rounded-md text-xs font-extrabold mt-2 uppercase ${
                      previewInvoice.status === "Paid"
                        ? "bg-emerald-100 text-emerald-800 border border-emerald-300 print:border-black print:text-black"
                        : "bg-amber-100 text-amber-800 border border-amber-300 print:border-black print:text-black"
                    }`}
                  >
                    STATUS: {previewInvoice.status === "Paid" ? "LUNAS / PAID" : "BELUM DIBAYAR / UNPAID"}
                  </span>
                </div>
              </div>

              {/* Customer & Date Info Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 print:bg-gray-100 border border-slate-200 dark:border-slate-700 print:border-gray-300">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 print:text-gray-600 block mb-1">
                    {previewInvoice.type === "PENJUALAN" ? "Ditujukan Kepada Pelanggan:" : "Ditujukan Kepada Supplier:"}
                  </span>
                  <h4 className="font-black text-base text-slate-900 dark:text-white print:text-black">
                    {previewInvoice.customer_vendor}
                  </h4>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 print:bg-gray-100 border border-slate-200 dark:border-slate-700 print:border-gray-300 flex justify-between items-center text-sm">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 print:text-gray-600 block">
                      Tanggal Faktur
                    </span>
                    <span className="font-bold font-mono">{previewInvoice.date}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 print:text-gray-600 block">
                      Tanggal Jatuh Tempo
                    </span>
                    <span className="font-bold font-mono text-indigo-600 dark:text-indigo-400 print:text-black">
                      {previewInvoice.due_date}
                    </span>
                  </div>
                </div>
              </div>

              {/* Items Table */}
              <div className="pt-4 overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b-2 border-slate-800 dark:border-slate-200 print:border-black bg-slate-100 dark:bg-slate-800 print:bg-gray-200 text-xs font-extrabold uppercase tracking-wider">
                      <th className="p-3 w-16 text-center">No</th>
                      <th className="p-3 w-40">Kode SKU</th>
                      <th className="p-3">Nama Produk / Rincian Barang</th>
                      <th className="p-3 text-center w-24">Jumlah</th>
                      <th className="p-3 text-right w-36">Harga Satuan</th>
                      <th className="p-3 text-right w-44">Subtotal (IDR)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800 print:divide-gray-300 text-sm">
                    {previewInvoice.items.map((it, idx) => (
                      <tr key={idx}>
                        <td className="p-3 text-center font-mono font-bold">{idx + 1}</td>
                        <td className="p-3 font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400 print:text-black">
                          {it.sku}
                        </td>
                        <td className="p-3 font-bold">{it.name}</td>
                        <td className="p-3 text-center font-mono font-bold">{it.quantity}</td>
                        <td className="p-3 text-right font-mono">Rp {it.unit_price.toLocaleString("id-ID")}</td>
                        <td className="p-3 text-right font-mono font-black">Rp {it.total.toLocaleString("id-ID")}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Summary Calculation & Signatures Container (Prevent page break inside) */}
              <div className="print:break-inside-avoid space-y-8">
                {/* Summary Calculation Section */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-6 border-t-2 border-slate-800 dark:border-slate-200 print:border-black">
                  <div className="md:col-span-6 space-y-2 text-xs">
                    <p className="font-bold uppercase tracking-wider text-slate-500 print:text-gray-600">
                      Catatan Pembayaran / Bank Transfer:
                    </p>
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 print:bg-gray-100 border border-slate-200 dark:border-slate-700 print:border-gray-300 font-semibold space-y-1">
                      <p>Bank BCA: 123-456-7890 (a.n. CV SURYA MITRA BERKAH)</p>
                      <p>Bank Mandiri: 987-654-3210 (a.n. CV SURYA MITRA BERKAH)</p>
                      {previewInvoice.notes && <p className="pt-2 italic text-slate-600 dark:text-slate-400">Catatan: {previewInvoice.notes}</p>}
                    </div>
                  </div>

                  <div className="md:col-span-6 space-y-2 text-sm">
                    <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-800 print:border-gray-300">
                      <span className="font-semibold text-slate-600 dark:text-slate-400 print:text-gray-700">Subtotal</span>
                      <span className="font-mono font-bold">Rp {previewInvoice.subtotal.toLocaleString("id-ID")}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-800 print:border-gray-300">
                      <span className="font-semibold text-slate-600 dark:text-slate-400 print:text-gray-700">Pajak (PPN / Tax)</span>
                      <span className="font-mono font-bold">Rp {previewInvoice.tax.toLocaleString("id-ID")}</span>
                    </div>
                    {previewInvoice.discount > 0 && (
                      <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-800 print:border-gray-300 text-rose-600 print:text-black">
                        <span className="font-semibold">Potongan Diskon</span>
                        <span className="font-mono font-bold">- Rp {previewInvoice.discount.toLocaleString("id-ID")}</span>
                      </div>
                    )}
                    <div className="flex justify-between py-2 font-black text-lg text-slate-900 dark:text-white print:text-black border-t-2 border-slate-800 dark:border-slate-200 print:border-black">
                      <span>TOTAL TAGIHAN</span>
                      <span className="font-mono text-indigo-600 dark:text-indigo-400 print:text-black">
                        Rp {previewInvoice.total.toLocaleString("id-ID")}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Signatures */}
                <div className="grid grid-cols-2 gap-8 pt-8 pb-4 text-center text-xs font-bold">
                  <div>
                    <p className="mb-16">Penerima / Pelanggan,</p>
                    <div className="w-44 mx-auto border-b border-slate-800 dark:border-slate-200 print:border-black"></div>
                    <p className="mt-1 text-[11px] font-normal text-slate-500">(Tanda tangan & Stempel)</p>
                  </div>
                  <div>
                    <p className="mb-16">CV Surya Mitra Berkah (Finance & Accounting),</p>
                    <div className="w-44 mx-auto border-b border-slate-800 dark:border-slate-200 print:border-black"></div>
                    <p className="mt-1 text-[11px] font-normal text-slate-500">(Authorized Signature)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL BUAT FAKTUR BARU */}
      {isNewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
          <div className="glass-panel w-full max-w-3xl rounded-3xl p-6 md:p-8 border border-slate-200/60 dark:border-slate-800/80 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200/60 dark:border-slate-800/80 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/15 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                  <Plus className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white">Buat Faktur Komersial Baru</h3>
              </div>
              <button
                onClick={() => setIsNewModalOpen(false)}
                className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitNewInvoice} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">
                    Jenis Faktur
                  </label>
                  <select
                    value={formType}
                    onChange={(e) => setFormType(e.target.value as "PENJUALAN" | "PEMBELIAN")}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="PENJUALAN">Faktur Penjualan (Sales)</option>
                    <option value="PEMBELIAN">Faktur Pembelian (Purchase)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">
                    Tanggal Bukti
                  </label>
                  <input
                    type="date"
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">
                    Tanggal Jatuh Tempo
                  </label>
                  <input
                    type="date"
                    value={formDueDate}
                    onChange={(e) => setFormDueDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">
                  {formType === "PENJUALAN" ? "Ditujukan Kepada Pelanggan / Mitra:" : "Ditujukan Kepada Supplier / Vendor:"}
                </label>
                <input
                  type="text"
                  placeholder="Misal: CV Mitra Distributor Utama / PT Kemasan Nusantara"
                  value={formCustomerVendor}
                  onChange={(e) => setFormCustomerVendor(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              {/* Items Table inside form */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-extrabold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                    Rincian Barang / SKU Pesanan
                  </label>
                  <button
                    type="button"
                    onClick={handleAddItem}
                    className="flex items-center gap-1 text-xs font-extrabold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Tambah Item SKU
                  </button>
                </div>

                <div className="space-y-3 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200/60 dark:border-slate-800/80">
                  {formItems.map((item, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                      <div className="md:col-span-5">
                        <select
                          value={item.sku}
                          onChange={(e) => handleItemChange(index, "product_sku", e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                          {products.map((p) => (
                            <option key={p.sku} value={p.sku}>
                              [{p.sku}] {p.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <input
                          type="number"
                          placeholder="Jumlah"
                          value={item.quantity || ""}
                          onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 text-xs font-mono font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500 text-center"
                        />
                      </div>
                      <div className="md:col-span-3">
                        <input
                          type="number"
                          placeholder="Harga Satuan (IDR)"
                          value={item.unit_price || ""}
                          onChange={(e) => handleItemChange(index, "unit_price", e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 text-xs font-mono font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500 text-right"
                        />
                      </div>
                      <div className="md:col-span-1 text-right font-mono text-xs font-black text-slate-800 dark:text-slate-200">
                        {(item.quantity * item.unit_price).toLocaleString("id-ID")}
                      </div>
                      <div className="md:col-span-1 flex justify-end">
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(index)}
                          disabled={formItems.length <= 1}
                          className="p-2 text-slate-400 hover:text-rose-500 disabled:opacity-30 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}

                  <div className="pt-3 border-t border-slate-200/60 dark:border-slate-800/80 grid grid-cols-2 gap-4 text-xs font-extrabold">
                    <div className="flex items-center gap-2">
                      <span>PPN Tax (%):</span>
                      <input
                        type="number"
                        value={formTaxPercentage}
                        onChange={(e) => setFormTaxPercentage(Number(e.target.value) || 0)}
                        className="w-20 px-2 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 text-center"
                      />
                    </div>
                    <div className="text-right space-y-1">
                      <p>Subtotal: Rp {formCalculations.subtotal.toLocaleString("id-ID")}</p>
                      <p>Pajak ({formTaxPercentage}%): Rp {formCalculations.tax.toLocaleString("id-ID")}</p>
                      <p className="text-sm text-indigo-600 dark:text-indigo-400 font-black">
                        Total Faktur: Rp {formCalculations.total.toLocaleString("id-ID")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-200/60 dark:border-slate-800/80">
                <button
                  type="button"
                  onClick={() => setIsNewModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-emerald-600 text-white font-bold text-sm shadow-lg shadow-indigo-500/25 hover:from-indigo-500 hover:to-emerald-500 transition-all"
                >
                  Terbitkan Faktur
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
