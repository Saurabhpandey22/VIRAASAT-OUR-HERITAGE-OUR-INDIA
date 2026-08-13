import React, { useState } from "react";
import { useViraasat } from "../context/ViraasatContext";
import { HeritagePlace, Category } from "../types";
import { Search, MapPin, Calendar, Compass, Bookmark, Heart, Sparkles, Landmark, ArrowUpRight, Flame, SlidersHorizontal } from "lucide-react";
import { CATEGORY_LIST } from "../data/places";

export const PersonalizedDashboard: React.FC = () => {
  const {
    getPersonalizedPlaces,
    userPreferences,
    searchQuery,
    setSearchQuery,
    selectedCategoryFilter,
    setSelectedCategoryFilter,
    selectedStateFilter,
    setSelectedStateFilter,
    toggleWishlist,
    wishlistIds,
    setActivePlace,
    setActiveTab,
    places,
  } = useViraasat();

  const personalizedList = getPersonalizedPlaces();
  const popularList = places.filter((p) => p.isPopular);

  const states = ["All", "Uttarakhand", "Rajasthan", "Odisha", "Uttar Pradesh", "Madhya Pradesh", "Punjab", "Karnataka", "Tamil Nadu", "Assam"];

  return (
    <section className="w-full py-8 space-y-10">
      {/* Search & Filter Control Bar */}
      <div className="bg-[#1C2541]/70 border border-[#D4AF37]/30 rounded-3xl p-4 sm:p-6 backdrop-blur-xl shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Personalized Greeting */}
          <div className="w-full md:w-auto">
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#FAF9F6] flex items-center gap-2">
              <span>Curated "For You" Feed</span>
              <Sparkles className="w-5 h-5 text-[#FF671F]" />
            </h2>
            <p className="text-xs text-[#D4AF37]">
              Tailored for {userPreferences.name} ({userPreferences.selectedCategories.join(", ")})
            </p>
          </div>

          {/* Search Input Box */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4AF37]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search monuments, states, dynasties..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#0B132B] border border-[#D4AF37]/40 text-[#FAF9F6] placeholder-gray-400 text-xs focus:outline-none focus:border-[#FF671F] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Category & State Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/10">
          <div className="flex items-center gap-1.5 text-xs text-[#D4AF37] font-semibold mr-2">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#FF671F]" />
            <span>Categories:</span>
          </div>

          <button
            onClick={() => setSelectedCategoryFilter("All")}
            className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
              selectedCategoryFilter === "All"
                ? "bg-[#FF671F] text-white shadow-[0_0_10px_rgba(255,103,31,0.5)]"
                : "bg-white/5 text-gray-300 hover:bg-white/10"
            }`}
          >
            All Recommended
          </button>

          {CATEGORY_LIST.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategoryFilter(cat.id as Category)}
              className={`px-3 py-1 rounded-xl text-xs font-medium flex items-center gap-1 transition-all ${
                selectedCategoryFilter === cat.id
                  ? "bg-[#FF671F] text-white font-bold shadow-[0_0_10px_rgba(255,103,31,0.5)]"
                  : "bg-white/5 text-gray-300 hover:bg-white/10"
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.id}</span>
            </button>
          ))}

          {/* State Filter Dropdown */}
          <div className="ml-auto flex items-center gap-2">
            <span className="text-xs text-[#D4AF37]">State:</span>
            <select
              value={selectedStateFilter}
              onChange={(e) => setSelectedStateFilter(e.target.value)}
              className="bg-[#0B132B] border border-[#D4AF37]/30 text-xs text-[#FAF9F6] rounded-xl px-2.5 py-1 focus:outline-none focus:border-[#FF671F]"
            >
              {states.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Primary Personalized Grid */}
      {personalizedList.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {personalizedList.map((place) => (
            <HeritageCard key={place.id} place={place} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-[#1C2541]/40 border border-dashed border-[#D4AF37]/30 rounded-3xl p-8 space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#FF671F]/10 text-[#FF671F] flex items-center justify-center mx-auto text-3xl">
            🏛️
          </div>
          <h3 className="text-lg font-bold text-[#FAF9F6] font-serif">
            No Heritage Places Found
          </h3>
          <p className="text-xs text-[#FAF9F6]/70 max-w-md mx-auto">
            We couldn't find any monuments matching your search or filters. Try clearing your search query or selecting "All Recommended".
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategoryFilter("All");
              setSelectedStateFilter("All");
            }}
            className="px-4 py-2 rounded-xl bg-[#FF671F] text-white text-xs font-bold hover:brightness-110"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Trending & Iconic Monuments Carousel Section */}
      <div className="space-y-4 pt-6 border-t border-[#D4AF37]/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-[#FF671F] animate-bounce" />
            <h3 className="text-xl font-bold font-serif text-[#FAF9F6]">
              Trending Heritage Wonders
            </h3>
          </div>
          <button
            onClick={() => setActiveTab("explore")}
            className="text-xs text-[#D4AF37] hover:text-[#FF671F] font-semibold flex items-center gap-1"
          >
            <span>Explore All Places</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {popularList.slice(0, 3).map((place) => (
            <HeritageCard key={`popular-${place.id}`} place={place} isFeatured />
          ))}
        </div>
      </div>
    </section>
  );
};

// Glassmorphic Heritage Monument Card Component
const HeritageCard: React.FC<{ place: HeritagePlace; isFeatured?: boolean }> = ({
  place,
  isFeatured = false,
}) => {
  const { wishlistIds, toggleWishlist, setActivePlace } = useViraasat();
  const isSaved = wishlistIds.includes(place.id);

  return (
    <div className="group relative rounded-3xl bg-[#0B132B]/80 border border-[#D4AF37]/30 hover:border-[#FF671F] p-4 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_12px_40px_rgba(255,103,31,0.25)] transition-all duration-300 flex flex-col justify-between overflow-hidden">
      {/* Background Hover Glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#FF671F]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

      {/* Top Image Banner */}
      <div className="relative w-full h-48 sm:h-52 rounded-2xl overflow-hidden mb-4">
        <img
          src={place.coverImage}
          alt={place.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B] via-transparent to-black/30" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#0B132B]/80 text-[#D4AF37] border border-[#D4AF37]/40 backdrop-blur-md">
            {place.era}
          </span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(place.id);
            }}
            title={isSaved ? "Remove from My Yatra" : "Save to My Yatra"}
            className={`p-2 rounded-full backdrop-blur-md border transition-all ${
              isSaved
                ? "bg-[#FF671F] text-white border-[#FF671F] shadow-[0_0_10px_rgba(255,103,31,0.6)]"
                : "bg-[#0B132B]/70 text-gray-300 border-white/20 hover:text-white hover:bg-[#FF671F]/30"
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? "fill-white" : ""}`} />
          </button>
        </div>

        {/* Bottom Location Overlay */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-xs text-[#FAF9F6] font-medium bg-black/60 px-2.5 py-1 rounded-lg backdrop-blur-md border border-white/10">
          <MapPin className="w-3.5 h-3.5 text-[#FF671F]" />
          <span>{place.location}</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="space-y-3 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 mb-1">
            <h3 className="text-base font-bold font-serif text-[#FAF9F6] group-hover:text-[#D4AF37] transition-colors line-clamp-1">
              {place.name}
            </h3>
            <span className="text-xs font-serif text-[#FF671F] font-bold shrink-0">
              {place.hindiName}
            </span>
          </div>

          <p className="text-xs text-[#FAF9F6]/75 line-clamp-2 leading-relaxed font-sans mb-3">
            {place.description}
          </p>

          {/* Category Tags */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {place.categories.slice(0, 3).map((cat) => (
              <span
                key={cat}
                className="text-[10px] px-2 py-0.5 rounded-md bg-[#1C2541] text-[#D4AF37] border border-[#D4AF37]/20 font-medium"
              >
                {cat}
              </span>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
          <button
            onClick={() => setActivePlace(place)}
            className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#FF671F] to-[#D4AF37] text-black font-bold text-xs uppercase tracking-wider hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(255,103,31,0.3)]"
          >
            <Landmark className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Explore History & Architecture</span>
          </button>
        </div>
      </div>
    </div>
  );
};
