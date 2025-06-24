
import React from 'react';
import { Message, Sender } from '../types';
import Markdown from 'react-markdown';
import ChatProjectCard from './ChatProjectCard'; // Import the new component

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.sender === Sender.USER;

  const BotAvatar = () => (
    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex-shrink-0"></div>
  );
  
  if (isUser) {
    return (
      <div className="flex justify-end fade-in-up">
        <div className="max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl">
          <div className="bg-indigo-600 text-white p-3 sm:p-4 rounded-xl rounded-br-none shadow-md">
            <Markdown className="prose prose-sm prose-invert max-w-none break-words">
                {message.text}
            </Markdown>
          </div>
        </div>
      </div>
    );
  }

  // Bot message
  return (
    <div className="flex items-start gap-2 sm:gap-3 fade-in-up max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl">
      <BotAvatar />
      <div className="flex-1 space-y-2 sm:space-y-3 min-w-0"> {/* Added min-w-0 for flex child overflow */}
        <div className="bg-slate-800/60 backdrop-blur-md p-3 sm:p-4 rounded-xl rounded-bl-none border border-slate-700/50 shadow-md">
          {message.text && (
            <Markdown 
              className="prose prose-sm prose-slate dark:prose-invert max-w-none break-words"
              components={{
                h1: ({node, ...props}) => <h1 className="text-xl font-semibold text-slate-100" {...props} />,
                h2: ({node, ...props}) => <h2 className="text-lg font-semibold text-slate-200" {...props} />,
                h3: ({node, ...props}) => <h3 className="text-md font-semibold text-slate-200" {...props} />,
                p: ({node, ...props}) => <p className="text-slate-300" {...props} />,
                ul: ({node, ...props}) => <ul className="list-disc list-outside ml-5 space-y-1 text-slate-300" {...props} />,
                ol: ({node, ...props}) => <ol className="list-decimal list-outside ml-5 space-y-1 text-slate-300" {...props} />,
                li: ({node, ...props}) => <li className="text-slate-300" {...props} />,
                strong: ({node, ...props}) => <strong className="font-semibold text-slate-200" {...props} />,
                a: ({node, ...props}) => <a className="text-purple-400 hover:text-purple-300 hover:underline" target="_blank" rel="noopener noreferrer" {...props} />,
              }}
            >
              {message.text}
            </Markdown>
          )}
          {message.projectCards && message.projectCards.length > 0 && (
            <div className={` ${message.text ? 'mt-4' : ''}`}>
              <div className="flex overflow-x-auto space-x-4 pb-2 custom-scrollbar">
                {message.projectCards.map((project, index) => (
                  <ChatProjectCard key={project.id} project={project} style={{ animationDelay: `${index * 0.1}s` }} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
