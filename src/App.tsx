import React, { useEffect, useRef } from 'react';
import { Terminal, Book, Music, Sparkles, Film, Heart, Play } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

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
    <div className="relative min-h-screen bg-black overflow-hidden" ref={containerRef}>
      <div className="noise" />
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none opacity-20"
      />
      <div className="grid-pattern" />

      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-black/80 backdrop-blur-sm border-b border-zinc-800/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <a href="#" className="flex items-center space-x-2">
              <Terminal className="w-8 h-8 text-fuchsia-500" />
              <span className="text-xl font-bold glitch-text">N.R. Dhanawada</span>
            </a>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#work" className="nav-link">/work</a>
              <a href="#code" className="nav-link">/code</a>
              <a href="#thoughts" className="nav-link">/thoughts</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 py-32 overflow-hidden bg-black">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/50 via-black to-black opacity-80" />
        
        {/* Animated floating elements */}
        <motion.div 
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: 0.2,
              }}
              animate={{
                y: [0, Math.random() * 50, 0],
                opacity: [0.2, 0.5, 0.2],
                scale: [1, Math.random() * 1.5 + 1, 1],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 2,
              }}
            />
          ))}
        </motion.div>

        {/* Main content */}
        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.div
            style={{ y, opacity }}
            className="space-y-12 text-center"
          >
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <motion.h1 
                className="text-4xl md:text-6xl font-bold leading-tight tracking-tighter mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400">
                  Nirmala Rao Dhanawada
                </span>
              </motion.h1>

              <motion.p
                className="text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                Wandering through the realms of code and creativity, finding magic in the intersection of technology and imagination.
              </motion.p>
            </motion.div>

            {/* Interests Grid */}
            <div className="grid md:grid-cols-3 gap-8 mt-16">
              {/* Fantasy & Literature */}
              <motion.div
                className="relative group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
              >
                <div className="relative overflow-hidden rounded-lg bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 p-6 transition-all duration-300 group-hover:border-fuchsia-500/50">
                  <Book className="w-8 h-8 mb-4 text-fuchsia-500" />
                  <h3 className="text-xl font-bold text-white mb-3">Fantasy & Lore</h3>
                  <p className="text-zinc-400 text-sm">
                    Lost in the depths of Middle-earth and the halls of Hogwarts, where every story weaves a new reality.
                  </p>
                </div>
              </motion.div>

              {/* Music */}
              <motion.div
                className="relative group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
              >
                <div className="relative overflow-hidden rounded-lg bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 p-6 transition-all duration-300 group-hover:border-fuchsia-500/50">
                  <Music className="w-8 h-8 mb-4 text-fuchsia-500" />
                  <h3 className="text-xl font-bold text-white mb-3">Melodic Journey</h3>
                  <p className="text-zinc-400 text-sm">
                    Finding harmony in the rhythms of life, where each note tells a story of its own.
                  </p>
                </div>
              </motion.div>

              {/* Philosophy */}
              <motion.div
                className="relative group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6 }}
              >
                <div className="relative overflow-hidden rounded-lg bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 p-6 transition-all duration-300 group-hover:border-fuchsia-500/50">
                  <Sparkles className="w-8 h-8 mb-4 text-fuchsia-500" />
                  <h3 className="text-xl font-bold text-white mb-3">Ancient Wisdom</h3>
                  <p className="text-zinc-400 text-sm">
                    Exploring the teachings of Marcus Aurelius and Indian philosophy, seeking timeless truths in ancient wisdom.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Quote */}
            <motion.div
              className="mt-16 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8 }}
            >
              <blockquote className="text-lg md:text-xl text-zinc-400 italic">
                "All we have to decide is what to do with the time that is given us."
                <span className="block text-sm text-zinc-500 mt-2">— J.R.R. Tolkien</span>
              </blockquote>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <motion.div
            className="w-6 h-10 border-2 border-zinc-500 rounded-full p-1"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <motion.div 
              className="w-1 h-2 bg-fuchsia-500 rounded-full mx-auto"
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Media Favorites Section */}
      <section className="relative min-h-screen px-6 py-32 bg-gradient-to-b from-black to-purple-950/20">
        <motion.div
          className="max-w-7xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-cyan-500">
              Cinematic & Musical Journey
            </span>
          </h2>

          {/* Movies Grid */}
          <div className="mb-20">
            <h3 className="flex items-center text-2xl font-bold mb-8">
              <Film className="w-6 h-6 mr-2 text-fuchsia-500" />
              Favorite Films
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "The Lord of the Rings Trilogy",
                  image: "https://images.unsplash.com/photo-1500964757637-c85e8a162699?q=80",
                  description: "An epic journey that shaped my imagination and love for fantasy.",
                  year: "2001-2003"
                },
                {
                  title: "The Hobbit Trilogy",
                  image: "https://images.unsplash.com/photo-1518709766631-a6c7f7856bc3?q=80",
                  description: "Another masterpiece in Middle-earth that captures the spirit of adventure.",
                  year: "2012-2014"
                },
                {
                  title: "Your Other Favorite",
                  image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80",
                  description: "Add another favorite movie here.",
                  year: "YYYY"
                }
              ].map((movie, index) => (
                <motion.div
                  key={index}
                  className="project-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={movie.image} 
                      alt={movie.title}
                      className="object-cover w-full h-full transform hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-bold mb-2">{movie.title}</h4>
                    <p className="text-sm text-zinc-400 mb-3">{movie.description}</p>
                    <span className="text-xs text-fuchsia-500">{movie.year}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Music Section */}
          <div>
            <h3 className="flex items-center text-2xl font-bold mb-8">
              <Music className="w-6 h-6 mr-2 text-fuchsia-500" />
              Musical Universe
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  type: "Soundtrack",
                  items: [
                    "The Lord of the Rings Symphony",
                    "Add your favorite soundtracks"
                  ]
                },
                {
                  type: "Artists",
                  items: [
                    "Add your favorite artists",
                    "More artists here"
                  ]
                }
              ].map((category, index) => (
                <motion.div
                  key={index}
                  className="bg-zinc-900/30 backdrop-blur-sm border border-zinc-800/50 rounded-lg p-6"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <h4 className="text-xl font-bold mb-4">{category.type}</h4>
                  <ul className="space-y-3">
                    {category.items.map((item, i) => (
                      <li key={i} className="flex items-center text-zinc-400 hover:text-fuchsia-500 transition-colors">
                        <Play className="w-4 h-4 mr-2" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

export default App;
