import { Button } from "@/components/input/button";
import { cn } from "@/config";
import { useState } from "react";
import { Dialog } from "../input/dialog";
import { MessageCircleQuestion, X } from "lucide-react";

interface OrderItem {
  name: string;
  qty: number;
  price: number;
}

interface OrderCardProps {
  type: "incoming" | "confirmed";
  orderId: string;
  buyerName: string;
  date: string;
  time: string;
  items: OrderItem[];
  notes?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export function OrderCard({
  type,
  orderId,
  buyerName,
  date,
  time,
  items,
  notes,
  onConfirm,
  onCancel,
}: OrderCardProps) {
  const [showDialog, setShowDialog] = useState(false);

  const totalQty = items.reduce((acc, item) => acc + item.qty, 0);
  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  return (
    <div className="rounded-xl border border-neutral-400 mb-5">
      <div
        className={cn(
          "px-3 py-2 m-3 text-sm rounded-md font-bold",
          type === "incoming"
            ? "bg-primary-100 text-neutral-900"
            : "bg-tertiary-100 text-neutral-900"
        )}
      >
        <div>{buyerName}</div>
        <div className="text-xs font-normal">
          {orderId} · {date} · {time}
        </div>
      </div>

      <div className="px-3 pb-3 text-sm">
        <ul className="text-sm font-semibold text-neutral-900 divide-y divide-neutral-200">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-center p-1">
              <span className="flex-1 truncate">{item.name}</span>
              <span className="w-10 text-center">x{item.qty}</span>
              <span className="w-24 text-right ">
                Rp {(item.price * item.qty).toLocaleString("id-ID")}
              </span>
            </li>
          ))}
        </ul>

        {notes && (
          <div className="my-2 text-sm border border-neutral-400 rounded-lg p-2">
            <div className="flex flex-col gap-1">
              <p className="font-bold">Order Notes</p>
              <p className="text-xs">{notes}</p>
            </div>
          </div>
        )}

        <hr className="border-dashed border-neutral-300" />

        <ul className="flex items-center font-extrabold text-sm pt-2 px-1">
          <li className="flex-1">TOTAL</li>
          <li className="w-10 text-center">x{totalQty}</li>
          <li className="w-24 text-right text-tertiary-600">
            Rp {totalPrice.toLocaleString("id-ID")}
          </li>
        </ul>

        {type === "incoming" && (
          <div className="flex justify-between gap-2 pt-2">
            <Button
              iconOnly
              variant="solid"
              color="error"
              leftIcon={<X />}
              size="small"
              onClick={() => setShowDialog(true)}
            />
            <Button
              className="flex-1 max-w-xs"
              onClick={onConfirm}
            >
              Confirm
            </Button>

            {showDialog && (
              <Dialog
                icon={<MessageCircleQuestion />}
                color="error"
                size="medium"
                title="Are you sure want to cancel?"
                description="Once you have cancelled the order, you cannot undo this action"
                buttonLabel="Cancel Order"
                onConfirm={() => {
                  onCancel?.();
                  setShowDialog(false);
                }}
                onClose={() => setShowDialog(false)}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
