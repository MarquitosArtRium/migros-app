import { ClipboardAddIcon } from "@/components/icons";

const deals = [
  {
    id: 1,
    discount: "30%",
    title: "Gesamtes Baby- und Kinderbekleidungs-Sortiment",
    cta: "99+ Produkte ansehen",
    image: (
      <svg viewBox="0 0 160 100" className="w-full h-full">
        <path d="M15 35 Q15 25 25 25 L40 30 L55 25 Q65 25 65 35 L65 80 L15 80 Z" fill="#F48FB1" />
        <rect x="25" y="58" width="30" height="16" rx="3" fill="#EC407A" opacity="0.6" />
        <path d="M75 30 Q75 22 83 22 L95 27 L107 22 Q115 22 115 30 L115 80 L75 80 Z" fill="#42A5F5" />
        <path d="M83 22 L95 30 L107 22" fill="#1E88E5" />
        <rect x="20" y="80" width="22" height="26" rx="3" fill="#EF5350" />
        <rect x="45" y="80" width="22" height="26" rx="3" fill="#EF5350" />
        <rect x="78" y="80" width="22" height="26" rx="3" fill="#1565C0" />
        <rect x="103" y="80" width="22" height="26" rx="3" fill="#1565C0" />
      </svg>
    ),
  },
  {
    id: 2,
    discount: "20%",
    title: "Körperpflege & Kosmetik-Sortiment",
    cta: "Produkte ansehen",
    image: (
      <svg viewBox="0 0 120 100" className="w-full h-full">
        <path d="M35 20 Q35 12 55 12 Q75 12 75 20 L78 75 L32 75 Z" fill="#E1BEE7" />
        <rect x="35" y="20" width="40" height="22" rx="5" fill="#CE93D8" />
        <rect x="50" y="8" width="20" height="16" rx="4" fill="#BA68C8" />
        <rect x="55" y="4" width="10" height="8" rx="3" fill="#AB47BC" />
        <rect x="38" y="46" width="34" height="2" rx="1" fill="#9C27B0" opacity="0.4" />
        <rect x="40" y="52" width="24" height="2" rx="1" fill="#9C27B0" opacity="0.3" />
      </svg>
    ),
  },
];

export default function WeekendDeals() {
  return (
    <div className="mt-2">
      {/* Section header */}
      <div className="bg-[#6B2370] px-4 py-3">
        <h2 className="text-base font-bold text-white">Wochenend-Knaller</h2>
        <p className="text-sm text-purple-200 mt-0.5">Nur diesen Donnerstag bis Sonntag</p>
      </div>

      {/* Horizontal scrollable cards */}
      <div className="bg-[#6B2370] pb-4 px-4">
        <div className="flex gap-3 overflow-x-auto no-scrollbar">
          {deals.map((deal) => (
            <div
              key={deal.id}
              className="bg-white rounded-[8px] flex-shrink-0 overflow-hidden"
              style={{ width: 220, boxShadow: "0 2px 8px rgba(0,0,0,0.12)" }}
            >
              {/* Image area */}
              <div className="relative bg-gray-50" style={{ height: 110 }}>
                <button className="absolute top-2 right-2 bg-white rounded-[8px] p-1.5 shadow-sm z-10">
                  <ClipboardAddIcon className="w-4 h-4 text-gray-600" />
                </button>
                <div className="absolute top-2 left-2 bg-[#FF6600] text-white text-xs font-bold px-2 py-0.5 rounded z-10">
                  {deal.discount}
                </div>
                <div className="flex items-center justify-center w-full h-full p-3">
                  {deal.image}
                </div>
              </div>

              {/* Text */}
              <div className="px-3 pb-3 pt-2">
                <p className="text-xs font-semibold text-gray-800 leading-tight mb-2 line-clamp-2">
                  {deal.title}...
                </p>
                <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium py-2 rounded-[8px] transition-colors">
                  {deal.cta}
                </button>
              </div>
            </div>
          ))}
          {/* Spacer */}
          <div className="flex-shrink-0 w-1" />
        </div>
      </div>
    </div>
  );
}
