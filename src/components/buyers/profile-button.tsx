import { ChevronRight, LogOut, HelpCircle, History, HandCoins } from "lucide-react";

interface Props {
  label: string;
  onClick: () => void;
  isLogout?: boolean;
}

export default function ProfileButton({
  label,
  onClick,
  isLogout = false,
}: Props) {
  const icon = label === "Order History" ? (
    <History className="w-5 h-5 text-neutral-100" />
  ) : label === "Help Center" ? (
    <HelpCircle className="w-5 h-5 text-neutral-100" />
  ) : label === "Refund Form" ? (
    <HandCoins className="w-5 h-5 text-neutral-100" />
  ) : (
    <LogOut className="w-5 h-5 text-neutral-100" />
  );

  const iconBg = isLogout ? "bg-error-medium" : "bg-warning-dark";
  const textColor = isLogout ? "text-error-medium" : "text-neutral-800";

  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-between w-full py-4 ${textColor}`}
    >
      <div className="flex items-center gap-3">
        <div className={`w-6 h-6 flex items-center justify-center rounded-md ${iconBg}`}>
          {icon}
        </div>
        <span className="text-sm-bold">{label}</span>
      </div>
      <ChevronRight className="w-5 h-5 text-neutral-800" />
    </button>
  );
}
