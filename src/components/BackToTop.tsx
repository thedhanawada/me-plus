import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button after scrolling 500px
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`
        fixed bottom-6 right-6 z-50
        p-3 rounded-full
        bg-bg-inverted text-text-inverted
        shadow-lg hover:shadow-xl
        transition-all duration-default
        focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2 focus:ring-offset-bg-primary
        ${isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-4 pointer-events-none'
        }
      `}
      aria-label="Back to top"
      title="Back to top"
    >
      <ArrowUp size={20} />
    </button>
  );
};

export default BackToTop;
