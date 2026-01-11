/**
 * AuraOS Neural Service
 * Handles real-time communication with Gemini 1.5 Flash
 */

// In Vite, we access the defined env variables from vite.config.ts
const API_KEY = (import.meta.env.VITE_GEMINI_API_KEY) || (process.env.GEMINI_API_KEY) || '';
const BASE_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

export const chatWithGemini = async (prompt: string, history: any[]) => {
  if (!API_KEY || API_KEY === 'MISSING_KEY') {
    return "OFFLINE_MODE: No API Key detected. Please set GEMINI_API_KEY in Netlify environment variables.";
  }

  try {
    const response = await fetch(`${BASE_URL}?key=${API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: history.length > 0 ? history : [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      }),
    });

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.message);
    }

    return data.candidates[0].content.parts[0].text;
  } catch (error: any) {
    console.error("Neural Link Failure:", error);
    return `SYSTEM_ERROR: ${error.message || "Unknown disconnection"}`;
  }
};

/**
 * Voice & Audio Utilities 
 * (Placeholders to satisfy AIChatApp.tsx imports)
 */

export const generateVoiceResponse = async (text: string) => {
  console.log("Voice synthesis requested for:", text.substring(0, 20) + "...");
  return null; // Return null until TTS engine is linked
};

export const decodeBase64 = (base64: string): Uint8Array => {
  const binaryString = window.atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
};

export const decodeAudioData = async (data: Uint8Array, ctx: AudioContext): Promise<AudioBuffer> => {
  return await ctx.decodeAudioData(data.buffer);
};
