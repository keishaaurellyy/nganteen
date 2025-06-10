import { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { cn } from "@/config";

type DropdownProps<T> = {
  items: T[];
  selected: T | null;
  onSelect: (value: T) => void;
  placeholder?: string;
  renderItem?: (item: T) => string;
};

export default function Dropdown<T>({
  items,
  selected,
  onSelect,
  placeholder = "Select an option",
  renderItem,
}: DropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full max-w-md relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full bg-neutral-100 rounded-lg border border-neutral-300 px-4 py-4 flex items-center justify-between text-neutral-700"
        )}
      >
        <span
          className={cn("text-sm", selected ? "font-semibold" : "font-normal")}
        >
          {selected
            ? renderItem
              ? renderItem(selected)
              : String(selected)
            : placeholder}
        </span>
        {isOpen ? (
          <ChevronUpIcon className="w-6 h-6 text-neutral-700" />
        ) : (
          <ChevronDownIcon className="w-6 h-6 text-neutral-700" />
        )}
      </button>

      <div
        className={cn(
          "absolute left-0 right-0 transition-all overflow-hidden rounded-lg border border-neutral-300 bg-white mt-1 shadow-lg z-50",
          isOpen
            ? "max-h-[400px] opacity-100 bg-neutral-100"
            : "max-h-0 opacity-0"
        )}
      >
        {items.map((item, index) => (
          <button
            key={index}
            onClick={() => {
              onSelect(item);
              setIsOpen(false);
            }}
            className="w-full text-left px-4 py-3 text-sm font-semibold text-neutral-900 hover:bg-neutral-300"
          >
            {renderItem ? renderItem(item) : String(item)}
          </button>
        ))}
      </div>
    </div>
  );
}
