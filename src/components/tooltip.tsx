// components/Tooltip.tsx
import { useState, useRef, useEffect } from "react";
import { AlertCircle } from "lucide-react";
import Show from "./show";

type TooltipProps = {
  message: string;
  children?: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  trigger?: "hover" | "click";
};

export default function Tooltip({
  message,
  children = <AlertCircle className="w-5 h-5" />,
  position = "top",
  trigger = "click",
}: TooltipProps) {
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setShow(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle hover events
  const hoverProps = trigger === "hover" ? {
    onMouseEnter: () => setShow(true),
    onMouseLeave: () => setShow(false),
  } : {};

  // Position classes
  const positionClasses = {
    top: "bottom-full mb-2 left-1/2 -translate-x-1/2",
    bottom: "top-full mt-2 left-1/2 -translate-x-1/2",
    left: "right-full mr-2 top-1/2 -translate-y-1/2",
    right: "left-full ml-2 top-1/2 -translate-y-1/2",
  };

  return (
    <div 
      className="relative inline-flex justify-center" 
      ref={ref}
      {...hoverProps}
    >
      <button
        onClick={trigger === "click" ? () => setShow((prev) => !prev) : undefined}
        className="text-neutral-700 focus:outline-none"
        aria-label="Tooltip"
      >
        {children}
      </button>
      <Show when={show}>
        <div
          className={`
            absolute ${positionClasses[position]}
            px-3 py-2 rounded-md text-xs text-neutral-100 bg-neutral-900/80
            z-50 transition-all duration-200
            max-w-[300px] w-max whitespace-normal break-words
            shadow-lg
          `}
        >
          {message}
        </div>
      </Show>
    </div>
  );
}