"use client";

import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { MessageCircleX } from "lucide-react";
import { Dialog } from "@/components/input/dialog";
import { OrderStatus } from "@/app/types/order";

export default function OrderDetailEventHandler() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [showDialog, setShowDialog] = useState(false);
  const hasCheckedRef = useRef(false);

  const handleConfirmDialog = () => {
    setShowDialog(false);
    router.push("/buyers/profile?from=cancelled");
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
    router.replace("/buyers/order-history?from=cancelled");
  };

  useEffect(() => {
    if (
      status !== "authenticated" ||
      !session?.user?.id ||
      hasCheckedRef.current
    )
      return;

    hasCheckedRef.current = true;

    const checkLatestOrder = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 300));

        const res = await fetch(
          `/api/orders/active?buyerId=${session.user.id}`
        );
        const result = await res.json();
        const order = Array.isArray(result?.data)
          ? result.data[0]
          : result.data;

        if (!order || typeof order !== "object" || !("status" in order)) return;

        switch (order.status) {
          case OrderStatus.CANCELLED:
            setShowDialog(true);
            break;
          case OrderStatus.COOKING:
            router.replace(`/buyers/order-detail?orderId=${order.orderId}`);
            break;
          default:
            break;
        }
      } catch (err) {
        console.error("Failed to check order:", err);
      }
    };

    checkLatestOrder();
  }, [status, session, router]);

  return (
    <>
      {showDialog && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
          <Dialog
            icon={<MessageCircleX />}
            color="error"
            size="medium"
            title="Kitchen Cancelled Order"
            description={`We’re sorry—the kitchen couldn’t fulfill your order.\nTo request a refund, please fill in your account details on the profile page 👇`}
            buttonLabel="Fill Account Detail"
            onConfirm={handleConfirmDialog}
            onClose={handleCloseDialog}
          />
        </div>
      )}
    </>
  );
}
