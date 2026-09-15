import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize the modern @google/genai SDK
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
} else {
  console.warn("⚠️ Warning: GEMINI_API_KEY is not defined in the environment. AI Trade Consultant will be disabled or fallback.");
}

// Gemini API Route
app.post("/api/gemini", async (req, res) => {
  try {
    const { prompt, history } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    if (!ai) {
      return res.status(503).json({ 
        error: "Gemini API key is missing. Please add GEMINI_API_KEY in the Settings > Secrets menu." 
      });
    }

    // Prepare system instructions with all authorized details for Danial Trader
    const systemInstruction = `
You are the interactive "Danial Trader - AI Trade Representative". 
Your mission is to represent Danial Trader, the authorized trade partner for Innovative Biscuits & Kite Brand FMCG safety matches in Pakistan and internationally.
Your founder is Danial Ahmad (Email: danialtrdr@gmail.com, WhatsApp/Phone: +92 333 8931786).
The corporate headquarters is at: 90-B, Industrial Estate, Jamrud Road, Hayatabad, Peshawar, Pakistan.

Our product range includes:
1. Innovative Biscuits:
   - Frisky Rolls: Crispy wafer rolls with rich chocolate center.
   - Digestive (Original & Sugar-Free): Fiber-rich, whole wheat biscuits.
   - Haven: Dual-flavor premium coffee and chocolate biscuits.
   - Fabulous Peanut Chip Cookies: Savory roasted peanut and sweet chocolate chip crunch.
   - Choc-n-Chip: Signature chocolate chip cookies.
   - Crust Rolls: Thin crispy rolled wafers with smooth cream center.
   - Cocomax: Coconut biscuits covered in premium milk chocolate.
   - Golden Lotus: Caramelized spiced Speculoos biscuits.

2. Kite Brand FMCG:
   - Safety Matches: Pakistan's #1 safety match exported to over 40 countries (EN-1783 compliant, damp-proof).
   - Kite Glow Detergent: High-efficiency, multi-enzyme oxygen stain-removing powder.
   - Dish Wash Bar: Long-lasting grease-cutting lemon wash bar.

About Danial Trader:
- Owned and operated by Danial Ahmad.
- Handles wholesale distribution, bulk B2B purchase, container volume calculations, customs clearing, and domestic supply chain.
- Provides personalized assistance in English, Urdu, or Pashto.

Tone: Professional, courteous, business-minded, extremely helpful, proudly Pakistani.
Encourage users to click the WhatsApp button to chat directly with Danial Ahmad (+92 333 8931786) or lodge secure inquiries! Keep responses beautifully formatted with clean paragraphs or bullet points.
`;

    // Formulate contents with full session history
    let contents: any[] = [];
    if (Array.isArray(history)) {
      // Filter out intro greetings and warnings
      const validHistory = history.filter(h => h.text && !h.text.startsWith("⚠️") && !h.text.startsWith("Asalam-o-Alaikum!"));
      
      contents = validHistory.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      }));
    }
    contents.push({
      role: 'user',
      parts: [{ text: prompt }]
    });

    // Simple chat mechanism or content generation
    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
});

// Serve API Health Check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "Danial Trader Full-Stack Service" });
});

// Configure Vite middleware in Dev vs Static Files in Prod
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Danial Trader Full-Stack Server running on port ${PORT}`);
  });
}

startServer();
