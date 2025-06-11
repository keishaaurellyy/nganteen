"use client";

import { useState } from "react";
import { Search, CircleX } from "lucide-react";

export default function Searchbar() {
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setSubmitted(true);
    }
  };

  const clearSearch = () => {
    setQuery("");
    setSubmitted(false);
  };

  return (
    <div className="w-full flex items-center justify-between gap-2 bg-neutral-200 rounded-lg px-4 py-3">
      <input
        type="text"
        placeholder="Search"
        className={`
          w-fit flex-1 bg-neutral-200 outline-none 
          placeholder:text-neutral-600 text-sm font-semibold 
          ${query ? "text-neutral-800" : "text-neutral-600"}
          ${submitted ? "truncate" : ""}
        `}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setSubmitted(false);
        }}
        onKeyDown={handleKeyDown}
      />

      {query && !submitted ? (
        <CircleX
          className="w-5 h-5 text-neutral-800 cursor-pointer"
          onClick={clearSearch}
        />
      ) : (
        <Search className="w-5 h-5 text-neutral-800" />
      )}
    </div>
  );
}