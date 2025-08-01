"use client";

import { Buyer } from "@/app/types/buyer";
import { OrderData } from "@/app/types/order";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Show from "../input/show";
import { ChevronRightIcon, CookingPotIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function OrderDetailEntryPoint() {
  const { data: session } = useSession();
  const [buyer, setBuyer] = useState<Buyer | null>(null);
  const [ongoingOrder, setOngoingOrder] = useState<OrderData | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchBuyer = async () => {
      const buyerId = session?.user?.buyer_id;

      if (!buyerId) {
        console.warn("No buyer_id found in session");
        return;
      }

      try {
        const res = await fetch(`/api/buyers/${buyerId}`, {
          cache: "no-store",
        });
        const data = await res.json();
        if (data?.success) {
          setBuyer(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch buyer:", error);
      }
    };

    const fetchOngoingOrder = async () => {
      const buyerId = session?.user?.buyer_id;

      if (!buyerId) return;

      try {
        const res = await fetch(
          `/api/buyers/${buyerId}/orders?status=COOKING`,
          { cache: "no-store" }
        );

        const result = await res.json();
        if (result.success && result.data.length > 0) {
          setOngoingOrder(result.data[0]);
        }
      } catch (err) {
        console.error("Error fetching last order:", err);
      }
    };

    if (session?.user?.role === "buyer") {
      fetchBuyer();
      fetchOngoingOrder();
    }
  }, [session]);

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 w-full max-w-md px-5 z-50">
      <Show when={!!ongoingOrder && !!buyer}>
        <button
          className="bg-primary-100 w-full border-primary-500 rounded-lg p-3 flex items-center gap-3 border"
          onClick={() =>
            router.push(`/buyers/order-detail?orderId=${ongoingOrder?.orderId}`)
          }
        >
          <div className="flex w-full flex-row justify-between items-center">
            <div className="flex items-center gap-4">
              <CookingPotIcon className="bg-primary-500 rounded-xl p-3 w-10 h-10 text-neutral-100" />
              <div className="flex flex-col items-start">
                <p className="text-neutral-800 text-xs font-normal text-left">
                  Order #{ongoingOrder?.orderCode} is being processed
                </p>
                <p className="font-bold text-sm text-left text-neutral-800">
                  {ongoingOrder?.items.map((item) => item.itemName).join(", ")}
                </p>
              </div>
            </div>
            <ChevronRightIcon />
          </div>
        </button>
      </Show>
    </div>
  );
}
