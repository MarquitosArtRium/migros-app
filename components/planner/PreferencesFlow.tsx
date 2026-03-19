"use client";

import { useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
}

const ORANGE = "#FF6600";
const ORANGE_BG = "#FFF3ED";

const VALUE_LABELS = ["nie", "selten", "ab und zu", "regelmäßig", "täglich"];

function Slider({
  emoji,
  label,
  value,
  onChange,
}: {
  emoji: string;
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  const pct = value / 4;

  return (
    <div className="mb-8">
      <div className="mb-3 text-sm font-medium text-gray-700">
        <span style={{ color: ORANGE }}>{VALUE_LABELS[value]}</span>{" "}
        <span>{label}</span>
      </div>
      <div className="relative flex items-center" style={{ height: 64 }}>
        {/* Track */}
        <div className="absolute left-0 right-0 h-[2px] bg-gray-200 rounded-full" style={{ top: "50%", transform: "translateY(-50%)" }} />
        {/* Filled track */}
        <div
          className="absolute left-0 h-[2px] rounded-full"
          style={{
            width: `${pct * 100}%`,
            backgroundColor: ORANGE,
            top: "50%",
            transform: "translateY(-50%)",
          }}
        />
        {/* Thumb */}
        <div
          className="absolute flex items-center justify-center bg-white rounded-full shadow-md select-none pointer-events-none"
          style={{
            width: 64,
            height: 64,
            left: `calc(${pct * 100}% - ${pct * 64}px)`,
            top: "50%",
            transform: "translateY(-50%)",
            fontSize: 28,
            border: `2px solid ${ORANGE}`,
          }}
        >
          {emoji}
        </div>
        {/* Native range input overlaid */}
        <input
          type="range"
          min={0}
          max={4}
          step={1}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full opacity-0 cursor-pointer z-10"
          style={{ height: "100%" }}
        />
      </div>
    </div>
  );
}

const DISLIKES = [
  "Oliven",
  "Chicorée",
  "Rosenkohl",
  "Spinat",
  "Pilze",
  "Koriander",
  "Rosinen",
  "Kümmel",
  "Knoblauch",
  "Schweinefleisch",
  "Käse",
];

const PRIORITIES = [
  { emoji: "🚀", label: "Schnelle Rezepte" },
  { emoji: "👶", label: "Kinderfreundlich" },
  { emoji: "🥬", label: "Viel Gemüse" },
  { emoji: "💰", label: "Budgetfreundlich" },
  { emoji: "🥗", label: "Wenig Kalorien" },
  { emoji: "👨‍🍳", label: "Inspiration" },
  { emoji: "🍂", label: "Saisonal kochen" },
];

const DEVICES = [
  { emoji: "🍳", label: "Herd" },
  { emoji: "🥘", label: "Ofen" },
  { emoji: "📡", label: "Mikrowelle" },
  { emoji: "🔧", label: "Rührgerät" },
  { emoji: "🥤", label: "Mixer" },
  { emoji: "🪄", label: "Pürierstab" },
  { emoji: "🍟", label: "Fritteuse" },
  { emoji: "💨", label: "Airfryer" },
  { emoji: "🔥", label: "Grill" },
  { emoji: "⚙️", label: "Thermomix" },
];

function CheckboxIcon({ checked }: { checked: boolean }) {
  if (checked) {
    return (
      <div
        className="flex items-center justify-center flex-shrink-0"
        style={{
          width: 22,
          height: 22,
          borderRadius: 4,
          backgroundColor: ORANGE,
        }}
      >
        <svg width="13" height="10" viewBox="0 0 13 10" fill="none">
          <path
            d="M1.5 5L5 8.5L11.5 1.5"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    );
  }
  return (
    <div
      className="flex-shrink-0"
      style={{
        width: 22,
        height: 22,
        borderRadius: 4,
        border: "2px solid #D1D5DB",
        backgroundColor: "white",
      }}
    />
  );
}

export default function PreferencesFlow({ open, onClose }: Props) {
  const [step, setStep] = useState(1);

  // Step 1 state
  const [fleisch, setFleisch] = useState(2);
  const [fisch, setFisch] = useState(1);
  const [vegetarisch, setVegetarisch] = useState(2);

  // Step 2 state
  const [dislikes, setDislikes] = useState<Set<string>>(new Set());

  // Step 3 state
  const [priorities, setPriorities] = useState<Set<string>>(new Set());

  // Step 4 state
  const [portions, setPortions] = useState(4);
  const [devices, setDevices] = useState<Set<string>>(new Set(["Herd"]));

  if (!open) return null;

  function handleBack() {
    if (step === 1) {
      onClose();
    } else {
      setStep((s) => s - 1);
    }
  }

  function handleNext() {
    if (step < 4) {
      setStep((s) => s + 1);
    } else {
      onClose();
    }
  }

  function toggleDislike(item: string) {
    setDislikes((prev) => {
      const next = new Set(prev);
      if (next.has(item)) next.delete(item);
      else next.add(item);
      return next;
    });
  }

  function togglePriority(item: string) {
    setPriorities((prev) => {
      const next = new Set(prev);
      if (next.has(item)) next.delete(item);
      else next.add(item);
      return next;
    });
  }

  function toggleDevice(item: string) {
    setDevices((prev) => {
      const next = new Set(prev);
      if (next.has(item)) next.delete(item);
      else next.add(item);
      return next;
    });
  }

  return (
    <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
      <div className="max-w-sm mx-auto flex flex-col min-h-full px-5 pt-4 pb-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={handleBack}
            className="flex items-center justify-center w-10 h-10 text-gray-600 hover:text-gray-900 transition-colors"
            aria-label="Zurück"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M12.5 15L7.5 10L12.5 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <span className="text-sm text-gray-400 font-medium">Schritt {step}/4</span>
          <div className="w-10" />
        </div>

        {/* Step 1 */}
        {step === 1 && (
          <>
            <h1 className="text-2xl font-bold text-gray-900 mb-8">
              Was esst ihr gerne?
            </h1>
            <Slider emoji="🥩" label="Fleisch" value={fleisch} onChange={setFleisch} />
            <Slider emoji="🐟" label="Fisch" value={fisch} onChange={setFisch} />
            <Slider emoji="🥬" label="Vegetarisch" value={vegetarisch} onChange={setVegetarisch} />
            <div className="mt-auto pt-6">
              <button
                onClick={handleNext}
                className="w-full py-4 text-white font-semibold text-base transition-opacity hover:opacity-90 active:opacity-80"
                style={{ backgroundColor: ORANGE, borderRadius: 8 }}
              >
                Weiter
              </button>
            </div>
          </>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              Was mögt ihr gar nicht?
            </h1>
            <p className="text-sm text-gray-500 mb-6">
              Wir versuchen, dies zu berücksichtigen.
            </p>
            <div className="flex flex-wrap gap-2">
              {DISLIKES.map((item) => {
                const selected = dislikes.has(item);
                return (
                  <button
                    key={item}
                    onClick={() => toggleDislike(item)}
                    className="px-4 py-2 text-sm font-medium border transition-colors"
                    style={{
                      borderRadius: 8,
                      backgroundColor: selected ? ORANGE_BG : "white",
                      borderColor: selected ? ORANGE : "#E5E7EB",
                      color: selected ? ORANGE : "#6B7280",
                    }}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
            <div className="mt-auto pt-6">
              <button
                onClick={handleNext}
                className="w-full py-4 text-white font-semibold text-base transition-opacity hover:opacity-90 active:opacity-80"
                style={{ backgroundColor: ORANGE, borderRadius: 8 }}
              >
                Weiter
              </button>
            </div>
          </>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <>
            <h1 className="text-2xl font-bold text-gray-900 mb-6">
              Was ist euch wichtig?
            </h1>
            <div className="flex flex-col divide-y divide-gray-100">
              {PRIORITIES.map((item) => {
                const checked = priorities.has(item.label);
                return (
                  <button
                    key={item.label}
                    onClick={() => togglePriority(item.label)}
                    className="flex items-center gap-4 py-4 text-left"
                  >
                    <span className="text-2xl w-8 text-center flex-shrink-0">{item.emoji}</span>
                    <span className="flex-1 text-base font-medium text-gray-800">
                      {item.label}
                    </span>
                    <CheckboxIcon checked={checked} />
                  </button>
                );
              })}
            </div>
            <div className="mt-auto pt-6">
              <button
                onClick={handleNext}
                className="w-full py-4 text-white font-semibold text-base transition-opacity hover:opacity-90 active:opacity-80"
                style={{ backgroundColor: ORANGE, borderRadius: 8 }}
              >
                Weiter
              </button>
            </div>
          </>
        )}

        {/* Step 4 */}
        {step === 4 && (
          <>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              Euer Haushalt
            </h1>
            <p className="text-sm text-gray-500 mb-8">
              Wie viele Portionen esst ihr pro Mahlzeit?
            </p>

            {/* Portions stepper */}
            <div className="flex items-center justify-center gap-6 mb-10">
              <button
                onClick={() => setPortions((p) => Math.max(1, p - 1))}
                className="flex items-center justify-center w-12 h-12 bg-gray-100 text-gray-700 text-xl font-semibold hover:bg-gray-200 transition-colors active:bg-gray-300"
                style={{ borderRadius: 8 }}
                aria-label="Portionen verringern"
              >
                −
              </button>
              <div className="text-center min-w-[90px]">
                <div className="text-4xl font-bold text-gray-900">{portions}</div>
                <div className="text-xs text-gray-400 mt-1 leading-tight">
                  Portionen<br />Pro Mahlzeit
                </div>
              </div>
              <button
                onClick={() => setPortions((p) => Math.min(12, p + 1))}
                className="flex items-center justify-center w-12 h-12 bg-gray-100 text-gray-700 text-xl font-semibold hover:bg-gray-200 transition-colors active:bg-gray-300"
                style={{ borderRadius: 8 }}
                aria-label="Portionen erhöhen"
              >
                +
              </button>
            </div>

            <h2 className="text-base font-semibold text-gray-900 mb-4">
              Welche Geräte benutzt ihr?
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {DEVICES.map((device) => {
                const selected = devices.has(device.label);
                return (
                  <button
                    key={device.label}
                    onClick={() => toggleDevice(device.label)}
                    className="flex items-center gap-3 p-4 border text-left transition-colors"
                    style={{
                      borderRadius: 8,
                      backgroundColor: selected ? ORANGE_BG : "white",
                      borderColor: selected ? ORANGE : "#E5E7EB",
                    }}
                  >
                    <span className="text-2xl flex-shrink-0">{device.emoji}</span>
                    <span
                      className="text-sm font-medium"
                      style={{ color: selected ? ORANGE : "#374151" }}
                    >
                      {device.label}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-auto pt-6">
              <button
                onClick={handleNext}
                className="w-full py-4 text-white font-semibold text-base transition-opacity hover:opacity-90 active:opacity-80"
                style={{ backgroundColor: ORANGE, borderRadius: 8 }}
              >
                Speichern
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
