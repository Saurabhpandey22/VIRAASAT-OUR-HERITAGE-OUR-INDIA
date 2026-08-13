import React from "react";

export const BackgroundMandala: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#0B132B] select-none">
      {/* Soft Ambient Kesari & Peacock Blue Lighting Glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-[#FF671F]/15 via-[#D4AF37]/10 to-transparent rounded-full blur-[140px]" />
      <div className="absolute bottom-0 right-1/4 w-[700px] h-[700px] bg-gradient-to-tl from-[#1C2541]/60 via-[#FF671F]/10 to-transparent rounded-full blur-[160px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-radial from-[#D4AF37]/5 via-transparent to-transparent blur-[180px]" />

      {/* Traditional Indian Jali Grid Pattern Overlay (Visible & Crisp) */}
      <div
        className="absolute inset-0 opacity-[0.06] mix-blend-screen"
        style={{
          backgroundImage: `radial-gradient(#D4AF37 1.5px, transparent 1.5px), radial-gradient(#FF671F 1.5px, #0B132B 1.5px)`,
          backgroundSize: `48px 48px`,
          backgroundPosition: `0 0, 24px 24px`,
        }}
      />

      {/* 1. Top-Left Rotating Peacock Mandala Art (Opacity 12%-15%) */}
      <div className="absolute -top-32 -left-32 w-[580px] h-[580px] opacity-[0.14] animate-[spin_160s_linear_infinite] text-[#D4AF37]">
        <PeacockMandalaSVG />
      </div>

      {/* 2. Bottom-Right Rotating Traditional Diya Mandala Art (Opacity 12%-15%) */}
      <div className="absolute -bottom-36 -right-36 w-[620px] h-[620px] opacity-[0.13] animate-[spin_180s_linear_infinite_reverse] text-[#FF671F]">
        <DiyaMandalaSVG />
      </div>

      {/* 3. Center-Right Rotating Rangoli Mandala Art (Opacity 12%-15%) */}
      <div className="absolute top-1/3 -right-24 w-[480px] h-[480px] opacity-[0.12] animate-[spin_120s_linear_infinite] text-[#D4AF37]">
        <RangoliMandalaSVG />
      </div>

      {/* 4. Top-Right Subtle Diya Accent (Opacity 12%) */}
      <div className="absolute top-12 right-12 w-[320px] h-[320px] opacity-[0.12] animate-[spin_100s_linear_infinite_reverse] text-[#FF671F]">
        <DiyaMandalaSVG />
      </div>
    </div>
  );
};

/* --- Peacock Incorporated in Mandala Art SVG --- */
const PeacockMandalaSVG = () => (
  <svg viewBox="0 0 600 600" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-full h-full">
    {/* Concentric Sacred Rings */}
    <circle cx="300" cy="300" r="280" strokeDasharray="6 10" strokeWidth="1.5" />
    <circle cx="300" cy="300" r="260" />
    <circle cx="300" cy="300" r="220" strokeDasharray="3 6" />
    <circle cx="300" cy="300" r="170" />
    <circle cx="300" cy="300" r="110" />
    <circle cx="300" cy="300" r="50" fill="currentColor" fillOpacity="0.1" />

    {/* 8 Radial Peacock Feathers with Crown Eyes */}
    {Array.from({ length: 8 }).map((_, i) => {
      const angle = (i * 45 * Math.PI) / 180;
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const xEye = 300 + 220 * cos;
      const yEye = 300 + 220 * sin;

      return (
        <g key={`peacock-${i}`}>
          {/* Feather Stem */}
          <line x1={300 + 50 * cos} y1={300 + 50 * sin} x2={xEye} y2={yEye} strokeWidth="1.5" />
          
          {/* Peacock Eye Motif */}
          <circle cx={xEye} cy={yEye} r="24" fill="currentColor" fillOpacity="0.15" strokeWidth="1.8" />
          <circle cx={xEye} cy={yEye} r="14" strokeWidth="1.2" />
          <circle cx={xEye} cy={yEye} r="6" fill="currentColor" />

          {/* Peacock Crown Crest Curves */}
          <path
            d={`M ${xEye - 20 * sin} ${yEye + 20 * cos} Q ${300 + 250 * cos} ${300 + 250 * sin} ${xEye + 20 * sin} ${yEye - 20 * cos}`}
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d={`M ${300 + 170 * Math.cos(angle - 0.2)} ${300 + 170 * Math.sin(angle - 0.2)} Q ${300 + 210 * cos} ${300 + 210 * sin} ${300 + 170 * Math.cos(angle + 0.2)} ${300 + 170 * Math.sin(angle + 0.2)}`}
            strokeWidth="1.2"
          />
        </g>
      );
    })}

    {/* Intersecting Star Polygon */}
    <polygon
      points="300,40 350,210 520,130 400,260 560,300 400,340 520,470 350,390 300,560 250,390 80,470 200,340 40,300 200,260 80,130 250,210"
      strokeOpacity="0.6"
      strokeWidth="1.2"
    />
  </svg>
);

/* --- Traditional Diya (Deepak) in Mandala Art SVG --- */
const DiyaMandalaSVG = () => (
  <svg viewBox="0 0 600 600" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-full h-full">
    <circle cx="300" cy="300" r="280" strokeDasharray="4 8" />
    <circle cx="300" cy="300" r="250" />
    <circle cx="300" cy="300" r="190" strokeDasharray="2 4" />
    <circle cx="300" cy="300" r="130" />
    <circle cx="300" cy="300" r="60" />

    {/* 12 Radiating Deepams / Diyas around circle */}
    {Array.from({ length: 12 }).map((_, i) => {
      const angle = (i * 30 * Math.PI) / 180;
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const xBase = 300 + 190 * cos;
      const yBase = 300 + 190 * sin;
      const xTip = 300 + 245 * cos;
      const yTip = 300 + 245 * sin;

      return (
        <g key={`diya-${i}`}>
          {/* Diya Bowl Curve */}
          <path
            d={`M ${xBase - 16 * sin} ${yBase + 16 * cos} Q ${xTip} ${yTip} ${xBase + 16 * sin} ${yBase - 16 * cos}`}
            fill="currentColor"
            fillOpacity="0.12"
            strokeWidth="1.5"
          />
          {/* Diya Flame */}
          <path
            d={`M ${xTip} ${yTip} C ${xTip + 12 * cos - 8 * sin} ${yTip + 12 * sin + 8 * cos}, ${xTip + 25 * cos} ${yTip + 25 * sin}, ${xTip + 30 * cos} ${yTip + 30 * sin} C ${xTip + 25 * cos} ${yTip + 25 * sin}, ${xTip + 12 * cos + 8 * sin} ${yTip + 12 * sin - 8 * cos}, ${xTip} ${yTip}`}
            fill="currentColor"
            fillOpacity="0.25"
            strokeWidth="1.5"
          />
        </g>
      );
    })}

    {/* Radiating Light Rays */}
    {Array.from({ length: 24 }).map((_, i) => {
      const angle = (i * 15 * Math.PI) / 180;
      return (
        <line
          key={`ray-${i}`}
          x1={300 + 60 * Math.cos(angle)}
          y1={300 + 60 * Math.sin(angle)}
          x2={300 + 125 * Math.cos(angle)}
          y2={300 + 125 * Math.sin(angle)}
          strokeWidth="1"
          strokeOpacity="0.7"
        />
      );
    })}
  </svg>
);

/* --- Geometric Traditional Rangoli / Kolam Mandala Art SVG --- */
const RangoliMandalaSVG = () => (
  <svg viewBox="0 0 500 500" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-full h-full">
    <circle cx="250" cy="250" r="230" strokeDasharray="5 5" />
    <circle cx="250" cy="250" r="200" />
    <circle cx="250" cy="250" r="150" />
    <circle cx="250" cy="250" r="100" strokeDasharray="3 6" />
    <circle cx="250" cy="250" r="45" />

    {/* 16 Rangoli Petal Loops */}
    {Array.from({ length: 16 }).map((_, i) => {
      const angle = (i * 22.5 * Math.PI) / 180;
      const x1 = 250 + 100 * Math.cos(angle);
      const y1 = 250 + 100 * Math.sin(angle);
      const x2 = 250 + 200 * Math.cos(angle);
      const y2 = 250 + 200 * Math.sin(angle);

      return (
        <g key={`rangoli-${i}`}>
          <line x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth="1.2" />
          <path
            d={`M 250 250 Q ${250 + 160 * Math.cos(angle + 0.2)} ${250 + 160 * Math.sin(angle + 0.2)} ${x2} ${y2}`}
            strokeWidth="1"
            fill="currentColor"
            fillOpacity="0.05"
          />
        </g>
      );
    })}

    {/* 8 Pointed Square Rangoli Grid */}
    <rect x="100" y="100" width="300" height="300" rx="20" strokeWidth="1.5" strokeOpacity="0.5" />
    <rect x="100" y="100" width="300" height="300" rx="20" transform="rotate(45 250 250)" strokeWidth="1.5" strokeOpacity="0.5" />
  </svg>
);
