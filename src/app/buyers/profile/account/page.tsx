import RegisterAccountPage from "@/components/buyers/account-form";
import { Suspense } from "react";

export default function AccountPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RegisterAccountPage />
    </Suspense>
  );
}
