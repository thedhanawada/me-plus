import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import HoverLink from '../components/HoverLink';
import ThemeToggle from '../components/ThemeToggle';
import SettingsPanel from '../components/SettingsPanel';

const NAV_ITEMS = [
  { name: 'about', path: '/about' },
  { name: 'work', path: '/work' },
  { name: 'lab', path: '/lab' },
  { name: 'notes', path: '/notes' },
  { name: 'art', path: '/art' },
  { name: 'tv', path: '/tv' },
] as const;

const CLOUDINARY_BASE = 'https://res.cloudinary.com/dyntcx472/image/upload';
const PHOTO_ID = 'IMG_3973_wvbdt9';

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

      {/* Center content: photo + dedication */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6">
        {/* Photo with edge fade */}
        <motion.div
          className="relative w-full max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <img
            src={`${CLOUDINARY_BASE}/q_auto,f_auto,w_1200/${PHOTO_ID}`}
            alt=""
            className="w-full h-auto"
            style={{
              maskImage: 'linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)',
              WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)',
            }}
            loading="eager"
          />
        </motion.div>

        {/* Dedication */}
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
        >
          <p className="font-mono text-sm sm:text-base text-text-secondary italic tracking-wide">
            To Amma, Naana, Swathi, Gayatri and Suku.
          </p>
          <p
            className="mt-6 text-5xl sm:text-6xl text-text-secondary select-none"
            style={{
              fontFamily: "'Herr Von Muellerhoff', cursive",
              transform: 'rotate(-2deg)',
              letterSpacing: '-0.02em',
            }}
          >
            N.R.Dhanawada
          </p>
        </motion.div>
      </div>
    </main>
  );
};

export default Home;
