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

export function SkeletonOrderDetailKitchen() {
  return (
    <div className="w-full max-w-md space-y-4 animate-pulse">
      <div className="border border-neutral-400 rounded-lg p-3 bg-white">
        <div className="h-4 w-1/2 bg-neutral-200 rounded mb-2" />
        <div className="flex items-center gap-2">
          <div className="h-3 w-24 bg-neutral-200 rounded" />
          <div className="h-3 w-1.5 bg-neutral-200 rounded" />
          <div className="h-3 w-20 bg-neutral-200 rounded" />
          <div className="h-3 w-4 bg-neutral-200 rounded" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonOrderDetailItem({ count = 3 }: { count?: number }) {
  return (
    <div className="w-full pb-4 max-w-md justify-self-center space-y-4">
      <div className="rounded-lg p-3 border border-neutral-400 animate-pulse">
        <div className="h-4 w-28 bg-neutral-200 rounded mb-2" />

        {[...Array(count)].map((_, index) => (
          <div key={index} className="flex justify-between items-center py-1">
            <div className="flex-1 h-3 bg-neutral-200 rounded" />
            <div className="w-8 h-3 bg-neutral-200 rounded mx-2" />
            <div className="w-16 h-3 bg-neutral-300 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function SkeletonOrderNote() {
  return (
    <div className="w-full pb-4 max-w-md justify-self-center space-y-4 animate-pulse">
      <div className="rounded-lg p-3 border border-neutral-400 space-y-2">
        {/* Title */}
        <div className="h-4 w-24 bg-neutral-200 rounded" />
        {/* Note text */}
        <div className="h-3 w-full bg-neutral-300 rounded" />
        <div className="h-3 w-5/6 bg-neutral-300 rounded" />
      </div>
    </div>
  );
}

export function SkeletonOrderPayment() {
  return (
    <div className="w-full pb-4 max-w-md justify-self-center space-y-4 animate-pulse">
      {/* Skeleton for Payment Details */}
      <div className="rounded-lg p-3 border border-neutral-400 space-y-2">
        <div className="h-4 w-28 bg-neutral-200 rounded" />
        <div className="flex justify-between items-center mt-2">
          <div className="h-5 w-20 bg-neutral-300 rounded" />
          <div className="h-5 w-24 bg-neutral-300 rounded" />
        </div>
      </div>
    </div>
  );
}

interface SkeletonKitchenCardProps {
  variant?: "home" | "explore";
  color?: "primary" | "secondary" | "tertiary";
}

export function SkeletonKitchenCard({
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

export function SkeletonKitchenInfo() {
  return (
    <div className="w-full max-w-md space-y-6 animate-pulse">
      {/* Header / Kitchen Info */}
      <div className="flex items-start gap-4 p-4 border border-neutral-300 rounded-xl bg-neutral-50">
        <div className="w-12 h-12 rounded-full bg-neutral-200" />
        <div className="flex-1 space-y-2">
          <div className="w-1/2 h-4 bg-neutral-200 rounded" />
          <div className="w-3/4 h-3 bg-neutral-200 rounded" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonKitchenStatus() {
  return (
    <div className="w-full max-w-md space-y-6 animate-pulse">
      <div className="grid grid-cols-2 gap-3">
        <div className="p-4 border border-neutral-300 rounded-xl bg-neutral-50">
          <div className="h-6 w-full bg-neutral-200 rounded" />
        </div>
        <div className="p-4 border border-neutral-300 rounded-xl bg-neutral-50">
          <div className="h-6 w-full bg-neutral-200 rounded" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonKitchenOrders() {
  return (
    <div className="w-full max-w-md space-y-6 animate-pulse">
      <div className="grid grid-cols-2 gap-3">
        <div className="p-4 border border-neutral-300 rounded-xl bg-neutral-50">
          <div className="h-8 w-full bg-neutral-200 rounded" />
        </div>
        <div className="p-4 border border-neutral-300 rounded-xl bg-neutral-50">
          <div className="h-8 w-full bg-neutral-200 rounded" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonOrderCard() {
  return (
    <div className="w-full max-w-md animate-pulse">
      <div className="p-4 border border-neutral-300 rounded-lg bg-white">
        {/* Warning Section */}
        <div className="mb-4">
          <div className="h-4 w-24 bg-neutral-200 rounded mb-2" />
          <div className="h-4 w-full bg-neutral-200 rounded mb-1" />
        </div>
        <div className="border-t border-neutral-300 my-3" />

        {/* Order Items */}
        <div className="mb-4">
          <div className="flex justify-between mb-2">
            <div className="h-4 w-3/5 bg-neutral-200 rounded" />
            <div className="h-4 w-1/4 bg-neutral-200 rounded" />
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-neutral-300 my-3" />

        {/* Total */}
        <div className="flex justify-between mb-6">
          <div className="h-5 w-16 bg-neutral-200 rounded" />
          <div className="h-5 w-1/4 bg-neutral-200 rounded" />
        </div>

        {/* Confirm Button */}
        <div className="h-10 w-full bg-neutral-200 rounded-lg" />
      </div>
    </div>
  );
}
