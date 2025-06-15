"use client";

export default function OrderDetailItem() {
  return (
    <div className="w-full pb-4 max-w-md justify-self-center space-y-4">
      {/* Item Details */}
      <div className=" rounded-lg p-3 border border-neutral-400">
        <h3 className="font-bold text-sm">Item Details</h3>
        <div className="flex justify-between items-center py-2 space-y-1">
          <span className="flex-1 text-sm font-bold">
            Ayam Geprek Mozarella
          </span>
          <span className="w-8 text-center text-xs font-bold">x2</span>
          <span className="w-20 text-right text-sm font-bold">Rp 12.000</span>
        </div>
        <div className="flex justify-between items-center space-y-1">
          <span className="flex-1 text-sm font-bold">
            Ayam Geprek Mozarella
          </span>
          <span className="w-8 text-center text-xs font-bold">x2</span>
          <span className="w-20 text-right text-sm font-bold">Rp 12.000</span>
        </div>
      </div>
    </div>
  );
}
