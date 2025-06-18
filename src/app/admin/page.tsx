"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Kitchen } from "../types/kitchen";
import KitchenTable from "@/components/admin/kitchen-table";
import { Header } from "@/components/input/header";
import { Button } from "@/components/input/button";
import { getAllAccounts } from "../accounts/mutation/view";
import { Account } from "../types/account";
import AccountTable from "@/components/admin/account-table";
import { OrderData, OrderStatus } from "../types/order";
import { getAllOrders } from "./mutation/view";
import OrderTable from "@/components/admin/order-table";

export default function AdminHomePage() {
  const router = useRouter();
  const [kitchens, setKitchens] = useState<Kitchen[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [, setError] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const [orders, setOrders] = useState<OrderData[]>([]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const fetchKitchens = async () => {
      try {
        const res = await fetch("/api/kitchens");
        const data = await res.json();

        if (data.success) {
          setKitchens(data.data);
        } else {
          setError(data.error || "Failed to fetch data");
        }
      } catch (err) {
        console.log(err);
        setError("Server error while fetching kitchens");
      }
    };

    fetchKitchens();
  }, []);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const data = await getAllAccounts();
        setAccounts(data);
      } catch (err: any) {
        setError("Failed to fetch accounts");
        console.error(err);
      }
    };

    fetchAccounts();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getAllOrders();
        setOrders(data);
      } catch (err: any) {
        setError("Failed to fetch orders");
        console.error(err);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen w-full max-w-md justify-self-center">
      {/* Header */}
      <Header
        leftIcon={false}
        variant="logo"
        rightIcon="logout"
        onRightIconClick={() => signOut({ callbackUrl: "/" })}
      />

      <main className="space-y-4 px-5 pt-4 pb-10 flex flex-col">
        {/* Tabel Kitchen */}
        <section className="pt-3 space-y-4">
          <h1 className="text-lg font-bold text-neutral-700">Kitchen</h1>
          {isMounted && <KitchenTable kitchens={kitchens} />}
        </section>

        {/* Tabel Rekening */}
        <section className="pt-3 space-y-4"></section>
        {/* Button Create Kitchen */}
        <Button
          className="w-full"
          color="tertiary"
          onClick={() => router.push("/admin/create-kitchen")}
        >
          Create Kitchen
        </Button>

        {/* Tabel No Rekening  Buyers*/}
        <section className="pt-3 space-y-4">
          <h1 className="text-lg font-bold text-neutral-700">Accounts</h1>
          {isMounted && <AccountTable accounts={accounts} />}
        </section>

        <section className="pt-3 space-y-4">
          <h1 className="text-lg font-bold text-neutral-700">
            Cancelled Orders
          </h1>
          {isMounted && (
            <OrderTable
              orders={orders.filter(
                (order) => order.status === OrderStatus.CANCELLED
              )}
            />
          )}
        </section>
      </main>
    </div>
  );
}
