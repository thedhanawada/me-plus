import { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { ThemeProvider } from './context/ThemeContext';
import ErrorBoundary from './components/ErrorBoundary';
import KeyboardShortcuts from './components/KeyboardShortcuts';

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
const Art = lazyWithRetry(() => import('./pages/Art'));
const About = lazyWithRetry(() => import('./pages/About'));
const Notes = lazyWithRetry(() => import('./pages/Notes'));
const NotePost = lazyWithRetry(() => import('./pages/NotePost'));
const NotFound = lazyWithRetry(() => import('./pages/NotFound'));

const PageLoader = () => (
  <p className="font-mono text-[15px] text-text-muted px-4 sm:px-8 py-16 max-w-[calc(72ch+22rem+6rem)] mx-auto">Loading…</p>
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
  '/art': {
    title: 'N.R Dhanawada - Photographs',
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

const AppRoutes = () => (
  <Suspense fallback={<PageLoader />}>
    <Routes>
      <Route path="/" element={<ErrorBoundary><Home /></ErrorBoundary>} />
      <Route path="/about" element={<ErrorBoundary><About /></ErrorBoundary>} />
      <Route path="/tv" element={<ErrorBoundary><Watchlist /></ErrorBoundary>} />
      <Route path="/lab" element={<Navigate to="/about" replace />} />
      <Route path="/work" element={<Navigate to="/about" replace />} />
      <Route path="/art" element={<ErrorBoundary><Art /></ErrorBoundary>} />
      <Route path="/notes" element={<ErrorBoundary><Notes /></ErrorBoundary>} />
      <Route path="/notes/:slug" element={<ErrorBoundary><NotePost /></ErrorBoundary>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Suspense>
);

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-bg-primary text-text-primary">
          <MetaUpdater />
          <AppRoutes />
          <KeyboardShortcuts />
        </div>
        <Analytics />
      </Router>
    </ThemeProvider>
  );
}

export default App;
