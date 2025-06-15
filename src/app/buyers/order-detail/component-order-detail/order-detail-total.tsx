"use client";

export default function OrderDetailKitchen() {
  return (
    <div className="w-full pb-4 max-w-md justify-self-center space-y-4">
      {/* Payment Details */}
      <div className="rounded-xl p-4 border border-neutral-400">
        <h3 className="font-bold text-sm mb-2">Payment Details</h3>
        <div className="flex justify-between text-base font-bold text-green-600 mt-2">
          <span>TOTAL</span>
          <span>Rp 53.000</span>
        </div>
      </div>
    </div>
  );
}
