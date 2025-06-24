
import React, { useState, useCallback } from 'react';
import ChatView from './components/ChatView';
import PortfolioView from './components/PortfolioView';
import { View } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.CHAT);
  const [animationClass, setAnimationClass] = useState<string>('fade-in');

  const switchView = useCallback((newView: View) => {
    setAnimationClass('fade-out');
    setTimeout(() => {
      setCurrentView(newView);
      setAnimationClass('fade-in');
      if (newView === View.PORTFOLIO) {
        // Ensure portfolio view scrolls to top when shown
        const portfolioElement = document.getElementById('portfolio-view-container');
        if (portfolioElement) {
            portfolioElement.scrollTop = 0;
        }
      }
    }, 300); // Match fadeOut animation duration
  }, []);

  return (
    <div className="h-screen w-screen overflow-hidden">
      <div className="aurora-background"></div>
      
      {currentView === View.CHAT && (
        <div className={`h-full w-full ${animationClass}`}>
          <ChatView onSwitchToPortfolio={() => switchView(View.PORTFOLIO)} />
        </div>
      )}
      
      {currentView === View.PORTFOLIO && (
        <div id="portfolio-view-container" className={`h-full w-full overflow-y-auto custom-scrollbar ${animationClass}`}>
          <PortfolioView onSwitchToChat={() => switchView(View.CHAT)} />
        </div>
      )}
    </div>
  );
};

export default App;
