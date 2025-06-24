
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { GEMINI_MODEL_NAME, GEMINI_SYSTEM_INSTRUCTION } from '../constants';
import { BotAction } from "../types";

const API_KEY = process.env.API_KEY;

let chat: Chat | null = null;

if (API_KEY) {
    try {
        const ai = new GoogleGenAI({ apiKey: API_KEY });
        chat = ai.chats.create({
            model: GEMINI_MODEL_NAME,
            config: {
                systemInstruction: GEMINI_SYSTEM_INSTRUCTION,
                // Tell Gemini we expect JSON responses when the system instruction dictates it.
                // For other cases, it should still be text within a JSON structure or plain text if not structured.
                // The prompt now explicitly asks for JSON for specific actions.
                // responseMimeType: "application/json", // This might force ALL responses to be JSON.
                                                        // Let's rely on the prompt to output JSON string and parse it.
            },
        });
    } catch (error) {
        console.error("Failed to initialize Gemini Chat:", error);
        chat = null; 
    }
} else {
    console.warn("API_KEY environment variable not set. Gemini API features will be disabled.");
}

export const getChatResponse = async (userMessage: string): Promise<string | BotAction> => {
  if (!chat) {
    if (!API_KEY) {
        return "I'm sorry, the AI assistant is currently unavailable due to a missing API key. Please configure the API_KEY environment variable.";
    }
    return "I'm sorry, my connection to the AI brain is currently unavailable. Please try again later.";
  }

  try {
    const result: GenerateContentResponse = await chat.sendMessage({ message: userMessage });
    let responseText = result.text;

    // Try to parse as JSON if it looks like it (e.g., starts with { and ends with })
    // Remove markdown fences if present
    const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
    const match = responseText.match(fenceRegex);
    if (match && match[2]) {
      responseText = match[2].trim();
    }

    try {
      const parsedData = JSON.parse(responseText);
      if (parsedData && parsedData.action === 'DISPLAY_PROJECTS') {
        return { type: 'DISPLAY_PROJECTS' } as BotAction;
      }
    } catch (e) {
      // Not a JSON response or not the action we're looking for, proceed with text
    }
    
    return responseText; // Return the original text if not a special JSON action
  } catch (error) {
    console.error("Gemini API error:", error);
    let errorMessage = "I'm having a little trouble thinking right now. Please try asking again in a moment.";
    if (error instanceof Error) {
        if (error.message.includes("400") || error.message.includes("API key not valid")) {
            errorMessage = "There seems to be an issue with the API configuration. Please check the API key.";
        } else if (error.message.includes("500") || error.message.includes("unavailable")) {
            errorMessage = "The AI service seems to be temporarily unavailable. Please try again later.";
        }
    }
    return errorMessage;
  }
};
