import React, { useState } from "react";
import { useViraasat } from "../context/ViraasatContext";
import { HeritagePlace } from "../types";
import { X, MapPin, Calendar, Clock, Plane, CloudSun, Bookmark, Sparkles, Check, Share2, Landmark } from "lucide-react";

export const DestinationDetailModal: React.FC = () => {
  const { activePlace, setActivePlace, wishlistIds, toggleWishlist } = useViraasat();
  const [activeTab, setActiveTab] = useState<"overview" | "history" | "practical">("overview");
  const [copied, setCopied] = useState(false);
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  if (!activePlace) return null;

  const isSaved = wishlistIds.includes(activePlace.id);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-300 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#0B132B]/95 border-2 border-[#D4AF37]/50 rounded-3xl p-5 sm:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.9)] overflow-hidden my-auto">
        
        {/* Background Ambient Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-radial from-[#FF671F]/15 via-[#D4AF37]/5 to-transparent blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={() => setActivePlace(null)}
          className="absolute top-5 right-5 p-2.5 rounded-full bg-white/10 hover:bg-[#FF671F] text-white border border-white/20 transition-all z-20 shadow-lg"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Title & Badges */}
        <div className="space-y-2 mb-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-0.5 rounded-full bg-[#FF671F]/20 text-[#FF671F] border border-[#FF671F]/40 text-xs font-bold font-serif">
              {activePlace.era}
            </span>
            <span className="px-3 py-0.5 rounded-full bg-[#1C2541] text-[#D4AF37] border border-[#D4AF37]/30 text-xs font-medium">
              {activePlace.dynastyBuilder}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <h2 className="text-2xl sm:text-4xl font-extrabold font-serif text-transparent bg-clip-text bg-gradient-to-r from-[#FAF9F6] via-[#D4AF37] to-[#FF671F]">
              {activePlace.name}
            </h2>
            <span className="text-lg font-serif text-[#FF671F] font-bold">
              {activePlace.hindiName}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-[#FAF9F6]/80 italic">
            "{activePlace.tagline}"
          </p>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-3 mb-6 overflow-x-auto">
          {[
            { id: "overview", label: "Overview & Gallery" },
            { id: "history", label: "History & Significance" },
            { id: "practical", label: "Practical Info & Transport" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-[#FF671F] to-[#D4AF37] text-black shadow-[0_0_12px_rgba(255,103,31,0.5)]"
                  : "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/5"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Overview & Gallery */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden border border-[#D4AF37]/30 shadow-xl">
              <img
                src={activePlace.gallery[activeImgIndex] || activePlace.coverImage}
                alt={activePlace.name}
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-white">
                  <MapPin className="w-4 h-4 text-[#FF671F]" />
                  <span>{activePlace.location}</span>
                </div>

                <div className="flex gap-1.5">
                  {activePlace.gallery.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImgIndex(idx)}
                      className={`w-3 h-3 rounded-full border ${
                        activeImgIndex === idx ? "bg-[#FF671F] border-white" : "bg-black/50 border-white/40"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#1C2541]/60 border border-[#D4AF37]/20 space-y-3">
              <h4 className="text-sm font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-2">
                <Landmark className="w-4 h-4 text-[#FF671F]" />
                <span>Architectural Summary</span>
              </h4>
              <p className="text-xs sm:text-sm text-[#FAF9F6]/90 leading-relaxed font-sans">
                {activePlace.description}
              </p>
            </div>
          </div>
        )}

        {/* Tab 2: History & Significance */}
        {activeTab === "history" && (
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-[#1C2541]/70 border border-[#D4AF37]/30 space-y-3">
              <h4 className="text-sm font-bold uppercase tracking-wider text-[#FF671F] flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span>Historical Context & Chronology</span>
              </h4>

              <ul className="space-y-2.5">
                {activePlace.historyPoints.map((pt, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#FAF9F6]/90 leading-relaxed">
                    <span className="w-2 h-2 rounded-full bg-[#D4AF37] mt-1.5 shrink-0" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-[#1C2541]/70 border border-[#D4AF37]/30 space-y-3">
              <h4 className="text-sm font-bold uppercase tracking-wider text-[#D4AF37]">
                Architectural Highlights
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activePlace.architecturalHighlights.map((hl, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-[#0B132B]/80 border border-white/10 text-xs text-[#FAF9F6]/90">
                    {hl}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Practical Info & Transport */}
        {activeTab === "practical" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-[#1C2541]/70 border border-[#D4AF37]/30 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#FF671F]" />
                <span>Visiting Hours & Entry Fees</span>
              </h4>

              <div className="space-y-2 text-xs text-[#FAF9F6]/90">
                <p><strong className="text-[#D4AF37]">Timings:</strong> {activePlace.practicalInfo.timings}</p>
                <p><strong className="text-[#D4AF37]">Entry Fee:</strong> {activePlace.practicalInfo.entryFee}</p>
                <p><strong className="text-[#D4AF37]">Best Season:</strong> {activePlace.practicalInfo.bestTimeToVisit}</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#1C2541]/70 border border-[#D4AF37]/30 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-2">
                <Plane className="w-4 h-4 text-[#FF671F]" />
                <span>Accessibility & Connectivity</span>
              </h4>

              <div className="space-y-2 text-xs text-[#FAF9F6]/90">
                <p><strong className="text-[#D4AF37]">Nearest Airport:</strong> {activePlace.practicalInfo.nearestAirport}</p>
                <p><strong className="text-[#D4AF37]">Nearest Railway:</strong> {activePlace.practicalInfo.nearestRailway}</p>
              </div>
            </div>

            {/* Live Weather Widget */}
            <div className="md:col-span-2 p-4 rounded-2xl bg-gradient-to-r from-[#1C2541] to-[#0B132B] border border-[#FF671F]/40 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-[#FF671F]/20 text-[#FF671F]">
                  <CloudSun className="w-6 h-6" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-[#FAF9F6]">Live Destination Weather</h5>
                  <p className="text-xs text-[#D4AF37]">{activePlace.practicalInfo.currentWeather.condition}</p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-2xl font-bold text-[#FAF9F6] font-serif">
                  {activePlace.practicalInfo.currentWeather.temp}
                </span>
                <p className="text-[11px] text-gray-400">Humidity: {activePlace.practicalInfo.currentWeather.humidity}</p>
              </div>
            </div>
          </div>
        )}

        {/* Modal Footer Actions */}
        <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 mt-6">
          <button
            onClick={() => toggleWishlist(activePlace.id)}
            className={`px-5 py-3 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 border ${
              isSaved
                ? "bg-[#FF671F] text-white border-[#FF671F] shadow-[0_0_15px_rgba(255,103,31,0.5)]"
                : "bg-[#1C2541] text-[#FAF9F6] border-[#D4AF37]/40 hover:border-[#FF671F]"
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? "fill-white" : ""}`} />
            <span>{isSaved ? "Saved to My Yatra" : "Add to My Yatra Wishlist"}</span>
          </button>

          <button
            onClick={handleShare}
            className="px-4 py-3 rounded-2xl bg-white/5 hover:bg-white/10 text-[#FAF9F6] border border-white/10 text-xs font-semibold flex items-center gap-2"
          >
            {copied ? <Check className="w-4 h-4 text-green-400" /> : <Share2 className="w-4 h-4 text-[#D4AF37]" />}
            <span>{copied ? "Link Copied!" : "Share Destination"}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
