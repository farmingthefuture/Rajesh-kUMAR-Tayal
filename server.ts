import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

// Load environment configurations
dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Standard JSON parsers
  app.use(express.json());

  // API Route: Server-Side Gemini endpoint
  app.post('/api/gemini/chat', async (req, res) => {
    try {
      const { messages, systemPersona } = req.body;

      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: 'Messages parameter must be an array.' });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey || apiKey === 'MY_GEMINI_API_KEY' || apiKey.trim() === '') {
        console.warn('GEMINI_API_KEY is not configured or placeholder. Reprogramming to client-side fallback.');
        return res.status(403).json({ error: 'Gemini API key is not configured.' });
      }

      // Initialize Google GenAI client
      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      // Construct system persona context
      let systemInstruction = '';
      if (systemPersona === 'technical') {
        systemInstruction = `
You are the Technical Bio-Coal Torrefaction Engineer for RKTAS Agricultural Innovations.
Your answers are scientifically pristine, detailed, and highly professional.
Highlight:
- Torrefation is a mild thermal roasting process (200-300 °C) that breaks hemicellulose.
- Breaks down moisture-retaining polymers, making bio-coal highly hydrophobic (water-resistant). This means outdoor storage won't cause decomposition, perfect for power plant coal co-firing.
- Direct drop-in replacement for traditional high-polluting carbon coals.
- Our Punjab facility in Sadhugarh processes bio-coal with optimal efficiency.
Always maintain a technical, engineering-focused tone.
`.trim();
      } else if (systemPersona === 'agrarian') {
        systemInstruction = `
You are the Agricultural Field Expert Advisor for RKTAS. 
Your tone is deeply respectful, empathetic, helpful, and tailored toward the farming community in Punjab and Haryana.
Highlight:
- Napier Grass is an "80 Tonne Engine"—yielding up to 80 dry tonnes per hectare each year.
- It is drought-tolerant, has low labor costs, and supplies reliable stable year-round biomass income.
- Our harvesting window is a strict 50-day window to prevent crop burning (70 Lakh+ acres burned annually, causing 16.8M kg Organic Carbon loss).
Provide practical, sustainable agriculture tips with farmer prosperity at heart.
`.trim();
      } else {
        systemInstruction = `
You are the Standard Operating Technical Chatbot for RKTAS Agricultural Innovations.
Your tone is responsive, administrative, clean, and helpful to investors, corporate partners, and portal operators.
Provide high-level summaries about:
- Compressed Biogas (CBG) SATAT goals.
- 100 MT/day current regional processing potential, upgrading to 300 MT/day by 2026.
- Solving Northern India's crop stubble residue burning crisis.
`.trim();
      }

      // Format messages into Gemini role structure ('user' or 'model')
      const formattedContents = messages.map((m: any) => ({
        role: m.sender === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }],
      }));

      // Call Gemini 3.5-flash for reliable rapid chat responses
      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: formattedContents,
        config: {
          systemInstruction: systemInstruction,
        },
      });

      // Extract generated text
      const extractedText = response.text || 'I analyzed your request, but could not formulate a diagnostic response. Please refine your query terms.';

      res.json({ text: extractedText });
    } catch (err: any) {
      console.error('Gemini API request failed:', err.message || err);
      res.status(500).json({ error: 'Failed to generate model content.', details: err.message || err });
    }
  });

  // Vite development middleware vs. static build assets delivery
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  // Bind to PORT and host '0.0.0.0'
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`RKTAS Core fullstack server booted successfully on Port ${PORT}`);
  });
}

startServer();
