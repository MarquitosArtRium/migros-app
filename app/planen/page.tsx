"use client";
import { useState } from "react";
import { startOfWeek, addDays } from "date-fns";
import { Coffee, Sandwich, Moon } from "lucide-react";
import { WeekHeader, type PlanTab } from "@/components/planner/WeekHeader";
import { MealSlot } from "@/components/planner/MealSlot";
import { PreferencesBox } from "@/components/planner/PreferencesBox";
import { RecipesTab } from "@/components/planner/RecipesTab";
import BottomNav from "@/components/BottomNav";

const MEAL_SLOTS = [
  { key: "breakfast", label: "Frühstück",   Icon: Coffee   },
  { key: "lunch",     label: "Mittagessen", Icon: Sandwich },
  { key: "dinner",    label: "Abendessen",  Icon: Moon     },
];

export default function PlanenPage() {
  const today = new Date();
  const [weekStart, setWeekStart] = useState(() => startOfWeek(today, { weekStartsOn: 1 }));
  const [selectedDate, setSelectedDate] = useState(today);
  const [activeTab, setActiveTab] = useState<PlanTab>("Wochenplan");

  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const handleSelectDate = (d: Date) => {
    setSelectedDate(d);
    setWeekStart(startOfWeek(d, { weekStartsOn: 1 }));
  };

  const handlePrevWeek = () => {
    setWeekStart(addDays(weekStart, -7));
    setSelectedDate(addDays(selectedDate, -7));
  };

  const handleNextWeek = () => {
    setWeekStart(addDays(weekStart, 7));
    setSelectedDate(addDays(selectedDate, 7));
  };

  return (
    <div className="flex flex-col min-h-dvh max-w-sm mx-auto bg-[#F7F7F7] relative">
      <div className="flex-1 overflow-y-auto no-scrollbar pb-24">
        <WeekHeader
          weekDays={weekDays}
          selectedDate={selectedDate}
          today={today}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onSelectDate={handleSelectDate}
          onPrevWeek={handlePrevWeek}
          onNextWeek={handleNextWeek}
          onPrevDay={() => handleSelectDate(addDays(selectedDate, -1))}
          onNextDay={() => handleSelectDate(addDays(selectedDate, 1))}
          onToday={() => handleSelectDate(today)}
        />

        <div className="flex flex-col gap-3 px-4 pt-4">
          {activeTab === "Wochenplan" && (
            <>
              <PreferencesBox />
              {MEAL_SLOTS.map((slot) => (
                <MealSlot key={slot.key} label={slot.label} Icon={slot.Icon} />
              ))}
            </>
          )}

          {activeTab === "Rezepte" && <RecipesTab />}

          {activeTab === "Bestellt" && (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <div className="w-14 h-14 rounded-full bg-orange-50 flex items-center justify-center">
                <svg className="w-7 h-7 text-[#FF6600]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" />
                </svg>
              </div>
              <p className="text-[15px] text-[#2e2e2e] font-semibold">Keine Bestellungen</p>
              <p className="text-[13px] text-[#9d9d9d] text-center px-8">Deine bestellten Mahlzeiten und Lieferungen erscheinen hier.</p>
            </div>
          )}
        </div>
      </div>

      <BottomNav mode="store" />
    </div>
  );
}
