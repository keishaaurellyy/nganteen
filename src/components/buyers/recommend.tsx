"use client";

import { MessageCircleHeart } from "lucide-react";

export default function RecommendCard() {
  const text = "Skip the line. Order. Munch. Repeat. 🍔💨";
  const url = "https://nganteen.vercel.app";

  const handleShare = async () => {
    if (typeof window === "undefined" || typeof navigator === "undefined") return;

    const fullText = `${text} ${url}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Nganteen",
          text,
          url,
        });
        return;
      } catch (err) {
        console.warn("Share failed, falling back to clipboard...", err);
      }
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(fullText);
        alert("Link copied to clipboard!");
      } catch (err) {
        console.error("Clipboard fallback failed:", err);
        alert("Sharing is not supported, and copying failed.");
      }
    } else {
      alert("Sharing and clipboard are not supported in this browser.");
    }
  };

  return (
    <button
      onClick={handleShare}
      className="w-full bg-primary-100 rounded-lg p-4 text-left"
    >
      <div className="flex items-center justify-between">
        <div className="text-neutral-800">
          <p className="text-xs-normal">Good things are meant to be shared!</p>
          <p className="text-sm-bold">Recommend Nganteen to your friends</p>
        </div>
        <MessageCircleHeart className="w-6 h-6 text-primary-500" />
      </div>
    </button>
  );
}
