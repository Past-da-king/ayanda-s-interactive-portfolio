
export enum Sender {
  USER = 'user',
  BOT = 'bot',
}

export interface Message {
  id: string;
  text: string; // Text can be a preamble if projectCards or action is present
  sender: Sender;
  timestamp: number;
  projectCards?: Project[]; // For displaying project cards in chat
  action?: BotAction; // For special bot actions triggered by function calls
}

// Defines the type of action the bot should perform based on a function call
export interface BotAction {
  type: 'DISPLAY_PROJECTS'; // Currently only one action type
  // data?: any; // Optional: if the function call returned data to be used by the action
}

export enum View {
  CHAT = 'chat',
  PORTFOLIO = 'portfolio',
}

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  liveDemoUrl?: string;
  sourceCodeUrl?: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  companyColorClass: string; 
  period: string;
  description: string;
}

export interface SuggestionChipData {
  id: string;
  prompt: string;
  icon: string; // Font Awesome class, e.g., "fa-solid fa-layer-group"
  delay: string; // e.g., "0.6s" for animation
}
