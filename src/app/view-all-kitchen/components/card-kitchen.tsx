interface CardKitchenProps {
  name: string;
  description: string;
}

export default function CardKitchen({ name, description }: CardKitchenProps) {
  return (
    <div
      className="relative rounded-lg overflow-hidden bg-cover bg-center flex items-start justify-start px-3 pt-2 cursor-pointer active:opacity-80 transition-opacity duration-200"
      style={{
        backgroundImage: "url('/images/kitchen.svg')",
        width: "170px",
        height: "170px",
      }}
    >
      <div className="text-neutral-100">
        <h3 className="text-xl font-bold leading-tight">{name}</h3>
        <p className="text-neutral-900 text-xs font-semibold">{description}</p>
      </div>
    </div>
  );
}
