import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import HoverLink from './HoverLink';
import { useTheme } from '../hooks';

const NAV_ITEMS = [
  { name: 'about', path: '/about' },
  { name: 'work', path: '/work' },
  { name: 'lab', path: '/lab' },
  { name: 'art', path: '/art' },
  { name: 'watch', path: '/watchlist' },
] as const;

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:bg-bg-inverted focus:text-text-inverted font-mono text-sm"
      >
        Skip to main content
      </a>
      <header className={`sticky top-0 z-50 bg-bg-primary transition-all duration-default ${scrolled ? 'shadow-sm' : ''}`}>
      <div className="max-w-container mx-auto px-page-x">
        <div className={`border-b border-border-strong transition-all duration-default ${scrolled ? 'py-4' : 'py-12'}`}>
          {/* Name */}
          <div className={`transition-all duration-300 ${scrolled ? 'mb-4' : 'mb-8'}`}>
            <Link to="/" className="block">
              <h1 className={`font-bold tracking-tight leading-none transition-all duration-300 ${scrolled ? 'text-fluid-2xl' : 'text-fluid-5xl'}`}>
                N.R DHANAWADA
              </h1>
            </Link>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden lg:block">
            <div className="flex items-center space-x-8">
              {NAV_ITEMS.map((item) => (
                <HoverLink
                  key={item.name}
                  to={item.path}
                  active={location.pathname === item.path}
                  className="px-4 py-2 text-sm"
                >
                  [{item.name}]
                </HoverLink>
              ))}
              
              <HoverLink
                href="https://github.com/thedhanawada/me-plus"
                external
                className="px-4 py-2 text-sm ml-8 border-l border-border-secondary pl-4"
              >
                [source code]
              </HoverLink>

              <HoverLink
                onClick={toggleTheme}
                ariaLabel={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                className="px-4 py-2 text-sm border-l border-border-secondary pl-4"
              >
                [{theme === 'light' ? 'dark' : 'light'} mode]
              </HoverLink>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="text-text-secondary hover:text-text-primary font-mono text-sm transition-colors duration-slow focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2 focus:ring-offset-bg-primary"
            >
              {mobileMenuOpen ? '[close]' : '[menu]'}
            </button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.nav
                id="mobile-menu"
                aria-label="Mobile navigation"
                className="lg:hidden mt-6 pt-6 border-t border-border-primary transition-colors duration-slow overflow-hidden"
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
                animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, height: 'auto' }}
                exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.2, ease: 'easeInOut' }}
              >
                <div className="space-y-4">
                  {NAV_ITEMS.map((item, index) => {
                    const isActive = location.pathname === item.path;
                    return (
                      <motion.div
                        key={item.name}
                        initial={prefersReducedMotion ? {} : { opacity: 0, x: -20 }}
                        animate={prefersReducedMotion ? {} : { opacity: 1, x: 0 }}
                        transition={prefersReducedMotion ? {} : { delay: index * 0.05 }}
                      >
                        <Link
                          to={item.path}
                          className={`block text-lg font-mono transition-colors duration-slow ${
                            isActive
                              ? 'text-text-inverted bg-bg-inverted'
                              : 'text-text-secondary hover:text-text-primary'
                          }`}
                        >
                          [{item.name}]
                        </Link>
                      </motion.div>
                    );
                  })}

                  <motion.div
                    className="pt-4 mt-4 border-t border-border-primary transition-colors duration-slow"
                    initial={prefersReducedMotion ? {} : { opacity: 0 }}
                    animate={prefersReducedMotion ? {} : { opacity: 1 }}
                    transition={prefersReducedMotion ? {} : { delay: 0.25 }}
                  >
                    <a
                      href="https://github.com/thedhanawada/me-plus"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-text-muted font-mono hover:text-text-secondary transition-colors duration-slow"
                    >
                      source code
                    </a>
                  </motion.div>

                  <motion.div
                    className="pt-4 mt-4 border-t border-border-primary transition-colors duration-slow"
                    initial={prefersReducedMotion ? {} : { opacity: 0 }}
                    animate={prefersReducedMotion ? {} : { opacity: 1 }}
                    transition={prefersReducedMotion ? {} : { delay: 0.3 }}
                  >
                    <button
                      onClick={toggleTheme}
                      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                      className="text-sm text-text-muted font-mono hover:text-text-secondary transition-colors duration-slow focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2 focus:ring-offset-bg-primary"
                    >
                      [{theme === 'light' ? 'dark' : 'light'} mode]
                    </button>
                  </motion.div>
                </div>
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
    </>
  );
};

export default Header; 