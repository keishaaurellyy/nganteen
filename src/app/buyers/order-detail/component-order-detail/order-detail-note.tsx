"use client";

export default function OrderDetailNote() {
  return (
    <div className="w-full pb-4 max-w-md justify-self-center space-y-4">
      {/* Order Notes */}
      <div className="rounded-xl p-4 border border-neutral-400">
        <h3 className="font-bold text-sm mb-2">Order Notes</h3>
        <p className="text-xs font-semibold text-neutral-800">
          Mau sambel yang banyak, sambelnya dipisah saja, tidak pakai timun.
          Terimakasih, ya!
        </p>
      </div>

      {/* Payment Details */}
      <div className="rounded-xl p-4 border border-neutral-400">
        <h3 className="font-bold text-sm mb-2">Payment Details</h3>
        <div className="flex justify-between text-base font-bold text-green-600 mt-2">
          <span>TOTAL</span>
          <span>Rp 24.000</span>
        </div>
      </div>
    </div>
  );
}
