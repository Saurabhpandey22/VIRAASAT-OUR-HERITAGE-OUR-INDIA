import React, { useState } from "react";
import { ViraasatProvider, useViraasat } from "./context/ViraasatContext";
import { BackgroundMandala } from "./components/BackgroundMandala";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { PersonalizedDashboard } from "./components/PersonalizedDashboard";
import { MyYatraHub } from "./components/MyYatraHub";
import { AIGuideChatbot } from "./components/AIGuideChatbot";
import { DestinationDetailModal } from "./components/DestinationDetailModal";
import { SmartOnboardingModal } from "./components/SmartOnboardingModal";
import { Footer } from "./components/Footer";

function MainAppContent() {
  const { activeTab, onboardingCompleted } = useViraasat();
  const [onboardingOpen, setOnboardingOpen] = useState(!onboardingCompleted);

  return (
    <div className="min-h-screen bg-[#0B132B] text-[#FAF9F6] font-sans relative flex flex-col justify-between selection:bg-[#FF671F] selection:text-white">
      {/* Background Sacred Modernism Mandala & Jali Overlay */}
      <BackgroundMandala />

      {/* Main Layout Layer */}
      <div className="relative z-10 flex-1 flex flex-col">
        {/* Sticky Royal Header */}
        <Header onOpenPreferences={() => setOnboardingOpen(true)} />

        {/* Dynamic Page Tab Views */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 w-full pb-12">
          {activeTab === "dashboard" && (
            <div className="space-y-10">
              <HeroSection />
              <PersonalizedDashboard />
            </div>
          )}

          {activeTab === "explore" && <PersonalizedDashboard />}

          {activeTab === "my-yatra" && <MyYatraHub />}

          {activeTab === "ai-guide" && <AIGuideChatbot />}
        </main>

        {/* Footer */}
        <Footer />
      </div>

      {/* Global Destination Detail Modal */}
      <DestinationDetailModal />

      {/* Onboarding & Preference Modal */}
      <SmartOnboardingModal
        isOpen={onboardingOpen}
        onClose={() => setOnboardingOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <ViraasatProvider>
      <MainAppContent />
    </ViraasatProvider>
  );
}
