/**
 * AuraOS Neural Service
 * Optimized for Netlify Production & Real-Time Performance
 */

// Use import.meta.env for Vite compatibility (Fixes build error #1)
const API_KEY = (import.meta.env.VITE_GEMINI_API_KEY as string) || '';
const BASE_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

/**
 * Communicates with Gemini 1.5 Flash for real-time AI responses
 */
export const chatWithGemini = async (prompt: string, history: any[]): Promise<string> => {
  if (!API_KEY) {
    console.warn("Neural Link: API_KEY is missing in production environment.");
    return "OFFLINE_MODE: Intelligence core not responding. Please check Netlify Environment Variables.";
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
          maxOutputTokens: 1024,
        }
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "Link unstable");
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  } catch (error: any) {
    console.error("Neural Link Failure:", error);
    return `SYSTEM_ERROR: ${error.message || "Unknown disconnection"}`;
  }
};

/**
 * Voice Synthesis Module
 */
export const generateVoiceResponse = async (text: string): Promise<string | null> => {
  // Logic for future TTS integration
  console.log("Voice buffer requested for:", text.slice(0, 30));
  return null; 
};

/**
 * Audio Decoding Utilities for Real-Time Voice
 */
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
