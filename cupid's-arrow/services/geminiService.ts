import { GoogleGenAI } from "@google/genai";
import { DateVibe } from '../types';

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const MODEL_NAME = 'gemini-3-flash-preview';

export const getPersuasiveMessage = async (partnerName: string, senderName: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: `Generate a very short, cute, and funny reason why ${partnerName} should accept ${senderName}'s Valentine proposal. Maximum 15 words. Tone: Playful, sweet, slightly desperate but cute.`,
    });
    return response.text || "Because I make the best toast! 🍞";
  } catch (error) {
    console.error("Gemini Error:", error);
    return `Because ${senderName} really, really likes you!`;
  }
};

export const getDateIdea = async (vibe: DateVibe, partnerName: string, senderName: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: `Plan a short, 2-sentence cute date idea for ${partnerName} and ${senderName} for Valentine's Day. Vibe: ${vibe}. Keep it fun and actionable.`,
    });
    return response.text || "A cozy movie night with popcorn and lots of blankets! 🍿🎬";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "A surprise dinner at your favorite spot!";
  }
};