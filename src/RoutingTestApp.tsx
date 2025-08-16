import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

type ValidRoutes = '/' | '/watchlist' | '/lab' | '/work' | '/art';

const PAGE_TITLES: Record<ValidRoutes, string> = {
  '/': 'N.R Dhanawada',
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

// Simple test pages
const HomePage = () => (
  <main className="max-w-4xl mx-auto px-6 py-16">
    <h1 className="text-4xl font-bold mb-8">Home Page Working!</h1>
    <p className="text-gray-600">Routing is working correctly.</p>
  </main>
);

const WorkPage = () => (
  <main className="max-w-4xl mx-auto px-6 py-16">
    <h1 className="text-4xl font-bold mb-8">Work Page</h1>
    <p className="text-gray-600">Work page test content.</p>
  </main>
);

const LabPage = () => (
  <main className="max-w-4xl mx-auto px-6 py-16">
    <h1 className="text-4xl font-bold mb-8">Lab Page</h1>
    <p className="text-gray-600">Lab page test content.</p>
  </main>
);

const WatchPage = () => (
  <main className="max-w-4xl mx-auto px-6 py-16">
    <h1 className="text-4xl font-bold mb-8">Watch Page</h1>
    <p className="text-gray-600">Watch page test content.</p>
  </main>
);

const ArtPage = () => (
  <main className="max-w-4xl mx-auto px-6 py-16">
    <h1 className="text-4xl font-bold mb-8">Art Page</h1>
    <p className="text-gray-600">Art page test content.</p>
  </main>
);

function RoutingTestApp() {
  return (
    <Router>
      <div className="min-h-screen bg-white text-gray-900 font-mono">
        <TitleUpdater />
        
        {/* Simple Header with working links */}
        <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-6">
            <div className="flex items-center justify-between h-16">
              <h1 className="font-bold text-xl">N.R Dhanawada</h1>
              <nav className="flex items-center space-x-8">
                <a href="/" className="text-sm font-semibold text-gray-900">~</a>
                <a href="/work" className="text-sm text-gray-600 hover:text-gray-900">work</a>
                <a href="/lab" className="text-sm text-gray-600 hover:text-gray-900">lab</a>
                <a href="/art" className="text-sm text-gray-600 hover:text-gray-900">art</a>
                <a href="/watchlist" className="text-sm text-gray-600 hover:text-gray-900">watch</a>
              </nav>
            </div>
          </div>
        </header>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/lab" element={<LabPage />} />
          <Route path="/watchlist" element={<WatchPage />} />
          <Route path="/art" element={<ArtPage />} />
        </Routes>

        {/* Simple Footer */}
        <footer className="border-t border-gray-200 mt-16">
          <div className="max-w-4xl mx-auto px-6 py-12">
            <div className="text-center text-xs text-gray-500">
              <p>© 2024 N.R Dhanawada</p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default RoutingTestApp;