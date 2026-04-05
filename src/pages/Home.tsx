import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import HoverLink from '../components/HoverLink';
import ThemeToggle from '../components/ThemeToggle';
import SettingsPanel from '../components/SettingsPanel';

const NAV_ITEMS = [
  { name: 'about', path: '/about' },
  { name: 'notes', path: '/notes' },
  { name: 'art', path: '/art' },
  { name: 'tv', path: '/tv' },
] as const;

const LATEST = [
  { text: 'solutions architect @ mtc futureready', to: '/about', section: 'work' },
  { text: 'first principles in system design', to: '/notes/first-principles-in-system-design', section: 'note' },
  { text: 'forceCalendar — sf calendar engine', to: '/about', hash: '#projects', section: 'project' },
  { text: '42 photographs', to: '/art', section: 'art' },
  { text: 'watching: for all mankind, the pitt, silo', to: '/tv', section: 'tv' },
] as const;

const PREVIOUSLY = [
  { text: 'research placement @ wehi', to: '/about' },
  { text: 'senior tech analyst @ victoria\'s secret & co.', to: '/about' },
  { text: 'master\'s (hons) @ university of melbourne', to: '/about' },
] as const;

const line = {
  hidden: { opacity: 0, x: -8 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, delay: i * 0.05, ease: 'easeOut' },
  }),
};

const Home = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  let lineIndex = 0;

  return (
    <main id="main-content" className="relative min-h-screen flex flex-col">
      {/* Top navigation */}
      <nav className="relative z-10 px-4 sm:px-6 md:px-12 lg:px-16 py-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="inline-block">
            <span className="font-bold tracking-tight text-fluid-2xl">
              N.R. Dhanawada
            </span>
          </Link>

          <div className="hidden lg:flex items-center space-x-6">
            {NAV_ITEMS.map((item) => (
              <HoverLink
                key={item.name}
                to={item.path}
                active={location.pathname === item.path}
                className="px-3 py-1.5 text-sm"
              >
                [{item.name}]
              </HoverLink>
            ))}

            <SettingsPanel />
            <ThemeToggle />
          </div>

          {/* Mobile */}
          <div className="lg:hidden flex items-center gap-4">
            <SettingsPanel />
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="text-text-secondary hover:text-text-primary font-mono text-sm transition-colors duration-slow focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2 focus:ring-offset-bg-primary"
            >
              {mobileMenuOpen ? '[close]' : '[menu]'}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="lg:hidden mt-6 pt-6 border-t border-border-primary"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
            >
              <div className="space-y-4">
                {NAV_ITEMS.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      to={item.path}
                      className="block text-lg font-mono text-text-secondary hover:text-text-primary transition-colors duration-slow"
                    >
                      [{item.name}]
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main content */}
      <div className="flex-1 flex items-center px-4 sm:px-6 md:px-12 lg:px-16 pb-16">
        <div className="w-full max-w-2xl">
          {/* Latest */}
          <motion.p
            className="font-mono text-xs text-text-muted uppercase tracking-widest mb-4"
            variants={line}
            initial="hidden"
            animate="visible"
            custom={lineIndex++}
          >
            latest
          </motion.p>

          <div className="space-y-1.5 mb-12">
            {LATEST.map((entry) => {
              const i = lineIndex++;
              return (
                <motion.div
                  key={entry.text}
                  variants={line}
                  initial="hidden"
                  animate="visible"
                  custom={i}
                >
                  <Link
                    to={entry.to}
                    className="group flex items-baseline gap-3 font-mono text-sm sm:text-base py-0.5"
                  >
                    <span className="text-text-muted select-none shrink-0">~</span>
                    <span className="text-text-secondary group-hover:text-text-primary transition-colors duration-fast">
                      {entry.text}
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Previously */}
          <motion.p
            className="font-mono text-xs text-text-muted uppercase tracking-widest mb-4"
            variants={line}
            initial="hidden"
            animate="visible"
            custom={lineIndex++}
          >
            previously
          </motion.p>

          <div className="space-y-1.5">
            {PREVIOUSLY.map((entry) => {
              const i = lineIndex++;
              return (
                <motion.div
                  key={entry.text}
                  variants={line}
                  initial="hidden"
                  animate="visible"
                  custom={i}
                >
                  <Link
                    to={entry.to}
                    className="group flex items-baseline gap-3 font-mono text-sm sm:text-base py-0.5"
                  >
                    <span className="text-text-muted select-none shrink-0">~</span>
                    <span className="text-text-tertiary group-hover:text-text-primary transition-colors duration-fast">
                      {entry.text}
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Source */}
          <motion.div
            className="mt-12 pt-8 border-t border-border-primary"
            variants={line}
            initial="hidden"
            animate="visible"
            custom={lineIndex++}
          >
            <HoverLink
              href="https://github.com/thedhanawada"
              external
              className="font-mono text-sm text-text-muted hover:text-text-primary"
            >
              src — github.com/thedhanawada
            </HoverLink>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default Home;
