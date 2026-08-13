import React, { useState } from "react";
import { useViraasat } from "../context/ViraasatContext";
import { Category, UserPreferences } from "../types";
import { CATEGORY_LIST } from "../data/places";
import { Sparkles, Check, X, Compass, ShieldCheck, Heart } from "lucide-react";

interface SmartOnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SmartOnboardingModal: React.FC<SmartOnboardingModalProps> = ({ isOpen, onClose }) => {
  const { userPreferences, completeOnboarding } = useViraasat();

  const [name, setName] = useState<string>(userPreferences.name || "Aanand");
  const [selectedCats, setSelectedCats] = useState<Category[]>(
    userPreferences.selectedCategories.length > 0
      ? userPreferences.selectedCategories
      : ["Temples", "Forts & Palaces", "Historical Architecture"]
  );
  const [travelStyle, setTravelStyle] = useState<UserPreferences["travelStyle"]>(
    userPreferences.travelStyle || "History Buff"
  );

  if (!isOpen) return null;

  const toggleCategory = (cat: Category) => {
    setSelectedCats((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const handleSave = () => {
    completeOnboarding({
      name: name.trim() || "Yatri",
      selectedCategories: selectedCats.length > 0 ? selectedCats : ["Temples", "Forts & Palaces"],
      travelStyle,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-2xl bg-[#0B132B]/95 border-2 border-[#D4AF37]/50 rounded-3xl p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden">
        {/* Subtle Background Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-radial from-[#FF671F]/20 via-[#D4AF37]/10 to-transparent blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center space-y-2 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF671F]/20 border border-[#FF671F]/40 text-[#FF671F] text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>Personalize Your Experience</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-transparent bg-clip-text bg-gradient-to-r from-[#FAF9F6] via-[#D4AF37] to-[#FF671F]">
            Welcome to Viraasat
          </h2>
          <p className="text-xs sm:text-sm text-[#FAF9F6]/80 max-w-md mx-auto">
            Select your personal interests and travel style so our AI engine can tailor Indian heritage destinations specifically for you.
          </p>
        </div>

        {/* Step 1: User Name & Travel Style */}
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-xs font-semibold text-[#D4AF37] mb-1.5 uppercase tracking-wider">
              Aapka Shubh Naam (Your Name)
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Vikramaditya, Ananya..."
              className="w-full px-4 py-2.5 rounded-xl bg-[#1C2541]/80 border border-[#D4AF37]/30 text-[#FAF9F6] placeholder-gray-500 focus:outline-none focus:border-[#FF671F] transition-colors text-sm font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#D4AF37] mb-1.5 uppercase tracking-wider">
              Travel Persona
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {(["History Buff", "Spiritual Seeker", "Nature Enthusiast", "Family", "Solo"] as const).map(
                (style) => (
                  <button
                    key={style}
                    type="button"
                    onClick={() => setTravelStyle(style)}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                      travelStyle === style
                        ? "bg-[#FF671F] text-white border-[#FF671F] shadow-[0_0_12px_rgba(255,103,31,0.5)]"
                        : "bg-[#1C2541]/60 text-[#FAF9F6]/80 border-white/10 hover:border-[#D4AF37]/40"
                    }`}
                  >
                    {style}
                  </button>
                )
              )}
            </div>
          </div>
        </div>

        {/* Step 2: Select Your Vibe Categories */}
        <div className="mb-8">
          <label className="block text-xs font-semibold text-[#D4AF37] mb-2 uppercase tracking-wider">
            Select Your Vibe (Choose 1 or more)
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[220px] overflow-y-auto pr-1 custom-scrollbar">
            {CATEGORY_LIST.map((cat) => {
              const isSelected = selectedCats.includes(cat.id as Category);
              return (
                <div
                  key={cat.id}
                  onClick={() => toggleCategory(cat.id as Category)}
                  className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 select-none ${
                    isSelected
                      ? "bg-gradient-to-r from-[#FF671F]/20 to-[#D4AF37]/20 border-[#FF671F] shadow-[0_0_15px_rgba(255,103,31,0.3)]"
                      : "bg-[#1C2541]/50 border-white/10 hover:border-[#D4AF37]/40"
                  }`}
                >
                  <span className="text-2xl p-1 bg-black/20 rounded-xl">{cat.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-[#FAF9F6]">{cat.label}</h4>
                      {isSelected && (
                        <div className="w-4 h-4 rounded-full bg-[#FF671F] text-white flex items-center justify-center text-[10px]">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      )}
                    </div>
                    <p className="text-[11px] text-[#FAF9F6]/60 line-clamp-1">{cat.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleSave}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#FF671F] via-[#D4AF37] to-[#FF671F] text-black font-bold text-sm tracking-wide uppercase shadow-[0_0_25px_rgba(255,103,31,0.6)] hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
        >
          <Compass className="w-4 h-4" />
          <span>Save Vibe & Launch Feed</span>
        </button>
      </div>
    </div>
  );
};
