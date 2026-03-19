const offers = [
  {
    id: 1,
    label: "25%",
    labelColor: "#FF6600",
    name: "Vollmilch 1L",
    price: "CHF 1.15",
    originalPrice: "CHF 1.55",
    image: (
      <svg viewBox="0 0 80 80" className="w-14 h-14">
        <rect x="25" y="20" width="30" height="45" rx="5" fill="#E3F2FD" />
        <rect x="25" y="20" width="30" height="14" rx="5" fill="#BBDEFB" />
        <rect x="30" y="10" width="20" height="14" rx="3" fill="#90CAF9" />
        <rect x="35" y="6" width="10" height="8" rx="3" fill="#64B5F6" />
        <text x="40" y="52" textAnchor="middle" fill="#1565C0" fontSize="7" fontWeight="bold" fontFamily="Arial">LAIT</text>
        <text x="40" y="61" textAnchor="middle" fill="#1565C0" fontSize="6" fontFamily="Arial">1L</text>
      </svg>
    ),
  },
  {
    id: 2,
    label: "30%",
    labelColor: "#FF6600",
    name: "Erdbeer Jogurt",
    price: "CHF 0.85",
    originalPrice: "CHF 1.25",
    image: (
      <svg viewBox="0 0 80 80" className="w-14 h-14">
        <path d="M20 30 L25 65 L55 65 L60 30 Z" fill="#FFF9C4" />
        <rect x="20" y="22" width="40" height="12" rx="5" fill="#FFF176" />
        <ellipse cx="40" cy="22" rx="20" ry="5" fill="#F9A825" />
        <text x="40" y="50" textAnchor="middle" fill="#F57F17" fontSize="7" fontWeight="bold" fontFamily="Arial">Jogurt</text>
        <text x="40" y="60" textAnchor="middle" fill="#F57F17" fontSize="6" fontFamily="Arial">Erdbeer</text>
      </svg>
    ),
  },
  {
    id: 3,
    label: "NEU",
    labelColor: "#DC2626",
    name: "Dinkelbrot 500g",
    price: "CHF 3.90",
    originalPrice: null,
    image: (
      <svg viewBox="0 0 80 80" className="w-14 h-14">
        <ellipse cx="40" cy="50" rx="28" ry="18" fill="#A1887F" />
        <ellipse cx="40" cy="42" rx="28" ry="18" fill="#BCAAA4" />
        <ellipse cx="40" cy="40" rx="26" ry="16" fill="#D7CCC8" />
        <ellipse cx="40" cy="38" rx="22" ry="13" fill="#FFF8E1" />
        <path d="M30 33 Q35 28 50 33" fill="none" stroke="#D7CCC8" strokeWidth="1.5" strokeDasharray="3,2" />
      </svg>
    ),
  },
  {
    id: 4,
    label: "15%",
    labelColor: "#FF6600",
    name: "Mozzarella 125g",
    price: "CHF 1.70",
    originalPrice: "CHF 2.00",
    image: (
      <svg viewBox="0 0 80 80" className="w-14 h-14">
        <ellipse cx="40" cy="45" rx="24" ry="20" fill="#FAFAFA" stroke="#E0E0E0" strokeWidth="1" />
        <ellipse cx="40" cy="40" rx="22" ry="18" fill="white" />
        <ellipse cx="35" cy="36" rx="5" ry="4" fill="#F5F5F5" />
        <ellipse cx="48" cy="42" rx="4" ry="3" fill="#F5F5F5" />
      </svg>
    ),
  },
];

export default function OfferSection() {
  return (
    <div className="bg-white mt-2 px-4 pt-4 pb-6">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-base font-bold text-gray-900">Angebote in der Filiale</h2>
          <p className="text-xs text-gray-500 mt-0.5">Migros Aare</p>
        </div>
        <button className="text-sm font-semibold text-[#E8570A]">Alle anzeigen</button>
      </div>

      <div className="flex gap-3 overflow-x-auto no-scrollbar">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="flex-shrink-0 bg-gray-50 rounded-[8px] p-3 overflow-hidden"
            style={{ width: 140, boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}
          >
            <div className="relative mb-2">
              <span
                className="absolute top-0 left-0 text-white text-[10px] font-bold px-1.5 py-0.5 rounded"
                style={{ backgroundColor: offer.labelColor }}
              >
                {offer.label}
              </span>
              <div className="flex items-center justify-center bg-white rounded-[8px] h-20">
                {offer.image}
              </div>
            </div>
            <p className="text-xs text-gray-700 font-medium leading-tight">{offer.name}</p>
            <p className="text-sm font-bold text-gray-900 mt-1">{offer.price}</p>
            {offer.originalPrice && (
              <p className="text-xs text-gray-400 line-through">{offer.originalPrice}</p>
            )}
          </div>
        ))}
        <div className="flex-shrink-0 w-1" />
      </div>
    </div>
  );
}
