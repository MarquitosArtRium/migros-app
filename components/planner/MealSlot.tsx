import { Plus } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface MealSlotProps {
  label: string;
  Icon: LucideIcon;
}

export function MealSlot({ label, Icon }: MealSlotProps) {
  return (
    <div className="bg-white border border-[#E7E7E7] rounded-[8px] overflow-hidden">
      <div className="flex items-center justify-between px-3 py-3">
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4 text-[#5d5d5d]" />
          <span className="text-[14px] text-[#2e2e2e]" style={{ fontWeight: 600 }}>
            {label}
          </span>
        </div>
        <button className="flex items-center gap-1 text-[#FF6600] text-[13px] active:opacity-70" style={{ fontWeight: 510 }}>
          <Plus className="w-4 h-4" />
          Hinzufügen
        </button>
      </div>

      <div className="px-3 pb-3">
        <div className="bg-[#F7F7F7] rounded-[6px] border border-dashed border-[#d1d1d1] flex items-center justify-center py-4">
          <span className="text-[12px] text-[#b0b0b0]">Noch nichts geplant</span>
        </div>
      </div>
    </div>
  );
}
