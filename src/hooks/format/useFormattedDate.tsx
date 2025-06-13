"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns/format";

export default function useFormattedDate({
  date,
  format: dateFormat,
}: {
  date: string;
  format: string;
}) {
  const [formattedDate, setFormattedDate] = useState<string>("");

  useEffect(
    () => setFormattedDate(format(new Date(date), dateFormat)),
    [date, dateFormat]
  );

  return formattedDate;
}
