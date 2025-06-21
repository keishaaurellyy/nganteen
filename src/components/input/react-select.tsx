"use client";

import Select from "react-select";
import { useEffect, useState } from "react";

type Option = {
  value: string;
  label: string;
};

type Props = {
  value: Option | null;
  onChange: (val: Option | null) => void;
  options: Option[];
  placeholder?: string;
};

export default function ReactSelect({
  value,
  onChange,
  options,
  placeholder,
}: Props) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  if (!isReady) return null;

  return (
    <Select
      value={value}
      onChange={onChange}
      options={options}
      placeholder={placeholder}
    />
  );
}
