"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MessageCircleQuestion, MinusCircle, PlusCircle } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/input/button";
import { Header } from "@/components/input/header";
import { Dialog } from "@/components/input/dialog";
import { createOrder } from "../mutations/order";
import { useSession } from "next-auth/react";

interface CartItem {
  item_id: number;
  item_name: string;
  item_price: number;
  item_qty: number;
  total_item_price: number;
}

interface CartPreview {
  kitchen_id: number;
  items: CartItem[];
  notes?: string;
}

export default function PreviewOrderPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [showDialog, setShowDialog] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [notes, setNotes] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  const handleConfirmOrder = async () => {
    const raw = localStorage.getItem("cartPreview");
    if (!raw) return;

    try {
      const parsed = JSON.parse(raw);
      const buyerId = session?.user?.id;
      if (!buyerId) throw new Error("No buyer session found");

      const payload = {
        kitchen_id: parsed.kitchen_id,
        items: parsed.items,
        notes: parsed.notes,
        total_payment: parsed.items.reduce(
          (sum: number, item: CartItem) => sum + item.total_item_price,
          0
        ),
      };

      const data = await createOrder(Number(buyerId), payload);

      localStorage.removeItem("cartPreview");
      router.push(`/buyers/QRIS?orderId=${data.orderId}`);
    } catch (err) {
      console.error(err);
      alert("Failed to process order");
    }
  };

  useEffect(() => {
    const raw = localStorage.getItem("cartPreview");
    if (!raw) return;

    try {
      const parsed: CartPreview = JSON.parse(raw);
      setCartItems(parsed.items);
      setNotes(parsed.notes ?? "");

      const total = parsed.items.reduce(
        (sum, item) => sum + item.total_item_price,
        0
      );
      setTotalPrice(total);
    } catch (err) {
      console.error("Failed to parse cartPreview", err);
    }
  }, []);

  const handleChangeQty = (itemId: number, change: number) => {
    setCartItems((prev) => {
      const updated = prev.map((item) =>
        item.item_id === itemId
          ? {
              ...item,
              item_qty: Math.max(0, item.item_qty + change),
              total_item_price:
                Math.max(0, item.item_qty + change) * item.item_price,
            }
          : item
      );

      const newTotal = updated.reduce((sum, i) => sum + i.total_item_price, 0);
      setTotalPrice(newTotal);

      const stored = localStorage.getItem("cartPreview");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          parsed.items = updated;
          parsed.notes = notes;
          localStorage.setItem("cartPreview", JSON.stringify(parsed));
        } catch (err) {
          console.error("Failed to update cartPreview", err);
        }
      }

      return updated;
    });
  };

  useEffect(() => {
    const raw = localStorage.getItem("cartPreview");
    if (!raw) return;

    try {
      const parsed = JSON.parse(raw);
      parsed.notes = notes;
      localStorage.setItem("cartPreview", JSON.stringify(parsed));
    } catch (err) {
      console.error("Failed to update notes in cartPreview", err);
    }
  }, [notes]);

  return (
    <div className="relative w-full max-w-md min-h-screen justify-self-center">
      <Header leftIcon variant="logo" rightIcon="sidebar" />

      {showDialog && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
          <Dialog
            icon={<MessageCircleQuestion />}
            color="success"
            size="medium"
            title="Order Confirmation"
            description="Are you sure you want to proceed your order?"
            buttonLabel="Process Order"
            onConfirm={handleConfirmOrder}
            onClose={() => setShowDialog(false)}
          />
        </div>
      )}

      <main className="w-full bg-neutral-100 px-5 pt-5 flex flex-col items-center space-y-4">
        <section className="text-sm w-full border rounded-lg border-neutral-400 p-4">
          <p className="font-bold mb-2">Collect Method</p>
          <div className="flex items-center justify-between gap-2">
            <p>Get your order by</p>
            <p className="text-right font-bold">Self pickup</p>
          </div>
        </section>

        <section className="w-full text-sm border rounded-lg p-4 space-y-2 border-neutral-400">
          <p className="font-bold mb-1">Order</p>
          {cartItems.map((item) => (
            <div
              key={item.item_id}
              className="flex justify-between items-center"
            >
              <div>
                <p>{item.item_name}</p>
                <p className="text-tertiary-600">
                  Rp {item.item_price.toLocaleString("id-ID")}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <MinusCircle
                  size={24}
                  className={`${
                    item.item_qty > 0
                      ? "text-primary-500 cursor-pointer"
                      : "text-neutral-500"
                  }`}
                  onClick={() => handleChangeQty(item.item_id, -1)}
                />
                <span>{item.item_qty}</span>
                <PlusCircle
                  size={24}
                  className="text-primary-500 cursor-pointer"
                  onClick={() => handleChangeQty(item.item_id, 1)}
                />
              </div>
            </div>
          ))}
        </section>

        <section className="w-full mx-4 mb-4">
          <input
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Notes"
            className="w-full border rounded-lg border-neutral-400 px-3 py-2 text-sm"
          />
        </section>

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

        <div className="fixed bottom-4 w-full max-w-md px-4">
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
