import QRISPage from "@/components/buyers/qris-page";
import { Suspense } from "react";

export default function QRISPageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <QRISPage />
    </Suspense>
  );
}
