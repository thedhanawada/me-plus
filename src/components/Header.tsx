import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'work', path: '/work' },
    { name: 'lab', path: '/lab' },
    { name: 'art', path: '/art' },
    { name: 'watch', path: '/watchlist' },
  ];

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <header className="sticky top-0 z-50 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="py-12 border-b border-gray-900">
          {/* Name */}
          <div className="mb-8">
            <Link to="/" className="block">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-none">
                N.R DHANAWADA
              </h1>
            </Link>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:block">
            <div className="flex items-center space-x-8">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`relative px-4 py-2 text-sm font-mono transition-all duration-300 group ${
                      isActive 
                        ? 'text-white bg-black' 
                        : 'text-gray-700 hover:text-black'
                    }`}
                  >
                    {!isActive && (
                      <span className="absolute inset-0 bg-black scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
                    )}
                    <span className={`relative z-10 ${!isActive ? 'group-hover:text-white' : ''}`}>
                      [{item.name}]
                    </span>
                  </Link>
                );
              })}
              
              <a
                href="https://github.com/thedhanawada"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-8 text-xs text-gray-400 hover:text-gray-600 font-mono border-l border-gray-300 pl-4"
              >
                github
              </a>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-600 hover:text-gray-900 font-mono text-sm"
            >
              {mobileMenuOpen ? '[close]' : '[menu]'}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <nav className="md:hidden mt-6 pt-6 border-t border-gray-200">
              <div className="space-y-4">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={`block text-lg font-mono ${
                        isActive 
                          ? 'text-white bg-black px-4 py-2' 
                          : 'text-gray-600 hover:text-black'
                      }`}
                    >
                      [{item.name}]
                    </Link>
                  );
                })}
                
                <div className="pt-4 mt-4 border-t border-gray-200">
                  <a
                    href="https://github.com/thedhanawada"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-400 font-mono"
                  >
                    github
                  </a>
                </div>
              </div>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header; 