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
        <div className="w-full flex flex-col lg:flex-row lg:items-center lg:justify-between lg:gap-16">
        <div className="w-full lg:max-w-2xl shrink-0">
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

          <div className="space-y-1 mb-12">
            {LATEST.map((entry) => {
              const i = lineIndex++;
              return (
                <motion.div
                  key={entry.text}
                  variants={line}
                  initial="hidden"
                  animate="visible"
                  custom={i}
                  className="flex items-baseline gap-3"
                >
                  <span className="text-text-muted select-none shrink-0 font-mono text-sm sm:text-base">~</span>
                  <HoverLink
                    to={entry.to}
                    className="px-2 py-1 text-sm sm:text-base"
                  >
                    {entry.text}
                  </HoverLink>
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

          <div className="space-y-1">
            {PREVIOUSLY.map((entry) => {
              const i = lineIndex++;
              return (
                <motion.div
                  key={entry.text}
                  variants={line}
                  initial="hidden"
                  animate="visible"
                  custom={i}
                  className="flex items-baseline gap-3"
                >
                  <span className="text-text-muted select-none shrink-0 font-mono text-sm sm:text-base">~</span>
                  <HoverLink
                    to={entry.to}
                    className="px-2 py-1 text-sm sm:text-base"
                  >
                    {entry.text}
                  </HoverLink>
                </motion.div>
              );
            })}
          </div>

          {/* Source + Colophon */}
          <motion.div
            className="mt-12 pt-8 border-t border-border-primary flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-4"
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
            <p className="font-mono text-xs text-text-muted">
              react + vite + tailwind · vercel
            </p>
          </motion.div>
        </div>

        {/* Earth — Artemis II */}
        <motion.div
          className="hidden lg:flex flex-1 items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.6, ease: 'easeOut' }}
        >
          <figure className="relative max-w-md xl:max-w-lg">
            <img
              src="https://res.cloudinary.com/dyntcx472/image/upload/q_auto,f_auto,w_1200/art002e000192_yso465"
              alt="Earth photographed from the Orion spacecraft window during Artemis II, April 2026"
              className="w-full h-auto rounded-lg"
            />
            <figcaption className="mt-3 font-mono text-xs text-text-muted text-right">
              <HoverLink
                href="https://www.nasa.gov/image-article/hello-world/"
                external
                className="px-1 py-0.5 text-xs"
              >
                "Hello, World"
              </HoverLink>
              {' '}— Artemis II, April 2026
              <br />
              <span className="text-text-muted/60">NASA/Reid Wiseman</span>
            </figcaption>
          </figure>
        </motion.div>
        </div>
      </div>
    </main>
  );
};

export default Home;
