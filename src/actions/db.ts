"use server";

import prisma from "@/lib/prisma";

export async function fetchAllData() {
  const salesData = await prisma.dailySale.findMany({ orderBy: { date: 'asc' } });
  const prodData = await prisma.product.findMany({ orderBy: { sku: 'asc' } });
  const cfData = await prisma.cashFlowItem.findMany({ orderBy: { date: 'asc' } });
  
  return { salesData, prodData, cfData };
}

export async function insertDailySale(data: any) {
  return await prisma.dailySale.create({ data });
}

export async function updateDailySaleRecord(id: string, data: any) {
  return await prisma.dailySale.update({ where: { id }, data });
}

export async function deleteDailySaleRecord(id: string) {
  return await prisma.dailySale.delete({ where: { id } });
}

export async function insertProduct(data: any) {
  return await prisma.product.create({ data });
}

export async function updateProductRecord(id: string, data: any) {
  return await prisma.product.update({ where: { id }, data });
}

export async function deleteProductRecord(id: string) {
  return await prisma.product.delete({ where: { id } });
}

export async function insertCashFlow(data: any) {
  return await prisma.cashFlowItem.create({ data });
}

export async function deleteCashFlowRecord(id: string) {
  return await prisma.cashFlowItem.delete({ where: { id } });
}
