import React, { useState, useRef, useEffect } from "react";
import { useViraasat } from "../context/ViraasatContext";
import { Bot, Send, Sparkles, User, RefreshCw, Compass, Lightbulb, Shield, MessageSquare } from "lucide-react";

interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
}

export const AIGuideChatbot: React.FC = () => {
  const { userPreferences, activePlace } = useViraasat();

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      sender: "bot",
      text: `Namaste ${userPreferences.name || "Yatri"}! I am **Viraasat Mitra**, your AI Smart Heritage & Tourism Guide.

I can assist you with:
• **Custom Itineraries:** (e.g. "Suggest a 3-day spiritual trip to Uttarakhand")
• **Architectural Deep Dives:** (e.g. "Explain the sundial wheel math of Konark")
• **Dynasty & History:** (e.g. "Who commissioned Hawa Mahal in Jaipur?")
• **Local Customs & Timings:** Best visiting seasons, dress codes, and food highlights.

How may I guide your Yatra today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    "Suggest a 3-day spiritual itinerary in Uttarakhand",
    "What is the architectural style of Konark Sun Temple?",
    "Tell me about the 953 windows of Hawa Mahal Jaipur",
    "Best time to visit Golden Temple Amritsar with family",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (textToSend?: string) => {
    const prompt = textToSend || inputText;
    if (!prompt.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: prompt,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText("");
    setLoading(true);

    try {
      const response = await fetch("/api/guide", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          userPreferences: userPreferences.selectedCategories,
          currentPlace: activePlace,
        }),
      });

      const data = await response.json();
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: data.reply || "Dhanyavaad for your query. How else may I assist you?",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: "Apologies, I encountered a temporary connection glitch. Please try asking your question again.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full py-8 space-y-6 animate-in fade-in duration-500">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#1C2541] via-[#0B132B] to-[#1C2541] border border-[#D4AF37]/40 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF671F]/20 border border-[#FF671F]/40 text-[#FF671F] text-xs font-semibold uppercase tracking-wider">
          <Bot className="w-4 h-4" />
          <span>Server-Side Gemini AI Powered Guide</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-transparent bg-clip-text bg-gradient-to-r from-[#FAF9F6] via-[#D4AF37] to-[#FF671F]">
          Viraasat Mitra • Smart Heritage AI Guide
        </h2>

        <p className="text-xs sm:text-sm text-[#FAF9F6]/80 max-w-xl mx-auto font-sans leading-relaxed">
          Ask anything about Indian history, architecture, dynasties, travel tips, local foods, or custom itineraries!
        </p>
      </div>

      {/* Main Chat Interface Window */}
      <div className="max-w-4xl mx-auto bg-[#0B132B]/95 border-2 border-[#D4AF37]/40 rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[580px]">
        
        {/* Chat Messages Log */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 custom-scrollbar">
          {messages.map((msg) => {
            const isBot = msg.sender === "bot";
            return (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-[88%] ${isBot ? "self-start" : "ml-auto flex-row-reverse"}`}
              >
                <div
                  className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 border shadow-md ${
                    isBot
                      ? "bg-gradient-to-br from-[#FF671F] to-[#D4AF37] text-black border-[#FF671F]"
                      : "bg-[#1C2541] text-[#FAF9F6] border-[#D4AF37]/30"
                  }`}
                >
                  {isBot ? <Bot className="w-5 h-5 stroke-[2.5]" /> : <User className="w-5 h-5" />}
                </div>

                <div
                  className={`p-4 rounded-2xl border text-xs sm:text-sm leading-relaxed ${
                    isBot
                      ? "bg-[#1C2541]/80 text-[#FAF9F6] border-[#D4AF37]/30 shadow-md"
                      : "bg-[#FF671F] text-white border-[#FF671F] font-medium shadow-[0_0_15px_rgba(255,103,31,0.4)]"
                  }`}
                >
                  <div className="whitespace-pre-wrap font-sans">{msg.text}</div>
                  <span className="block text-[10px] opacity-60 mt-1 text-right">{msg.timestamp}</span>
                </div>
              </div>
            );
          })}

          {loading && (
            <div className="flex gap-3 items-center text-xs text-[#D4AF37] bg-[#1C2541]/60 p-3 rounded-2xl border border-white/10 w-fit">
              <RefreshCw className="w-4 h-4 animate-spin text-[#FF671F]" />
              <span>Viraasat Mitra is consulting historical archives...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="p-3 bg-[#1C2541]/60 border-t border-white/10 flex gap-2 overflow-x-auto custom-scrollbar">
          <span className="text-[11px] font-semibold text-[#D4AF37] shrink-0 self-center">Quick Ask:</span>
          {quickPrompts.map((qp, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(qp)}
              className="text-[11px] px-3 py-1 rounded-xl bg-[#0B132B] hover:bg-[#FF671F]/20 text-[#FAF9F6] border border-[#D4AF37]/30 hover:border-[#FF671F] shrink-0 transition-all"
            >
              {qp}
            </button>
          ))}
        </div>

        {/* Chat Input Field */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-3 sm:p-4 bg-[#0B132B] border-t border-[#D4AF37]/30 flex items-center gap-2"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask Viraasat Mitra about monuments, history, itineraries..."
            className="flex-1 px-4 py-3 rounded-2xl bg-[#1C2541] border border-[#D4AF37]/30 text-xs sm:text-sm text-[#FAF9F6] placeholder-gray-400 focus:outline-none focus:border-[#FF671F]"
          />

          <button
            type="submit"
            disabled={!inputText.trim() || loading}
            className="p-3 rounded-2xl bg-gradient-to-r from-[#FF671F] to-[#D4AF37] text-black font-bold disabled:opacity-50 hover:brightness-110 shadow-[0_0_15px_rgba(255,103,31,0.5)] transition-all"
          >
            <Send className="w-4 h-4 stroke-[2.5]" />
          </button>
        </form>

      </div>
    </section>
  );
};
