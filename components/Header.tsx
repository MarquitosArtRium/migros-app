"use client";
import { Mode } from "@/app/page";
import { BellIcon, UserIcon, SearchIcon, HeartIcon, ListIcon, ClipboardIcon, TruckIcon, StoreIcon } from "@/components/icons";

interface HeaderProps {
  mode: Mode;
  setMode: (mode: Mode) => void;
}

export default function Header({ mode, setMode }: HeaderProps) {
  return (
    <div className="bg-[#F0F0F0] px-4 pt-4 pb-3">
      {/* Top row */}
      <div className="flex items-center justify-between mb-3">
        {/* Store / Delivery toggle */}
        <div className="flex items-center bg-[#E0E0E0] rounded-[8px] p-1 gap-1">
          <button
            onClick={() => setMode("store")}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-[6px] transition-all ${
              mode === "store" ? "bg-white shadow-sm" : ""
            }`}
          >
            <div className="bg-[#FF6600] rounded-full w-7 h-7 flex items-center justify-center flex-shrink-0">
              <StoreIcon className="w-4 h-4 text-white" />
            </div>
          </button>
          <button
            onClick={() => setMode("delivery")}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-[6px] transition-all ${
              mode === "delivery" ? "bg-white shadow-sm" : ""
            }`}
          >
            <TruckIcon className={`w-5 h-5 ${mode === "delivery" ? "text-gray-700" : "text-gray-500"}`} />
          </button>
        </div>

        {/* Right icons */}
        <div className="flex items-center gap-3">
          <button className="relative p-1">
            <BellIcon className="w-6 h-6 text-gray-700" />
            <span className="absolute -top-0.5 -right-0.5 bg-[#FF6600] text-white text-[9px] font-bold w-[17px] h-[17px] rounded-full flex items-center justify-center">
              6
            </span>
          </button>
          <button className="p-1">
            <UserIcon className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      </div>

      {/* Title */}
      <h1 className="text-2xl font-bold text-gray-900 mb-3">
        {mode === "store" ? "In der Filiale einkaufen" : "Online einkaufen"}
      </h1>

      {/* Search bar */}
      <div className="flex items-center gap-2 bg-white rounded-[8px] px-4 py-2.5 mb-3 shadow-sm">
        <SearchIcon className="w-5 h-5 text-gray-400 flex-shrink-0" />
        <span className="text-gray-400 text-sm">Produkt suchen</span>
      </div>

      {/* Quick action chips */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar">
        <button className="flex items-center gap-2 bg-white rounded-[8px] px-4 py-2 shadow-sm whitespace-nowrap flex-shrink-0">
          <HeartIcon className="w-4 h-4 text-gray-700" />
          <span className="text-sm font-medium text-gray-800">Meine Produkte</span>
        </button>
        <button className="flex items-center gap-2 bg-white rounded-[8px] px-4 py-2 shadow-sm whitespace-nowrap flex-shrink-0">
          <ListIcon className="w-4 h-4 text-gray-700" />
          <span className="text-sm font-medium text-gray-800">Kategorien</span>
        </button>
        <button className="flex items-center justify-center bg-white rounded-[8px] px-3 py-2 shadow-sm flex-shrink-0">
          <ClipboardIcon className="w-4 h-4 text-gray-700" />
        </button>
      </div>
    </div>
  );
}
