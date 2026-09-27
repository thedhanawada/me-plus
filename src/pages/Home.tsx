import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import HoverLink from '../components/HoverLink';
import ThemeToggle from '../components/ThemeToggle';
import SettingsPanel from '../components/SettingsPanel';
import TerminalPrompt from '../components/TerminalPrompt';
import { useTheme } from '../hooks';
import {
  experiences,
  education,
  featuredProject,
  photos,
  posts,
  WATCHLIST_MEDIA,
} from '../data';

const NAV_ITEMS = [
  { name: 'about', path: '/about' },
  { name: 'notes', path: '/notes' },
  { name: 'art', path: '/art' },
  { name: 'tv', path: '/tv' },
] as const;

const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

// "2016.10 - 2020.02" → "2016–20", "2021.07 - 2021.10" → "2021", "2022.02 - Present" → "2022–now"
const shortPeriod = (period: string) => {
  const [start, end] = period.split(' - ').map((p) => p.trim());
  const from = start.slice(0, 4);
  if (/present/i.test(end)) return `${from}–now`;
  const to = end.slice(0, 4);
  return from === to ? from : `${from}–${to.slice(2)}`;
};

const latestPost = [...posts].sort((a, b) => b.date.localeCompare(a.date))[0];
const watching = WATCHLIST_MEDIA.filter((m) => m.category === 'current' && m.title);
const favouritePhotos = photos.filter((p) => p.favorite).length;
const [currentRole, wehi, victoriasSecret] = experiences;
const [melbourne] = education;

interface Entry {
  kind: string;
  text: string;
  meta: string;
  to: string;
}

const NOW: Entry[] = [
  {
    kind: 'work',
    text: `${currentRole.title} @ ${currentRole.company}`.toLowerCase(),
    meta: shortPeriod(currentRole.period),
    to: '/about',
  },
  ...(latestPost
    ? [{
        kind: 'note',
        text: latestPost.title.toLowerCase(),
        meta: `${MONTHS[Number(latestPost.date.slice(5, 7)) - 1]} ${latestPost.date.slice(0, 4)}`,
        to: `/notes/${latestPost.slug}`,
      }]
    : []),
  {
    kind: 'project',
    text: `${featuredProject.name} — salesforce calendar engine`,
    meta: `v${featuredProject.packages[0].version}`,
    to: '/about',
  },
  {
    kind: 'art',
    text: `${photos.length} photographs`,
    meta: `${favouritePhotos} favourites`,
    to: '/art',
  },
  {
    kind: 'tv',
    text: `watching ${watching.slice(0, 2).map((m) => m.title).join(', ')}${watching.length > 2 ? ` +${watching.length - 2}` : ''}`,
    meta: `${watching.length} shows`,
    to: '/tv',
  },
];

const HISTORY: Entry[] = [
  { kind: 'research', text: 'research placement @ wehi', meta: shortPeriod(wehi.period), to: '/about' },
  { kind: 'study', text: `master's (hons) @ ${melbourne.university.toLowerCase()}`, meta: melbourne.period.replace(/ - (\d\d)(\d\d)$/, '–$2'), to: '/about' },
  { kind: 'work', text: `senior tech analyst @ ${victoriasSecret.company.toLowerCase()}`, meta: shortPeriod(victoriasSecret.period), to: '/about' },
];

const INTRO_KEY = 'home-intro-played';
const WHOAMI = 'whoami';

const introAlreadyPlayed = () => {
  try {
    return sessionStorage.getItem(INTRO_KEY) === '1';
  } catch {
    return false;
  }
};

// Local time where I am, e.g. "14:32 AEST"
const useSydneyTime = () => {
  const format = () =>
    new Intl.DateTimeFormat('en-AU', {
      timeZone: 'Australia/Sydney',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZoneName: 'short',
    }).format(new Date());

  const [time, setTime] = useState(format);
  useEffect(() => {
    const id = setInterval(() => setTime(format()), 15_000);
    return () => clearInterval(id);
  }, []);
  return time;
};

/** One `ls -l` style row: kind · name · meta. The whole row is the link. */
const Row = ({ entry }: { entry: Entry }) => (
  <li>
    <Link
      to={entry.to}
      className="group relative block px-2 -mx-2 py-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
    >
      {/* Sweep highlight, same motion as HoverLink. Kept outside the grid so it spans the full row */}
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-bg-inverted scale-x-0 origin-left transition-transform duration-default ease-theme group-hover:scale-x-100 group-focus-visible:scale-x-100 motion-reduce:transition-none"
      />
      <span className="relative grid grid-cols-[4.5rem_1fr] sm:grid-cols-[5.5rem_1fr_auto] items-baseline gap-x-4">
        <span className="relative text-xs sm:text-sm text-text-muted group-hover:text-text-inverted/60 group-focus-visible:text-text-inverted/60 transition-colors duration-fast">
          {entry.kind}
        </span>
        <span className="relative text-sm sm:text-base text-text-primary group-hover:text-text-inverted group-focus-visible:text-text-inverted transition-colors duration-fast">
          {entry.text}
          <span aria-hidden="true" className="inline-block ml-2 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 group-focus-visible:opacity-100 transition-all duration-default">
            →
          </span>
        </span>
        <span className="relative col-start-2 sm:col-start-auto text-xs sm:text-sm text-text-muted tabular-nums sm:text-right group-hover:text-text-inverted/60 group-focus-visible:text-text-inverted/60 transition-colors duration-fast">
          {entry.meta}
        </span>
      </span>
    </Link>
  </li>
);

const Command = ({ children }: { children: string }) => (
  <p className="font-mono text-xs sm:text-sm text-text-muted mb-3">
    <span className="text-prompt select-none">$ </span>
    {children}
  </p>
);

const EarthPhoto = ({ className = '' }: { className?: string }) => (
  <figure className={className}>
    <img
      src="https://res.cloudinary.com/dyntcx472/image/upload/q_auto,f_auto,w_1200/art002e000192_yso465"
      alt="Earth photographed from the Orion spacecraft window during Artemis II, April 2026"
      className="w-full h-auto rounded-lg"
    />
    <figcaption className="mt-3 font-mono text-xs text-text-muted flex justify-between gap-4">
      <span>art002e000192.jpg</span>
      <span className="text-right">
        <HoverLink href="https://www.nasa.gov/image-article/hello-world/" external className="px-1 py-0.5 text-xs">
          "Hello, World"
        </HoverLink>
        {' '}· artemis ii · nasa/reid wiseman
      </span>
    </figcaption>
  </figure>
);

const StatusLine = () => {
  const { theme } = useTheme();
  const time = useSydneyTime();

  return (
    <div className="hidden md:flex fixed bottom-0 inset-x-0 z-10 items-stretch font-mono text-xs border-t border-border-primary bg-bg-primary/90 backdrop-blur-sm">
      <span className="px-3 py-1.5 bg-bg-inverted text-text-inverted font-bold tracking-wider">NORMAL</span>
      <span className="px-3 py-1.5 text-text-secondary border-r border-border-primary">~/</span>
      <span className="flex-1" />
      <span className="px-3 py-1.5 text-text-muted"><kbd className="text-text-secondary">/</kbd> command</span>
      <span className="px-3 py-1.5 text-text-muted"><kbd className="text-text-secondary">?</kbd> shortcuts</span>
      <span className="px-3 py-1.5 text-text-muted border-l border-border-primary">{theme}</span>
      <span className="px-3 py-1.5 text-text-muted border-l border-border-primary">sydney {time.toLowerCase()}</span>
      <HoverLink href="https://github.com/thedhanawada/me-plus" external className="px-3 py-1.5 text-xs border-l border-border-primary">
        src ↗
      </HoverLink>
    </div>
  );
};

const Home = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const skipIntro = reduceMotion || introAlreadyPlayed();
  const [typed, setTyped] = useState(skipIntro ? WHOAMI.length : 0);
  const introDone = typed >= WHOAMI.length;
  const time = useSydneyTime();

  useEffect(() => {
    if (introDone) {
      try { sessionStorage.setItem(INTRO_KEY, '1'); } catch { /* private mode */ }
      return;
    }
    const id = setTimeout(() => setTyped((t) => t + 1), typed === 0 ? 450 : 90);
    return () => clearTimeout(id);
  }, [typed, introDone]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) setMobileMenuOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Everything below the intro fades in, line by line, once `whoami` has finished typing
  const reveal = (i: number) => ({
    initial: skipIntro ? false : { opacity: 0, y: 6 },
    animate: introDone ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 0.35, delay: skipIntro ? 0 : i * 0.06, ease: 'easeOut' as const },
  });

  return (
    <main id="main-content" className="relative min-h-screen flex flex-col font-mono md:pb-10">
      {/* Top navigation */}
      <nav className="relative z-10 px-4 sm:px-6 md:px-12 lg:px-16 py-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
            <span className="text-prompt">~</span>/dhanawada
          </Link>

          <div className="hidden lg:flex items-center space-x-6">
            {NAV_ITEMS.map((item) => (
              <HoverLink key={item.name} to={item.path} active={location.pathname === item.path} className="px-3 py-1.5 text-sm">
                [{item.name}]
              </HoverLink>
            ))}
            <SettingsPanel />
            <ThemeToggle />
          </div>

          <div className="lg:hidden flex items-center gap-4">
            <SettingsPanel />
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="text-text-secondary hover:text-text-primary text-sm transition-colors duration-slow focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2 focus:ring-offset-bg-primary"
            >
              {mobileMenuOpen ? '[close]' : '[menu]'}
            </button>
          </div>
        </div>

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
                  <motion.div key={item.name} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.05 }}>
                    <Link to={item.path} className="block text-lg text-text-secondary hover:text-text-primary transition-colors duration-slow">
                      [{item.name}]
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <div className="flex-1 flex items-center px-4 sm:px-6 md:px-12 lg:px-16 pt-4 pb-16">
        <div className="w-full grid lg:grid-cols-[minmax(0,42rem)_minmax(0,1fr)] gap-12 lg:gap-16 items-center">
          <div className="min-w-0">
            {/* whoami */}
            <p className="text-xs sm:text-sm text-text-muted mb-4" aria-label="whoami">
              <span className="text-prompt select-none">$ </span>
              <span aria-hidden="true">{WHOAMI.slice(0, typed)}</span>
              {!introDone && <span className="terminal-cursor ml-0.5" aria-hidden="true" />}
            </p>

            <motion.header {...reveal(0)} className="mb-12">
              <h1 className="text-fluid-5xl font-extrabold tracking-tighter leading-none text-text-primary">
                N.R. Dhanawada
              </h1>
              <p className="mt-5 max-w-xl text-pretty text-sm sm:text-base leading-relaxed text-text-secondary">
                Solutions architect. I build the service delivery platforms that
                programs, and the people running them, depend on every day.
              </p>
              <p className="mt-4 text-xs sm:text-sm text-text-muted">
                sydney, au <span className="mx-1.5">·</span> {time.toLowerCase()}
              </p>
            </motion.header>

            <motion.section {...reveal(1)} className="mb-10" aria-label="Now">
              <Command>ls -l ~/now</Command>
              <ul>
                {NOW.map((entry) => <Row key={entry.kind} entry={entry} />)}
              </ul>
            </motion.section>

            <motion.section {...reveal(2)} className="mb-10" aria-label="Previously">
              <Command>tail ~/history.log</Command>
              <ul>
                {HISTORY.map((entry) => <Row key={entry.text} entry={entry} />)}
              </ul>
            </motion.section>

            <motion.div {...reveal(3)} className="pt-6 border-t border-border-primary">
              <TerminalPrompt />
            </motion.div>

            {/* Colophon — on desktop this lives in the status line */}
            <motion.p {...reveal(4)} className="md:hidden mt-10 text-xs text-text-muted">
              react + vite + tailwind · vercel ·{' '}
              <HoverLink href="https://github.com/thedhanawada/me-plus" external className="px-1 py-0.5 text-xs">
                src ↗
              </HoverLink>
            </motion.p>
          </div>

          {/* Earth — Artemis II. Beside the text on desktop, below it on smaller screens */}
          <motion.div
            className="min-w-0 flex justify-center"
            initial={skipIntro ? false : { opacity: 0 }}
            animate={introDone ? { opacity: 1 } : undefined}
            transition={{ duration: 1.2, delay: skipIntro ? 0 : 0.4, ease: 'easeOut' }}
          >
            <EarthPhoto className="w-full max-w-sm lg:max-w-md xl:max-w-lg" />
          </motion.div>
        </div>
      </div>

      <StatusLine />
    </main>
  );
};

export default Home;
