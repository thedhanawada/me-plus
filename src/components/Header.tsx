import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Menu, X, ChevronRight, ExternalLink } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Work', path: '/work' },
    { name: 'Lab', path: '/lab' },
    { name: 'Art', path: '/art' },
    { name: 'Watchlist', path: '/watchlist' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? 'py-3 bg-black/60 backdrop-blur-lg border-b border-cyan-500/20' 
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="group relative z-10">
            <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="flex items-center space-x-3 relative">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-fuchsia-500 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-500" />
                <div className="relative bg-black/80 p-2 rounded-full border border-cyan-500/30 group-hover:border-fuchsia-500/50 transition-colors">
                  <Terminal className="w-5 h-5 text-cyan-400 group-hover:text-white transition-colors duration-300" />
                </div>
              </div>
              
              <div className="flex flex-col">
                <motion.div 
                  className="flex items-center"
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="text-xs tracking-[0.2em] text-zinc-400">
                    <span className="text-cyan-400">N</span>
                    <span className="text-zinc-500">.</span>
                    <span className="text-fuchsia-400">R</span>
                    <span className="text-zinc-500">.</span>
                  </span>
                </motion.div>
                <motion.span 
                  className="text-sm font-medium tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Dhanawada
                </motion.span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className="relative group px-4 py-2"
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-fuchsia-500/10 rounded-md"
                      initial={false}
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <div className="relative z-10 flex items-center">
                    <span 
                      className={`text-sm transition-colors duration-300 ${
                        isActive 
                          ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500 font-medium' 
                          : 'text-zinc-400 group-hover:text-white'
                      }`}
                    >
                      {item.name}
                    </span>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="ml-1.5 w-1 h-1 rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-500"
                      />
                    )}
                  </div>
                </Link>
              );
            })}
            
            {/* CTA Button */}
            <motion.a
              href="https://github.com/thedhanawada"
              target="_blank"
              rel="noopener noreferrer"
              className="relative group ml-2"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-fuchsia-500 rounded-md blur opacity-25 group-hover:opacity-75 transition duration-500" />
              <div className="relative px-4 py-2 bg-black/50 rounded-md border border-cyan-500/30 group-hover:border-fuchsia-500/50 transition-colors">
                <div className="flex items-center space-x-1.5">
                  <span className="text-sm text-white">GitHub</span>
                  <ExternalLink size={14} className="text-cyan-400 group-hover:text-fuchsia-400 transition-colors" />
                </div>
              </div>
            </motion.a>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="relative p-2 rounded-md bg-black/50 border border-cyan-500/30 hover:border-fuchsia-500/50 transition-colors group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20 rounded-md blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {mobileMenuOpen ? (
                <X size={20} className="text-zinc-400 group-hover:text-white transition-colors" />
              ) : (
                <Menu size={20} className="text-zinc-400 group-hover:text-white transition-colors" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden"
          >
            <div className="px-6 py-4 mt-2 bg-black/80 backdrop-blur-lg border-t border-b border-cyan-500/20">
              <nav className="flex flex-col space-y-1">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={`relative group p-3 rounded-md ${
                        isActive ? 'bg-gradient-to-r from-cyan-500/10 to-fuchsia-500/10' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span 
                          className={`text-sm ${
                            isActive 
                              ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500 font-medium' 
                              : 'text-zinc-400 group-hover:text-white'
                          }`}
                        >
                          {item.name}
                        </span>
                        <ChevronRight 
                          size={16} 
                          className={`transition-colors ${
                            isActive ? 'text-fuchsia-400' : 'text-zinc-600 group-hover:text-zinc-400'
                          }`} 
                        />
                      </div>
                    </Link>
                  );
                })}
                
                {/* Mobile CTA */}
                <a
                  href="https://github.com/thedhanawada"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 p-3 bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20 rounded-md border border-cyan-500/30 hover:border-fuchsia-500/50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white">GitHub</span>
                    <ExternalLink size={16} className="text-cyan-400" />
                  </div>
                </a>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Animated Gradient Line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-30 animate-pulse" />
    </header>
  );
};

export default Header; 