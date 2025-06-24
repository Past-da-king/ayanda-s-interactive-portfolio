
import React, { useEffect } from 'react';
import { AYANDA_NAME, AYANDA_TITLE, AYANDA_PROFILE_PIC, AYANDA_BIO, SOCIAL_LINKS, FEATURED_PROJECTS, WORK_EXPERIENCE } from '../constants';
import ProjectCardPortfolio from './ProjectCardPortfolio';
import ExperienceItemPortfolio from './ExperienceItemPortfolio';
import ScrollRevealSection from './ScrollRevealSection';

interface PortfolioViewProps {
  onSwitchToChat: () => void;
}

const PortfolioView: React.FC<PortfolioViewProps> = ({ onSwitchToChat }) => {
    
  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="w-full min-h-screen bg-slate-900/50 text-slate-200">
      <header className="fixed top-0 left-0 w-full p-4 sm:p-6 z-50 flex justify-end">
        <button 
            onClick={onSwitchToChat}
            className="px-4 py-2 sm:px-6 sm:py-2 text-sm sm:text-base font-semibold bg-black/30 border border-white/20 rounded-lg backdrop-blur-sm hover:bg-white/20 transition-all hover:scale-105 transform shadow-lg text-slate-200 hover:text-white flex items-center"
        >
          <i className="fa-solid fa-comment-dots mr-2"></i> Back to Chat AI
        </button>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 space-y-24 md:space-y-32">
        {/* Hero Section */}
        <ScrollRevealSection className="text-center flex flex-col items-center">
          <img 
            src={AYANDA_PROFILE_PIC} 
            alt="Ayanda's Profile Picture" 
            className="w-32 h-32 sm:w-40 sm:h-40 rounded-full mb-6 border-4 border-slate-700 ring-4 ring-purple-500/50 shadow-lg shadow-purple-500/20"
          />
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-50">
            {AYANDA_NAME}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mt-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400 font-semibold">
            {AYANDA_TITLE}
          </p>
          <p className="max-w-2xl mt-4 text-slate-400 text-sm sm:text-base">
            {AYANDA_BIO}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4 sm:gap-5">
            {SOCIAL_LINKS.map(link => (
              <a 
                key={link.label} 
                href={link.url} 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label={link.label}
                className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-lg sm:text-xl bg-slate-800 rounded-full transition-all hover:bg-gradient-to-br hover:from-purple-500 hover:to-indigo-600 hover:scale-110 transform text-slate-300 hover:text-white"
              >
                <i className={link.icon}></i>
              </a>
            ))}
          </div>
        </ScrollRevealSection>
        
        {/* Featured Projects Section */}
        <ScrollRevealSection>
          <h2 className="text-3xl sm:text-4xl font-bold mb-10 sm:mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-slate-200 to-slate-400">
            Featured Projects
          </h2>
          <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
            {FEATURED_PROJECTS.map(project => (
              <ProjectCardPortfolio key={project.id} project={project} />
            ))}
          </div>
        </ScrollRevealSection>
        
        {/* Work Experience Section */}
        <ScrollRevealSection>
          <h2 className="text-3xl sm:text-4xl font-bold mb-10 sm:mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-slate-200 to-slate-400">
            Work Experience
          </h2>
          <div className="relative border-l-2 border-slate-700 ml-2 sm:ml-4 pl-6 sm:pl-8 space-y-10 sm:space-y-12">
            {WORK_EXPERIENCE.map(exp => (
              <ExperienceItemPortfolio key={exp.id} experience={exp} />
            ))}
          </div>
        </ScrollRevealSection>

        {/* You can add more sections like Skills, Education, Contact etc. */}
        {/* Example: Skills Section */}
        <ScrollRevealSection>
            <h2 className="text-3xl sm:text-4xl font-bold mb-10 sm:mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-slate-200 to-slate-400">
                Core Skills
            </h2>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                {['React', 'TypeScript', 'Next.js', 'Node.js', 'Python', 'Tailwind CSS', 'UI/UX Design', 'Gemini API', 'D3.js', 'SQL', 'NoSQL', 'Git', 'Docker'].map(skill => (
                    <span key={skill} className="bg-purple-500/20 text-purple-300 rounded-full px-4 py-1.5 sm:px-5 sm:py-2 text-sm sm:text-base font-semibold">
                        {skill}
                    </span>
                ))}
            </div>
        </ScrollRevealSection>

        <footer className="text-center py-12 border-t border-slate-700/50 mt-16">
            <p className="text-slate-500 text-sm">&copy; {new Date().getFullYear()} {AYANDA_NAME}. All rights reserved.</p>
            <p className="text-slate-600 text-xs mt-1">Crafted with <i className="fas fa-heart text-red-500"></i> and React.</p>
        </footer>

      </div>
    </div>
  );
};

export default PortfolioView;
