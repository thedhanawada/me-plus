import { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Footer from './components/Footer';
import Header from './components/Header';

const Home = lazy(() => import('./pages/Home'));
const Watchlist = lazy(() => import('./pages/Watch'));
const Lab = lazy(() => import('./pages/Lab'));
const Work = lazy(() => import('./pages/Work'));
const Art = lazy(() => import('./pages/Art'));
const About = lazy(() => import('./pages/About'));
const NotFound = lazy(() => import('./pages/NotFound'));

const PageLoader = () => (
  <div className="flex justify-center items-center min-h-[50vh]">
    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900 dark:border-gray-100"></div>
  </div>
);

type ValidRoutes = '/' | '/watchlist' | '/lab' | '/work' | '/art' | '/about';

const PAGE_TITLES: Record<ValidRoutes, string> = {
  '/': 'N.R Dhanawada',
  '/about': 'N.R Dhanawada - About',
  '/watchlist': 'N.R Dhanawada - Watchlist',
  '/lab': 'N.R Dhanawada - Lab',
  '/work': 'N.R Dhanawada - Work',
  '/art': 'N.R Dhanawada - Photography'
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
      <Router>
        <div className="min-h-screen bg-white text-gray-900 font-mono dark:bg-gray-900 dark:text-gray-100 transition-colors duration-500">
          <TitleUpdater />
          <Header />

          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/watchlist" element={<Watchlist />} />
              <Route path="/lab" element={<Lab />} />
              <Route path="/work" element={<Work />} />
              <Route path="/art" element={<Art />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>

          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
