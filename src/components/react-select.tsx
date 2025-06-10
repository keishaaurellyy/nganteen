"use client";

import Select from "react-select";

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
  return (
    <Select
      value={value}
      onChange={onChange}
      options={options}
      placeholder={placeholder}
    />
  );
}
