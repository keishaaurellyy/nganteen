"use client";

import { useState } from "react";
import { Header } from "@/components/input/header";
import AlertBox from "@/components/input/alert-box";
import { OrdersTab } from "@/components/kitchens/order-tab";
import { OrderCard } from "@/components/kitchens/order-card";

type OrderType = "incoming" | "confirmed";

interface OrderItem {
  name: string;
  qty: number;
  price: number;
}

interface Order {
  id: string;
  buyer: string;
  date: string;
  time: string;
  type: OrderType;
  items: OrderItem[];
  notes?: string;
}

// 2. Component
export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState<OrderType>("incoming");

  const [orders, setOrders] = useState<Order[]>([
    {
      id: "TRX001",
      buyer: "Gorgeous Blud",
      date: "25 Aug 2024",
      time: "09:00 AM",
      type: "incoming",
      items: [
        { name: "Nasi Goreng Gila", qty: 1, price: 25000 },
        { name: "Kerupuk", qty: 2, price: 5000 },
        { name: "Air", qty: 1, price: 7000 },
      ],
      notes:
        "Mau sambel yang banyak, sambelnya dipisah saja, tidak pakai timun. Terimakasih, ya!",
    },
    {
      id: "TRX002",
      buyer: "Charming Man",
      date: "26 Aug 2024",
      time: "10:30 AM",
      type: "confirmed",
      items: [
        { name: "Mie Ayam Bakso", qty: 2, price: 26000 },
        { name: "Es Teh Manis", qty: 3, price: 5000 },
      ],
    },
  ]);

  const handleConfirm = (id: string) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, type: "confirmed" } : order
      )
    );
  };

  const handleCancel = (id: string) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, type: "confirmed" } : order
      )
    );
  };

  const filteredOrders = orders.filter((o) => o.type === activeTab);

  return (
    <div className="w-full min-h-screen max-w-md justify-self-center">
      <Header leftIcon variant="logo" />
      <main className="bg-neutral-100 px-5 pt-4 pb-10 flex flex-col items-center space-y-5">
        <OrdersTab activeTab={activeTab} setActiveTab={setActiveTab} />

        <AlertBox
          title="Warning!"
          description={
            activeTab === "incoming"
              ? "Please check if customer has paid then click the 'Confirm' button and start cooking the order."
              : "This order can no longer be canceled. The Buyer will collect the item within 5-10 minutes."
          }
        />

        <div className="w-full">
          {filteredOrders.map((order) => (
            <OrderCard
              key={order.id}
              type={order.type}
              orderId={order.id}
              buyerName={order.buyer}
              date={order.date}
              time={order.time}
              items={order.items}
              notes={order.notes}
              onConfirm={() => handleConfirm(order.id)}
              onCancel={() => handleCancel(order.id)}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
