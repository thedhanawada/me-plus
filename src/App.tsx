import React, { useEffect, useRef } from 'react';
import { Terminal, Book, Music, Sparkles, Film, Heart, Play, Globe, Code2, Repeat, MessageSquare, Lock, Network, Users, ArrowRight, Quote } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Watchlist from './pages/Watch';
import Lab from './pages/Lab';
import Work from './pages/Work';
import Art from './pages/Art';
import Footer from './components/Footer';
import Header from './components/Header';

type ValidRoutes = '/' | '/watchlist' | '/lab' | '/work' | '/art';

const PAGE_TITLES: Record<ValidRoutes, string> = {
  '/': 'N.R Dhanawada - Home',
  '/watchlist': 'N.R Dhanawada - Watchlist',
  '/lab': 'N.R Dhanawada - Lab',
  '/work': 'N.R Dhanawada - Work',
  '/art': 'N.R Dhanawada - Photography'
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

        {/* Use the new Header component instead of inline navigation */}
        <Header />

        {/* Routes and the rest of your content */}
        <Routes>
          <Route path="/" element={
            <>
              <motion.section 
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
                            Engineering with Purpose
                          </span>
                        </span>
                      </h1>
                      <div className="space-y-4 text-xl md:text-2xl text-zinc-400 font-extralight tracking-wide">
                        <p>Software is <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-cyan-400 font-normal animate-pulse">architecture</span> in motion.</p>
                        <p>Every system choice shapes <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500 font-normal">tomorrow's possibilities</span>.</p>
                        <p className="text-cyan-400 font-light">
                          Build systems that <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500 font-normal">evolve</span> – 
                          <span className="relative inline-block ml-2">
                            <span className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20 blur-sm"></span>
                            <span className="relative text-white font-normal">not just <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500 font-normal animate-pulse">scale</span></span>
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
                          First Principles
                        </h3>
                        <p className="text-zinc-400 leading-relaxed">
                          Great software starts with fundamental truths, not assumptions. Break down complex problems into their core components. Build up from these foundations with clear reasoning and purpose.
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
                          Composable Systems
                        </h3>
                        <p className="text-zinc-400 leading-relaxed">
                          Software should be built from small, well-defined pieces that can be understood in isolation. These components should combine cleanly to create more powerful abstractions. Complexity emerges from the composition of simple parts.
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Personal Philosophy Section */}
                <div className="max-w-7xl mx-auto px-6 py-24">
                  <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-3xl mx-auto text-center mb-16"
                  >
                    <h2 className="text-4xl md:text-5xl font-light mb-6">
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500">
                        A Simple Philosophy
                      </span>
                    </h2>
                    <p className="text-xl text-zinc-400 font-light">
                      Here's what I believe about building technology
                    </p>
                  </motion.div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Principle 1: Problem Discovery */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      className="group relative"
                    >
                      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-fuchsia-500 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                      <div className="relative bg-black/80 backdrop-blur-sm p-8 rounded-xl border border-cyan-500/20 hover:border-fuchsia-500/50 transition-colors h-full">
                        <div className="flex items-center space-x-4 mb-6">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20 flex items-center justify-center">
                            <Heart className="w-6 h-6 text-cyan-400" />
                          </div>
                          <h3 className="text-2xl font-light text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500">
                            Hidden Pain Points
                          </h3>
                        </div>
                        <p className="text-zinc-400 leading-relaxed mb-6">
                          Real problems often hide in plain sight. The key is observing behavioral adaptations - the small workarounds people create to deal with friction in their daily lives.
                        </p>
                        <div className="space-y-4 text-sm">
                          <div className="flex items-start space-x-3">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                              <span className="text-xs text-cyan-400">01</span>
                            </div>
                            <p className="text-zinc-400">Look for <span className="text-cyan-400">repetitive tasks</span> that people have accepted as "normal" but shouldn't be</p>
                          </div>
                          <div className="flex items-start space-x-3">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                              <span className="text-xs text-fuchsia-400">02</span>
                            </div>
                            <p className="text-zinc-400">Study <span className="text-fuchsia-400">behavioral patterns</span> across different contexts and cultures</p>
                          </div>
                          <div className="flex items-start space-x-3">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                              <span className="text-xs text-cyan-400">03</span>
                            </div>
                            <p className="text-zinc-400">Focus on <span className="text-cyan-400">friction points</span> where people pause, hesitate, or show signs of stress</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Principle 2: Solution Design */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      className="group relative"
                    >
                      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-fuchsia-500 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                      <div className="relative bg-black/80 backdrop-blur-sm p-8 rounded-xl border border-cyan-500/20 hover:border-fuchsia-500/50 transition-colors h-full">
                        <div className="flex items-center space-x-4 mb-6">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20 flex items-center justify-center">
                            <Sparkles className="w-6 h-6 text-fuchsia-400" />
                          </div>
                          <h3 className="text-2xl font-light text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500">
                            Elegant Solutions
                          </h3>
                        </div>
                        <p className="text-zinc-400 leading-relaxed mb-6">
                          The best solutions often emerge from understanding the core essence of a problem. They should feel inevitable - as if they were always meant to exist that way.
                        </p>
                        <div className="space-y-4 text-sm">
                          <div className="flex items-start space-x-3">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                              <span className="text-xs text-cyan-400">01</span>
                            </div>
                            <p className="text-zinc-400">Find the <span className="text-cyan-400">underlying patterns</span> beneath surface-level symptoms</p>
                          </div>
                          <div className="flex items-start space-x-3">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                              <span className="text-xs text-fuchsia-400">02</span>
                            </div>
                            <p className="text-zinc-400">Design for <span className="text-fuchsia-400">cognitive flow</span> - solutions should feel natural and intuitive</p>
                          </div>
                          <div className="flex items-start space-x-3">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                              <span className="text-xs text-cyan-400">03</span>
                            </div>
                            <p className="text-zinc-400">Embrace <span className="text-cyan-400">contextual constraints</span> as creative catalysts</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Principle 3: Implementation */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="group relative"
                    >
                      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-fuchsia-500 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                      <div className="relative bg-black/80 backdrop-blur-sm p-8 rounded-xl border border-cyan-500/20 hover:border-fuchsia-500/50 transition-colors h-full">
                        <div className="flex items-center space-x-4 mb-6">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20 flex items-center justify-center">
                            <Play className="w-6 h-6 text-cyan-400" />
                          </div>
                          <h3 className="text-2xl font-light text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500">
                            Thoughtful Execution
                          </h3>
                        </div>
                        <p className="text-zinc-400 leading-relaxed mb-6">
                          Implementation is where philosophy meets reality. Every decision in the building process should align with the core purpose of solving human problems.
                        </p>
                        <div className="space-y-4 text-sm">
                          <div className="flex items-start space-x-3">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                              <span className="text-xs text-cyan-400">01</span>
                            </div>
                            <p className="text-zinc-400">Build with <span className="text-cyan-400">progressive enhancement</span> - start with the core experience</p>
                          </div>
                          <div className="flex items-start space-x-3">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                              <span className="text-xs text-fuchsia-400">02</span>
                            </div>
                            <p className="text-zinc-400">Consider <span className="text-fuchsia-400">cognitive load</span> in every interaction</p>
                          </div>
                          <div className="flex items-start space-x-3">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                              <span className="text-xs text-cyan-400">03</span>
                            </div>
                            <p className="text-zinc-400">Create <span className="text-cyan-400">feedback loops</span> that inform continuous improvement</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Principle 4: Evolution */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="group relative"
                    >
                      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-fuchsia-500 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                      <div className="relative bg-black/80 backdrop-blur-sm p-8 rounded-xl border border-cyan-500/20 hover:border-fuchsia-500/50 transition-colors h-full">
                        <div className="flex items-center space-x-4 mb-6">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20 flex items-center justify-center">
                            <Book className="w-6 h-6 text-fuchsia-400" />
                          </div>
                          <h3 className="text-2xl font-light text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500">
                            Adaptive Growth
                          </h3>
                        </div>
                        <p className="text-zinc-400 leading-relaxed mb-6">
                          Solutions should evolve with their users. Understanding how people adapt and modify your solution reveals opportunities for meaningful innovation.
                        </p>
                        <div className="space-y-4 text-sm">
                          <div className="flex items-start space-x-3">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                              <span className="text-xs text-cyan-400">01</span>
                            </div>
                            <p className="text-zinc-400">Study <span className="text-cyan-400">emergent behaviors</span> in how people use your solution</p>
                          </div>
                          <div className="flex items-start space-x-3">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                              <span className="text-xs text-fuchsia-400">02</span>
                            </div>
                            <p className="text-zinc-400">Build <span className="text-fuchsia-400">extensible systems</span> that grow with user needs</p>
                          </div>
                          <div className="flex items-start space-x-3">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                              <span className="text-xs text-cyan-400">03</span>
                            </div>
                            <p className="text-zinc-400">Maintain <span className="text-cyan-400">solution integrity</span> while allowing for organic evolution</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Featured Organization Section */}
                <div className="max-w-7xl mx-auto px-6 py-24">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="group relative"
                  >
                    <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-fuchsia-500 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
                    <div className="relative bg-black/80 backdrop-blur-sm rounded-xl border border-cyan-500/20 hover:border-fuchsia-500/50 transition-colors overflow-hidden">
                      <div className="absolute top-6 right-6">
                        <div className="px-4 py-1 bg-gradient-to-r from-cyan-500 to-fuchsia-500 rounded-full">
                          <p className="text-xs font-medium text-white">Featured Organization</p>
                        </div>
                      </div>
                      
                      <div className="p-8 md:p-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                          <div className="space-y-6">
                            <div className="flex items-center space-x-4">
                              <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20 flex items-center justify-center">
                                <MessageSquare className="w-8 h-8 text-fuchsia-400" />
                              </div>
                              <div>
                                <h3 className="text-2xl font-light text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500">
                                  Matrix.org
                                </h3>
                                <p className="text-zinc-400">
                                  Technology in Service of Freedom
                                </p>
                              </div>
                            </div>
                            <p className="text-zinc-300 leading-relaxed text-lg">
                              Matrix.org shows us what's possible when we put people first. They're not just building a messaging platform—they're creating digital infrastructure that protects privacy, promotes freedom, and puts control back in the hands of users.
                            </p>
                            <div className="pt-4">
                              <a 
                                href="https://matrix.org" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center space-x-2 text-fuchsia-400 hover:text-fuchsia-300 transition-colors"
                              >
                                <span>Learn about their mission</span>
                                <ArrowRight className="w-4 h-4" />
                              </a>
                            </div>
                          </div>
                          <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-fuchsia-500/10 rounded-xl"></div>
                            <div className="relative bg-gradient-to-r from-cyan-500/5 to-fuchsia-500/5 rounded-xl p-8">
                              <div className="space-y-6">
                                <p className="text-zinc-300 italic text-lg">
                                  "In a world where digital communication is increasingly controlled by mega-corporations, we're building a future where communities own their conversations."
                                </p>
                                <div className="flex items-center space-x-4">
                                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20 flex items-center justify-center">
                                    <Quote className="w-6 h-6 text-fuchsia-400" />
                                  </div>
                                  <div>
                                    <p className="text-zinc-300 font-medium">Matrix.org Team</p>
                                    <p className="text-zinc-500 text-sm">Digital Freedom Advocates</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.section>
            </>
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
