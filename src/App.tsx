import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Database, Briefcase, Zap, Users } from 'lucide-react';
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

const whatIDo = [
  {
    icon: <Database size={24} />,
    title: 'Platform Architecture',
    description: 'I design and build robust, scalable service delivery platforms for education, employment, and social support organizations.'
  },
  {
    icon: <Zap size={24} />,
    title: 'Data Integration',
    description: 'I have expertise in end-to-end data management, including ETL processes, database design, and system integrations with Salesforce, Marketo, and more.'
  },
  {
    icon: <Briefcase size={24} />,
    title: 'Salesforce Development',
    description: 'I specialize in custom development with Apex, Lightning Web Components, and Visualforce to create tailored solutions that meet specific business needs.'
  },
  {
    icon: <Users size={24} />,
    title: 'User-Centric Solutions',
    description: 'I build platforms that scale from hundreds to thousands of users while maintaining reliability and a focus on the user experience.'
  }
];

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
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
                <motion.section
                  variants={sectionVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
                    N.R Dhanawada
                  </h1>
                  <div className="text-xl md:text-2xl text-gray-600 space-y-6 leading-relaxed">
                    <p>I design and build platforms that help organizations serve people better.</p>
                    <p>Architecture. Integration. Scale. Purpose.</p>
                  </div>
                </motion.section>

                {/* What I Do Section */}
                <motion.section
                  variants={sectionVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="border-t border-gray-200 pt-16"
                >
                  <h2 className="text-2xl font-bold mb-8">What I Do</h2>
                  <div className="grid gap-8 md:grid-cols-2">
                    {whatIDo.map((item) => (
                      <div key={item.title} className="flex items-start gap-4">
                        <div className="text-gray-600">{item.icon}</div>
                        <div>
                          <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                          <p className="text-gray-600 leading-relaxed">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.section>

                {/* Links Section */}
                <motion.section
                  variants={sectionVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="border-t border-gray-200 pt-16"
                >
                  <h2 className="text-2xl font-bold mb-8">Links</h2>
                  <div className="grid gap-4 md:grid-cols-2">
                    <a href="/work" className="block p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <h3 className="text-lg font-semibold mb-2">Work Experience</h3>
                      <p className="text-gray-600">Details about my professional background and skills.</p>
                    </a>
                    <a href="/lab" className="block p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <h3 className="text-lg font-semibold mb-2">Lab</h3>
                      <p className="text-gray-600">A collection of my personal projects and experiments.</p>
                    </a>
                    <a href="/art" className="block p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <h3 className="text-lg font-semibold mb-2">Photography</h3>
                      <p className="text-gray-600">A collection of moments I've captured.</p>
                    </a>
                    <a href="/watchlist" className="block p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <h3 className="text-lg font-semibold mb-2">Watchlist</h3>
                      <p className="text-gray-600">A list of movies and TV shows I enjoy.</p>
                    </a>
                  </div>
                </motion.section>

                {/* Philosophy Section */}
                <motion.section
                  variants={sectionVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="border-t border-gray-200 pt-16"
                >
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
                </motion.section>
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
