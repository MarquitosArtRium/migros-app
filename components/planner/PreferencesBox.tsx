"use client";
import { useState } from "react";
import PreferencesFlow from "./PreferencesFlow";

export function PreferencesBox() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="bg-white border border-[#E7E7E7] rounded-[8px] overflow-hidden">
        {/* Banner */}
        <button
          onClick={() => setOpen(true)}
          className="w-full bg-[#FF6600] px-4 py-3 flex items-center justify-between text-left"
        >
          <span className="text-white text-[13px] leading-snug">
            Lege jetzt deine Vorlieben fest für{" "}
            <span className="font-bold">Rezepte nach Maß</span>
          </span>
          <svg className="w-4 h-4 text-white flex-shrink-0 ml-2" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>

        {/* Icon row */}
        <div className="flex divide-x divide-[#E7E7E7]">
          {[
            {
              label: "Vorlieben", step: 1,
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <line x1="4" y1="6" x2="20" y2="6" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="18" x2="20" y2="18" />
                  <circle cx="8" cy="6" r="2" fill="white" /><circle cx="16" cy="12" r="2" fill="white" /><circle cx="10" cy="18" r="2" fill="white" />
                </svg>
              ),
            },
            {
              label: "Lieber nicht", step: 2,
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="9" /><line x1="6.5" y1="6.5" x2="17.5" y2="17.5" />
                </svg>
              ),
            },
            {
              label: "Wichtig", step: 3,
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path d="M6 13.5C6 10 8.5 7 12 7s6 3 6 6.5V15H6v-1.5z" />
                  <rect x="8" y="15" width="8" height="2" rx="1" />
                  <rect x="9" y="17" width="6" height="2" rx="1" />
                  <line x1="12" y1="4" x2="12" y2="7" />
                </svg>
              ),
            },
            {
              label: "Haushalt", step: 4,
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path d="M5 3c3 3 4 8 7 10" /><path d="M5 3c0 4 2 7 4 9" />
                  <path d="M12 13c2-2 6-3 7-7" /><path d="M12 13c1-3 4-5 5-8" />
                  <line x1="12" y1="13" x2="12" y2="21" />
                </svg>
              ),
            },
          ].map(({ label, icon }) => (
            <button
              key={label}
              onClick={() => setOpen(true)}
              className="flex-1 flex flex-col items-center gap-2 py-4 text-[#5d5d5d] hover:bg-gray-50 active:bg-gray-100 transition-colors"
            >
              {icon}
              <span className="text-[11px]" style={{ fontWeight: 510 }}>{label}</span>
            </button>
          ))}
        </div>
      </div>

      <PreferencesFlow open={open} onClose={() => setOpen(false)} />
    </>
  );
}
