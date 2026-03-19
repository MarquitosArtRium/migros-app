"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Mode } from "@/app/page";
import { PercentIcon, ClipboardIcon } from "@/components/icons";

function MigrosLogo() {
  return (
    <div className="w-7 h-7 bg-[#FF6600] rounded-lg flex items-center justify-center">
      <span className="text-white font-black leading-none" style={{ fontSize: 16 }}>M</span>
    </div>
  );
}

function SubitoGoIcon() {
  return (
    <svg viewBox="0 0 28 28" className="w-6 h-6">
      <circle cx="14" cy="14" r="12" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <text x="14" y="18" textAnchor="middle" fill="currentColor" fontSize="8" fontWeight="bold" fontFamily="Arial">Go</text>
    </svg>
  );
}

function KochenIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M6 13h12v5a2 2 0 01-2 2H8a2 2 0 01-2-2v-5z" />
      <path d="M8 13V9a4 4 0 118 0v4" />
      <circle cx="12" cy="6" r="3" />
    </svg>
  );
}

const navItems = [
  { href: "/", label: "Home", icon: <MigrosLogo /> },
  { href: "/angebote", label: "Angebote", icon: <PercentIcon className="w-6 h-6" /> },
  { href: "/planen", label: "Planen", icon: <KochenIcon /> },
  { href: "/liste", label: "Liste", icon: <ClipboardIcon className="w-6 h-6" />, badge: 5 },
  { href: "/subito", label: "subitoGo", icon: <SubitoGoIcon /> },
];

export default function BottomNav({ mode }: { mode: Mode }) {
  const pathname = usePathname();

  return (
    <div
      className="sticky bottom-0 bg-white border-t border-gray-200 z-40"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 8px)" }}
    >
      <div className="flex items-center justify-around px-2 pt-2 pb-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center gap-0.5 flex-1"
            >
              <div className="relative">
                <div className={`px-3 py-1.5 rounded-[8px] transition-colors ${isActive ? "bg-orange-50" : ""}`}>
                  <span className={isActive ? "text-[#FF6600]" : "text-gray-500"}>
                    {item.icon}
                  </span>
                </div>
                {"badge" in item && item.badge && (
                  <span
                    className="absolute -top-0.5 -right-0.5 bg-[#FF6600] text-white rounded-full flex items-center justify-center font-bold"
                    style={{ width: 16, height: 16, fontSize: 9 }}
                  >
                    {item.badge}
                  </span>
                )}
              </div>
              <span className={`text-xs ${isActive ? "font-semibold text-[#FF6600]" : "text-gray-500"}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
