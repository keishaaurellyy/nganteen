import OrdersPage from "@/components/kitchens/order-page";
import { Suspense } from "react";

export default function QRISPageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrdersPage />
    </Suspense>
  );
}
