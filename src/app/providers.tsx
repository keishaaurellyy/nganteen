"use client";

import { BuyerProvider } from "./context/buyer-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return <BuyerProvider>{children}</BuyerProvider>;
}
