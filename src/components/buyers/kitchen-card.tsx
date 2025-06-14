import Image from "next/image";

interface KitchenCardProps {
  name: string;
  description: string;
  color?: "primary" | "secondary" | "tertiary";
}

export default function KitchenCard({
  name,
  description,
  color = "primary",
}: KitchenCardProps) {
  const bgColor = {
    primary: "bg-primary-500",
    secondary: "bg-secondary-500",
    tertiary: "bg-tertiary-600",
  }[color] ?? "bg-primary-500";

  return (
    <div
      className={`relative rounded-lg shadow overflow-hidden flex flex-col justify-between p-2 cursor-pointer active:opacity-80 transition-opacity duration-200 ${bgColor}`}
      style={{ width: "170px", height: "170px" }}
    >
      <div className="text-neutral-100">
        <h3 className="text-lg font-bold leading-tight line-clamp-2 turncate">{name}</h3>
        <p className="text-xs font-semibold truncate">{description}</p>
      </div>

      <div className="mt-2 self-center">
        <Image
          src="/images/foodie.svg"
          alt={name}
          width={154}
          height={86}
          className="h-[86px] w-fit rounded-md"
        />
      </div>
    </div>
  );
}
