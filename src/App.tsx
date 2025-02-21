import React, { useEffect, useRef } from 'react';
import { Terminal, Book, Music, Sparkles, Film, Heart, Play } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import Watchlist from './pages/Watch';
import Lab from './pages/Lab';
import Work from './pages/Work';
import Footer from './components/Footer';

// Define valid routes
type ValidRoutes = '/' | '/watchlist' | '/lab' | '/work';

// Page title mapping
const PAGE_TITLES: Record<ValidRoutes, string> = {
  '/': 'N.R Dhanawada - Home',
  '/watchlist': 'N.R Dhanawada - Watchlist',
  '/lab': 'N.R Dhanawada - Lab',
  '/work': 'N.R Dhanawada - Work'
};

// Title updater component
const TitleUpdater = () => {
  const location = useLocation();
  
  useEffect(() => {
    const currentPath = location.pathname as ValidRoutes;
    document.title = PAGE_TITLES[currentPath] || 'N.R Dhanawada';
  }, [location]);

  return null;
};

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frame = 0;
    const particles: Array<{x: number, y: number, vx: number, vy: number, size: number}> = [];
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    const createParticle = () => {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        size: Math.random() * 2 + 0.5
      });
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        
        const hue = (frame * 0.5) % 360;
        ctx.fillStyle = `hsla(${hue}, 70%, 50%, 0.5)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        
        particles.forEach((p2, j) => {
          if (i === j) return;
          const dx = p2.x - p.x;
          const dy = p2.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 150) {
            ctx.strokeStyle = `hsla(${hue}, 70%, 50%, ${0.15 * (1 - dist / 150)})`;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
      });
      
      frame++;
      requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    resize();
    
    for (let i = 0; i < 40; i++) createParticle();
    animate();

    return () => window.removeEventListener('resize', resize);
  }, []);

  return (
    <Router>
      <div className="relative min-h-screen bg-black overflow-hidden" ref={containerRef}>
        <TitleUpdater />
        <div className="noise" />
        <canvas
          ref={canvasRef}
          className="fixed inset-0 pointer-events-none opacity-40"
        />
        
        {/* Enhanced cyberpunk background effects */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-purple-500/5 to-fuchsia-500/5" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-cyan-900/30 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-fuchsia-900/30 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        </div>

        {/* Animated lines */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent w-full"
              style={{
                top: `${25 + i * 25}%`,
                left: '-100%'
              }}
              animate={{
                x: ['0%', '200%']
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                ease: 'linear',
                delay: i * 2
              }}
            />
          ))}
        </div>

        {/* Navigation */}
        <nav className="fixed w-full z-50 bg-black/40 backdrop-blur-md border-b border-cyan-500/10">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <Link to="/" className="group flex items-center space-x-3">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-fuchsia-500 rounded blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                  <Terminal className="relative w-8 h-8 text-cyan-400 group-hover:text-white transition-colors duration-300" />
                </div>
                <div className="flex flex-col">
                  <span className="font-light tracking-wider text-sm text-zinc-400">N.R.</span>
                  <span className="font-medium tracking-wide text-white">Dhanawada</span>
                </div>
              </Link>
              
              <div className="hidden md:flex items-center space-x-8">
                <Link to="/lab" className="nav-link group">
                  <span className="text-zinc-400 hover:text-white transition-colors duration-300 flex items-center space-x-1">
                    <span>/</span>
                    <span className="group-hover:text-cyan-400">lab</span>
                  </span>
                </Link>
                <Link to="/watchlist" className="nav-link group">
                  <span className="text-zinc-400 hover:text-white transition-colors duration-300 flex items-center space-x-1">
                    <span>/</span>
                    <span className="group-hover:text-cyan-400">watchlist</span>
                  </span>
                </Link>
                <Link to="/work" className="nav-link group">
                  <span className="text-zinc-400 hover:text-white transition-colors duration-300 flex items-center space-x-1">
                    <span>/</span>
                    <span className="group-hover:text-cyan-400">work</span>
                  </span>
                </Link>
                <a 
                  href="https://github.com/thedhanawada/me-plus" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group relative px-4 py-2"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
                  <div className="relative flex items-center space-x-2">
                    <svg className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                    <span className="text-zinc-400 group-hover:text-white transition-colors duration-300">Source</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={
            <motion.section 
              style={{ y, opacity }}
              className="relative pt-32 pb-16 md:pt-40 md:pb-24"
            >
              <div className="max-w-7xl mx-auto px-6">
                <div className="max-w-3xl mx-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                  >
                    <h1 className="text-5xl md:text-7xl font-light mb-12 relative inline-block">
                      <span className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20 blur-xl"></span>
                      <span className="relative">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-cyan-400 animate-text-shine">
                          Solutions. For people.
                        </span>
                      </span>
                    </h1>
                    <div className="space-y-4 text-xl md:text-2xl text-zinc-400 font-extralight tracking-wide">
                      <p>Technology has incredible <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-cyan-400 font-normal animate-pulse">potential</span>.</p>
                      <p>But only if it's <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500 font-normal">built right</span>.</p>
                      <p className="text-cyan-400 font-light">
                        When you build it, <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500 font-normal">build it right</span> – 
                        <span className="relative inline-block ml-2">
                          <span className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20 blur-sm"></span>
                          <span className="relative text-white font-normal">with <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500 font-normal animate-pulse">purpose</span></span>
                        </span>
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Cards Section */}
              <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Card 1 */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="group relative"
                  >
                    <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-fuchsia-500 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                    <div className="relative h-full bg-black/80 backdrop-blur-sm p-8 rounded-xl border border-cyan-500/20 hover:border-fuchsia-500/50 transition-colors">
                      <h3 className="text-2xl font-light text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500 mb-4">
                        Built Open, Built Better
                      </h3>
                      <p className="text-zinc-400 leading-relaxed">
                        Open source is more than just a license; it's a philosophy of shared progress. Solutions built openly are inherently stronger and more transparent. When technology is built collaboratively, it truly belongs to the communities it aims to serve.
                      </p>
                    </div>
                  </motion.div>

                  {/* Card 2 */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="group relative"
                  >
                    <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-fuchsia-500 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                    <div className="relative h-full bg-black/80 backdrop-blur-sm p-8 rounded-xl border border-cyan-500/20 hover:border-fuchsia-500/50 transition-colors">
                      <h3 className="text-2xl font-light text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500 mb-4">
                        Tech That Makes a Difference
                      </h3>
                      <p className="text-zinc-400 leading-relaxed">
                        Technology's true value isn't in its complexity, but in its impact on the real world. Focusing on solutions that address tangible challenges and improve lives is paramount. Technology should be measured by the positive change it creates.
                      </p>
                    </div>
                  </motion.div>

                  {/* Card 3 */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="group relative"
                  >
                    <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-fuchsia-500 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                    <div className="relative h-full bg-black/80 backdrop-blur-sm p-8 rounded-xl border border-cyan-500/20 hover:border-fuchsia-500/50 transition-colors">
                      <h3 className="text-2xl font-light text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500 mb-4">
                        Solutions Built to Last
                      </h3>
                      <p className="text-zinc-400 leading-relaxed">
                        Lasting solutions require more than just quick fixes. A philosophy of sustainable technology prioritizes building for longevity and purpose. Thoughtful design and robust architectures ensure technology adapts to evolving needs.
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.section>
          } />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/lab" element={<Lab />} />
          <Route path="/work" element={<Work />} />
          {/* Add more routes as needed */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
