
import { GoogleGenAI, Type } from "@google/genai";
import { CardType } from "../types";

// Always initialize with the named parameter and direct access to process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateAIPrompts = async (category: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate 5 creative and funny drinking game prompts for the category: ${category}. 
      The language must be Vietnamese. Ensure they are party-friendly but spicy.
      Types allowed: TRUTH (Thật), DARE (Thách), CHALLENGE (Hành/Thử thách uống).`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              type: {
                type: Type.STRING,
                description: 'Must be TRUTH, DARE, or CHALLENGE',
              },
              content: {
                type: Type.STRING,
                description: 'The actual prompt text in Vietnamese.',
              },
              intensity: {
                type: Type.NUMBER,
                description: '1 to 3 rating of how hard it is.',
              },
            },
            required: ["type", "content", "intensity"],
          },
        },
      },
    });

    // Access the .text property directly (do not call as a method)
    const text = response.text;
    if (!text) throw new Error("Empty response from AI");
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini Error:", error);
    return null;
  }
};
