// "use client";

// import { useEffect, useMemo, useState } from "react";
// import { useSearchParams } from "next/navigation";
// import { CalendarDays } from "lucide-react";
// import dayjs from "dayjs";
// import { Kitchen } from "@/app/types/kitchen";
// import { OrderData } from "@/app/types/order";
// import useCopyToClipboard from "@/hooks/components/useCopyToClipboard";

// export default function OrderDetailKitchen() {
//   const searchParams = useSearchParams();
//   const kitchenId = searchParams.get("kitchenId");
//   const orderId = searchParams.get("orderId");

//   const { copy, icon } = useCopyToClipboard({ iconSize: "small" });
//   const [kitchen, setKitchen] = useState<Kitchen | null>(null);
//   const [order, setOrder] = useState<OrderData | null>(null);

//   const text = useMemo(() => {
//     if (!order) return "";
//     return `${order.orderCode}`;
//   }, [order]);

//   useEffect(() => {
//     if (!kitchenId) return;

//     const fetchKitchen = async () => {
//       try {
//         const res = await fetch(`/api/kitchens/${kitchenId}`);
//         const json = await res.json();
//         if (json.success) {
//           setKitchen(json.data);
//         }
//       } catch (error) {
//         console.error("Failed to fetch kitchen data", error);
//       }
//     };

//     fetchKitchen();
//   }, [kitchenId]);

//   useEffect(() => {
//     if (!orderId) return;

//     const fetchOrder = async () => {
//       try {
//         const res = await fetch(`/api/orders/${orderId}`);
//         const json = await res.json();
//         if (json.success) {
//           setOrder(json.data);
//         }
//       } catch (error) {
//         console.error("Failed to fetch order data", error);
//       }
//     };

//     fetchOrder();
//   }, [orderId]);

//   return (
//     <div className="w-full max-w-md min-h-screen bg-neutral-100 justify-self-center">
//       <main className="px-5 pb-10 flex flex-col items-center">
//         <div className="bg-white w-full p-4 rounded-xl mt-4 shadow flex flex-col gap-2">
//           {/* Nama Dapur & Lokasi */}
//           <div className="flex justify-between items-start">
//             <div className="flex flex-col">
//               <span className="font-semibold text-lg">
//                 {kitchen?.kitchenName}
//               </span>
//               <span className="text-sm text-neutral-500">
//                 {kitchen?.location}
//               </span>
//             </div>
//           </div>

//           {/* Tanggal & Transaksi */}
//           <div className="flex items-center text-sm text-neutral-500 gap-2 mt-1">
//             <CalendarDays className="w-4 h-4" />
//             <span>
//               {dayjs(order?.createdDate).format("DD MMM YYYY hh.mmA")}
//             </span>
//             <span>•</span>
//             <span className="font-medium">{order?.orderCode}</span>
//             <button
//               onClick={() => copy(text)}
//               className="text-orange-500 hover:text-orange-600"
//             >
//               {icon}
//             </button>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

"use client";

export default function OrderDetailKitchen() {
  return (
    <div className="w-full pb-4 max-w-md justify-self-center space-y-4">
      {/* Dapur Info */}
      <div className="border border-neutral-400 rounded-lg p-3">
        <h2 className="text-base font-bold">
          Dapur Nietta&nbsp;
          <span className="text-xs font-semibold">| Blok A1</span>
        </h2>
        <p className="text-2xs mt-1">
          07 Mar 2025 03.50PM •&nbsp;
          <span className="text-2xs font-semibold">TRX000001</span>
        </p>
      </div>
    </div>
  );
}
