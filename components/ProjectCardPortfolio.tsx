
import React from 'react';
import { Project } from '../types';

interface ProjectCardPortfolioProps {
  project: Project;
}

const ProjectCardPortfolio: React.FC<ProjectCardPortfolioProps> = ({ project }) => {
  return (
    <div className="bg-slate-800/50 rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/20 border border-slate-700/50 hover:border-purple-500/30 group">
      <img 
        src={project.imageUrl} 
        alt={project.title} 
        className="w-full h-48 sm:h-56 object-cover transition-transform duration-300 group-hover:scale-105" 
      />
      <div className="p-5 sm:p-6">
        <h3 className="text-xl sm:text-2xl font-bold mb-2 text-slate-100">{project.title}</h3>
        <p className="text-slate-400 mb-4 text-sm sm:text-base leading-relaxed">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map(tag => (
            <span key={tag} className="bg-purple-500/20 text-purple-300 rounded-full px-3 py-1 text-xs sm:text-sm font-semibold">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-2 mt-auto pt-2">
          {project.liveDemoUrl && (
            <a 
              href={project.liveDemoUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-2 text-slate-300 hover:text-purple-400 transition-colors text-sm font-medium"
            >
              <i className="fas fa-external-link-alt"></i> Live Demo
            </a>
          )}
          {project.sourceCodeUrl && (
            <a 
              href={project.sourceCodeUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-2 text-slate-300 hover:text-purple-400 transition-colors text-sm font-medium"
            >
              <i className="fab fa-github"></i> Source Code
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCardPortfolio;
