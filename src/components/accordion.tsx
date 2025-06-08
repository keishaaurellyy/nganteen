import { cn } from "@/config";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { JSX, useState } from "react";

type AccordionProps = {
  label: string;
  description: string | JSX.Element;
  variant: "primary" | "neutral";
};

export default function Accordion({
  label,
  description,
  variant,
}: AccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={cn(
        "w-full max-w-md border rounded-md bg-neutral-100 transition-all duration-300 overflow-hidden",
        variant === "primary" ? "border-primary-500" : "border-neutral-400"
      )}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-2 text-left text-xs-bold text-neutral-900"
      >
        <span className="truncate">{label}</span>
        <span>{isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}</span>
      </button>

      <div
        className={cn(
          "px-4 transition-all duration-1000 overflow-hidden",
          isOpen ? "pb-3 max-h-[500px] opacity-100" : "pb-0 max-h-0 opacity-0"
        )}
      >
        <div className="text-xs-light text-neutral-900 break-words w-full max-w-full">
          {description}
        </div>
      </div>
    </div>
  );
}

Accordion.displayName = "Accordion";
