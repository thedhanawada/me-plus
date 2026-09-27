import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import HoverLink from '../components/HoverLink';
import ThemeToggle from '../components/ThemeToggle';
import {
  experiences,
  education,
  featuredProject,
  photos,
  posts,
  WATCHLIST_MEDIA,
} from '../data';

const NAV_ITEMS = [
  { name: 'About', path: '/about' },
  { name: 'Notes', path: '/notes' },
  { name: 'Art', path: '/art' },
  { name: 'TV', path: '/tv' },
] as const;

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// "2016.10 - 2020.02" → "2016–20", "2021.07 - 2021.10" → "2021", "2022.02 - Present" → "Since 2022"
const shortPeriod = (period: string) => {
  const [start, end] = period.split(/\s+-\s+/);
  const from = start.slice(0, 4);
  if (/present/i.test(end)) return `Since ${from}`;
  const to = end.slice(0, 4);
  return from === to ? from : `${from}–${to.slice(2)}`;
};

const latestPost = [...posts].sort((a, b) => b.date.localeCompare(a.date))[0];
const watching = WATCHLIST_MEDIA.filter((m) => m.category === 'current' && m.title);
const favouritePhotos = photos.filter((p) => p.favorite).length;
const [currentRole, wehi, victoriasSecret] = experiences;
const [melbourne] = education;

interface IndexEntry {
  label: string;
  title: string;
  detail: string;
  meta: string;
  to: string;
}

const INDEX: IndexEntry[] = [
  {
    label: 'Work',
    title: currentRole.title,
    detail: `${currentRole.company}, ${currentRole.location.split(',')[0]}`,
    meta: shortPeriod(currentRole.period),
    to: '/about',
  },
  ...(latestPost
    ? [{
        label: 'Writing',
        title: latestPost.title,
        detail: latestPost.summary,
        meta: `${MONTHS[Number(latestPost.date.slice(5, 7)) - 1]} ${latestPost.date.slice(0, 4)}`,
        to: `/notes/${latestPost.slug}`,
      }]
    : []),
  {
    label: 'Building',
    title: featuredProject.name,
    detail: featuredProject.tagline,
    meta: `v${featuredProject.packages[0].version}`,
    to: '/about',
  },
  {
    label: 'Looking',
    title: 'Photographs',
    detail: `${photos.length} in the collection, ${favouritePhotos} of them favourites.`,
    meta: `${photos.length}`,
    to: '/art',
  },
  ...(watching.length
    ? [{
        label: 'Watching',
        title: watching[0].title!,
        detail: watching.length > 1
          ? `Also ${watching.slice(1, 3).map((m) => m.title).join(', ')}${watching.length > 3 ? `, and ${watching.length - 3} more` : ''}.`
          : 'On the list right now.',
        meta: `${watching.length} shows`,
        to: '/tv',
      }]
    : []),
];

const PREVIOUSLY = [
  { role: 'Research placement', org: 'WEHI', when: shortPeriod(wehi.period) },
  { role: "Master's (Hons)", org: melbourne.university, when: melbourne.period.replace(/\s+-\s+\d\d(\d\d)$/, '–$1') },
  { role: 'Senior Technology Analyst', org: victoriasSecret.company, when: shortPeriod(victoriasSecret.period) },
];

const IndexRow = ({ entry, n }: { entry: IndexEntry; n: number }) => (
  <li className="border-t border-border-primary last:border-b">
    <Link
      to={entry.to}
      className="group grid grid-cols-[2rem_1fr_auto] sm:grid-cols-[2.5rem_6.5rem_1fr_auto] gap-x-4 items-baseline py-5 focus:outline-none focus-visible:bg-hover-bg"
    >
      <span className="font-mono text-xs text-text-muted tabular-nums transition-colors duration-default group-hover:text-text-primary">
        {String(n).padStart(2, '0')}
      </span>
      <span className="hidden sm:block font-mono text-[0.7rem] uppercase tracking-[0.14em] text-text-muted">
        {entry.label}
      </span>
      <span className="min-w-0">
        <span className="sm:hidden block font-mono text-[0.65rem] uppercase tracking-[0.14em] text-text-muted mb-1">
          {entry.label}
        </span>
        <span className="block font-serif text-xl sm:text-2xl leading-snug text-text-primary transition-transform duration-default ease-theme group-hover:translate-x-1.5 motion-reduce:transform-none">
          {entry.title}
          <span aria-hidden="true" className="inline-block ml-2 text-base text-text-muted opacity-0 transition-opacity duration-default group-hover:opacity-100 group-focus-visible:opacity-100">
            →
          </span>
        </span>
        <span className="block mt-1 font-serif italic text-sm sm:text-base text-text-tertiary leading-snug transition-transform duration-default ease-theme group-hover:translate-x-1.5 motion-reduce:transform-none">
          {entry.detail}
        </span>
      </span>
      <span className="font-mono text-xs text-text-muted tabular-nums text-right whitespace-nowrap">
        {entry.meta}
      </span>
    </Link>
  </li>
);

const Home = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();

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

  const rise = (i: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <main id="main-content" className="relative min-h-screen flex flex-col">
      <nav className="relative z-10 px-4 sm:px-6 md:px-12 lg:px-16 py-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="font-mono text-xs uppercase tracking-[0.18em] text-text-secondary hover:text-text-primary transition-colors">
            Dhanawada
          </Link>

          <div className="hidden lg:flex items-center space-x-6">
            {NAV_ITEMS.map((item) => (
              <HoverLink key={item.name} to={item.path} active={location.pathname === item.path} className="px-3 py-1.5 text-sm">
                {item.name}
              </HoverLink>
            ))}
            <ThemeToggle />
          </div>

          <div className="lg:hidden flex items-center gap-4">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="font-mono text-sm text-text-secondary hover:text-text-primary transition-colors duration-slow focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2 focus:ring-offset-bg-primary"
            >
              {mobileMenuOpen ? 'Close' : 'Menu'}
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
                    <Link to={item.path} className="block font-serif text-2xl text-text-secondary hover:text-text-primary transition-colors duration-slow">
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <div className="flex-1 px-4 sm:px-6 md:px-12 lg:px-16 pt-8 sm:pt-16 pb-16">
        <div className="grid lg:grid-cols-[minmax(0,40rem)_minmax(0,1fr)] gap-16 lg:gap-24 items-start">
          <div className="min-w-0">
            <motion.header {...rise(0)}>
              <h1 className="font-serif font-normal text-[clamp(3rem,2rem+5vw,5.5rem)] leading-[0.95] tracking-[-0.02em] text-text-primary">
                N.R. Dhanawada
              </h1>
              <p className="mt-8 max-w-lg font-serif text-xl sm:text-2xl leading-snug text-text-secondary text-pretty">
                Solutions architect in Sydney. I build the platforms that programs, and the
                people running them, depend on every day.
              </p>
            </motion.header>

            <motion.ol {...rise(1)} className="mt-14 sm:mt-20" aria-label="Currently">
              {INDEX.map((entry, i) => <IndexRow key={entry.label} entry={entry} n={i + 1} />)}
            </motion.ol>

            <motion.section {...rise(2)} className="mt-10" aria-labelledby="previously-heading">
              <h2 id="previously-heading" className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-text-muted mb-4">
                Previously
              </h2>
              <ul className="space-y-2">
                {PREVIOUSLY.map((p) => (
                  <li key={p.org}>
                    <Link to="/about" className="group flex items-baseline gap-4 focus:outline-none focus-visible:underline">
                      <span className="font-serif text-base sm:text-lg text-text-secondary group-hover:text-text-primary transition-colors">
                        {p.role}, <span className="italic">{p.org}</span>
                      </span>
                      <span aria-hidden="true" className="flex-1 border-b border-dotted border-border-secondary translate-y-[-0.3em]" />
                      <span className="font-mono text-xs text-text-muted tabular-nums whitespace-nowrap">{p.when}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.section>
          </div>

          <motion.figure
            className="min-w-0 max-w-md lg:max-w-none lg:sticky lg:top-16"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4, delay: 0.5, ease: 'easeOut' }}
          >
            <img
              src="https://res.cloudinary.com/dyntcx472/image/upload/q_auto,f_auto,w_1200/art002e000192_yso465"
              alt="Earth photographed from the Orion spacecraft window during Artemis II, April 2026"
              className="w-full h-auto"
            />
            <figcaption className="mt-4 grid grid-cols-[auto_1fr] gap-x-4 font-serif text-sm leading-snug text-text-tertiary">
              <span className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-text-muted pt-0.5">Plate I</span>
              <span>
                <HoverLink href="https://www.nasa.gov/image-article/hello-world/" external className="px-1 -mx-1 py-0.5 !font-serif italic text-sm">
                  “Hello, World.”
                </HoverLink>{' '}
                Earth from the Orion spacecraft, Artemis II, April 2026.
                <span className="block mt-1 font-mono text-[0.7rem] text-text-muted">NASA / Reid Wiseman</span>
              </span>
            </figcaption>
          </motion.figure>
        </div>
      </div>

      <footer className="px-4 sm:px-6 md:px-12 lg:px-16 py-8 border-t border-border-primary flex flex-col sm:flex-row sm:justify-between gap-2 font-mono text-[0.7rem] text-text-muted">
        <span>Set in Newsreader and JetBrains Mono. Built with React, hosted on Vercel.</span>
        <HoverLink href="https://github.com/thedhanawada/me-plus" external className="px-1 -mx-1 py-0.5 text-[0.7rem] self-start">
          Source ↗
        </HoverLink>
      </footer>
    </main>
  );
};

export default Home;
