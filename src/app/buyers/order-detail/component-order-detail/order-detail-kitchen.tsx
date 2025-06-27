"use client";

import { OrderData } from "@/app/types/order";
import useCopyToClipboard from "@/hooks/components/useCopyToClipboard";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

export default function OrderDetailKitchen({
  orderId,
}: {
  orderId: string | null;
}) {
  // const router = useRouter();
  // const [showDialog, setShowDialog] = useState(false);

  // const handleConfirm = () => {
  //   setShowDialog(false);
  //   router.push("/buyers/profile/account");
  // };

  const [order, setOrder] = useState<OrderData | null>(null);
  useEffect(() => {
    if (!orderId) return;

    const fetchOrder = async () => {
      const res = await fetch(`/api/orders/${orderId}`);
      if (!res.ok) return;
      const resData = await res.json();
      setOrder(resData.data.order);
    };

    fetchOrder();
  }, [orderId]);

  const [kitchenName, setKitchenName] = useState("");
  const [kitchenLocation, setKitchenLocation] = useState("");

  useEffect(() => {
    if (!order?.kitchenId) return;

    const fetchKitchen = async () => {
      const res = await fetch(`/api/kitchens/${order.kitchenId}`);
      if (!res.ok) return;
      const data = await res.json();
      setKitchenName(data.data.kitchenName);
      setKitchenLocation(data.data.location);
    };

    fetchKitchen();
  }, [order?.kitchenId]);

  const { copy, icon } = useCopyToClipboard({ iconSize: "small" });
  const text = order?.orderCode;

  return (
    <div className="w-full pb-4 max-w-md justify-self-center space-y-4">
      <div className="border border-neutral-400 rounded-lg p-3">
        <h2 className="text-base font-bold">
          {kitchenName}&nbsp;
          <span className="text-xs font-semibold">
            |&nbsp;Blok&nbsp;{kitchenLocation}
          </span>
        </h2>
        <div className="flex flex-row items-center mt-1 gap-1">
          <p className="text-xs">
            {dayjs(order?.createdDate).format("DD MMM YYYY HH.mm A")}
          </p>
          <p className="text-xs font-semibold text-neutral-800">•</p>
          <p className="text-xs font-semibold text-neutral-800">{text}</p>
          <p className="items-center">
            <button
              className="text-secondary-500 mt-1"
              onClick={() => copy(text ?? "")}
            >
              {icon}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
