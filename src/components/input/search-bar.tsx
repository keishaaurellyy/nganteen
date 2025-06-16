"use client";

import { useState } from "react";
import { TextField } from "./text-field";
import { SearchIcon } from "lucide-react";

interface SearchBarProps {
  data: any[];
  keyword: keyof any;
  onFilter: (filtered: any[]) => void;
  placeholder?: string;
}

export default function SearchBar({
  data,
  keyword,
  onFilter,
  placeholder = "Search",
}: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    const filtered = data.filter((item) =>
      String(item[keyword]).toLowerCase().includes(value.toLowerCase())
    );

    onFilter(filtered);
  };

  return (
    <TextField
      type="text"
      className="w-full rounded-md bg-neutral-200 px-4 py-2 text-sm"
      placeholder={placeholder}
      value={query}
      onChange={handleChange}
      endAdornment={<SearchIcon className="w-4 h-4 text-neutral-600" />}
    />
  );
}
