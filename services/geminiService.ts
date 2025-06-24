
import { GoogleGenAI, Chat, GenerateContentResponse, Tool } from "@google/genai";
import { GEMINI_MODEL_NAME, GEMINI_SYSTEM_INSTRUCTION, displayProjectsFunctionDeclaration, DISPLAY_PROJECTS_FUNCTION_NAME } from '../constants';
import { BotAction } from "../types";

const API_KEY = process.env.API_KEY;

let chat: Chat | null = null;

if (API_KEY) {
    try {
        const ai = new GoogleGenAI({ apiKey: API_KEY });
        const tools: Tool[] = [{ functionDeclarations: [displayProjectsFunctionDeclaration] }];
        
        chat = ai.chats.create({
            model: GEMINI_MODEL_NAME,
            config: {
                systemInstruction: GEMINI_SYSTEM_INSTRUCTION,
                tools: tools,
            },
        });
    } catch (error) {
        console.error("Failed to initialize Gemini Chat with function calling:", error);
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
    
    // Check for function call first, as per JS SDK (response.functionCalls)
    if (result.functionCalls && result.functionCalls.length > 0) {
        const funcCall = result.functionCalls[0]; // Assuming one function call for this use case
        if (funcCall.name === DISPLAY_PROJECTS_FUNCTION_NAME) {
            // The model wants to call our function to display projects
            return { type: 'DISPLAY_PROJECTS' } as BotAction;
        } else {
            // Handle other function calls if any in the future, or treat as error/unexpected
            console.warn("Received unhandled function call:", funcCall.name);
            // Fall through to text response or return specific message
        }
    }

    // If no function call, or unhandled function call, process as text
    let responseText = result.text;
    
    // The Gemini API might return an empty string for `text` if a function call was made,
    // or if the model chose not to respond with text.
    // If responseText is empty and no function call was handled, provide a fallback.
    if (!responseText && (!result.functionCalls || result.functionCalls.length === 0)) {
        console.warn("Gemini response had no text and no recognized function call.");
        responseText = "I'm not sure how to respond to that. Could you try rephrasing?";
    }
    
    return responseText;

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
