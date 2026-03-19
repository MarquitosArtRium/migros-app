"use client";
import { useState } from "react";
import Image from "next/image";
import { Heart, Clock, X, Check } from "lucide-react";
import { Search } from "lucide-react";

const FILTERS = ["Highlights", "Eigene Rezepte", "Thermomix"];

const DAYS = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
const SLOTS = ["Frühstück", "Mittagessen", "Abendessen"];

const RECIPES = [
  {
    id: 1,
    tag: "Vegan",
    tagColor: "#4CAF50",
    category: "Fast ohne Schnippeln",
    name: "Kichererbsen-Curry mit Couscous",
    time: "15 Min.",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=400&fit=crop",
  },
  {
    id: 2,
    tag: "Vegetarisch",
    tagColor: "#4CAF50",
    category: "Schnelle Küche",
    name: "Pasta al Limone mit Ricotta",
    time: "20 Min.",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600&h=400&fit=crop",
  },
  {
    id: 3,
    tag: "Fleisch",
    tagColor: "#e53935",
    category: "Familienrezept",
    name: "Zürcher Geschnetzeltes mit Rösti",
    time: "35 Min.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&h=400&fit=crop",
  },
  {
    id: 4,
    tag: "Fisch",
    tagColor: "#1e88e5",
    category: "Leicht & gesund",
    name: "Lachs mit Spinat und Kartoffeln",
    time: "25 Min.",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&h=400&fit=crop",
  },
  {
    id: 5,
    tag: "Vegan",
    tagColor: "#4CAF50",
    category: "Meal Prep",
    name: "Buddha Bowl mit Tahini-Dressing",
    time: "30 Min.",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop",
  },
  {
    id: 6,
    tag: "Vegetarisch",
    tagColor: "#4CAF50",
    category: "Comfort Food",
    name: "Kürbissuppe mit Ingwer",
    time: "25 Min.",
    image: "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=600&h=400&fit=crop",
  },
];

interface AddToPlanModalProps {
  recipe: typeof RECIPES[0];
  onClose: () => void;
  onAdd: (day: string, slot: string) => void;
}

function AddToPlanModal({ recipe, onClose, onAdd }: AddToPlanModalProps) {
  const [selectedDay, setSelectedDay] = useState("Mo");
  const [selectedSlot, setSelectedSlot] = useState("Mittagessen");

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/40 z-50" onClick={onClose} />

      {/* Bottom sheet */}
      <div className="fixed bottom-0 inset-x-0 z-50 bg-white rounded-t-[16px] max-w-sm mx-auto" style={{ left: "50%", transform: "translateX(-50%)", right: "auto", width: "100%", maxWidth: "384px" }}>
        <div className="px-5 pt-4 pb-8">
          {/* Handle */}
          <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-4" />

          {/* Header */}
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-[16px] font-bold text-[#2e2e2e]">Zum Wochenplan hinzufügen</h3>
            <button onClick={onClose} className="p-1 text-gray-400">
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="text-[13px] text-[#9d9d9d] mb-5">{recipe.name}</p>

          {/* Day picker */}
          <p className="text-[12px] font-semibold text-[#5d5d5d] uppercase tracking-wide mb-2">Tag</p>
          <div className="flex gap-1.5 mb-5">
            {DAYS.map((d) => (
              <button
                key={d}
                onClick={() => setSelectedDay(d)}
                className="flex-1 py-2 text-[12px] font-semibold rounded-[8px] transition-colors"
                style={{
                  background: selectedDay === d ? "#FF6600" : "#F0F0F0",
                  color: selectedDay === d ? "white" : "#5d5d5d",
                }}
              >
                {d}
              </button>
            ))}
          </div>

          {/* Slot picker */}
          <p className="text-[12px] font-semibold text-[#5d5d5d] uppercase tracking-wide mb-2">Mahlzeit</p>
          <div className="flex flex-col gap-2 mb-6">
            {SLOTS.map((s) => (
              <button
                key={s}
                onClick={() => setSelectedSlot(s)}
                className="flex items-center justify-between px-4 py-3 rounded-[8px] border transition-colors"
                style={{
                  borderColor: selectedSlot === s ? "#FF6600" : "#E7E7E7",
                  background: selectedSlot === s ? "#FFF3ED" : "white",
                }}
              >
                <span className="text-[14px]" style={{ color: selectedSlot === s ? "#FF6600" : "#2e2e2e", fontWeight: selectedSlot === s ? 600 : 400 }}>
                  {s}
                </span>
                {selectedSlot === s && <Check className="w-4 h-4 text-[#FF6600]" />}
              </button>
            ))}
          </div>

          {/* Confirm */}
          <button
            onClick={() => { onAdd(selectedDay, selectedSlot); onClose(); }}
            className="w-full bg-[#FF6600] text-white font-semibold py-3.5 rounded-[8px] text-[15px]"
          >
            Hinzufügen
          </button>
        </div>
      </div>
    </>
  );
}

export function RecipesTab() {
  const [activeFilter, setActiveFilter] = useState("Highlights");
  const [liked, setLiked] = useState<Set<number>>(new Set());
  const [addingRecipe, setAddingRecipe] = useState<typeof RECIPES[0] | null>(null);
  const [added, setAdded] = useState<Record<number, { day: string; slot: string }>>({});

  const handleAdd = (day: string, slot: string) => {
    if (!addingRecipe) return;
    setAdded((prev) => ({ ...prev, [addingRecipe.id]: { day, slot } }));
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Search bar */}
      <div className="flex items-center gap-2 bg-[#F0F0F0] rounded-[8px] px-3 py-2.5">
        <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
        <span className="text-[14px] text-gray-400">Worauf hast du Lust?</span>
      </div>

      {/* Filter chips */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className="flex-shrink-0 px-4 py-1.5 text-[13px] rounded-[8px] border transition-colors"
            style={{
              fontWeight: 600,
              background: activeFilter === f ? "#FF6600" : "white",
              color: activeFilter === f ? "white" : "#5d5d5d",
              borderColor: activeFilter === f ? "#FF6600" : "#E7E7E7",
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Recipe cards */}
      <div className="flex flex-col gap-3">
        {RECIPES.map((r) => {
          const isAdded = !!added[r.id];
          return (
            <div key={r.id} className="bg-white border border-[#E7E7E7] rounded-[8px] overflow-hidden">
              {/* Image */}
              <div className="relative" style={{ height: 160 }}>
                <Image
                  src={r.image}
                  alt={r.name}
                  fill
                  className="object-cover"
                  sizes="384px"
                />
                {/* Tag */}
                <span
                  className="absolute top-2.5 left-2.5 text-white text-[11px] font-semibold px-2 py-0.5 rounded-[4px]"
                  style={{ background: r.tagColor }}
                >
                  {r.tag}
                </span>
                {/* Heart */}
                <button
                  onClick={() => setLiked((prev) => {
                    const next = new Set(prev);
                    next.has(r.id) ? next.delete(r.id) : next.add(r.id);
                    return next;
                  })}
                  className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm"
                >
                  <Heart
                    className="w-4 h-4"
                    fill={liked.has(r.id) ? "#FF6600" : "none"}
                    stroke={liked.has(r.id) ? "#FF6600" : "#9d9d9d"}
                  />
                </button>
              </div>

              {/* Info + action */}
              <div className="px-3 pt-2.5 pb-3">
                <p className="text-[11px] font-semibold mb-0.5" style={{ color: "#FF6600" }}>
                  {r.category}
                </p>
                <p className="text-[14px] font-semibold text-[#2e2e2e] leading-snug">{r.name}</p>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#9d9d9d]" />
                    <span className="text-[12px] text-[#9d9d9d]">{r.time}</span>
                  </div>
                  <button
                    onClick={() => setAddingRecipe(r)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] text-[12px] font-semibold transition-colors"
                    style={{
                      background: isAdded ? "#F0F0F0" : "#FF6600",
                      color: isAdded ? "#5d5d5d" : "white",
                    }}
                  >
                    {isAdded ? (
                      <><Check className="w-3.5 h-3.5" /> {added[r.id].day} · {added[r.id].slot}</>
                    ) : (
                      <>+ Einplanen</>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add to plan modal */}
      {addingRecipe && (
        <AddToPlanModal
          recipe={addingRecipe}
          onClose={() => setAddingRecipe(null)}
          onAdd={handleAdd}
        />
      )}
    </div>
  );
}
