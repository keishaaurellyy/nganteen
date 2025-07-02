"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { MessageCircleQuestion, MinusCircle, PlusCircle } from "lucide-react";
import Image from "next/image";
import { useSession } from "next-auth/react";

import { Button } from "@/components/input/button";
import { Header } from "@/components/input/header";
import { Dialog } from "@/components/input/dialog";
import { createOrder } from "../mutations/order";
import { useCartStore } from "@/components/buyers/store/use-cart-store";

export default function PreviewOrderPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const cartItems = useCartStore((state) => state.cartItems);
  const quantities = useCartStore((state) => state.quantities);
  const updateItemQuantity = useCartStore((state) => state.updateItemQuantity);
  const clearCart = useCartStore((state) => state.clearCart);

  const totalPrice = useMemo(() => {
    return cartItems.reduce((sum, item) => {
      const qty = quantities[item.itemId] || 0;
      return sum + qty * item.itemPrice;
    }, 0);
  }, [cartItems, quantities]);

  useEffect(() => {
    if (cartItems.length === 0) {
      localStorage.removeItem("cartPreview");
      return;
    }

    const orderPayload = cartItems.map((item) => {
      const qty = quantities[item.itemId] || 0;
      return {
        item_id: item.itemId,
        item_name: item.itemName,
        item_price: item.itemPrice,
        item_qty: qty,
        total_item_price: qty * item.itemPrice,
      };
    });

    const payload = {
      kitchen_id: cartItems[0]?.kitchenId ?? 0,
      items: orderPayload,
      notes,
    };

    localStorage.setItem("cartPreview", JSON.stringify(payload));
  }, [cartItems, quantities, notes]);

  const handleConfirmOrder = async () => {
    try {
      const buyerId = session?.user?.id;
      if (!buyerId) throw new Error("No buyer session found");

      const payload = {
        kitchen_id: cartItems[0]?.kitchenId,
        items: cartItems.map((item) => ({
          item_id: item.itemId,
          item_name: item.itemName,
          item_price: item.itemPrice,
          item_qty: quantities[item.itemId] || 0,
          total_item_price: (quantities[item.itemId] || 0) * item.itemPrice,
        })),
        notes,
        total_payment: totalPrice,
      };

      const data = await createOrder(Number(buyerId), payload);
      clearCart();
      localStorage.removeItem("cartPreview");
      router.push(`/buyers/QRIS?orderId=${data.orderId}`);
    } catch (err) {
      console.error(err);
      alert("Failed to process order");
    }
  };

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
            isLoading={loading}
            disableCloseOnConfirm
            onConfirm={async () => {
              setLoading(true);
              await handleConfirmOrder();
              setLoading(false);
            }}
            onClose={() => setShowDialog(false)}
          />
        </div>
      )}

      <main className="w-full flex-1 overflow-y-auto overflow-x-hidden bg-neutral-100 px-5 pt-5 flex flex-col items-center space-y-4">
        <section className="text-sm w-full border rounded-lg border-neutral-400 p-4">
          <p className="font-bold mb-2">Collect Method</p>
          <div className="flex items-center justify-between gap-2">
            <p>Get your order by</p>
            <p className="text-right font-bold">Self pickup</p>
          </div>
        </section>

        <section className="w-full text-sm border rounded-lg p-4 space-y-2 border-neutral-400">
          <p className="font-bold mb-1">Order</p>
          {cartItems.map((item) => {
            const qty = quantities[item.itemId] || 0;
            return (
              <div
                key={item.itemId}
                className="flex justify-between items-center"
              >
                <div>
                  <p>{item.itemName}</p>
                  <p className="text-tertiary-600">
                    Rp {item.itemPrice.toLocaleString("id-ID")}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <MinusCircle
                    size={24}
                    className={`${
                      qty > 0
                        ? "text-primary-500 cursor-pointer"
                        : "text-neutral-500"
                    }`}
                    onClick={() => updateItemQuantity(item, -1)}
                  />
                  <span>{qty}</span>
                  <PlusCircle
                    size={24}
                    className="text-primary-500 cursor-pointer"
                    onClick={() => updateItemQuantity(item, 1)}
                  />
                </div>
              </div>
            );
          })}
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
        <div className="h-20" />
      </main>

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
    </div>
  );
}
