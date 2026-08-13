import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { HeritagePlace, Category, UserPreferences, ItineraryNote } from "../types";
import { HERITAGE_PLACES } from "../data/places";

interface ViraasatContextType {
  places: HeritagePlace[];
  userPreferences: UserPreferences;
  onboardingCompleted: boolean;
  wishlistIds: string[];
  itineraryNotes: Record<string, ItineraryNote>;
  activePlace: HeritagePlace | null;
  activeTab: "dashboard" | "explore" | "my-yatra" | "ai-guide";
  searchQuery: string;
  selectedCategoryFilter: Category | "All";
  selectedStateFilter: string;
  
  // Actions
  completeOnboarding: (prefs: UserPreferences) => void;
  updatePreferences: (prefs: Partial<UserPreferences>) => void;
  toggleWishlist: (placeId: string) => void;
  updateItineraryNote: (placeId: string, note: ItineraryNote) => void;
  setActivePlace: (place: HeritagePlace | null) => void;
  setActiveTab: (tab: "dashboard" | "explore" | "my-yatra" | "ai-guide") => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategoryFilter: (cat: Category | "All") => void;
  setSelectedStateFilter: (state: string) => void;
  resetPreferences: () => void;
  
  // Filtered views
  getPersonalizedPlaces: () => HeritagePlace[];
  getWishlistPlaces: () => HeritagePlace[];
}

const DEFAULT_PREFERENCES: UserPreferences = {
  name: "Yatri",
  selectedCategories: ["Temples", "Forts & Palaces", "Historical Architecture"],
  travelStyle: "History Buff",
};

const ViraasatContext = createContext<ViraasatContextType | undefined>(undefined);

const PREFS_KEY = "viraasat_user_preferences";
const ONBOARDING_KEY = "viraasat_onboarding_completed";
const WISHLIST_KEY = "viraasat_wishlist_ids";
const NOTES_KEY = "viraasat_itinerary_notes";

export const ViraasatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [places] = useState<HeritagePlace[]>(HERITAGE_PLACES);
  const [userPreferences, setUserPreferences] = useState<UserPreferences>(() => {
    try {
      const saved = localStorage.getItem(PREFS_KEY);
      return saved ? JSON.parse(saved) : DEFAULT_PREFERENCES;
    } catch {
      return DEFAULT_PREFERENCES;
    }
  });

  const [onboardingCompleted, setOnboardingCompleted] = useState<boolean>(() => {
    try {
      return localStorage.getItem(ONBOARDING_KEY) === "true";
    } catch {
      return false;
    }
  });

  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_KEY);
      return saved ? JSON.parse(saved) : ["kedarnath-temple", "hawa-mahal"];
    } catch {
      return ["kedarnath-temple", "hawa-mahal"];
    }
  });

  const [itineraryNotes, setItineraryNotes] = useState<Record<string, ItineraryNote>>(() => {
    try {
      const saved = localStorage.getItem(NOTES_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [activePlace, setActivePlace] = useState<HeritagePlace | null>(null);
  const [activeTab, setActiveTab] = useState<"dashboard" | "explore" | "my-yatra" | "ai-guide">("dashboard");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<Category | "All">("All");
  const [selectedStateFilter, setSelectedStateFilter] = useState<string>("All");

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(PREFS_KEY, JSON.stringify(userPreferences));
    } catch (e) {
      console.error(e);
    }
  }, [userPreferences]);

  useEffect(() => {
    try {
      localStorage.setItem(ONBOARDING_KEY, String(onboardingCompleted));
    } catch (e) {
      console.error(e);
    }
  }, [onboardingCompleted]);

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlistIds));
    } catch (e) {
      console.error(e);
    }
  }, [wishlistIds]);

  useEffect(() => {
    try {
      localStorage.setItem(NOTES_KEY, JSON.stringify(itineraryNotes));
    } catch (e) {
      console.error(e);
    }
  }, [itineraryNotes]);

  const completeOnboarding = (prefs: UserPreferences) => {
    setUserPreferences(prefs);
    setOnboardingCompleted(true);
  };

  const updatePreferences = (prefs: Partial<UserPreferences>) => {
    setUserPreferences((prev) => ({ ...prev, ...prefs }));
  };

  const toggleWishlist = (placeId: string) => {
    setWishlistIds((prev) =>
      prev.includes(placeId) ? prev.filter((id) => id !== placeId) : [...prev, placeId]
    );
  };

  const updateItineraryNote = (placeId: string, note: ItineraryNote) => {
    setItineraryNotes((prev) => ({
      ...prev,
      [placeId]: note,
    }));
  };

  const resetPreferences = () => {
    localStorage.removeItem(PREFS_KEY);
    localStorage.removeItem(ONBOARDING_KEY);
    setUserPreferences(DEFAULT_PREFERENCES);
    setOnboardingCompleted(false);
  };

  // Algorithmic Personalization Engine based on LocalStorage User Preferences
  const getPersonalizedPlaces = (): HeritagePlace[] => {
    return places.filter((place) => {
      // Check search match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesSearch =
          place.name.toLowerCase().includes(q) ||
          place.hindiName.includes(q) ||
          place.location.toLowerCase().includes(q) ||
          place.state.toLowerCase().includes(q) ||
          place.dynastyBuilder.toLowerCase().includes(q) ||
          place.description.toLowerCase().includes(q);
        if (!matchesSearch) return false;
      }

      // Check explicit category filter
      if (selectedCategoryFilter !== "All") {
        if (!place.categories.includes(selectedCategoryFilter)) return false;
      } else {
        // If "All", align with user's onboarding preferences priority!
        const userCats = userPreferences.selectedCategories;
        if (userCats.length > 0) {
          const hasPreferredCategory = place.categories.some((cat) => userCats.includes(cat));
          // Keep preferred places or popular ones
          if (!hasPreferredCategory && !place.isPopular) {
            return false;
          }
        }
      }

      // Check state filter
      if (selectedStateFilter !== "All" && place.state !== selectedStateFilter) {
        return false;
      }

      return true;
    });
  };

  const getWishlistPlaces = (): HeritagePlace[] => {
    return places.filter((p) => wishlistIds.includes(p.id));
  };

  return (
    <ViraasatContext.Provider
      value={{
        places,
        userPreferences,
        onboardingCompleted,
        wishlistIds,
        itineraryNotes,
        activePlace,
        activeTab,
        searchQuery,
        selectedCategoryFilter,
        selectedStateFilter,

        completeOnboarding,
        updatePreferences,
        toggleWishlist,
        updateItineraryNote,
        setActivePlace,
        setActiveTab,
        setSearchQuery,
        setSelectedCategoryFilter,
        setSelectedStateFilter,
        resetPreferences,

        getPersonalizedPlaces,
        getWishlistPlaces,
      }}
    >
      {children}
    </ViraasatContext.Provider>
  );
};

export const useViraasat = () => {
  const context = useContext(ViraasatContext);
  if (!context) {
    throw new Error("useViraasat must be used within a ViraasatProvider");
  }
  return context;
};
