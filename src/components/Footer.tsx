import React from "react";
import { useViraasat } from "../context/ViraasatContext";
import { Sparkles } from "lucide-react";

export const Footer: React.FC = () => {
  const { setActiveTab } = useViraasat();

  return (
    <footer className="w-full bg-[#0B132B] border-t border-[#D4AF37]/30 text-[#FAF9F6] py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden z-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Col 1: Brand & Sanskrit Motto */}
        <div className="space-y-3 md:col-span-1">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-serif">🕉️</span>
            <h3 className="text-xl font-bold font-serif text-transparent bg-clip-text bg-gradient-to-r from-[#FAF9F6] via-[#D4AF37] to-[#FF671F]">
              Viraasat
            </h3>
          </div>
          <p className="text-xs text-[#D4AF37] font-serif italic">
            "अतिथिदेवो भव" (Atithi Devo Bhava) • Our Heritage. Our India.
          </p>
          <p className="text-xs text-gray-400 leading-relaxed font-sans">
            Smart Tourism Platform celebrating Indian Legacy, Sacred Architecture, and Visual Cultural Storytelling.
          </p>
        </div>

        {/* Col 2: Navigation Links */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#FF671F] font-serif">
            Quick Navigation
          </h4>
          <ul className="space-y-1.5 text-xs text-gray-300">
            <li>
              <button onClick={() => setActiveTab("dashboard")} className="hover:text-[#D4AF37]">
                For You Feed
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab("explore")} className="hover:text-[#D4AF37]">
                Explore All Destinations
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab("my-yatra")} className="hover:text-[#D4AF37]">
                My Yatra Wishlist & Itinerary
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab("ai-guide")} className="hover:text-[#D4AF37]">
                Viraasat Mitra AI Guide
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3: Categories */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#FF671F] font-serif">
            Heritage Spheres
          </h4>
          <ul className="space-y-1.5 text-xs text-gray-300">
            <li>🛕 Temples & Jyotirlingas</li>
            <li>🏛️ Rajput & Mughal Forts</li>
            <li>⛰️ Himalayan Mountain Shrines</li>
            <li>🗿 Rock-Cut Caves & Stupas</li>
            <li>🌿 Wildlife Sanctuaries</li>
          </ul>
        </div>

        {/* Col 4: Incredible India Tribute */}
        <div className="space-y-3 bg-[#1C2541]/50 p-4 rounded-2xl border border-[#D4AF37]/20">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#FF671F]" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#FAF9F6]">
              Incredible India
            </h4>
          </div>
          <p className="text-[11px] text-gray-300 leading-relaxed">
            Crafted for history buffs, spiritual seekers, and travelers exploring the glorious soul of Bharat.
          </p>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-white/10 text-center text-[11px] text-gray-500 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p>© 2026 Viraasat: Our Heritage. Our India. All Rights Reserved.</p>
        <p className="text-[#D4AF37]">Design Philosophy: Sacred Modernism</p>
      </div>
    </footer>
  );
};
