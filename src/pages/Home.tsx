import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
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

            <HoverLink
              href="https://github.com/thedhanawada/me-plus"
              external
              className="px-3 py-1.5 text-sm"
            >
              [src]
            </HoverLink>

            <SettingsPanel />
            <ThemeToggle />
          </div>

          {/* Mobile: just settings and theme for now, nav is in other pages */}
          <div className="lg:hidden flex items-center gap-4">
            <SettingsPanel />
            <ThemeToggle />
          </div>
        </div>
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
              maskImage: 'radial-gradient(ellipse 70% 70% at center, black 40%, transparent 100%)',
              WebkitMaskImage: 'radial-gradient(ellipse 70% 70% at center, black 40%, transparent 100%)',
            }}
            loading="eager"
          />
        </motion.div>

        {/* Dedication */}
        <motion.p
          className="text-center font-mono text-sm sm:text-base text-text-secondary italic mt-8 tracking-wide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
        >
          To Amma, Naana, Gayatri, and Swathi.
        </motion.p>
      </div>

      {/* Bottom navigation */}
      <motion.nav
        className="relative z-10 px-4 sm:px-6 md:px-12 lg:px-16 py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1, ease: 'easeOut' }}
      >
        <div className="flex items-center justify-center gap-4 sm:gap-6 text-sm font-mono">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="text-text-muted hover:text-text-primary transition-colors duration-fast"
            >
              [{item.name}]
            </Link>
          ))}
        </div>
      </motion.nav>
    </main>
  );
};

export default Home;
