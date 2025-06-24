
export enum Sender {
  USER = 'user',
  BOT = 'bot',
}

export interface Message {
  id: string;
  text: string;
  sender: Sender;
  timestamp: number;
  projectCards?: Project[]; // For displaying project cards in chat
  action?: BotAction; // For special bot actions
}

export interface BotAction {
  type: 'DISPLAY_PROJECTS';
  // Potentially other action types in the future
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
