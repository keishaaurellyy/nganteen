import { cn } from "@/config";

export function SkeletonProfile() {
  return (
    <div className="rounded-lg border border-neutral-400 p-4 space-y-5 animate-pulse bg-white">
      {/* Title */}
      <div className="h-4 w-32 bg-neutral-200 rounded" />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="h-3 w-16 bg-neutral-200 rounded mb-1" />
          <div className="h-5 w-24 bg-neutral-300 rounded" />
        </div>
        <div>
          <div className="h-3 w-16 bg-neutral-200 rounded mb-1" />
          <div className="h-5 w-32 bg-neutral-300 rounded" />
        </div>
        <div>
          <div className="h-3 w-16 bg-neutral-200 rounded mb-1" />
          <div className="h-5 w-28 bg-neutral-300 rounded" />
        </div>
        <div>
          <div className="h-3 w-16 bg-neutral-200 rounded mb-1" />
          <div className="h-5 w-28 bg-neutral-300 rounded" />
        </div>
      </div>
    </div>
  );
}

interface SkeletonKitchenCardProps {
  variant?: "home" | "explore";
  color?: "primary" | "secondary" | "tertiary";
}

export default function SkeletonKitchenCard({
  variant = "explore",
  color = "primary",
}: SkeletonKitchenCardProps) {
  const bgColor =
    {
      primary: "bg-primary-500",
      secondary: "bg-secondary-500",
      tertiary: "bg-tertiary-600",
    }[color] ?? "bg-primary-500";

  if (variant === "home") {
    return (
      <div className="flex flex-col items-center space-y-2 animate-pulse">
        <div
          className={cn(
            "rounded-lg shadow-sm p-0 flex items-center justify-center",
            bgColor
          )}
          style={{ width: "101px", height: "101px" }}
        >
          <div className="w-[80px] h-[80px] bg-neutral-200 rounded-full" />
        </div>
        <div className="w-[80px] h-4 bg-neutral-200 rounded-md" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "w-full max-w-[170px] min-w-[150px] h-[170px] rounded-lg shadow p-2 flex flex-col justify-between animate-pulse",
        bgColor
      )}
    >
      <div className="text-neutral-100 space-y-2">
        <div className="w-4/5 h-4 bg-neutral-100/60 rounded-md" />
        <div className="w-3/5 h-3 bg-neutral-100/40 rounded-md" />
      </div>
      <div className="mt-2 rounded-md overflow-hidden bg-white">
        <div className="w-full h-[86px] bg-neutral-200" />
      </div>
    </div>
  );
}
