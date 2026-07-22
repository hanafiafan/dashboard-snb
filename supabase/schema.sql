-- ==============================================================================
-- SUPABASE POSTGRESQL SCHEMA — DASHBOARD OPERASIONAL SMB
-- Dibuat berdasarkan struktur dokumen Data base SMB.xlsx (Antrasida & Agrodelta)
-- ==============================================================================

-- Aktifkan ekstensi UUID jika belum
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==============================================================================
-- 1. TABEL BRANDS (Daftar Brand Operasional)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS brands (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(50) UNIQUE NOT NULL, -- mis. 'ANTRASIDA', 'AGRODELTA'
    name VARCHAR(100) NOT NULL,
    default_admin_rate NUMERIC(10, 4) DEFAULT 0.1600,       -- 16%
    default_processing_fee NUMERIC(15, 2) DEFAULT 1250.00,  -- Rp 1.250 / pesanan
    default_shipping_rate NUMERIC(10, 4) DEFAULT 0.0899,    -- 8.99%
    default_affiliate_rate NUMERIC(10, 4) DEFAULT 0.0900,   -- 9%
    default_hpp_rate NUMERIC(10, 4) DEFAULT 0.1682,         -- 16.82%
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- 2. TABEL PRODUCTS (Master Katalog & HPP Produk dari sheet HPP-ANTRASIDA)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sku VARCHAR(100) UNIQUE NOT NULL,                       -- mis. 'ATR-FNG-BAK1'
    brand_id UUID REFERENCES brands(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,                             -- mis. 'Busuk Akar'
    product_code VARCHAR(100) NULL,                         -- ID produk opsional
    size VARCHAR(50) NOT NULL,                              -- mis. '1 liter', '500 ml'
    selling_price NUMERIC(15, 2) NOT NULL DEFAULT 0,        -- Harga Baru
    hpp_price NUMERIC(15, 2) NOT NULL DEFAULT 0,            -- HPP Bahan Baku
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- 3. TABEL DAILY_SALES (Penjualan Harian per Brand dari sheet PENJUALAN HARIAN)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS daily_sales (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    brand_id UUID REFERENCES brands(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    omset_marketing NUMERIC(15, 2) DEFAULT 0,               -- Omset Kotor / Marketing
    omset_finance NUMERIC(15, 2) DEFAULT 0,                 -- Omset Bersih / Finance
    valid_orders INTEGER DEFAULT 0,                         -- Pesanan Valid
    
    -- Komponen Beban Biaya
    admin_fee NUMERIC(15, 2) DEFAULT 0,                     -- Biaya Admin
    processing_fee NUMERIC(15, 2) DEFAULT 0,                -- Biaya Pemprosesan
    promotion_cost NUMERIC(15, 2) DEFAULT 0,                -- Biaya Promosi
    ads_spend NUMERIC(15, 2) DEFAULT 0,                     -- Ads Spend (Meta/TikTok/Google)
    shipping_cost NUMERIC(15, 2) DEFAULT 0,                 -- Biaya Ongkir
    affiliate_cost NUMERIC(15, 2) DEFAULT 0,                -- Biaya Affiliasi
    hpp_cost NUMERIC(15, 2) DEFAULT 0,                      -- Biaya Bahan Baku / HPP
    
    -- Kalkulasi Otomatis (Tersimpan / Virtual)
    total_expense NUMERIC(15, 2) DEFAULT 0,                 -- Total Beban
    gross_margin NUMERIC(15, 2) DEFAULT 0,                  -- Margin Kotor (Omset Finance - Total Beban)
    gross_margin_percentage NUMERIC(10, 6) DEFAULT 0,       -- Margin Kotor %
    roi VARCHAR(20) DEFAULT '0.00',                         -- ROI / ROAS rasio mis. '3.07'
    notes TEXT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(brand_id, date)                                  -- 1 brand 1 entri per hari
);

-- ==============================================================================
-- 4. TABEL CASH_FLOW_LEDGER (Buku Kas & Rekonsiliasi dari sheet ANTRASIDA-ARUS KAS)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS cash_flow_ledger (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    date DATE NOT NULL,
    description VARCHAR(255) NOT NULL,                      -- Keterangan transaksi
    channel VARCHAR(150) NULL,                              -- Sumber dana / platform / channel
    account VARCHAR(150) NULL,                              -- Rekening bank / bayar lewat apa
    cash_in NUMERIC(15, 2) DEFAULT 0,                       -- Pemasukan (Debit)
    cash_out NUMERIC(15, 2) DEFAULT 0,                      -- Pengeluaran (Kredit)
    running_balance NUMERIC(15, 2) DEFAULT 0,               -- Kas Saat Ini (Running Balance)
    receipt_url TEXT NULL,                                  -- Bukti transaksi (URL gambar/pdf)
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- 5. TABEL REVENUE_WITHDRAWALS (Penarikan Dana Pendapatan dari ANTRASIDA-PENDAPATAN)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS revenue_withdrawals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    brand_id UUID REFERENCES brands(id) ON DELETE SET NULL,
    date DATE NOT NULL,
    amount NUMERIC(15, 2) NOT NULL DEFAULT 0,               -- Nominal penarikan harian
    notes TEXT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- 6. TABEL INVENTORY_EXPENDITURES (Arus Barang dari ANTRASIDA-ARUS BARANG)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS inventory_expenditures (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    brand_id UUID REFERENCES brands(id) ON DELETE SET NULL,
    date DATE NOT NULL,
    amount NUMERIC(15, 2) NOT NULL DEFAULT 0,               -- Pengeluaran arus barang
    notes TEXT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- 7. TABEL EXPENSE_BUDGETS (Anggaran vs Realisasi dari ANTRASIDA-PENGELUARAN)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS expense_budgets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    brand_id UUID REFERENCES brands(id) ON DELETE SET NULL,
    category VARCHAR(150) NOT NULL,                         -- mis. 'Pembelian Bahan Baku', 'Gaji & Upah'
    period VARCHAR(50) NOT NULL DEFAULT 'Bulan ini',        -- mis. 'Juli 2026'
    estimated_amount NUMERIC(15, 2) DEFAULT 0,              -- Perkiraan (Budget)
    realized_amount NUMERIC(15, 2) DEFAULT 0,               -- Realisasi Aktual
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- 8. TABEL ACCOUNTS_RECEIVABLE (Manajemen Piutang dari ANTRASIDA-PIUTANG)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS accounts_receivable (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    brand_id UUID REFERENCES brands(id) ON DELETE SET NULL,
    date DATE NOT NULL,
    debtor_source VARCHAR(150) NOT NULL,                    -- Sumber dana / Pihak berhutang
    amount NUMERIC(15, 2) NOT NULL DEFAULT 0,               -- Nominal piutang
    status VARCHAR(50) DEFAULT 'Pending',                   -- Pending, Lunas, Dicicil
    notes TEXT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- INDEX & PERFORMANCE OPTIMIZATION
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_daily_sales_brand_date ON daily_sales(brand_id, date);
CREATE INDEX IF NOT EXISTS idx_cash_flow_date ON cash_flow_ledger(date DESC);
CREATE INDEX IF NOT EXISTS idx_products_sku ON products(sku);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) SETUP
-- Mengaktifkan RLS serta kebijakan akses publik selama masa pengembangan / API Auth
-- ==============================================================================
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_sales ENABLE ROW LEVEL SECURITY;
ALTER TABLE cash_flow_ledger ENABLE ROW LEVEL SECURITY;
ALTER TABLE revenue_withdrawals ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_expenditures ENABLE ROW LEVEL SECURITY;
ALTER TABLE expense_budgets ENABLE ROW LEVEL SECURITY;
ALTER TABLE accounts_receivable ENABLE ROW LEVEL SECURITY;

-- Create Open Policies for Anon & Authenticated Users (Mudah diakses via Supabase Client)
CREATE POLICY "Allow all operations for anon and authenticated on brands" ON brands FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations for anon and authenticated on products" ON products FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations for anon and authenticated on daily_sales" ON daily_sales FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations for anon and authenticated on cash_flow_ledger" ON cash_flow_ledger FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations for anon and authenticated on revenue_withdrawals" ON revenue_withdrawals FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations for anon and authenticated on inventory_expenditures" ON inventory_expenditures FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations for anon and authenticated on expense_budgets" ON expense_budgets FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations for anon and authenticated on accounts_receivable" ON accounts_receivable FOR ALL USING (true) WITH CHECK (true);

-- ==============================================================================
-- SEED INITIAL BRANDS
-- ==============================================================================
INSERT INTO brands (code, name, default_admin_rate, default_processing_fee, default_shipping_rate, default_affiliate_rate, default_hpp_rate)
VALUES 
('ANTRASIDA', 'Antrasida (Fungisida & Insektisida Pertanian)', 0.1600, 1250.00, 0.0899, 0.0900, 0.1682),
('AGRODELTA', 'Agrodelta (Pupuk & Solusi Agro Nusantara)', 0.1600, 1250.00, 0.0899, 0.0900, 0.1682)
ON CONFLICT (code) DO NOTHING;
