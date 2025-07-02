import OrderHistory from "@/components/buyers/order-history";
import { Suspense } from "react";

export default function OrderHistoryPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderHistory />
    </Suspense>
  );
}
