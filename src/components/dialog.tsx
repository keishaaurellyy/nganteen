// dialog.tsx
import React from "react";
import { Button } from "./button";
import { Color, ColorClasses } from "@/styles/color";

type DialogProps = {
  icon: React.ReactElement<{ className?: string }>;
  color: Extract<Color, "success" | "warning" | "error">;
  size?: "small" | "medium" | "large"; // Prop size yang bisa diatur
  title: string;
  description: string;
  buttonLabel?: string;
  onConfirm: () => void;
  onClose: () => void;
};

export const Dialog: React.FC<DialogProps> = ({
  icon,
  color,
  size = "medium",
  title,
  description,
  buttonLabel = "Confirm",
  onConfirm,
  onClose,
}) => {
  // Mapping size untuk icon
  const iconSizeClasses = {
    small: "w-6 h-6",
    medium: "w-8 h-8",
    large: "w-10 h-10",
  };

  // Mapping size untuk button (gunakan size yang sama)
  const buttonSize = size;

  const iconClass = `${iconSizeClasses[size]} ${ColorClasses[color].icon}`;

  const clonedIcon = React.cloneElement(icon, {
    className: `${iconClass} ${icon.props.className || ""}`,
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-900/50">
      <div className="bg-neutral-100 rounded-xl shadow-md px-[32px] py-[20px] space-y-5 text-center max-w-sm w-full mx-4">
        <div className="space-y-3 flex flex-col items-center">
          {clonedIcon}
          <div className="flex flex-col items-center space-y-2">
            <h2 className="text-lg font-bold">{title}</h2>
            <p className="text-sm text-neutral-800">{description}</p>
          </div>
        </div>
        <div className="flex gap-3 justify-center">
          <Button
            variant="outline"
            size={buttonSize}
            color={color}
            onClick={onClose}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            variant="solid"
            size={buttonSize}
            color={color}
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="flex-1"
          >
            {buttonLabel}
          </Button>
        </div>
      </div>
    </div>
  );
};