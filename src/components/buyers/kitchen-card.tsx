import Image from "next/image";

type KitchenCardVariant = "explore" | "home";

interface KitchenCardProps {
  name?: string;
  description?: string;
  color?: "primary" | "secondary" | "tertiary";
  variant?: KitchenCardVariant;
}

export default function KitchenCard({
  name,
  description,
  color = "primary",
  variant = "explore",
}: KitchenCardProps) {
  const bgColor =
    {
      primary: "bg-primary-500",
      secondary: "bg-secondary-500",
      tertiary: "bg-tertiary-600",
    }[color] ?? "bg-primary-500";

  const isHome = variant === "home";

  if (isHome) {
    // Layout: Home
    return (
      <div className="flex flex-col items-center space-y-2">
        <div
          className={`rounded-lg shadow-sm p-0 flex items-center justify-center ${bgColor}`}
          style={{ width: "101px", height: "101px" }}
        >
          <Image
            src="/images/foodie-home.svg"
            alt={name ?? "Kitchen Image"}
            width={101}
            height={101}
            className="h-[101px] object-contain rounded-lg"
          />
        </div>
        <p className="text-sm font-semibold text-center text-neutral-900 max-w-[101px] truncate">
          {name}
        </p>
      </div>
    );
  }

  // Default layout: Explore Kitchen
  return (
    <div
      className={`w-full max-w-[170px] h-[170px] rounded-lg shadow p-2 flex flex-col justify-between cursor-pointer active:opacity-80 transition-opacity duration-200 ${bgColor}`}
    >
      <div className="text-neutral-100">
        <h3 className="text-lg font-bold leading-tight line-clamp-2 truncate">
          {name}
        </h3>
        <p className="text-xs font-semibold truncate">{description}</p>
      </div>

      <div className="mt-2 rounded-md overflow-hidden">
        <Image
          src="/images/foodie.svg"
          alt={name ?? "Kitchen Image"}
          width={154}
          height={86}
          className="rounded-md object-contain w-full h-auto"
        />
      </div>
    </div>
  );
}
