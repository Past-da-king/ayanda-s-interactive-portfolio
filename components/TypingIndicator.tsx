
import React from 'react';

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex items-start gap-2 sm:gap-3 fade-in-up">
      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex-shrink-0"></div>
      <div className="bg-slate-800/50 p-3 sm:p-4 rounded-xl typing-indicator shadow-md">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default TypingIndicator;
