"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Buyer } from "../types/buyer";

interface BuyerContextType {
  buyer: Buyer | null;
  setBuyer: (buyer: Buyer | null) => void;
}

const BuyerContext = createContext<BuyerContextType>({
  buyer: null,
  setBuyer: () => {},
});

export function BuyerProvider({ children }: { children: React.ReactNode }) {
  const [buyer, setBuyer] = useState<Buyer | null>(null);

  useEffect(() => {
    const buyerId = localStorage.getItem("buyer_id");
    if (!buyerId) return;

    const fetchBuyer = async () => {
      try {
        console.log("Fetching buyer with ID:", buyerId);
        const res = await fetch(`/api/buyers/${buyerId}`, { cache: "no-store" });
        const json = await res.json();
        console.log("Buyer data fetched:", json);
        if (json?.success) setBuyer(json.data);
      } catch (err) {
        console.error("Failed to fetch buyer:", err);
      }
    };

    fetchBuyer();
  }, []);

  return (
    <BuyerContext.Provider value={{ buyer, setBuyer }}>
      {children}
    </BuyerContext.Provider>
  );
}

export function useBuyer() {
  return useContext(BuyerContext);
}
