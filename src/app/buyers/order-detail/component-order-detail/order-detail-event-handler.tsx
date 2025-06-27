"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { MessageCircleX } from "lucide-react";
import { Dialog } from "@/components/input/dialog";

export default function OrderDetailEventHandler() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [hasChecked, setHasChecked] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const handleConfirm = () => {
    setShowDialog(false);
    router.push("/buyers/profile");
  };

  useEffect(() => {
    if (status !== "authenticated" || hasChecked) return;

    const checkActiveOrder = async () => {
      const buyerId = session?.user?.id;
      if (!buyerId) return;

      try {
        await new Promise((resolve) => setTimeout(resolve, 300));

        const res = await fetch(
          `/api/orders/active?buyerId=${buyerId}&status=COOKING`
        );
        const result = await res.json();

        if (result.success && result.data.length > 0) {
          const order = result.data[0];

          switch (order.status) {
            case "COOKING":
              router.replace(`/buyers/order-detail?orderId=${order.orderId}`);
              break;
            case "CANCELLED":
              setShowDialog(true);
              break;
            default:
              break;
          }
        }

        setHasChecked(true);
      } catch (err) {
        console.error("Failed to check order:", err);
      }
    };

    checkActiveOrder();
  }, [status, session, hasChecked, router]);

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
            onConfirm={handleConfirm}
            onClose={() => setShowDialog(false)}
          />
        </div>
      )}
    </>
  );
}
