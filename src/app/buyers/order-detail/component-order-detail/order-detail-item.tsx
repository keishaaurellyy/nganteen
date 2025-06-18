"use client";

export default function OrderDetailItem() {
  return (
    <div className="w-full pb-4 max-w-md justify-self-center space-y-4">
      {/* Item Details */}
      <div className=" rounded-lg p-3 border border-neutral-400">
        <h3 className="font-bold text-sm mb-1">Item Details</h3>
        <div className="flex justify-between items-center py-1">
          <span className="flex-1 text-sm">
            Nasi Putih
          </span>
          <span className="w-8 text-center text-sm ">x1</span>
          <span className="w-20 text-right text-sm">Rp 7.000</span>
        </div>
        <div className="flex justify-between items-center space-y-1">
          <span className="flex-1 text-sm ">
            Ayam Bakar
          </span>
          <span className="w-8 text-center text-sm ">x1</span>
          <span className="w-20 text-right text-sm ">Rp 19.000</span>
        </div>
      </div>
    </div>
  );
}
