import React, { useState, useEffect } from "react";
import { useViraasat } from "../context/ViraasatContext";
import { Compass, Sparkles, MapPin, Bot, ArrowRight, ShieldCheck, Flame, Landmark } from "lucide-react";
import { CATEGORY_LIST } from "../data/places";
import { Category } from "../types";

export const HeroSection: React.FC = () => {
  const {
    setActiveTab,
    selectedCategoryFilter,
    setSelectedCategoryFilter,
    userPreferences,
    setActivePlace,
    places,
  } = useViraasat();

  const [timeGreeting, setTimeGreeting] = useState<{ hindi: string; english: string }>({
    hindi: "शुभ प्रभात",
    english: "Shubh Prabhat",
  });

  const [activeRegion, setActiveRegion] = useState<"North" | "South" | "East" | "West">("North");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 4 && hour < 12) {
      setTimeGreeting({ hindi: "शुभ प्रभात", english: "Shubh Prabhat (Good Morning)" });
    } else if (hour >= 12 && hour < 17) {
      setTimeGreeting({ hindi: "शुभ दोपहर", english: "Shubh Dopahar (Good Afternoon)" });
    } else if (hour >= 17 && hour < 22) {
      setTimeGreeting({ hindi: "शुभ संध्या", english: "Shubh Sandhya (Good Evening)" });
    } else {
      setTimeGreeting({ hindi: "शुभ रात्रि", english: "Shubh Ratri (Good Night)" });
    }
  }, []);

  const regionalHighlights = {
    North: {
      title: "North Bharat • Divine Himalayas & Sacred Valleys",
      sites: ["Shri Ram Mandir Ayodhya", "Kedarnath Mahadev Temple"],
      placeId: "ram-mandir-ayodhya",
      img: "https://images.unsplash.com/photo-1705861145120-d309be0d5f49?q=80&w=1200&auto=format&fit=crop",
      tagline: "Home of ancient Nagara temples, river ghats, and snow sanctuaries."
    },
    South: {
      title: "South Bharat • Dravidian Gopurams & Coastal Sanctuaries",
      sites: ["Meenakshi Amman Temple Madurai", "Hampi Stone Chariot"],
      placeId: "meenakshi-temple",
      img: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=1200&auto=format&fit=crop",
      tagline: "Soaring multi-colored gopurams, 1000-pillar halls, and Vijayanagara granite art."
    },
    East: {
      title: "East Bharat • Kalinga Sun Chariots & Brahmaputra Flora",
      sites: ["Konark Sun Temple", "Kaziranga Heritage"],
      placeId: "konark-sun-temple",
      img: "https://images.unsplash.com/photo-1609137144813-7d99f4f39158?q=80&w=1200&auto=format&fit=crop",
      tagline: "Carved stone sundials, Kalinga temple architecture, and verdant floodplains."
    },
    West: {
      title: "West Bharat • Rajputana Citadels & Pink Palaces",
      sites: ["Hawa Mahal Jaipur", "Forts & Palaces of Rajasthan"],
      placeId: "hawa-mahal",
      img: "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1200&auto=format&fit=crop",
      tagline: "953 breezy jharokhas, royal stepwells, and desert fortresses."
    }
  };

  const currentHighlight = regionalHighlights[activeRegion];

  const handleOpenPlace = (placeId: string) => {
    const found = places.find((p) => p.id === placeId);
    if (found) {
      setActivePlace(found);
    }
  };

  return (
    <section className="relative w-full py-8 md:py-14 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Asymmetric Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column (Content & Greeting) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Dynamic Time Greeting Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#1C2541]/80 border border-[#D4AF37]/40 shadow-[0_4px_20px_rgba(255,103,31,0.2)]">
              <span className="flex h-2.5 w-2.5 rounded-full bg-[#FF671F] animate-ping" />
              <span className="text-xs font-semibold text-[#FF671F] uppercase tracking-wider font-serif">
                {timeGreeting.hindi} • {timeGreeting.english}, {userPreferences.name || "Yatri"}
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-serif tracking-tight leading-[1.15] text-[#FAF9F6]">
                Discover the <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF671F] via-[#D4AF37] to-[#FAF9F6]">
                  Soul of Bharat.
                </span>
              </h1>

              <p className="text-sm sm:text-base text-[#FAF9F6]/85 max-w-xl leading-relaxed font-sans">
                Journey through India's timeless legacy. Explore the breathtaking architecture, untold history, and vibrant cultures that shaped our great nation.
              </p>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => setActiveTab("explore")}
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#FF671F] to-[#D4AF37] text-black font-bold text-sm tracking-wide uppercase shadow-[0_0_25px_rgba(255,103,31,0.5)] hover:shadow-[0_0_35px_rgba(255,103,31,0.8)] active:scale-[0.98] transition-all flex items-center gap-2"
              >
                <Compass className="w-4 h-4 stroke-[2.5]" />
                <span>Begin Your Yatra</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              <button
                onClick={() => setActiveTab("explore")}
                className="px-5 py-3.5 rounded-2xl bg-[#1C2541]/80 hover:bg-white/10 text-[#FAF9F6] border border-[#D4AF37]/40 hover:border-[#D4AF37] font-semibold text-sm transition-all flex items-center gap-2 backdrop-blur-md"
              >
                <MapPin className="w-4 h-4 text-[#FF671F]" />
                <span>Explore Monuments</span>
              </button>

              <button
                onClick={() => setActiveTab("ai-guide")}
                className="px-5 py-3.5 rounded-2xl bg-[#FF671F]/10 hover:bg-[#FF671F]/20 text-[#FF671F] border border-[#FF671F]/40 font-semibold text-sm transition-all flex items-center gap-2 backdrop-blur-md"
              >
                <Bot className="w-4 h-4" />
                <span>Ask Viraasat AI Guide</span>
              </button>
            </div>

            {/* Quick Category Filter Pills */}
            <div className="pt-4 border-t border-white/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#D4AF37]">
                  Quick Filter By Vibe:
                </span>
                <button
                  onClick={() => setSelectedCategoryFilter("All")}
                  className={`text-xs text-[#FF671F] underline font-medium ${
                    selectedCategoryFilter === "All" ? "font-bold" : ""
                  }`}
                >
                  Show All
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {CATEGORY_LIST.slice(0, 5).map((cat) => {
                  const isSelected = selectedCategoryFilter === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() =>
                        setSelectedCategoryFilter(isSelected ? "All" : (cat.id as Category))
                      }
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all ${
                        isSelected
                          ? "bg-[#FF671F] text-white border-[#FF671F] shadow-[0_0_12px_rgba(255,103,31,0.5)]"
                          : "bg-[#1C2541]/60 text-[#FAF9F6]/80 border-white/10 hover:border-[#D4AF37]/50"
                      }`}
                    >
                      <span>{cat.icon}</span>
                      <span>{cat.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: 2D Interactive "Ek Bharat Shreshtha Bharat" Cultural Showcase */}
          <div className="lg:col-span-5 relative space-y-4">
            
            {/* Regional Map Tabs */}
            <div className="flex items-center justify-between gap-1 p-1.5 rounded-2xl bg-[#1C2541]/90 border border-[#D4AF37]/40 backdrop-blur-md shadow-xl">
              {(["North", "South", "East", "West"] as const).map((region) => (
                <button
                  key={region}
                  onClick={() => setActiveRegion(region)}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeRegion === region
                      ? "bg-gradient-to-r from-[#FF671F] to-[#D4AF37] text-black shadow-[0_0_12px_rgba(255,103,31,0.5)]"
                      : "text-[#FAF9F6]/80 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {region} India
                </button>
              ))}
            </div>

            {/* Regional Showcase Card */}
            <div className="relative rounded-3xl bg-[#0B132B]/90 border-2 border-[#D4AF37]/50 p-4 sm:p-5 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden group">
              <div className="relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden border border-[#D4AF37]/30 mb-4">
                <img
                  src={currentHighlight.img}
                  alt={currentHighlight.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B] via-transparent to-black/40" />

                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#0B132B]/80 backdrop-blur-md border border-[#D4AF37]/40 text-[11px] font-bold text-[#FF671F] flex items-center gap-1.5">
                  <Landmark className="w-3.5 h-3.5" />
                  <span>{activeRegion} Bharat Heritage</span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-left">
                  <p className="text-xs text-[#FAF9F6]/90 line-clamp-1 italic font-serif">
                    "{currentHighlight.tagline}"
                  </p>
                </div>
              </div>

              <div className="space-y-3 text-left">
                <h3 className="text-base font-bold font-serif text-[#FAF9F6] flex items-center justify-between">
                  <span>{currentHighlight.title}</span>
                </h3>

                <div className="flex flex-wrap gap-2">
                  {currentHighlight.sites.map((st, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2.5 py-1 rounded-lg bg-[#1C2541] text-[#D4AF37] border border-[#D4AF37]/30 font-medium"
                    >
                      {st}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => handleOpenPlace(currentHighlight.placeId)}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#FF671F] to-[#D4AF37] text-black font-bold text-xs uppercase tracking-wider hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(255,103,31,0.4)]"
                >
                  <Sparkles className="w-4 h-4 stroke-[2.5]" />
                  <span>Explore History & Architecture</span>
                </button>
              </div>
            </div>

            {/* Sub-banner: Unity in Diversity */}
            <div className="p-3.5 rounded-2xl bg-[#1C2541]/70 border border-[#D4AF37]/30 backdrop-blur-md flex items-center justify-between text-xs text-[#FAF9F6]">
              <div className="flex items-center gap-2">
                <span className="text-lg">🇮🇳</span>
                <span className="font-semibold text-[#D4AF37]">Ek Bharat Shreshtha Bharat</span>
              </div>
              <span className="text-[11px] text-[#FAF9F6]/70">2D Storytelling Platform</span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
