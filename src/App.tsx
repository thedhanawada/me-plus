import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Watchlist from './pages/Watch';
import Lab from './pages/Lab';
import Work from './pages/Work';
import Art from './pages/Art';
import Footer from './components/Footer';
import Header from './components/Header';

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

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white text-gray-900 font-mono">
        <TitleUpdater />
        <Header />
        
        <Routes>
          <Route path="/" element={
            <main className="max-w-4xl mx-auto px-6 py-16">
              <div className="space-y-16">
                {/* Hero Section */}
                <section>
                  <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
                    N.R Dhanawada
                  </h1>
                  <div className="text-xl md:text-2xl text-gray-600 space-y-6 leading-relaxed">
                    <p>Software engineer who believes in building things that matter.</p>
                    <p>Write code. Solve problems. Keep it simple.</p>
                  </div>
                </section>

                {/* Philosophy Section */}
                <section className="border-t border-gray-200 pt-16">
                  <h2 className="text-2xl font-bold mb-8">Philosophy</h2>
                  <div className="grid gap-8 md:grid-cols-2">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">First Principles</h3>
                      <p className="text-gray-600 leading-relaxed">
                        Break complex problems down to their fundamentals. 
                        Build from the ground up with clear reasoning. 
                        Question assumptions, not conclusions.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Practical Impact</h3>
                      <p className="text-gray-600 leading-relaxed">
                        Technology should solve real problems for real people. 
                        Complexity for its own sake is waste. 
                        Measure success by the problems you eliminate.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Simple Systems</h3>
                      <p className="text-gray-600 leading-relaxed">
                        The best systems are composable and understandable. 
                        Small, well-defined pieces that work together. 
                        Complexity emerges from simplicity, not chaos.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Open Source</h3>
                      <p className="text-gray-600 leading-relaxed">
                        Code should be shared, studied, and improved by everyone. 
                        Transparency builds trust. Collaboration builds better software. 
                        Stand on the shoulders of giants.
                      </p>
                    </div>
                  </div>
                </section>

                {/* What I Do Section */}
                <section className="border-t border-gray-200 pt-16">
                  <h2 className="text-2xl font-bold mb-8">What I Do</h2>
                  <div className="space-y-6 text-gray-600 leading-relaxed">
                    <p>
                      I build software systems that solve real problems. 
                      Focus on fundamentals: clean code, solid architecture, 
                      and tools that make developers' lives better.
                    </p>
                    <p>
                      Currently working on distributed systems, developer tooling, 
                      and anything that makes complex problems simpler to understand and solve.
                    </p>
                    <p>
                      Inspired by the Unix philosophy: do one thing well, 
                      make programs work together, and handle text streams because 
                      that's a universal interface.
                    </p>
                  </div>
                </section>

                {/* Links Section */}
                <section className="border-t border-gray-200 pt-16">
                  <h2 className="text-2xl font-bold mb-8">Links</h2>
                  <div className="space-y-4">
                    <div>
                      <span className="text-gray-600">projects: </span>
                      <a href="/lab" className="underline hover:no-underline">lab</a>
                    </div>
                    <div>
                      <span className="text-gray-600">experience: </span>
                      <a href="/work" className="underline hover:no-underline">work</a>
                    </div>
                    <div>
                      <span className="text-gray-600">photography: </span>
                      <a href="/art" className="underline hover:no-underline">art</a>
                    </div>
                    <div>
                      <span className="text-gray-600">recommendations: </span>
                      <a href="/watchlist" className="underline hover:no-underline">watchlist</a>
                    </div>
                  </div>
                </section>
              </div>
            </main>
          } />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/lab" element={<Lab />} />
          <Route path="/work" element={<Work />} />
          <Route path="/art" element={<Art />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
