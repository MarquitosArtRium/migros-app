"use client";
import { useState } from "react";
import BottomNav from "@/components/BottomNav";
import CumulusButton from "@/components/CumulusButton";
import EasterBanner from "@/components/EasterBanner";
import Header from "@/components/Header";
import OfferSection from "@/components/OfferSection";
import WeekendDeals from "@/components/WeekendDeals";

export type Mode = "store" | "delivery";

export default function Home() {
  const [mode, setMode] = useState<Mode>("store");

  return (
    <div className="flex flex-col min-h-dvh max-w-sm mx-auto bg-[#F0F0F0] relative">
      <div className="flex-1 overflow-y-auto no-scrollbar pb-40">
        <Header mode={mode} setMode={setMode} />
        <EasterBanner />
        <WeekendDeals />
        <OfferSection />
      </div>

      <CumulusButton />
      <BottomNav mode={mode} />
    </div>
  );
}
