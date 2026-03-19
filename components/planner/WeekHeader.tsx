"use client";
import { useEffect, useRef, useState } from "react";
import { format, parseISO } from "date-fns";

const ORANGE = "#FF6600";
const DE_DAYS = ["MO", "DI", "MI", "DO", "FR", "SA", "SO"];
const SWIPE_THRESHOLD = 50;

export type PlanTab = "Wochenplan" | "Rezepte" | "Bestellt";
export const PLAN_TABS: PlanTab[] = ["Wochenplan", "Rezepte", "Bestellt"];

export function sameDay(a: Date, b: Date) {
  return format(a, "yyyy-MM-dd") === format(b, "yyyy-MM-dd");
}

interface WeekHeaderProps {
  weekDays: Date[];
  selectedDate: Date;
  today: Date;
  activeTab: PlanTab;
  onTabChange: (tab: PlanTab) => void;
  onSelectDate: (d: Date) => void;
  onPrevWeek: () => void;
  onNextWeek: () => void;
  onPrevDay: () => void;
  onNextDay: () => void;
  onToday: () => void;
}

export function WeekHeader({
  weekDays, selectedDate, today, activeTab, onTabChange,
  onSelectDate, onPrevWeek, onNextWeek, onPrevDay, onNextDay, onToday,
}: WeekHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const spacerRef = useRef<HTMLDivElement>(null);
  const pillsRowRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const animating = useRef(false);

  const showDateRow = activeTab === "Wochenplan";
  const isCurrentWeek = weekDays.some((d) => sameDay(d, today));
  const showNavRow = showDateRow && !isCurrentWeek;

  useEffect(() => {
    let el: Element | null = spacerRef.current?.parentElement ?? null;
    while (el && el !== document.documentElement) {
      const ov = window.getComputedStyle(el).overflowY;
      if (ov === "auto" || ov === "scroll") break;
      el = el.parentElement;
    }
    const target: EventTarget = el ?? window;
    const getTop = () => (el ? (el as HTMLElement).scrollTop : window.scrollY);
    const onScroll = () => setScrolled(getTop() > 8);
    target.addEventListener("scroll", onScroll, { passive: true });
    return () => target.removeEventListener("scroll", onScroll);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (animating.current) return;
    touchStartX.current = e.touches[0].clientX;
    const el = pillsRowRef.current;
    if (el) el.style.transition = "none";
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (animating.current) return;
    const dx = e.touches[0].clientX - touchStartX.current;
    const el = pillsRowRef.current;
    if (el) el.style.transform = `translateX(${dx}px)`;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (animating.current) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const el = pillsRowRef.current;
    if (!el) return;
    if (Math.abs(dx) < SWIPE_THRESHOLD) {
      el.style.transition = "transform 250ms ease";
      el.style.transform = "translateX(0)";
      return;
    }
    animating.current = true;
    const dir = dx < 0 ? -1 : 1;
    el.style.transition = "transform 200ms ease";
    el.style.transform = `translateX(${dir * 100}%)`;
    setTimeout(() => {
      if (dir < 0) onNextWeek(); else onPrevWeek();
      el.style.transition = "none";
      el.style.transform = `translateX(${dir * -100}%)`;
      requestAnimationFrame(() => requestAnimationFrame(() => {
        el.style.transition = "transform 200ms ease";
        el.style.transform = "translateX(0)";
        setTimeout(() => { animating.current = false; }, 200);
      }));
    }, 200);
  };

  // Compact heights depending on tab + scroll + whether nav row is visible
  const baseH = showDateRow
    ? showNavRow
      ? (scrolled ? 196 : 224)
      : (scrolled ? 158 : 182)
    : (scrolled ? 110 : 120);
  const pt = scrolled ? 10 : 14;
  const pb = scrolled ? 10 : 14;
  const titleSize = scrolled ? "17px" : "22px";

  const dateValue = format(selectedDate, "yyyy-MM-dd");
  const monthLabel = format(selectedDate, "MMMM yyyy");

  const getPillStyle = (day: Date): React.CSSProperties => {
    if (sameDay(day, selectedDate)) return { background: ORANGE, color: "#fff", border: `2px solid ${ORANGE}` };
    if (sameDay(day, today)) return { background: "transparent", color: ORANGE, border: `2px solid ${ORANGE}` };
    return { background: "transparent", color: "#6D6D6D", border: "2px solid #E7E7E7" };
  };

  const pillBase: React.CSSProperties = {
    cursor: "pointer", borderRadius: "50%", aspectRatio: "1",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontWeight: 590, lineHeight: 1, padding: 0, width: "100%", maxWidth: "44px",
  };

  const navWrapper: React.CSSProperties = {
    display: "flex", border: "1px solid #E7E7E7", borderRadius: "8px",
    overflow: "hidden", background: "#E7E7E7", gap: "1px",
  };

  const navBtn: React.CSSProperties = {
    border: "none", cursor: "pointer", color: "#2E2E2E", lineHeight: 1, background: "#fff",
  };

  return (
    <>
      {/* Spacer */}
      <div
        ref={spacerRef}
        style={{ height: baseH, transition: "height 150ms ease", flexShrink: 0 }}
      />

      {/* Fixed header */}
      <div
        className="fixed top-0 z-30 bg-white border-b border-[#E7E7E7] w-full max-w-sm"
        style={{ left: "50%", transform: "translateX(-50%)" }}
      >
        <div style={{ padding: `${pt}px 16px ${pb}px`, transition: "padding 150ms ease" }}>

          {/* Row 1: title */}
          <h1 style={{ fontSize: titleSize, fontWeight: 700, color: "#2E2E2E", margin: 0, transition: "font-size 150ms ease" }}>
            Planen
          </h1>

          {/* Row 2: segmented tab toggle */}
          <div className="flex bg-[#F0F0F0] rounded-[8px] p-1 mt-2.5">
            {PLAN_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => onTabChange(tab)}
                className="flex-1 text-[13px] py-1.5 rounded-[6px] transition-all"
                style={{
                  fontWeight: activeTab === tab ? 600 : 500,
                  color: activeTab === tab ? "#2E2E2E" : "#8E8E8E",
                  background: activeTab === tab ? "#fff" : "transparent",
                  boxShadow: activeTab === tab ? "0 1px 3px rgba(0,0,0,0.12)" : "none",
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Row 3: date selector — only for Wochenplan */}
          {showDateRow && (
            <>
              {/* Month label + nav — only when not on the current week */}
              {showNavRow && (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 10 }}>
                  <div style={{ position: "relative", display: "inline-flex", alignItems: "center" }}>
                    <button style={{ background: "none", border: "none", outline: "none", padding: "4px 0", fontSize: "14px", fontWeight: 510, cursor: "pointer", color: ORANGE, display: "flex", alignItems: "center", gap: "5px" }}>
                      {monthLabel}
                      <svg width="11" height="6" viewBox="0 0 12 7" fill="none"><path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </button>
                    <input
                      type="date"
                      value={dateValue}
                      onChange={(e) => { if (e.target.value) onSelectDate(parseISO(e.target.value)); }}
                      style={{ position: "absolute", inset: 0, opacity: 0, width: "100%", height: "100%", cursor: "pointer" }}
                    />
                  </div>
                  <div style={navWrapper}>
                    <button style={{ ...navBtn, padding: "8px 13px", fontSize: "16px" }} onClick={onPrevDay}>‹</button>
                    <button style={{ ...navBtn, padding: "8px 13px", fontSize: "13px", fontWeight: 510, whiteSpace: "nowrap" }} onClick={onToday}>Heute</button>
                    <button style={{ ...navBtn, padding: "8px 13px", fontSize: "16px" }} onClick={onNextDay}>›</button>
                  </div>
                </div>
              )}

              {/* Day pills */}
              <div
                style={{ overflow: "hidden", marginTop: 8 }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <div ref={pillsRowRef} style={{ display: "flex", justifyContent: "space-between" }}>
                  {weekDays.map((day, i) => (
                    <div
                      key={i}
                      onClick={() => onSelectDate(day)}
                      style={{ flex: "none", width: "42px", display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer", gap: "3px" }}
                    >
                      <div style={{ fontSize: "10px", fontWeight: 510, color: sameDay(day, selectedDate) ? ORANGE : "#6D6D6D", letterSpacing: "0.3px" }}>
                        {DE_DAYS[(day.getDay() + 6) % 7]}
                      </div>
                      <div style={{ ...pillBase, ...getPillStyle(day) }}>
                        <span style={{ fontSize: "13px" }}>{format(day, "d")}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
