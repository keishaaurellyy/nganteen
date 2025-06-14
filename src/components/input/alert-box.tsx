import { cn } from "@/config";
import { MessageCircleWarning } from "lucide-react";

interface AlertBoxProps {
  title: string;
  description: React.ReactNode;
  className?: string;
}

export default function AlertBox({ title, description, className }: AlertBoxProps) {
  return (
    <div
      className={cn(
        "border border-primary-500 bg-primary-100 text-neutral-900 rounded-md px-3 flex items-center gap-2",
        className
      )}
    >
      <MessageCircleWarning className="text-primary-500 mt-0.5 shrink-0" size={24} />
      <div className="text-xs py-3 space-y-1">
        <p className="font-bold">{title}</p>
        <p className="leading-tight">{description}</p>
      </div>
    </div>
  );
}
