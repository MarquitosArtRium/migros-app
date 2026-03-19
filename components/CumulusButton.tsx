"use client";
import { QrCodeIcon } from "@/components/icons";

export default function CumulusButton() {
  return (
    <div className="sticky bottom-20 flex justify-center pointer-events-none z-50">
      <button
        className="pointer-events-auto flex items-center gap-2.5 text-white font-semibold text-sm px-6 py-3.5 rounded-full active:scale-95 transition-transform"
        style={{
          background: "#1A237E",
          boxShadow: "0 4px 20px rgba(26,35,126,0.4)",
        }}
      >
        <QrCodeIcon className="w-5 h-5" />
        Cumulus-Code
      </button>
    </div>
  );
}
