
import React from 'react';
import { Project } from '../types';

interface ChatProjectCardProps {
  project: Project;
  style?: React.CSSProperties;
}

const ChatProjectCard: React.FC<ChatProjectCardProps> = ({ project, style }) => {
  return (
    <div 
      className="bg-slate-700/50 rounded-lg overflow-hidden flex-shrink-0 w-64 sm:w-72 border border-slate-600/70 shadow-lg fade-in-up"
      style={style}
    >
      <img 
        src={project.imageUrl} 
        alt={project.title} 
        className="w-full h-36 object-cover"
      />
      <div className="p-3 sm:p-4">
        <h3 className="text-md sm:text-lg font-bold text-slate-100 mb-1 truncate" title={project.title}>
          {project.title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 mb-2 h-10 sm:h-12 overflow-hidden text-ellipsis">
          {project.description.substring(0, 60)}{project.description.length > 60 ? '...' : ''}
        </p>
        <div className="flex flex-wrap gap-1 mb-3">
          {project.tags.slice(0, 3).map(tag => ( // Show max 3 tags for brevity
            <span 
              key={tag} 
              className="bg-purple-500/30 text-purple-300 rounded-full px-2 py-0.5 text-[10px] sm:text-xs font-semibold"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-x-3 gap-y-1">
          {project.liveDemoUrl && (
            <a 
              href={project.liveDemoUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-1 text-slate-300 hover:text-purple-400 transition-colors text-xs sm:text-sm font-medium"
            >
              <i className="fas fa-external-link-alt text-[10px] sm:text-xs"></i> Live Demo
            </a>
          )}
          {project.sourceCodeUrl && (
            <a 
              href={project.sourceCodeUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-1 text-slate-300 hover:text-purple-400 transition-colors text-xs sm:text-sm font-medium"
            >
              <i className="fab fa-github text-[10px] sm:text-xs"></i> Source
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatProjectCard;
