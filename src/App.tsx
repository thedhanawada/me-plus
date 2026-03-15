import { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';
import { ThemeProvider } from './context/ThemeContext';
import { ExternalLinkProvider } from './context/ExternalLinkContext';
import { SettingsProvider } from './context/SettingsContext';
import ErrorBoundary from './components/ErrorBoundary';
import Footer from './components/Footer';
import Header from './components/Header';
import BackToTop from './components/BackToTop';
import KeyboardShortcuts from './components/KeyboardShortcuts';
import ExternalLinkModal from './components/ExternalLinkModal';
import DotGrid from './components/DotGrid';
import Breadcrumb from './components/Breadcrumb';
import PageTransition from './components/PageTransition';

function lazyWithRetry(importFn: () => Promise<{ default: React.ComponentType }>) {
  return lazy(() =>
    importFn().catch(() => {
      window.location.reload();
      return new Promise(() => {});
    })
  );
}

const Home = lazyWithRetry(() => import('./pages/Home'));
const Watchlist = lazyWithRetry(() => import('./pages/Watch'));
const Lab = lazyWithRetry(() => import('./pages/Lab'));
const Work = lazyWithRetry(() => import('./pages/Work'));
const Art = lazyWithRetry(() => import('./pages/Art'));
const About = lazyWithRetry(() => import('./pages/About'));
const Notes = lazyWithRetry(() => import('./pages/Notes'));
const NotePost = lazyWithRetry(() => import('./pages/NotePost'));
const NotFound = lazyWithRetry(() => import('./pages/NotFound'));

const PageLoader = () => (
  <div className="flex justify-center items-center min-h-[50vh]">
    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-text-primary"></div>
  </div>
);

const BASE_URL = 'https://dhanawada.org';
const DEFAULT_DESCRIPTION = 'Solutions Architect specializing in platform engineering, enterprise architecture, and building systems that help organizations serve people better.';

interface PageMeta {
  title: string;
  description: string;
}

const PAGE_META: Record<string, PageMeta> = {
  '/': {
    title: 'N.R Dhanawada',
    description: DEFAULT_DESCRIPTION,
  },
  '/about': {
    title: 'N.R Dhanawada - About',
    description: 'Background, education, and professional journey of N.R Dhanawada.',
  },
  '/tv': {
    title: 'N.R Dhanawada - TV',
    description: 'What I\'m watching, rewatching, and waiting for.',
  },
  '/lab': {
    title: 'N.R Dhanawada - Lab',
    description: 'Open source projects, contributions, and experiments.',
  },
  '/work': {
    title: 'N.R Dhanawada - Work',
    description: 'Professional experience in solutions architecture and platform engineering.',
  },
  '/art': {
    title: 'N.R Dhanawada - Photography',
    description: 'A collection of photographs.',
  },
  '/notes': {
    title: 'N.R Dhanawada - Notes',
    description: 'Thinking out loud about systems, code, and building things.',
  },
};

function updateMeta(name: string, content: string) {
  let el = document.querySelector(`meta[property="${name}"], meta[name="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    if (name.startsWith('og:')) {
      el.setAttribute('property', name);
    } else {
      el.setAttribute('name', name);
    }
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

const MetaUpdater = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = PAGE_META[pathname] || { title: 'N.R Dhanawada', description: DEFAULT_DESCRIPTION };

    document.title = meta.title;
    window.scrollTo(0, 0);

    updateMeta('description', meta.description);
    updateMeta('og:title', meta.title);
    updateMeta('og:description', meta.description);
    updateMeta('og:url', `${BASE_URL}${pathname}`);
    updateMeta('twitter:title', meta.title);
    updateMeta('twitter:description', meta.description);

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = `${BASE_URL}${pathname}`;
  }, [pathname]);

  return null;
};

const AppShell = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  if (isHome) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <Breadcrumb />
      {children}
      <Footer />
    </>
  );
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<PageLoader />} key={location.pathname}>
        <Routes location={location}>
          <Route path="/" element={<ErrorBoundary><Home /></ErrorBoundary>} />
          <Route path="/about" element={<PageTransition><ErrorBoundary><About /></ErrorBoundary></PageTransition>} />
          <Route path="/tv" element={<PageTransition><ErrorBoundary><Watchlist /></ErrorBoundary></PageTransition>} />
          <Route path="/lab" element={<PageTransition><ErrorBoundary><Lab /></ErrorBoundary></PageTransition>} />
          <Route path="/work" element={<PageTransition><ErrorBoundary><Work /></ErrorBoundary></PageTransition>} />
          <Route path="/art" element={<PageTransition><ErrorBoundary><Art /></ErrorBoundary></PageTransition>} />
          <Route path="/notes" element={<PageTransition><ErrorBoundary><Notes /></ErrorBoundary></PageTransition>} />
          <Route path="/notes/:slug" element={<PageTransition><ErrorBoundary><NotePost /></ErrorBoundary></PageTransition>} />
          <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
};

function App() {
  return (
    <ThemeProvider>
      <SettingsProvider>
      <ExternalLinkProvider>
        <Router>
          <div className="min-h-screen bg-bg-primary text-text-primary font-mono transition-colors duration-slow">
            <DotGrid />
            <div className="relative" style={{ zIndex: 1 }}>
            <MetaUpdater />
            <AppShell>
              <AnimatedRoutes />
            </AppShell>
            <BackToTop />
            <KeyboardShortcuts />
            <ExternalLinkModal />
            </div>
          </div>
          <Analytics />
        </Router>
      </ExternalLinkProvider>
      </SettingsProvider>
    </ThemeProvider>
  );
}

export default App;
