"use client";

import { MessageCircleQuestion, MinusCircle, PlusCircle } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/input/button";
import { Header } from "@/components/input/header";
import Image from "next/image";
import { Dialog } from "@/components/input/dialog";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export default function OrderPage() {
  const router = useRouter(); // ← pakai router
  const [showDialog, setShowDialog] = useState(false);

  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "nasiPutih",
      name: "Nasi Putih",
      price: 7000,
      quantity: 1,
    },
    {
      id: "ayamBakar",
      name: "Ayam Bakar",
      price: 19000,
      quantity: 1,
    },
  ]);
  const [notes, setNotes] = useState("");

  const handleChangeQty = (id: string, change: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      )
    );
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="relative w-full max-w-md min-h-screen justify-self-center">
      {/* Header */}
      <Header leftIcon variant="logo" rightIcon="sidebar" />

      {/* Dialog Overlay */}
      {showDialog && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
          <Dialog
            icon={<MessageCircleQuestion />}
            color="success"
            size="medium"
            title="Order Confirmation"
            description="Are you sure you want to proceed your order?"
            buttonLabel="Process Order"
            onConfirm={() => {
              setShowDialog(false);
              router.push("/buyers/QRIS"); // ← redirect ke halaman QRIS
            }}
            onClose={() => setShowDialog(false)}
          />
        </div>
      )}

      {/* Main Content */}
      <main className="w-full bg-neutral-100 px-5 pt-5 flex flex-col items-center space-y-4">
        {/* Collect Method */}
        <section className="text-sm w-full border rounded-lg border-neutral-400 p-4">
          <p className="font-bold mb-2">Collect Method</p>
          <div className="flex items-center justify-between gap-2">
            <p>Get your order by</p>
            <p className="text-right font-bold">Self pickup</p>
          </div>
        </section>

        {/* Order Section */}
        <section className="w-full text-sm border rounded-lg p-4 space-y-2 border-neutral-400">
          <p className="font-bold mb-1">Order</p>
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between items-center">
              <div>
                <p>{item.name}</p>
                <p className="text-tertiary-600">
                  Rp {item.price.toLocaleString("id-ID")}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <MinusCircle
                  size={24}
                  className={`${
                    item.quantity > 0
                      ? "text-primary-500 cursor-pointer"
                      : "text-neutral-500"
                  }`}
                  onClick={() => handleChangeQty(item.id, -1)}
                />
                <span>{item.quantity}</span>
                <PlusCircle
                  size={24}
                  className="text-primary-500 cursor-pointer"
                  onClick={() => handleChangeQty(item.id, 1)}
                />
              </div>
            </div>
          ))}
        </section>

        {/* Notes */}
        <section className="w-full mx-4 mb-4">
          <input
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Notes"
            className="w-full border rounded-lg border-neutral-400 px-3 py-2 text-sm"
          />
        </section>

        {/* Payment */}
        <section className="text-sm w-full border rounded-lg border-neutral-400 p-4">
          <p className="font-bold mb-2">Payment</p>
          <div className="flex justify-between items-center">
            <p>Payment Method</p>
            <Image
              src="/images/qris-logo.svg"
              alt="QRIS"
              width={40}
              height={40}
            />
          </div>
          <div className="flex justify-between items-center mt-2">
            <p className="font-bold">Total Payment</p>
            <p className="text-tertiary-600 font-bold">
              Rp {totalPrice.toLocaleString("id-ID")}
            </p>
          </div>
        </section>

        {/* Order Button */}
        <div className="fixed bottom-4 left-4 right-4">
          <Button
            variant="solid"
            color="primary"
            size="large"
            className="w-full"
            onClick={() => setShowDialog(true)}
          >
            Order
          </Button>
        </div>
      </main>
    </div>
  );
}
