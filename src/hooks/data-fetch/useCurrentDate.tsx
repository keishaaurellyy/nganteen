"use client";

import { useEffect, useState } from "react";

export default function useCurrentDate() {
  const [date, setDate] = useState<Date | null>(null);

  useEffect(() => {
    setDate(new Date());
  }, []);

  return date;
}
