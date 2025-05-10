// components/MonthDropdown.tsx
import { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { cn } from "@/config";

const months = [
  "January 2025",
  "February 2025",
  "March 2025",
  "April 2025",
  "May 2025",
  "June 2025",
  "July 2025",
  "August 2025",
  "September 2025",
  "October 2025",
  "November 2025",
  "December 2025",
];

type MonthDropdownProps = {
  selected: string | null;
  onSelect: (value: string) => void;
};

export default function MonthDropdown({ selected, onSelect }: MonthDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full max-w-md">
      <button
  onClick={() => setIsOpen(!isOpen)}
  className={cn(
    "w-full bg-neutral-100 rounded-lg border border-neutral-300 px-4 py-4 flex items-center justify-between gap-auto text-neutral-900"
  )}
>
  <span className={cn(
    "text-sm",
    selected ? "font-semibold" : "font-normal"
  )}>
    {selected || "Choose month"}
  </span>
  {isOpen ? (
    <ChevronUpIcon className="w-6 h-6 text-neutral-700" />
  ) : (
    <ChevronDownIcon className="w-6 h-6 text-neutral-700" />
  )}
</button>


      <div
        className={cn(
          "transition-all overflow-hidden rounded-lg border border-neutral-300 bg-white mt-1",
          isOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        {months.map((month) => (
          <button
            key={month}
            onClick={() => {
              onSelect(month);
              setIsOpen(false);
            }}
            className="w-full text-left px-4 py-3 text-sm font-semibold text-neutral-900 hover:bg-neutral-100"
          >
            {month}
          </button>
        ))}
      </div>
    </div>
  );
}