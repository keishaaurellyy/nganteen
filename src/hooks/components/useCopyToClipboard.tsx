"use client";

import { useState } from "react";
import { CheckCircle2Icon, CopyIcon } from "lucide-react";
import { DEFAULT_TIMEOUT } from "@/const/default";

type IconSizeOption = "small" | "medium" | "large";

const iconSizeMap: Record<IconSizeOption, number> = {
  small: 16,
  medium: 24,
  large: 32,
};

type UseCopyToClipboardOptions = {
  timeout?: number;
  iconSize?: IconSizeOption;
};

export default function useCopyToClipboard({
  timeout = DEFAULT_TIMEOUT,
  iconSize = "medium",
}: UseCopyToClipboardOptions = {}) {
  const [copied, setCopied] = useState(false);
  const size = iconSizeMap[iconSize];

  const copy = async (text: string | undefined) => {
    try {
      await navigator.clipboard.writeText(text ?? "");
      setCopied(true);
      setTimeout(() => setCopied(false), timeout);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const icon = copied ? (
    <CheckCircle2Icon className="text-green-800" size={size} />
  ) : (
    <CopyIcon className="text-gray-600" size={size} />
  );

  return { copied, copy, icon };
}
