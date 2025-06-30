import OrderHistory from "@/components/buyers/order-history";
import { Suspense } from "react";

export default function QRISPageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderHistory />
    </Suspense>
  );
}
