import React, { useState } from "react";
import { useViraasat } from "../context/ViraasatContext";
import { Bookmark, MapPin, Trash2, Calendar, Sparkles, Check, Download, Share2, Compass, Landmark, Clock } from "lucide-react";
import confetti from "canvas-confetti";

export const MyYatraHub: React.FC = () => {
  const {
    getWishlistPlaces,
    toggleWishlist,
    itineraryNotes,
    updateItineraryNote,
    setActivePlace,
    setActiveTab,
    userPreferences,
  } = useViraasat();

  const savedPlaces = getWishlistPlaces();
  const [generatedItinerary, setGeneratedItinerary] = useState(false);

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#FF671F", "#D4AF37", "#FAF9F6"],
    });
    setGeneratedItinerary(true);
  };

  return (
    <section className="w-full py-8 space-y-8 animate-in fade-in duration-500">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#1C2541] via-[#0B132B] to-[#1C2541] border border-[#D4AF37]/40 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF671F]/20 border border-[#FF671F]/40 text-[#FF671F] text-xs font-semibold uppercase tracking-wider">
          <Bookmark className="w-3.5 h-3.5 fill-[#FF671F]" />
          <span>Personalized Trip Itinerary Builder</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-transparent bg-clip-text bg-gradient-to-r from-[#FAF9F6] via-[#D4AF37] to-[#FF671F]">
          {userPreferences.name}'s My Yatra Hub
        </h2>

        <p className="text-xs sm:text-sm text-[#FAF9F6]/80 max-w-xl mx-auto font-sans leading-relaxed">
          Manage saved heritage sites, organize custom day-wise travel notes, and export your personalized Incredible India travel itinerary.
        </p>

        {savedPlaces.length > 0 && (
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={triggerConfetti}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#FF671F] to-[#D4AF37] text-black font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(255,103,31,0.5)] hover:brightness-110 transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 stroke-[2.5]" />
              <span>Generate Yatra Route Plan</span>
            </button>
          </div>
        )}
      </div>

      {/* Generated Route Plan Confirmation Banner */}
      {generatedItinerary && (
        <div className="p-5 rounded-3xl bg-gradient-to-r from-[#FF671F]/20 via-[#D4AF37]/20 to-transparent border-2 border-[#FF671F] text-left space-y-2 animate-in zoom-in-95">
          <div className="flex items-center gap-2 text-[#FF671F] font-bold text-sm">
            <Check className="w-5 h-5" />
            <span>Yatra Route Optimization Complete!</span>
          </div>
          <p className="text-xs text-[#FAF9F6]/90">
            Your customized itinerary contains <strong>{savedPlaces.length} destinations</strong> across {new Set(savedPlaces.map(p => p.state)).size} Indian states. Best recommended travel duration: {savedPlaces.length * 2} Days.
          </p>
        </div>
      )}

      {/* Saved Places List */}
      {savedPlaces.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {savedPlaces.map((place) => {
            const currentNote = itineraryNotes[place.id] || {
              placeId: place.id,
              notes: "",
              priority: "Must Visit",
            };

            return (
              <div
                key={place.id}
                className="bg-[#0B132B]/90 border border-[#D4AF37]/40 rounded-3xl p-5 backdrop-blur-xl shadow-xl space-y-4 flex flex-col justify-between"
              >
                <div className="flex gap-4 items-start">
                  <img
                    src={place.coverImage}
                    alt={place.name}
                    className="w-24 h-24 rounded-2xl object-cover border border-[#D4AF37]/30 shrink-0"
                  />

                  <div className="space-y-1 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-bold font-serif text-[#FAF9F6] line-clamp-1">
                        {place.name}
                      </h3>
                      <button
                        onClick={() => toggleWishlist(place.id)}
                        title="Remove"
                        className="text-gray-400 hover:text-red-400 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-[#D4AF37]">
                      <MapPin className="w-3.5 h-3.5 text-[#FF671F]" />
                      <span>{place.location}</span>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#1C2541] text-[#D4AF37] border border-[#D4AF37]/20 font-medium">
                        {place.era}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#FF671F]/20 text-[#FF671F] font-semibold">
                        {currentNote.priority}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Priority Selector & Notes Input */}
                <div className="p-3 rounded-2xl bg-[#1C2541]/60 border border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-xs text-[#D4AF37]">
                    <span className="font-semibold">Priority Tag:</span>
                    <div className="flex gap-1">
                      {(["Must Visit", "Secondary", "Optional"] as const).map((prio) => (
                        <button
                          key={prio}
                          onClick={() =>
                            updateItineraryNote(place.id, {
                              ...currentNote,
                              priority: prio,
                            })
                          }
                          className={`text-[10px] px-2 py-0.5 rounded-md border font-medium ${
                            currentNote.priority === prio
                              ? "bg-[#FF671F] text-white border-[#FF671F]"
                              : "bg-black/30 text-gray-400 border-white/5"
                          }`}
                        >
                          {prio}
                        </button>
                      ))}
                    </div>
                  </div>

                  <input
                    type="text"
                    value={currentNote.notes}
                    onChange={(e) =>
                      updateItineraryNote(place.id, {
                        ...currentNote,
                        notes: e.target.value,
                      })
                    }
                    placeholder="Add personal travel note (e.g., Book morning aarti ticket)..."
                    className="w-full px-3 py-1.5 rounded-xl bg-[#0B132B] border border-[#D4AF37]/20 text-xs text-[#FAF9F6] placeholder-gray-500 focus:outline-none focus:border-[#FF671F]"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-2 border-t border-white/10">
                  <button
                    onClick={() => setActivePlace(place)}
                    className="text-xs text-[#D4AF37] hover:text-[#FF671F] font-bold flex items-center gap-1"
                  >
                    <Landmark className="w-3.5 h-3.5" />
                    <span>Explore History & Architecture</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 bg-[#1C2541]/40 border border-dashed border-[#D4AF37]/30 rounded-3xl p-8 space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#FF671F]/10 text-[#FF671F] flex items-center justify-center mx-auto text-3xl">
            🕉️
          </div>
          <h3 className="text-lg font-bold text-[#FAF9F6] font-serif">
            Your Yatra Wishlist is Empty
          </h3>
          <p className="text-xs text-[#FAF9F6]/70 max-w-md mx-auto">
            You haven't bookmarked any heritage monuments yet. Explore India's destinations or browse the "For You" feed and click the bookmark icon to save places!
          </p>
          <button
            onClick={() => setActiveTab("explore")}
            className="px-5 py-2.5 rounded-xl bg-[#FF671F] text-white text-xs font-bold hover:brightness-110 flex items-center gap-2 mx-auto"
          >
            <Compass className="w-4 h-4" />
            <span>Explore Heritage Monuments</span>
          </button>
        </div>
      )}
    </section>
  );
};
