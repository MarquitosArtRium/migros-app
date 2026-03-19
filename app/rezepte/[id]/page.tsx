"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, Clock, Users, ShoppingCart, ChefHat, ExternalLink } from "lucide-react";
import { supabase } from "@/lib/supabase";

type Ingredient = {
  name: string;
  unit: string | null;
  amount: string;
};

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
  ingredients?: Ingredient[];
  steps?: string[];
  source_url?: string;
};

export default function RecipeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("recipes")
      .select("*")
      .eq("id", id)
      .single()
      .then(({ data }) => {
        setRecipe(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F5F5F5]">
        <p className="text-[14px] text-gray-400">Wird geladen...</p>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F5F5F5]">
        <p className="text-[14px] text-gray-400">Rezept nicht gefunden.</p>
      </div>
    );
  }

  const totalTime = (recipe.prep_time ?? 0) + (recipe.cook_time ?? 0);

  return (
    <div className="min-h-screen bg-[#F5F5F5]" style={{ maxWidth: 390, margin: "0 auto" }}>
      {/* Hero image */}
      <div className="relative bg-gray-200" style={{ height: 280 }}>
        {recipe.image_url && (
          <Image
            src={recipe.image_url}
            alt={recipe.title}
            fill
            className="object-cover"
            sizes="390px"
            priority
          />
        )}
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />

        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="absolute top-4 left-4 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center shadow-sm"
        >
          <ArrowLeft className="w-5 h-5 text-[#2e2e2e]" />
        </button>

        {/* Category badge */}
        {recipe.category && (
          <span className="absolute bottom-4 left-4 text-white text-[11px] font-semibold px-2.5 py-1 rounded-[6px] bg-[#FF6600]">
            {recipe.category}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="px-4 pt-4 pb-24">
        {/* Tags */}
        {recipe.tags && recipe.tags.length > 0 && (
          <div className="flex gap-1.5 flex-wrap mb-2">
            {recipe.tags.map((tag) => (
              <span key={tag} className="text-[11px] font-semibold px-2 py-0.5 rounded-[4px] bg-[#E8F5E9] text-[#2E7D32]">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h1 className="text-[22px] font-bold text-[#2e2e2e] leading-tight mb-3">
          {recipe.title}
        </h1>

        {/* Info bar */}
        <div className="flex gap-3 mb-4">
          {totalTime > 0 && (
            <div className="flex items-center gap-1.5 bg-white rounded-[8px] px-3 py-2 flex-1 justify-center">
              <Clock className="w-4 h-4 text-[#FF6600]" />
              <div>
                <p className="text-[10px] text-gray-400 leading-none">Zeit</p>
                <p className="text-[13px] font-semibold text-[#2e2e2e]">{totalTime} Min.</p>
              </div>
            </div>
          )}
          {recipe.prep_time && (
            <div className="flex items-center gap-1.5 bg-white rounded-[8px] px-3 py-2 flex-1 justify-center">
              <ChefHat className="w-4 h-4 text-[#FF6600]" />
              <div>
                <p className="text-[10px] text-gray-400 leading-none">Vorbereitung</p>
                <p className="text-[13px] font-semibold text-[#2e2e2e]">{recipe.prep_time} Min.</p>
              </div>
            </div>
          )}
          {recipe.servings && (
            <div className="flex items-center gap-1.5 bg-white rounded-[8px] px-3 py-2 flex-1 justify-center">
              <Users className="w-4 h-4 text-[#FF6600]" />
              <div>
                <p className="text-[10px] text-gray-400 leading-none">Personen</p>
                <p className="text-[13px] font-semibold text-[#2e2e2e]">{recipe.servings}</p>
              </div>
            </div>
          )}
        </div>

        {/* Description */}
        {recipe.description && (
          <p className="text-[14px] text-[#5d5d5d] leading-relaxed mb-5">
            {recipe.description}
          </p>
        )}

        {/* Ingredients */}
        {recipe.ingredients && recipe.ingredients.length > 0 && (
          <div className="mb-5">
            <div className="flex items-center gap-2 mb-3">
              <ShoppingCart className="w-4 h-4 text-[#FF6600]" />
              <h2 className="text-[16px] font-bold text-[#2e2e2e]">Zutaten</h2>
            </div>
            <div className="bg-white rounded-[12px] overflow-hidden">
              {recipe.ingredients.map((ing, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between px-4 py-3"
                  style={{ borderBottom: i < recipe.ingredients!.length - 1 ? "1px solid #F0F0F0" : "none" }}
                >
                  <span className="text-[14px] text-[#2e2e2e]">{ing.name}</span>
                  {(ing.amount || ing.unit) && (
                    <span className="text-[13px] font-semibold text-[#5d5d5d]">
                      {ing.amount}{ing.unit ? ` ${ing.unit}` : ""}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Steps */}
        {recipe.steps && recipe.steps.length > 0 && (
          <div className="mb-5">
            <div className="flex items-center gap-2 mb-3">
              <ChefHat className="w-4 h-4 text-[#FF6600]" />
              <h2 className="text-[16px] font-bold text-[#2e2e2e]">Zubereitung</h2>
            </div>
            <div className="flex flex-col gap-3">
              {recipe.steps.map((step, i) => (
                <div key={i} className="flex gap-3 bg-white rounded-[12px] p-4">
                  <div
                    className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-white text-[11px] font-bold mt-0.5"
                    style={{ background: "#FF6600" }}
                  >
                    {i + 1}
                  </div>
                  <p className="text-[14px] text-[#2e2e2e] leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Source link */}
        {recipe.source_url && (
          <a
            href={recipe.source_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-[8px] border border-[#E7E7E7] bg-white text-[13px] font-semibold text-[#5d5d5d]"
          >
            <ExternalLink className="w-4 h-4" />
            Originalrezept auf Migusto
          </a>
        )}
      </div>
    </div>
  );
}
