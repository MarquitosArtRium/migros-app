interface DaySummaryProps {
  goal: number;
  eaten: number;
  sport: number;
}

function fmt(n: number) {
  return Math.round(n).toLocaleString("de-CH");
}

export function DaySummary({ goal, eaten, sport }: DaySummaryProps) {
  const remaining = goal - Math.round(eaten) + Math.round(sport);

  return (
    <div className="bg-white border border-[#d1d1d1] rounded-[8px] flex flex-col gap-5 py-4 overflow-hidden w-full">
      {/* Calorie equation */}
      <div className="flex items-start px-4">
        <CalCell value={fmt(goal)} label="Ziel" />
        <Op>−</Op>
        <CalCell value={fmt(eaten)} label="Essen" />
        <Op>+</Op>
        <CalCell value={fmt(sport)} label="Sport" />
        <Op>=</Op>
        <CalCell value={fmt(remaining)} label="Verbleibend" bold />
      </div>

      {/* Macro grid */}
      <div className="mx-4 border border-[#b0b0b0] rounded-[4px] overflow-hidden">
        <div className="flex divide-x divide-[#b0b0b0]">
          <MacroCell label="Protein" actual={0} target={150} />
          <MacroCell label="Fett" actual={0} target={70} />
          <MacroCell label="Kohlenhydrate" actual={0} target={200} />
        </div>
      </div>
    </div>
  );
}

function CalCell({ value, label, bold }: { value: string; label: string; bold?: boolean }) {
  return (
    <div className="flex-1 min-w-0 flex flex-col gap-1 text-center">
      <p className="text-[15px] leading-[15px] tracking-[0.08px] text-[#2e2e2e] whitespace-nowrap" style={{ fontWeight: bold ? 600 : 510 }}>
        {value}
      </p>
      <p className="text-[10px] leading-[14px] tracking-[0.05px] text-[#5d5d5d]" style={{ fontWeight: 510 }}>
        {label}
      </p>
    </div>
  );
}

function Op({ children }: { children: string }) {
  return (
    <div className="shrink-0 flex flex-col justify-center text-[15px] text-[#2e2e2e] px-0.5 pt-px" style={{ fontWeight: 510 }}>
      {children}
    </div>
  );
}

function MacroCell({ label, actual, target }: { label: string; actual: number; target: number }) {
  return (
    <div className="flex-1 min-w-0 flex flex-col items-center py-2 px-2">
      <p className="text-[12px] leading-[16px] text-[#2e2e2e] whitespace-nowrap" style={{ fontWeight: 510 }}>
        {Math.round(actual)}/{target} g
      </p>
      <p className="text-[10px] leading-[14px] text-[#5d5d5d]" style={{ fontWeight: 510 }}>
        {label}
      </p>
    </div>
  );
}
