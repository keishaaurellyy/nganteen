"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function useRouterReady() {
  const router = useRouter();
  const [isRouterReady, setIsRouterReady] = useState(false);

  useEffect(() => {
    setIsRouterReady(true);
  }, []);

  return {
    router,
    isRouterReady,
  };
}
