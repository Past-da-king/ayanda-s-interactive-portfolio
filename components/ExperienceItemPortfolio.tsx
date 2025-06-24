
import React from 'react';
import { Experience } from '../types';

interface ExperienceItemPortfolioProps {
  experience: Experience;
}

const ExperienceItemPortfolio: React.FC<ExperienceItemPortfolioProps> = ({ experience }) => {
  return (
    <div className="relative">
      {/* Timeline Dot */}
      <div 
        className="absolute left-[-2.2rem] sm:left-[-2.7rem] top-1.5 sm:top-2 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-purple-500 border-4 sm:border-[5px] border-slate-800/80 shadow-md z-10"
        style={{ borderColor: '#0f172a' /* bg-slate-900 like */}}
      ></div>
      
      <div className="ml-2">
        <h3 className="text-lg sm:text-xl font-bold text-slate-100">
          {experience.role} <span className={`${experience.companyColorClass}`}>@ {experience.company}</span>
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 mb-1 sm:mb-2">{experience.period}</p>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">{experience.description}</p>
      </div>
    </div>
  );
};

export default ExperienceItemPortfolio;
