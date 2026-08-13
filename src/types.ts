export type Category =
  | "Temples"
  | "Forts & Palaces"
  | "Nature"
  | "Mountains"
  | "Classical Arts"
  | "Historical Architecture"
  | "Spiritual"
  | "World Heritage"
  | "Wildlife"
  | "Beaches";

export interface KaalChakraTimeline {
  year: string;
  title: string;
  dynasty: string;
  image: string;
  description: string;
  architecturalState: string;
}

export interface KaalChakraData {
  ancientYear: string;
  modernYear: string;
  ancientImage: string;
  modernImage: string;
  ancientDescription: string;
  modernDescription: string;
  timeline: KaalChakraTimeline[];
}

export interface PracticalInfo {
  bestTimeToVisit: string;
  nearestAirport: string;
  nearestRailway: string;
  entryFee: string;
  timings: string;
  currentWeather: {
    temp: string;
    condition: string;
    humidity: string;
  };
}

export interface HeritagePlace {
  id: string;
  name: string;
  hindiName: string;
  tagline: string;
  categories: Category[];
  location: string;
  state: string;
  era: string;
  dynastyBuilder: string;
  description: string;
  coverImage: string;
  gallery: string[];
  historyPoints: string[];
  architecturalHighlights: string[];
  practicalInfo: PracticalInfo;
  coordinates: {
    lat: number;
    lng: number;
  };
  kaalChakra?: KaalChakraData;
  isPopular?: boolean;
  audioGuideSummary?: string;
}

export interface UserPreferences {
  name: string;
  email?: string;
  selectedCategories: Category[];
  preferredRegion?: string;
  travelStyle?: "Solo" | "Family" | "Spiritual Seeker" | "History Buff" | "Nature Enthusiast";
}

export interface ItineraryNote {
  placeId: string;
  notes: string;
  targetDate?: string;
  priority: "Must Visit" | "Secondary" | "Optional";
}
