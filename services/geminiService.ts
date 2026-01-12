import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = (import.meta as any).env?.VITE_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(API_KEY);

// 1. Primary Chat Function (Used by ChatApp and AIChatApp)
export const chatWithGemini = async (message: string) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(message);
    return result.response.text();
  } catch (error) {
    console.error("Gemini Error:", error);
    return "SYSTEM ERROR: Neural link failed to establish.";
  }
};

// 2. Terminal Command Execution
export const terminalCommandExec = async (command: string) => {
  return `PROCESSED: ${command} at ${new Date().toLocaleTimeString()}`;
};

/** * 3. Voice & Utility Exports (Required by AIChatApp)
 * These are stubs to resolve import errors. You can implement 
 * actual TTS/STT logic here later.
 */
export const generateVoiceResponse = async (text: string) => {
  console.log("Voice synth requested for:", text);
  return ""; 
};

export const decodeBase64 = (str: string) => {
  try { return atob(str); } catch { return ""; }
};

export const decodeAudioData = async (data: any) => {
  return new AudioContext().decodeAudioData(data);
};
