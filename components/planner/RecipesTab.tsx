"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Heart, Clock, X, Check } from "lucide-react";
import { Search } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

const FILTERS = ["Highlights", "Eigene Rezepte", "Thermomix"];

const DAYS = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
const SLOTS = ["Frühstück", "Mittagessen", "Abendessen"];

type Recipe = {
  id: string;
  title: string;
  description?: string;
  image_url?: string;
  category?: string;
  tags?: string[];
  prep_time?: number | null;
  cook_time?: number | null;
  servings?: number;
};

interface AddToPlanModalProps {
  recipe: Recipe;
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
          <p className="text-[13px] text-[#9d9d9d] mb-5">{recipe.title}</p>

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
  const [liked, setLiked] = useState<Set<string>>(new Set());
  const [addingRecipe, setAddingRecipe] = useState<Recipe | null>(null);
  const [added, setAdded] = useState<Record<string, { day: string; slot: string }>>({});
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    supabase
      .from("recipes")
      .select("*")
      .then(({ data, error }) => {
        if (error) setError(error.message);
        else setRecipes(data ?? []);
        setLoading(false);
      });
  }, []);

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
        {loading && (
          <p className="text-[14px] text-gray-400 text-center py-8">Rezepte werden geladen...</p>
        )}
        {error && (
          <p className="text-[14px] text-red-400 text-center py-8">Fehler: {error}</p>
        )}
        {!loading && !error && recipes.length === 0 && (
          <p className="text-[14px] text-gray-400 text-center py-8">Keine Rezepte gefunden.</p>
        )}
        {recipes.map((r) => {
          const isAdded = !!added[r.id];
          const totalTime = (r.prep_time ?? 0) + (r.cook_time ?? 0);
          const firstTag = r.tags?.[0];
          return (
            <div key={r.id} className="bg-white border border-[#E7E7E7] rounded-[8px] overflow-hidden">
              <Link href={`/rezepte/${r.id}`}>
                {/* Image */}
                {r.image_url && (
                  <div className="relative" style={{ height: 160 }}>
                    <Image
                      src={r.image_url}
                      alt={r.title}
                      fill
                      className="object-cover"
                      sizes="384px"
                    />
                    {/* Tag */}
                    {firstTag && (
                      <span className="absolute top-2.5 left-2.5 text-white text-[11px] font-semibold px-2 py-0.5 rounded-[4px] bg-[#4CAF50]">
                        {firstTag}
                      </span>
                    )}
                    {/* Heart */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setLiked((prev) => {
                          const next = new Set(prev);
                          next.has(r.id) ? next.delete(r.id) : next.add(r.id);
                          return next;
                        });
                      }}
                      className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm"
                    >
                      <Heart
                        className="w-4 h-4"
                        fill={liked.has(r.id) ? "#FF6600" : "none"}
                        stroke={liked.has(r.id) ? "#FF6600" : "#9d9d9d"}
                      />
                    </button>
                  </div>
                )}

                {/* Title */}
                <div className="px-3 pt-2.5 pb-1">
                  {r.category && (
                    <p className="text-[11px] font-semibold mb-0.5" style={{ color: "#FF6600" }}>
                      {r.category}
                    </p>
                  )}
                  <p className="text-[14px] font-semibold text-[#2e2e2e] leading-snug">{r.title}</p>
                </div>
              </Link>

              {/* Info + action */}
              <div className="px-3 pt-1 pb-3">
                <div className="flex items-center justify-between mt-2">
                  {totalTime > 0 && (
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#9d9d9d]" />
                      <span className="text-[12px] text-[#9d9d9d]">{totalTime} Min.</span>
                    </div>
                  )}
                  <button
                    onClick={() => setAddingRecipe(r)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] text-[12px] font-semibold transition-colors ml-auto"
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
