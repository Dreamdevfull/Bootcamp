"use client"
import React, { useEffect } from 'react'
import HeaderReseller from '@/app/components/layout/headerReseller'
import CardWallet from '@/app/components/cradcatalogreseller/cardwallet'
import { Wallet as WalletType } from '@/app/types/model';
import { WalletColumn as Column } from '@/app/components/columnsreseller/wallet';
import { DataTable } from '@/app/components/ui/datatable';

const WalletLogPage = () => {
  const [wallet, setWallet] = React.useState<WalletType | null>(null);
  const [history, setHistory] = React.useState<WalletType["history"]>([]);
  const [loading, setLoading] = React.useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API_URL}/reseller/wallet`, {
          credentials: "include",
        });
        const result = await res.json();
        setWallet(result.data);
        setHistory(
          (result.data?.history ?? []).sort(
            (a: WalletType["history"][number], b: WalletType["history"][number]) =>
              new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          )
        );
      } catch {
        setWallet(null);
        setHistory([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-[#F5F3EE] dark:bg-[#1a1a18]">
      <HeaderReseller />
      {/* <h1 className='mx-7.5 mt-5 text-4xl font-bold text-[#0d3d30]'>กระเป๋าเงินร้านค้าของคุณ</h1> */}
      <h1 className="mx-4 sm:mx-7.5 mt-5 text-2xl sm:text-3xl md:text-4xl font-bold text-[#0d3d30] dark:text-emerald-400 transition-all">
        กระเป๋าเงินร้านค้าของคุณ
      </h1>
      <CardWallet data={wallet} loading={loading} />
      <div className='px-8 py-1 mt-5'>
        <DataTable columns={Column} data={history} loading={loading} />
      </div>
    </div>
  )
}

export default WalletLogPage