import { useEffect, useRef, useState } from 'react';

/**
 * Hook to detect if an element is visible on screen
 * Used to pause/resume animations based on visibility
 * 
 * @param {Object} options - Intersection Observer options
 * @param {number} options.threshold - Visibility threshold (0-1). Default: 0.1 (10% visible)
 * @param {string} options.rootMargin - Margin around viewport. Default: '50px'
 * @param {string} options.name - Animation name for logging. Default: 'Animation'
 * @param {boolean} options.debug - Enable console logging. Default: true
 * @returns {Object} { ref, isVisible, isInitialLoad }
 */
export const useVisibilityObserver = (options = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '50px',
    name = 'Animation',
    debug = true
  } = options;

  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const lastVisibilityRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const newVisibilityState = entry.isIntersecting;

        // Only log when visibility state actually changes
        if (lastVisibilityRef.current !== newVisibilityState && !isInitialLoad) {
          if (debug) {
            const status = newVisibilityState ? '🎬 ACTIVE' : '⏸️ INACTIVE';
            const timestamp = new Date().toLocaleTimeString('en-US', {
              hour12: false,
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
              fractionalSecondDigits: 3
            });
            console.log(`[${timestamp}] ${status} — ${name}`);
          }
          lastVisibilityRef.current = newVisibilityState;
        }

        setIsVisible(newVisibilityState);
        setIsInitialLoad(false);
      },
      {
        threshold,
        rootMargin
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
      observer.disconnect();
    };
  }, [threshold, rootMargin, isInitialLoad, debug, name]);

  return { ref, isVisible, isInitialLoad };
};

export default useVisibilityObserver;
