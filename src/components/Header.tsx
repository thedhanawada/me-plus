import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import HoverLink from './HoverLink';

const NAV_ITEMS = [
  { name: 'about', path: '/about' },
  { name: 'work', path: '/work' },
  { name: 'lab', path: '/lab' },
  { name: 'art', path: '/art' },
  { name: 'watch', path: '/watchlist' },
] as const;

interface HeaderProps {
  toggleTheme: () => void;
  theme: 'light' | 'dark';
}

const Header = ({ toggleTheme, theme }: HeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:bg-black focus:text-white dark:focus:bg-white dark:focus:text-black font-mono text-sm"
      >
        Skip to main content
      </a>
      <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 transition-colors duration-500">
      <div className="max-w-4xl mx-auto px-6">
        <div className="py-12 border-b border-gray-900 dark:border-gray-700 transition-colors duration-500">
          {/* Name */}
          <div className="mb-8">
            <Link to="/" className="block">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-none transition-colors duration-500">
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
                className="px-4 py-2 text-sm ml-8 border-l border-gray-300 dark:border-gray-700 pl-4"
              >
                [source code]
              </HoverLink>

              <HoverLink
                onClick={toggleTheme}
                ariaLabel={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                className="px-4 py-2 text-sm border-l border-gray-300 dark:border-gray-700 pl-4"
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
              className="text-gray-600 hover:text-gray-900 font-mono text-sm dark:text-gray-400 dark:hover:text-white transition-colors duration-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
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
                className="lg:hidden mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 transition-colors duration-500 overflow-hidden"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
              >
                <div className="space-y-4">
                  {NAV_ITEMS.map((item, index) => {
                    const isActive = location.pathname === item.path;
                    return (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Link
                          to={item.path}
                          className={`block text-lg font-mono transition-colors duration-500 ${
                            isActive
                              ? 'text-white bg-black dark:text-black dark:bg-white'
                              : 'text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white'
                          }`}
                        >
                          [{item.name}]
                        </Link>
                      </motion.div>
                    );
                  })}

                  <motion.div
                    className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700 transition-colors duration-500"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.25 }}
                  >
                    <a
                      href="https://github.com/thedhanawada/me-plus"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-gray-400 font-mono dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-500"
                    >
                      source code
                    </a>
                  </motion.div>

                  <motion.div
                    className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700 transition-colors duration-500"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <button
                      onClick={toggleTheme}
                      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                      className="text-sm text-gray-400 font-mono dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
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