import RegisterAccountPage from "@/components/buyers/account-form";
import { Header } from "@/components/input/header";
import { Suspense } from "react";
import Spinner from "@/components/input/spinner";

export default function AccountPage() {
  return (
    <div className="min-h-screen w-full max-w-md justify-self-center">
      {/* Header */}
      <Header leftIcon rightIcon="none">
        Account Detail
      </Header>

      <main className="bg-neutral-100 px-5 pb-10 flex flex-col items-center">
        {/* Form */}
        <Suspense fallback={<Spinner size="extraLarge"/>}>
          <RegisterAccountPage />
        </Suspense>
      </main>
    </div>
  );
}
