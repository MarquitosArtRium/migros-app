export default function EasterBanner() {
  return (
    <div className="bg-white mt-2 overflow-hidden">
      {/* Easter image area */}
      <div className="relative overflow-hidden" style={{ height: 200 }}>
        <svg viewBox="0 0 400 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="bg" cx="50%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#dcedc8" />
              <stop offset="100%" stopColor="#a5d6a7" />
            </radialGradient>
          </defs>
          <rect width="400" height="200" fill="url(#bg)" />

          {/* Left basket */}
          <path d="M80 125 Q85 108 130 103 Q175 108 180 125 L170 168 Q130 178 90 168 Z" fill="#A0780A" opacity="0.9" />
          <ellipse cx="130" cy="168" rx="52" ry="14" fill="#8B6914" opacity="0.8" />
          {[95, 115, 135, 155, 172].map((x, i) => (
            <line key={i} x1={x} y1={i === 0 ? 112 : i === 4 ? 112 : 103 + Math.abs(2 - i) * 2} x2={x - (i - 2) * 2} y2="168" stroke="#8B6914" strokeWidth="1.5" opacity="0.4" />
          ))}
          {/* Eggs */}
          <ellipse cx="105" cy="120" rx="14" ry="10" fill="#E91E63" transform="rotate(-20 105 120)" />
          <ellipse cx="128" cy="113" rx="12" ry="9" fill="#2196F3" transform="rotate(10 128 113)" />
          <ellipse cx="152" cy="116" rx="13" ry="10" fill="#FF9800" transform="rotate(-5 152 116)" />
          <ellipse cx="118" cy="132" rx="11" ry="9" fill="#9C27B0" />
          <ellipse cx="143" cy="130" rx="13" ry="9" fill="#4CAF50" transform="rotate(15 143 130)" />
          <circle cx="90" cy="148" r="7" fill="#5D4037" />
          <circle cx="170" cy="151" r="6" fill="#5D4037" />

          {/* Right basket with chocolate bunny */}
          <path d="M245 128 Q250 110 290 106 Q330 110 335 128 L328 168 Q290 176 252 168 Z" fill="#A0780A" opacity="0.9" />
          <ellipse cx="290" cy="168" rx="48" ry="13" fill="#8B6914" opacity="0.8" />
          {/* Bunny */}
          <ellipse cx="290" cy="122" rx="27" ry="31" fill="#5D3A1A" />
          <ellipse cx="290" cy="87" rx="21" ry="19" fill="#5D3A1A" />
          <ellipse cx="279" cy="57" rx="8" ry="21" fill="#5D3A1A" />
          <ellipse cx="279" cy="57" rx="4" ry="16" fill="#8D5524" />
          <ellipse cx="301" cy="54" rx="8" ry="21" fill="#5D3A1A" />
          <ellipse cx="301" cy="54" rx="4" ry="16" fill="#8D5524" />
          <circle cx="283" cy="84" r="3" fill="#8D5524" />
          <circle cx="297" cy="84" r="3" fill="#8D5524" />
          <circle cx="283" cy="83" r="1.5" fill="white" />
          <circle cx="297" cy="83" r="1.5" fill="white" />
          <ellipse cx="290" cy="92" rx="4" ry="2" fill="#D32F2F" opacity="0.7" />
          {/* Eggs in right basket */}
          <ellipse cx="265" cy="148" rx="11" ry="8" fill="#FF5722" transform="rotate(15 265 148)" />
          <ellipse cx="315" cy="146" rx="10" ry="8" fill="#00BCD4" transform="rotate(-10 315 146)" />

          {/* Scattered items */}
          <circle cx="50" cy="172" r="6" fill="#9C27B0" opacity="0.7" />
          <circle cx="200" cy="170" r="5" fill="#FF5722" opacity="0.7" />
          <circle cx="350" cy="172" r="7" fill="#4CAF50" opacity="0.7" />
          <circle cx="60" cy="112" r="4" fill="#FFF176" />
          <circle cx="340" cy="102" r="5" fill="#F8BBD0" />
        </svg>

        {/* Slide indicator dots */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-[#FF6600]" />
          <div className="w-2 h-2 rounded-full bg-gray-300" />
          <div className="w-2 h-2 rounded-full bg-gray-300" />
        </div>
      </div>

      <div className="px-4 py-3">
        <p className="text-sm font-medium text-gray-800">Das kommt ins Osternest</p>
      </div>
    </div>
  );
}
