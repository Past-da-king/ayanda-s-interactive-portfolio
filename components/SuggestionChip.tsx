
import React from 'react';
import { SuggestionChipData } from '../types';

interface SuggestionChipProps {
  chip: SuggestionChipData;
  onClick: () => void;
  disabled: boolean;
}

const SuggestionChip: React.FC<SuggestionChipProps> = ({ chip, onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm cursor-pointer transition-all hover:bg-white/20 hover:scale-105 transform flex items-center text-slate-300 hover:text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 fade-in-up`}
      style={{ animationDelay: chip.delay }}
    >
      <i className={`${chip.icon} mr-1.5 sm:mr-2 text-slate-400`}></i>
      {chip.prompt}
    </button>
  );
};

export default SuggestionChip;
