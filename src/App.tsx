import { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { ThemeProvider } from './context/ThemeContext';
import { ExternalLinkProvider } from './context/ExternalLinkContext';
import ErrorBoundary from './components/ErrorBoundary';
import Footer from './components/Footer';
import Header from './components/Header';
import BackToTop from './components/BackToTop';
import KeyboardShortcuts from './components/KeyboardShortcuts';
import ExternalLinkModal from './components/ExternalLinkModal';

const Home = lazy(() => import('./pages/Home'));
const Watchlist = lazy(() => import('./pages/Watch'));
const Lab = lazy(() => import('./pages/Lab'));
const Work = lazy(() => import('./pages/Work'));
const Art = lazy(() => import('./pages/Art'));
const About = lazy(() => import('./pages/About'));
const Notes = lazy(() => import('./pages/Notes'));
const NotePost = lazy(() => import('./pages/NotePost'));
const NotFound = lazy(() => import('./pages/NotFound'));

const PageLoader = () => (
  <div className="flex justify-center items-center min-h-[50vh]">
    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-text-primary"></div>
  </div>
);

type ValidRoutes = '/' | '/tv' | '/lab' | '/work' | '/art' | '/about' | '/notes';

const PAGE_TITLES: Record<ValidRoutes, string> = {
  '/': 'N.R Dhanawada',
  '/about': 'N.R Dhanawada - About',
  '/tv': 'N.R Dhanawada - TV',
  '/lab': 'N.R Dhanawada - Lab',
  '/work': 'N.R Dhanawada - Work',
  '/art': 'N.R Dhanawada - Photography',
  '/notes': 'N.R Dhanawada - Notes'
};

const TitleUpdater = () => {
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname as ValidRoutes;
    document.title = PAGE_TITLES[currentPath] || 'N.R Dhanawada';
  }, [location]);

  return null;
};

function App() {
  return (
    <ThemeProvider>
      <ExternalLinkProvider>
        <Router>
          <div className="min-h-screen bg-bg-primary text-text-primary font-mono transition-colors duration-slow">
            <TitleUpdater />
            <Header />

            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<ErrorBoundary><Home /></ErrorBoundary>} />
                <Route path="/about" element={<ErrorBoundary><About /></ErrorBoundary>} />
                <Route path="/tv" element={<ErrorBoundary><Watchlist /></ErrorBoundary>} />
                <Route path="/lab" element={<ErrorBoundary><Lab /></ErrorBoundary>} />
                <Route path="/work" element={<ErrorBoundary><Work /></ErrorBoundary>} />
                <Route path="/art" element={<ErrorBoundary><Art /></ErrorBoundary>} />
                <Route path="/notes" element={<ErrorBoundary><Notes /></ErrorBoundary>} />
                <Route path="/notes/:slug" element={<ErrorBoundary><NotePost /></ErrorBoundary>} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>

            <Footer />
            <BackToTop />
            <KeyboardShortcuts />
            <ExternalLinkModal />
          </div>
          <Analytics />
        </Router>
      </ExternalLinkProvider>
    </ThemeProvider>
  );
}

export default App;
