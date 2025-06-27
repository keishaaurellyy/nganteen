import { Suspense } from "react";
import OrderDetailPage from "./component-order-detail/order-detail";

export default function QRISPageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderDetailPage />
    </Suspense>
  );
}
