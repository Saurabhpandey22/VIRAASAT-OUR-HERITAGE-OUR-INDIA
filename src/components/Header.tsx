import React, { useState } from "react";
import { useViraasat } from "../context/ViraasatContext";
import {
  Compass,
  Bookmark,
  SlidersHorizontal,
  Menu,
  X,
  MapPin,
  Bot,
} from "lucide-react";

export const Header: React.FC<{ onOpenPreferences: () => void }> = ({ onOpenPreferences }) => {
  const {
    activeTab,
    setActiveTab,
    wishlistIds,
    userPreferences,
    onboardingCompleted,
  } = useViraasat();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "dashboard", label: "For You", icon: Compass, badge: null },
    { id: "explore", label: "Explore India", icon: MapPin, badge: null },
    { id: "my-yatra", label: "My Yatra", icon: Bookmark, badge: wishlistIds.length || null },
    { id: "ai-guide", label: "Viraasat Mitra", icon: Bot, badge: "AI Guide" },
  ] as const;

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0B132B]/90 backdrop-blur-md border-b border-[#D4AF37]/30 shadow-[0_4px_20px_rgba(0,0,0,0.5)] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo & Tagline */}
        <div
          onClick={() => setActiveTab("dashboard")}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-[#FF671F] via-[#D4AF37] to-[#0B132B] p-[1.5px] shadow-[0_0_15px_rgba(255,103,31,0.4)] group-hover:shadow-[0_0_25px_rgba(212,175,55,0.7)] transition-all">
            <div className="w-full h-full bg-[#0B132B] rounded-[10px] flex items-center justify-center text-[#FF671F]">
              <span className="text-2xl font-serif">🕉️</span>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold font-serif tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#FAF9F6] via-[#D4AF37] to-[#FF671F]">
                Viraasat
              </h1>
              <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] uppercase tracking-widest font-semibold rounded-full bg-[#FF671F]/20 text-[#FF671F] border border-[#FF671F]/40">
                Heritage AI
              </span>
            </div>
            <p className="text-[11px] text-[#D4AF37]/90 tracking-wide font-medium">
              Our Heritage. Our India.
            </p>
          </div>
        </div>

        {/* Desktop Navigation Items */}
        <nav className="hidden lg:flex items-center gap-1.5 bg-[#1C2541]/60 p-1.5 rounded-2xl border border-[#D4AF37]/20 backdrop-blur-md">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`relative px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-[#FF671F] to-[#D4AF37] text-black shadow-[0_0_15px_rgba(255,103,31,0.5)] font-bold"
                    : "text-[#FAF9F6]/80 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-black" : "text-[#D4AF37]"}`} />
                <span>{item.label}</span>
                {item.badge !== null && (
                  <span
                    className={`ml-1 text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      isActive
                        ? "bg-black/20 text-black"
                        : "bg-[#FF671F]/30 text-[#FF671F] border border-[#FF671F]/50"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Actions: User Vibe Filter & Profile */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenPreferences}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium bg-[#1C2541]/80 hover:bg-[#FF671F]/20 text-[#FAF9F6] border border-[#D4AF37]/40 hover:border-[#FF671F] transition-all group shadow-sm"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#FF671F] group-hover:rotate-90 transition-transform" />
            <span className="hidden sm:inline font-semibold">
              {onboardingCompleted ? `${userPreferences.name}'s Vibe` : "My Preferences"}
            </span>
            <span className="sm:hidden font-semibold">Vibe</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl bg-[#1C2541] text-[#FAF9F6] border border-[#D4AF37]/30 hover:border-[#FF671F]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-[#FF671F]" /> : <Menu className="w-5 h-5 text-[#D4AF37]" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0B132B] border-b border-[#D4AF37]/30 px-4 py-4 space-y-2 backdrop-blur-xl animate-in slide-in-from-top-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id as any);
                  setMobileMenuOpen(false);
                }}
                className={`w-full px-4 py-3 rounded-xl text-sm font-medium flex items-center justify-between transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-[#FF671F] to-[#D4AF37] text-black font-bold"
                    : "text-[#FAF9F6]/90 hover:bg-white/5 border border-white/5"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${isActive ? "text-black" : "text-[#FF671F]"}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge !== null && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-black/20 font-bold">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
