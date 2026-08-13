import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client server-side
const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    })
  : null;

// Health check route
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "Viraasat Heritage API", geminiConfigured: !!ai });
});

// AI Heritage Guide ("Viraasat Mitra") Endpoint
app.post("/api/guide", async (req, res) => {
  try {
    const { prompt, userPreferences, currentPlace } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    if (!ai) {
      return res.json({
        reply: `Dhanyavaad for your query! [Demo Guide Mode] Viraasat Mitra recommends exploring ${
          currentPlace?.name || "India's sacred heritage"
        }. For specific queries regarding historical architecture, dynasties, travel tips, or regional cuisines, please configure your Gemini API Key in Settings > Secrets.`,
      });
    }

    const systemInstruction = `You are 'Viraasat Mitra', an expert Indian Heritage, History & Smart Tourism Guide for the 'Viraasat: Our Heritage. Our India.' platform.
Your persona is warm, respectful, culturally rich, eloquent, and deeply knowledgeable about Indian history, architecture, dynasties (Chola, Maurya, Gupta, Rajput, Mughal, Vijayanagara, Maratha, etc.), spiritual heritage, local customs, travel routes, best visiting times, and hidden cultural gems.
Always respond in clear, beautiful English mixed naturally with polite Hindi terms (e.g. 'Shubh Yatra', 'Dhanyavaad', 'Namaste', 'Viraasat').
Keep responses visually organized using bullet points, bold highlights, and easy-to-read sections.
User context:
Selected interests: ${userPreferences ? userPreferences.join(", ") : "General Heritage"}.
Current place context: ${currentPlace ? currentPlace.name + " (" + currentPlace.location + ")" : "Exploring Indian Heritage"}.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const reply = response.text || "Apologies, I could not retrieve information at this moment. Please try again.";
    return res.json({ reply });
  } catch (err: any) {
    console.error("Error in /api/guide endpoint:", err);
    return res.status(500).json({
      error: "Failed to generate guide response.",
      details: err.message,
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Viraasat Server running on http://localhost:${PORT}`);
  });
}

startServer();
