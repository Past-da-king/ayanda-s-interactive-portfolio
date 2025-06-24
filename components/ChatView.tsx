
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Message, Sender, SuggestionChipData, BotAction } from '../types';
import ChatMessage from './ChatMessage';
import TypingIndicator from './TypingIndicator';
import SuggestionChip from './SuggestionChip';
import { getChatResponse } from '../services/geminiService';
import { INITIAL_SUGGESTION_CHIPS, FEATURED_PROJECTS } from '../constants';

interface ChatViewProps {
  onSwitchToPortfolio: () => void;
}

const ChatView: React.FC<ChatViewProps> = ({ onSwitchToPortfolio }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showWelcome, setShowWelcome] = useState<boolean>(true);
  const [disabledChips, setDisabledChips] = useState<string[]>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const welcomeTextLine1 = "Welcome to Ayanda's profile.";
  const welcomeTextLine2 = "You can ask me anything.";

  useEffect(() => {
    const initialBotMessage: Message = {
        id: 'initial-bot-welcome',
        sender: Sender.BOT,
        text: '', 
        timestamp: Date.now()
    };
    setMessages([initialBotMessage]);
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({ top: chatContainerRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isLoading) return;

    setShowWelcome(false); 

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: text.trim(),
      sender: Sender.USER,
      timestamp: Date.now(),
    };
    setMessages(prev => prev.filter(m => m.id !== 'initial-bot-welcome').concat(userMessage));
    setInputValue('');
    setIsLoading(true);

    try {
      const botResponse = await getChatResponse(userMessage.text);
      let newBotMessage: Message;

      if (typeof botResponse === 'object' && botResponse.type === 'DISPLAY_PROJECTS') {
        newBotMessage = {
          id: `bot-${Date.now()}`,
          text: "Certainly! Here are Ayanda's featured projects:",
          sender: Sender.BOT,
          projectCards: FEATURED_PROJECTS, // Attach project data here
          action: botResponse,
          timestamp: Date.now(),
        };
      } else if (typeof botResponse === 'string') {
        newBotMessage = {
          id: `bot-${Date.now()}`,
          text: botResponse,
          sender: Sender.BOT,
          timestamp: Date.now(),
        };
      } else {
        // Fallback for unexpected response type
         newBotMessage = {
          id: `error-${Date.now()}`,
          text: "Sorry, I received an unexpected response. Please try again.",
          sender: Sender.BOT,
          timestamp: Date.now(),
        };
      }
      setMessages(prev => prev.concat(newBotMessage));
    } catch (error) {
      console.error("Error getting chat response:", error);
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        text: "Sorry, I encountered an error processing that. Please try again.",
        sender: Sender.BOT,
        timestamp: Date.now(),
      };
      setMessages(prev => prev.concat(errorMessage));
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  const handleSuggestionClick = useCallback((chip: SuggestionChipData) => {
    if (disabledChips.includes(chip.id) || isLoading) return;
    handleSendMessage(chip.prompt);
    setDisabledChips(prev => [...prev, chip.id]);
  }, [disabledChips, isLoading, handleSendMessage]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSendMessage(inputValue);
  };

  return (
    <div className="flex h-screen w-full">
      <aside className="w-72 flex-shrink-0 bg-black/30 backdrop-blur-xl border-r border-white/10 p-6 flex-col hidden md:flex">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex-shrink-0"></div>
          <span className="font-bold text-lg text-slate-100">Ayanda's AI</span>
        </div>
        <div className="text-sm text-slate-400">
            <p>This is an interactive AI assistant powered by Google Gemini. Ask about Ayanda's skills, projects, or experience!</p>
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-screen bg-black/10">
        <header className="p-4 sm:p-6 flex justify-between items-center">
            <div className="md:hidden flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex-shrink-0"></div>
                 <span className="font-bold text-md text-slate-100">Ayanda's AI</span>
            </div>
            <div className="flex-grow"></div> 
            <button 
                onClick={onSwitchToPortfolio}
                className="px-4 py-2 sm:px-6 sm:py-2 text-sm sm:text-base font-semibold bg-black/30 border border-white/20 rounded-lg backdrop-blur-sm hover:bg-white/20 transition-all hover:scale-105 transform shadow-lg text-slate-200 hover:text-white flex items-center"
            >
                <i className="fa-solid fa-table-columns mr-2"></i> View Full Portfolio
            </button>
        </header>
        
        <div ref={chatContainerRef} className="flex-1 flex flex-col justify-end p-4 sm:p-6 md:p-8 overflow-y-auto custom-scrollbar">
          <div className="space-y-6 md:space-y-8">
            {showWelcome && messages.length === 1 && messages[0].id === 'initial-bot-welcome' && (
              <div className="max-w-4xl">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-slate-100">
                  {[...welcomeTextLine1].map((char, i) => (
                    <span key={`l1-${i}`} className="inline-block opacity-0 animate-fadeInUpAnim" style={{ animationName: 'fadeInUpAnim', animationFillMode: 'forwards', animationDelay: `${0.2 + i * 0.03}s` }}>{char === ' ' ? '\u00A0' : char}</span>
                  ))}
                  <br />
                  {[...welcomeTextLine2].map((char, i) => (
                    <span key={`l2-${i}`} className="inline-block opacity-0 animate-fadeInUpAnim" style={{ animationName: 'fadeInUpAnim', animationFillMode: 'forwards', animationDelay: `${0.2 + welcomeTextLine1.length * 0.03 + 0.2 + i * 0.03}s` }}>{char === ' ' ? '\u00A0' : char}</span>
                  ))}
                </h1>
              </div>
            )}
            {messages.filter(m => m.id !== 'initial-bot-welcome').map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))}
            {isLoading && <TypingIndicator />}
          </div>
        </div>

        <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
          {!isLoading && messages.length <= 3 && ( 
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {INITIAL_SUGGESTION_CHIPS.map((chip) => (
                <SuggestionChip 
                    key={chip.id} 
                    chip={chip} 
                    onClick={() => handleSuggestionClick(chip)}
                    disabled={disabledChips.includes(chip.id) || isLoading}
                />
              ))}
            </div>
          )}
          <form onSubmit={handleSubmit} className="flex items-center gap-2 sm:gap-4 bg-black/50 border border-white/10 rounded-xl p-1.5 sm:p-2 backdrop-blur-lg">
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Or type your own question..." 
              className="flex-1 bg-transparent px-3 sm:px-4 py-2 focus:outline-none placeholder-slate-500 text-slate-200 text-sm sm:text-base"
              disabled={isLoading}
            />
            <button 
              type="submit" 
              disabled={isLoading || !inputValue.trim()}
              className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 hover:scale-110 transition-transform disabled:opacity-50 disabled:scale-100"
            >
              <i className="fa-solid fa-paper-plane text-lg sm:text-xl text-white"></i>
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default ChatView;
