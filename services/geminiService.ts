import { GoogleGenerativeAI } from "@google/generative-ai";

// Bypass Vite's strict type checking for environment variables
const API_KEY = (import.meta as any).env?.VITE_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(API_KEY);

export const getGeminiResponse = async (prompt: string) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Connection to Nexus Neural Link interrupted.";
  }
};

// This matches the import in TerminalApp.tsx
export const terminalCommandExec = async (command: string) => {
  // Simulate a delay for the "real-time" feel
  await new Promise(resolve => setTimeout(resolve, 500));
  
  if (command.includes('sudo')) return "PERMISSION DENIED: Nexus Level 4 clearance required.";
  if (command === 'status') return "SYSTEM: ALL CORES OPERATIONAL. LATENCY: 12ms.";
  
  return `EXECUTING: ${command}... DONE.`;
};
