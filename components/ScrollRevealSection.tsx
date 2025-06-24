
import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // in ms, but animation is mainly CSS driven
  threshold?: number;
}

const ScrollRevealSection: React.FC<ScrollRevealSectionProps> = ({ children, className = '', delay = 0, threshold = 0.1 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentRef = sectionRef.current; // Capture ref value
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Optional: use JS delay if CSS animation-delay isn't sufficient or for different effects
          // setTimeout(() => setIsVisible(true), delay); 
          setIsVisible(true);
          observer.unobserve(currentRef);
        }
      },
      {
        threshold: threshold,
      }
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay, threshold]); // Dependencies for re-running the effect if these props change

  // Apply delay using inline style for animation-delay if needed, though CSS classes are often preferred.
  // The 'fade-in-up' class in index.html already defines an animation. Here we just trigger visibility.
  // We use transition for a smoother effect triggered by opacity and transform changes.
  return (
    <section
      ref={sectionRef}
      className={`transition-all duration-700 ease-out ${className} ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={ isVisible && delay > 0 ? { transitionDelay: `${delay}ms` } : {}}
    >
      {children}
    </section>
  );
};

export default ScrollRevealSection;
